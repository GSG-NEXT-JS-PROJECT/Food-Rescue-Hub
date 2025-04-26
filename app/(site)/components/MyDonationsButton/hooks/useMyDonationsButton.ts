import { DonationStatus } from "@/@types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DonationRes } from "../type";
import socket from "@/lib/socketClient";

export const useMyDonationsButton = (userId: string) => {
  const [donations, setDonations] = useState<DonationRes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const fetchClaimedDonations = async () => {
    try {
      const res = await fetch("/api/donations?scope=user&status=claimed");
      console.log(res.status);
      if (!res.ok) throw new Error("Failed to fetch claimed donations");
      const data = await res.json();
      setDonations(data.donations);
    } catch (error) {
      console.error("Error fetching claimed donations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClaimedDonations();
    console.log("Socket.IO setup: Joining donations room");
    socket.emit("join-donations");

    socket.on("connect", () => console.log("Socket.IO connected"));
    socket.on("connect_error", (err) =>
      console.error("Socket.IO connect error:", err)
    );
    socket.on("donation-update", (updatedDonation) => {
      setDonations((prev) => [...prev, updatedDonation]);
    });

    return () => {
      console.log("Cleaning up Socket.IO listeners");
      socket.off("connect");
      socket.off("connect_error");
      socket.off("donation-update");
      socket.emit("leave-donations");
    };
  }, [userId]);

  const handleMarkCompleted = async (id: string) => {
    try {
      const res = await fetch(`/api/donations`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donationId: id,
          status: DonationStatus.Completed,
        }),
      });
      if (!res.ok) throw new Error("Failed to mark donation as completed");
      // Remove locally (Socket.IO will handle other clients)
      setDonations((prev) => prev.filter((d) => d._id !== id));
    } catch (error) {
      console.error("Error marking donation as completed:", error);
      toast.error("Failed to mark donation as completed");
    }
  };

  return {
    donations,
    isLoading,
    handleMarkCompleted,
    isOpen,
    setIsOpen,
  };
};

import { DonationStatus } from "@/@types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DonationRes } from "../type";

export const useMyDonationsButton = (userId: string) => {
  const [donations, setDonations] = useState<DonationRes[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch claimed donations on mount
  useEffect(() => {
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
    fetchClaimedDonations();
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
    setIsOpen
  }
};

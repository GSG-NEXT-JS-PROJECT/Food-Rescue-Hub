"use client";

import { reverseGeocode } from "@/lib/location";
import { useEffect, useState } from "react";
import { DonationResponse } from "../../Donations/typeDonation";
import { IUser } from "@/@types";
import { toast } from "sonner";

export const useDonationCard = (donation: DonationResponse) => {
  const [location, setLocation] = useState("");
  const [donorName, setDonorName] = useState("");
  const [isClaiming, setIsClaiming] = useState(false);

  const formatDate = (date: Date): string => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    const calculateDistance = async () => {
      const location = await reverseGeocode(
        donation.location.lat,
        donation.location.lat
      );
      setLocation(location);
    };
    calculateDistance();
  }, [donation.location]);

  useEffect(() => {
    let isMounted = true;

    const fetchDonorName = async () => {
      try {
        const res = await fetch(`/api/user?userId=${donation.donorId}`);
        if (!res.ok) throw new Error("Failed to fetch donor info");

        const user: IUser = await res.json();
        if (isMounted) {
          setDonorName(user.name);
        }
      } catch (error) {
        console.error("Error fetching donor name:", error);
      }
    };

    if (donation?.donorId) {
      fetchDonorName();
    }

    return () => {
      isMounted = false;
    };
  }, [donation?.donorId]);

  const getTimeRemaining = (deadline: Date): string => {
    const now = new Date();
    const diffMs = deadline.getTime() - now.getTime();

    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHrs < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins} minutes left`;
    }

    if (diffHrs < 24) {
      return `${diffHrs} hours left`;
    }

    const diffDays = Math.floor(diffHrs / 24);
    return `${diffDays} days left`;
  };

  const handleClaimDonation = async () => {
    setIsClaiming(true);
    try {
      const res = await fetch("/api/claim-donation", {
        method: "POST",
        body: JSON.stringify({ donationId: donation._id }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        toast.success("Donation claimed successfully!");
      } else {
        toast.error("something went wrong");
      }
    } catch (error) {
      toast.error(`Error claiming donation:, ${error}`);
      console.error("Error claiming donation:", error);
    } finally {
      setIsClaiming(false);
    }
  };

  return {
    location,
    donorName,
    formatDate,
    getTimeRemaining,
    handleClaimDonation,
    isClaiming
  };
};

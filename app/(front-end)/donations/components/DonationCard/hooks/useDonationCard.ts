"use client";

import { useState } from "react";
import { DonationResponse } from "../../Donations/typeDonation";
import { toast } from "sonner";

export const useDonationCard = (donation: DonationResponse) => {
  const [isClaiming, setIsClaiming] = useState(false);

  const formatDate = (date: Date): string => {
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

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
    formatDate,
    getTimeRemaining,
    handleClaimDonation,
    isClaiming
  };
};

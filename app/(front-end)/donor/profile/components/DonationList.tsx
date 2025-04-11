"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import food from "../assets/OIP.jpeg";
import {
  Package2,
  Clock,
  User,
  ChevronRight,
  Plus,
  Calendar,
} from "lucide-react";
import { DonationData } from "../constant";
import { DonationStatus, Role } from "@/@types";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { claimDonation } from "@/app/api/user/route";

interface DonationsListProps {
  donations: DonationData[];
  userRole: Role;
  onCreateDonation?: () => void;
}

export default function DonationsList({
  donations,
  userRole,
  onCreateDonation
}: DonationsListProps) {
  const [claimingIds, setClaimingIds] = useState<Set<string>>(new Set());
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "success";
      case "claimed":
        return "warning";
      case "completed":
        return "secondary";
      case "expired":
        return "destructive";
      default:
        return "outline";
    }
  };

  const handleClaimDonation = async (donationId: string) => {
    try {
      setClaimingIds(prev => new Set(prev).add(donationId));
      await claimDonation(donationId);
      
      toast({
        title: "Success",
        description: "Donation claimed successfully!",
      });
      
      // Refresh could be triggered here or managed via parent component
    } catch (error) {
      console.error("Failed to claim donation:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to claim donation. Please try again.",
      });
    } finally {
      setClaimingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(donationId);
        return newSet;
      });
    }
  };

  const handleViewDetails = (donationId: string) => {
    // Navigate to donation details page
    window.location.href = `/donations/${donationId}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-5 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {userRole === Role.Donor ? "My Donations" : "My Claims"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {userRole === Role.Donor
              ? "Track and manage your food donations"
              : "View and manage your claimed items"}
          </p>
        </div>
        <div className="flex gap-2">
          {userRole === Role.Donor && (
            <Button
              onClick={onCreateDonation}
              className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-4 shadow-sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Donation
            </Button>
          )}
        </div>
      </div>
      
      <div>
        <ul className="divide-y divide-gray-100">
          {donations.length > 0 ? (
            donations.map((donation) => (
              <li key={donation.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                    <Image
                      src={donation.image || food}
                      alt={donation.title}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-medium text-gray-900">
                        {donation.title}
                      </h4>
                      <Badge variant={getStatusBadgeVariant(donation.status)}>
                        {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Package2 className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {donation.quantity}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {donation.date}
                      </div>
                      {donation.pickupDeadline && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          Due: {donation.pickupDeadline}
                        </div>
                      )}
                      {donation.claimedBy && (
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {donation.claimedBy}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="ml-4 flex gap-2">
                    {userRole === Role.Recipient && donation.status.toLowerCase() === "available" && (
                      <Button
                        onClick={() => handleClaimDonation(donation.id)}
                        disabled={claimingIds.has(donation.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-3 py-1"
                      >
                        {claimingIds.has(donation.id) ? "Claiming..." : "Claim"}
                      </Button>
                    )}
                    <Button
                      onClick={() => handleViewDetails(donation.id)}
                      variant="ghost"
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <span className="sr-only">View details</span>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-6 py-8 text-center">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-gray-100 p-3">
                  {userRole === Role.Donor ? (
                    <Package2 className="h-6 w-6 text-gray-400" />
                  ) : (
                    <User className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No donations found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {userRole === Role.Donor
                    ? "You haven't created any donations yet."
                    : "No available donations to claim at the moment."}
                </p>
                {userRole === Role.Donor && (
                  <Button
                    onClick={onCreateDonation}
                    className="mt-4 bg-emerald-600 hover:bg-emerald-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Donation
                  </Button>
                )}
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
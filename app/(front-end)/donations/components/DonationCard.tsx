"use client";
import { MapPin, Clock, Tag } from "lucide-react";
import Image from "next/image";
import food from "../assets/OIP.jpeg";
import { IDonation, IUser, LocationType } from "@/@types";
import { reverseGeocode } from "@/lib/location";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface DonationWithUIDetails extends IDonation {
  donorName: string;
  id: string;
  createdAt: Date;
}

const DonationCard = ({
  donation,
}: // onClaim,
{
  donation: IDonation;
  // onClaim: (id: string) => void;
}) => {
  const [location, setLocation] = useState("");
  const [donorName, setDonorName] = useState("");
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
    const fetchDonorName = async () => {
      const res = await fetch(`api/user?userId=${"67ea3f0c27f9a64c26b16f4b"}`);
      if (!res.ok) throw new Error("Failed to fetch donations");
      const user: IUser = await res.json();
      setDonorName(user.name);
    };
    fetchDonorName();
  });

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
    const res = await fetch("api/donations", {
      method: "PATCH",
    });
    if (res.ok) {
      console.log("done");
    }
  };

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      {/* Image */}
      <div className="bg-gray-200 h-48 relative">
        <Image
          src={donation.imageUrl ? donation.imageUrl : food}
          alt={donation.title}
          className="w-full h-full object-cover"
          width={300}
          height={200}
        />
        <div className="absolute bottom-0 right-0 bg-green-600 text-white px-3 py-1 text-sm">
          {getTimeRemaining(new Date(donation.pickupDeadline))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-xl">{donation.title}</h3>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
            {donation.quantity} items
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4">{donation.description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full flex items-center">
            <Tag size={12} className="mr-1" />
            {donation.foodType}
          </span>
        </div>

        {/* Donor and location */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="font-medium">{donorName}</span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <MapPin size={14} className="mr-1" />
            {location}
          </span>
        </div>

        <div className="flex items-center text-xs text-gray-500 mb-4">
          <Clock size={14} className="mr-1" />
          Pickup by {formatDate(new Date(donation.pickupDeadline))}
        </div>

        {/* Action button */}
        <Button
          disabled={Boolean(donation.recipientId)}
          onClick={handleClaimDonation}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
        >
          Claim Donation
        </Button>
      </div>
    </div>
  );
};
export default DonationCard;

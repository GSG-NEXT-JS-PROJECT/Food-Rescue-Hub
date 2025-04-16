"use client";

import { MapPin, Clock, Tag } from "lucide-react";
import Image from "next/image";
import noImage from "./assets/no-image.png";
import { Button } from "@/components/ui/button";
import { useDonationCard } from "./hooks/useDonationCard";
import { FC } from "react";
import { DonationResponse } from "../Donations/typeDonation";
import Icons from "@/components/ui/icons";

interface DonationCardProps {
  donation: DonationResponse;
}

const DonationCard: FC<DonationCardProps> = ({ donation }) => {
  const {
    location,
    formatDate,
    getTimeRemaining,
    handleClaimDonation,
    isClaiming,
  } = useDonationCard(donation);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      {/* Image */}
      <div className="bg-gray-200 h-48 relative">
        <Image
          src={donation.imageUrl ? donation.imageUrl : noImage}
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
          <span className="font-medium">{donation.donorId.name}</span>
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
          disabled={Boolean(donation.recipientId) || isClaiming}
          onClick={handleClaimDonation}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors"
        >
          {isClaiming ? (
            <Icons.spinner className="mr-3 h-6 w-6 animate-spin" />
          ) : null}
          Claim
        </Button>
      </div>
    </div>
  );
};
export default DonationCard;

'use client';

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import noImage from "@/public/no-image.png";
import { Package2, Clock, User, ChevronRight, Plus } from "lucide-react";
import { Role, type UserProfile } from "@/@types";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { formatDate } from "@/lib/dateUtils";
import { Types } from "mongoose";
import { useDonationList } from "./hooks/useDonationList";

interface DonationsListProps {
  userData: UserProfile | undefined;
}

export default function DonationsList({ userData }: DonationsListProps) {
  const {
    donations,
    currentItems,
    handlePageChange,
    getStatusBadgeVariant,
    itemsPerPage,
    currentPage,
  } = useDonationList(userData);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-5 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {userData?.role === Role.Donor ? "My Donations" : "My Claims"}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {userData?.role === Role.Donor
              ? "Track and manage your food donations"
              : "View and manage your claimed items"}
          </p>
        </div>
        <div className="flex gap-2">
          {userData?.role === Role.Donor && (
            <Link
              href="/post-donation"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm 2xl:text-lg rounded-full px-3 py-2 flex items-center shadow-sm"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Donation
            </Link>
          )}
        </div>
      </div>

      <div>
        <ul className="divide-y divide-gray-100">
          {donations.length > 0 ? (
            currentItems?.map((donation) => (
              <li
                key={donation._id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden bg-gray-100 shadow-sm">
                    <Image
                      src={donation.imageUrl || noImage}
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
                        {donation.status}
                      </Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Package2 className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {donation.quantity}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        {/* { userData.role == Role.Donor ? "created at: " : "pickup deadline: " } */}
                        {userData?.role == Role.Donor
                          ? formatDate(new Date(donation.createdAt))
                          : formatDate(new Date(donation.pickupDeadline))}
                      </div>
                      {userData?.role === Role.Donor &&
                        donation?.recipientId &&
                        !(donation.recipientId instanceof Types.ObjectId) && (
                          <div className="flex items-center text-sm text-gray-500">
                            <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {donation?.recipientId?.name}
                          </div>
                        )}
                      {userData?.role === Role.Recipient &&
                        !(donation.donorId instanceof Types.ObjectId) && (
                          <div className="flex items-center text-sm text-gray-500">
                            <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {donation.donorId.name}
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="ml-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 rounded-full"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="px-6 py-16 text-center">
              <div className="bg-gray-50 rounded-xl py-10 px-6 max-w-md mx-auto">
                <Package2 className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No donations yet
                </h3>
                <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
                  {userData?.role === Role.Donor
                    ? "Start sharing your surplus food with those who need it."
                    : "Browse available donations to claim food."}
                </p>
                <div className="mt-6">
                  <Link
                    href={
                      userData?.role === Role.Donor
                        ? "/post-donation"
                        : "/donations"
                    }
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4 py-2 flex items-center shadow-sm"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {userData?.role === Role.Donor
                      ? "Create Donation"
                      : "Find Donations"}
                  </Link>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>

      {/* Only show pagination if there are items and more than one page */}
      <div className="pb-6">
        {donations.length > itemsPerPage && (
          <Pagination
            page={currentPage}
            total={donations.length}
            limit={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import food from "../assets/OIP.jpeg"
import {
  Package2,
  Clock,
  User,
  ChevronRight,
  Plus,
} from "lucide-react";
import { DonationData } from "../constant";
import { Role } from "@/@types";

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
  
  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "available":
        return "success";
      case "claimed":
        return "warning";
      case "completed":
        return "secondary";
      default:
        return "outline";
    }
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
                      src={food}
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
                        {donation.date}
                      </div>
                      {donation.claimedBy && (
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {donation.claimedBy}
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
                  {userRole === Role.Donor
                    ? "Start sharing your surplus food with those who need it."
                    : "Browse available donations to claim food."}
                </p>
                <div className="mt-6">
                  <Button 
                    onClick={onCreateDonation}
                    className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-5 shadow-sm"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    {userRole === Role.Donor
                      ? "Create Donation"
                      : "Find Donations"}
                  </Button>
                </div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
"use client";

import { Gift, Check, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/dateUtils";
import { useMyDonationsButton } from "./hooks/useMyDonationsButton";
import { DonationStatus } from "@/@types";

export default function MyDonationsButton({ userId }: { userId: string }) {
  const { donations, isLoading, handleMarkCompleted, isOpen, setIsOpen } =
    useMyDonationsButton(userId);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className="m-1" asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative h-9 rounded-full px-3 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors"
        >
          <Gift className="h-6 w-6" />
          {donations.length > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {donations.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[300px] max-h-[400px] overflow-auto"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">My Claimed Donations</h3>
            <Badge variant="outline" className="ml-2">
              {donations.length} active
            </Badge>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isLoading ? (
            <div className="py-6 text-center">
              <p className="text-sm text-gray-500">Loading...</p>
            </div>
          ) : donations.length > 0 ? (
            donations.map((donation) => (
              <DropdownMenuItem
                key={donation._id}
                className="p-0 focus:bg-transparent"
              >
                <div
                  className={cn(
                    "flex items-center justify-between w-full p-2 rounded-md transition-all duration-200",
                    donation.status == DonationStatus.Completed
                      ? "opacity-60 bg-gray-50"
                      : "hover:bg-green-50"
                  )}
                >
                  <div className="flex items-start space-x-2">
                    {donation.status === DonationStatus.Completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    ) : (
                      <Gift className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p
                        className={cn(
                          "text-sm font-medium",
                          donation.status === DonationStatus.Completed &&
                            "line-through"
                        )}
                      >
                        {donation.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(new Date(donation.pickupDeadline))}
                      </p>
                    </div>
                  </div>
                  {donation.status !== DonationStatus.Completed && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs text-green-600 hover:text-green-700 hover:bg-green-100"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleMarkCompleted(donation._id);
                      }}
                    >
                      <Check className="h-3.5 w-3.5 mr-1" />
                      Complete
                    </Button>
                  )}
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="py-6 text-center">
              <Gift className="h-10 w-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No donations claimed yet</p>
            </div>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

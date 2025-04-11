"use client";
import { FC, useState } from "react";
import Map from "@/components/Map";
import { ApiResponse, SearchParamsType } from "./typeDonation";
import { useDonations } from "./hooks/useDonations";
import Filters from "../Filters";
import DonationsList from "../DonationsList";
import { Spinner } from "@/components/ui/spinner";

interface DonationsProps {
  initialData: ApiResponse;
  initialFilters: SearchParamsType;
}

const Donations: FC<DonationsProps> = ({ initialData, initialFilters }) => {
  const donationFilter = useDonations(initialData, initialFilters);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  return (
    <div className="min-h-screen bg-gray-50">
      <Filters
        setViewMode={setViewMode}
        donationFilter={donationFilter}
        viewMode={viewMode}
      />
      <main className="container mx-auto px-4 py-8">
        {donationFilter.isLoading ? (
          <Spinner type="circle" size="xl" />
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Found {initialData.donations.length} donation
              {initialData.donations.length !== 1 ? "s" : ""}
              {initialData.donations ? " matching your filters" : ""}
            </div>

            {viewMode === "map" && <Map donations={initialData.donations} />}

            {viewMode === "grid" && (
              <DonationsList donationFilter={donationFilter} />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Donations;

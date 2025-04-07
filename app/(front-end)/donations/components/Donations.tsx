"use client";
import { MapIcon } from "lucide-react";
import { FC, useState } from "react";
import { ApiResponse, SearchParamsType } from "../typeDonation";
import { useDonationFilters } from "../hooks/useDonationFilters";
import Filters from "./Filters";
import DonationsList from "./DonationsList";

interface DonationsProps {
  initialData: ApiResponse;
  initialFilters: SearchParamsType;
}

const Donations: FC<DonationsProps> = ({ initialData, initialFilters }) => {
  const donationFilter = useDonationFilters(initialData, initialFilters);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Filters
        setViewMode={setViewMode}
        donationFilter={donationFilter}
        viewMode={viewMode}
      />
      <main className="container mx-auto px-4 py-8">
        {donationFilter.isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Found {initialData.donations.length} donation
              {initialData.donations.length !== 1 ? "s" : ""}
              {initialData.donations ? " matching your filters" : ""}
            </div>

            {viewMode === "map" && (
              <div className="bg-gray-200 rounded-xl h-96 mb-8 flex items-center justify-center">
                <div className="text-center">
                  <MapIcon size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">
                    Map view would display here with donation locations
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Integration with Google Maps API
                  </p>
                </div>
              </div>
            )}

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

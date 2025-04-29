"use client";
import { FC, useState } from "react";
import Map from "@/components/Map";
import { ApiResponse, SearchParamsType } from "./typeDonation";
import { useDonations } from "./hooks/useDonations";
import Filters from "../Filters";
import DonationsList from "../DonationsList";
import { Spinner } from "@/components/ui/spinner";
import Pagination from "@/components/Pagination";

interface DonationsProps {
  initialData: ApiResponse;
  initialFilters: SearchParamsType;
}

const Donations: FC<DonationsProps> = ({ initialData, initialFilters }) => {
  const donationFilter = useDonations(initialData, initialFilters);
  const data = donationFilter.data;
  const { limit } = donationFilter;
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  return (
    <div className="min-h-screen pb-8 bg-gray-50 flex flex-col">
      <Filters
        setViewMode={setViewMode}
        donationFilter={donationFilter}
        viewMode={viewMode}
      />
      <main className="container mx-auto px-4 py-8 flex-grow flex flex-col justify-center">
        {donationFilter.isPending ? (
          <Spinner type="circle" className="flex-grow" size="xl" />
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Found {initialData.donations.length} donation
              {initialData.donations.length !== 1 ? "s" : ""}
              {initialData.donations ? " matching your filters" : ""}
            </div>

            {viewMode === "map" && (
              <Map donations={donationFilter.data.donations} />
            )}

            {viewMode === "grid" && (
              <DonationsList donationFilter={donationFilter} />
            )}
          </>
        )}
      </main>

      {data.donations.length > 0 && (
        <Pagination
          page={data.page}
          total={data.total}
          limit={limit}
          isLoading={donationFilter.isPending}
          onPageChange={(newPage) => donationFilter.changePage(newPage)}
        />
      )}
    </div>
  );
};

export default Donations;

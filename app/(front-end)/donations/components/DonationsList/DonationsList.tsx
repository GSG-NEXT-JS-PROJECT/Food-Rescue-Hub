import { Search } from "lucide-react";
import React, { FC } from "react";
import DonationCard from "../DonationCard";
import Pagination from "../Pagination";
import { DonationsReturnType } from "../Donations/typeDonation";

interface DonationsListProps {
  donationFilter: DonationsReturnType;
}

const DonationsList: FC<DonationsListProps> = ({ donationFilter }) => {
  const data = donationFilter.data;
  const { limit, isLoading } = donationFilter;

  return (
    <>
      {data.donations.length === 0 && (
        <div className="text-center py-20">
          <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No donations found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Try adjusting your search or filters to find available donations in
            your area.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.donations.map((donation) => (
          <DonationCard
            key={donation._id}
            donation={donation}
          />
        ))}
      </div>

      {data.donations.length > 0 && (
        <Pagination
          page={data.page}
          total={data.total}
          limit={limit}
          isLoading={isLoading}
          onPageChange={(newPage) => donationFilter.changePage(newPage)}
        />
      )}
    </>
  );
};

export default DonationsList;

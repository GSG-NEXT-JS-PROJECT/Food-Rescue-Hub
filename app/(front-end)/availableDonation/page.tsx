"use client";
import { DonationStatus, FoodType } from "@/@types";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Filter,
  List,
  MapIcon,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import DonationCard from "./components/donation";
import { DonationWithUIDetails } from "./typeDonation";
import { mockData } from "./dummyData/AvailableDontaion";
import { useDonationFilters } from "./hooks/useDonationFilters";

export default function AvailableDonations() {
  const [donations, setDonations] = useState<DonationWithUIDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [filtersExpanded, setFiltersExpanded] = useState<boolean>(false);
  const {
    filters,
    searchQuery,
    filteredDonations,
    currentItems,
    pagination,
    hasActiveFilters,
    handleSearchQueryChange,
    handleFoodTypeChange,
    handleLocationChange,
    handleStatusChange,
    handleDateRangeChange,
    handleAmountRangeChange,
    handleSortChange,
    handleSortOrderChange,
    resetFilters,
    changePage
  } = useDonationFilters(donations);

  useEffect(() => {
    const fetchDonations = async (): Promise<void> => {
      try {
        setDonations(mockData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching donations:", error);
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const foodTypeOptions = Object.values(FoodType);
  const statusOptions = Object.values(DonationStatus);
  const sortOptions = [
    { value: "createdAt", label: "Date Created" },
    { value: "pickupDeadline", label: "Pickup Deadline" },
    { value: "quantity", label: "Quantity" },
    { value: "title", label: "Title" },
  ];

  const handleClaimDonation = (donationId: string): void => {
    console.log(`Claiming donation ${donationId}`);
  };

  const toggleFilters = (): void => {
    setFiltersExpanded(!filtersExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <section className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
            <div className="relative flex-1 mb-4 md:mb-0">
              <input
                type="text"
                placeholder="Search donations by keyword, location, or food type..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => handleSearchQueryChange(e.target.value)}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>

            <button
              onClick={toggleFilters}
              className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter size={18} className="mr-2" />
              Filters
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform ${filtersExpanded ? "rotate-180" : ""}`}
              />
            </button>

            <div className="flex bg-gray-100 rounded-lg overflow-hidden mt-4 md:mt-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center px-3 py-2 ${viewMode === "grid"
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-200"
                  }`}
              >
                <List size={18} className="mr-1" />
                Grid
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`flex items-center px-3 py-2 ${viewMode === "map"
                  ? "bg-green-600 text-white"
                  : "hover:bg-gray-200"
                  }`}
              >
                <MapIcon size={18} className="mr-1" />
                Map
              </button>
            </div>
          </div>

          {filtersExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Food Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {foodTypeOptions.map((type) => (
                      <button
                        key={type}
                        onClick={() => handleFoodTypeChange(type)}
                        className={`px-3 py-1 text-sm rounded-full border ${filters.foodTypes.includes(type)
                          ? "bg-green-100 border-green-500 text-green-700"
                          : "border-gray-300 hover:bg-gray-100"
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(status)}
                        className={`px-3 py-1 text-sm rounded-full border ${filters.status === status
                          ? "bg-green-100 border-green-500 text-green-700"
                          : "border-gray-300 hover:bg-gray-100"
                          }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Location</h3>
                  <input
                    type="text"
                    placeholder="Enter location..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={filters.location}
                    onChange={(e) => handleLocationChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="md:col-span-2">
                    <h3 className="font-medium text-gray-700 mb-2">
                      <Calendar size={16} className="inline mr-1" />
                      Date Range
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">From</label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                          value={filters.dateRange.startDate}
                          onChange={(e) => handleDateRangeChange('startDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">To</label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                          value={filters.dateRange.endDate}
                          onChange={(e) => handleDateRangeChange('endDate', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">
                      Quantity Range
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Min</label>
                        <input
                          type="number"
                          min="0"
                          className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                          value={filters.amountRange.minAmount}
                          onChange={(e) => handleAmountRangeChange('minAmount', parseInt(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Max</label>
                        <input
                          type="number"
                          min="0"
                          className="w-full border border-gray-300 rounded-md px-3 py-1 text-sm"
                          value={filters.amountRange.maxAmount}
                          onChange={(e) => handleAmountRangeChange('maxAmount', parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">
                      Sort By
                    </h3>
                    <div className="flex flex-col gap-2">
                      <select
                        about="Sort options"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                        value={filters.sortBy}
                        onChange={(e) => handleSortChange(e.target.value)}
                      >
                        {sortOptions.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleSortOrderChange}
                        className="flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                      >
                        {filters.sortOrder === 'asc' ? (
                          <>
                            <ChevronUp size={14} className="mr-1" />
                            Ascending
                          </>
                        ) : (
                          <>
                            <ChevronDown size={14} className="mr-1" />
                            Descending
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-100"
                  >
                    Reset all filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600">
              Found {filteredDonations.length} donation{filteredDonations.length !== 1 ? 's' : ''}
              {hasActiveFilters ? " matching your filters" : ""}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentItems.map((donation) => (
                  <DonationCard
                    key={donation.id}
                    donation={donation}
                    onClaim={handleClaimDonation}
                  />
                ))}
              </div>
            )}

            {filteredDonations.length === 0 && (
              <div className="text-center py-20">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No donations found
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Try adjusting your search or filters to find available
                  donations in your area.
                </p>
              </div>
            )}

            {filteredDonations.length > 0 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-2">
                  <button
                    title="Previous Page"
                    onClick={() => changePage(Math.max(1, pagination.currentPage - 1))}
                    disabled={pagination.currentPage === 1}
                    className={`p-2 rounded-md ${pagination.currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => {
                    const showPage =
                      page === 1 ||
                      page === pagination.totalPages ||
                      Math.abs(page - pagination.currentPage) <= 1;

                    if (!showPage) {
                      if (page === 2 || page === pagination.totalPages - 1) {
                        return <span key={page} className="text-gray-400">...</span>;
                      }
                      return null;
                    }
                    return (
                      <button
                        key={page}
                        onClick={() => changePage(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-md ${pagination.currentPage === page
                          ? "bg-green-600 text-white"
                          : "text-gray-600 hover:bg-gray-100"
                          }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  <button
                    title="Next Page"
                    onClick={() => changePage(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className={`p-2 rounded-md ${pagination.currentPage === pagination.totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
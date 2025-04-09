/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from "react";
import { DonationsReturnType } from "../../Donations/typeDonation";

export const useFilters = (donationFilter: DonationsReturnType) => {
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  const { tempFilters } = donationFilter;
  const resetFilters = () => {
    const resetValues = {
      foodType: "",
      status: "",
      startDate: "",
      endDate: "",
      minAmount: "",
      maxAmount: "",
    };

    donationFilter.setTempFilters(resetValues);
    setActiveFiltersCount(0);
  };

  const handleTempFilterChange = (key: string, value: any) => {
    donationFilter.setTempFilters({
      ...tempFilters,
      [key]: value,
    });
  };

  return {
    tempFilters,
    activeFiltersCount,
    resetFilters,
    handleTempFilterChange
  }
};

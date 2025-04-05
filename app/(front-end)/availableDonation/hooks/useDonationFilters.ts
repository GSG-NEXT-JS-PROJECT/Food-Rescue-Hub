import { useEffect, useState } from "react";
import { DonationWithUIDetails, FilterState } from "../typeDonation";
import { DonationStatus, FoodType } from "@/@types";

/**
 * Custom hook for handling donation filtering and search functionality
 */
export const useDonationFilters = (initialDonations: DonationWithUIDetails[]) => {
  const [donations, setDonations] = useState<DonationWithUIDetails[]>(initialDonations);
  const [filteredDonations, setFilteredDonations] = useState<DonationWithUIDetails[]>(initialDonations);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<FilterState>({
    foodTypes: [] as FoodType[],
    location: "",
    dateRange: {
      startDate: "",
      endDate: "",
    },
    amountRange: {
      minAmount: 0,
      maxAmount: 100,
    },
    status: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 6,
    totalItems: initialDonations.length,
  });

  // Update donations when initialDonations changes
  useEffect(() => {
    setDonations(initialDonations);
    setPagination(prev => ({
      ...prev,
      totalItems: initialDonations.length
    }));
  }, [initialDonations]);

  // Apply filters whenever filters or searchQuery changes
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...donations];

      // Filter by search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(
          donation =>
            donation.title.toLowerCase().includes(query) ||
            donation.description?.toLowerCase().includes(query) ||
            donation.donorName.toLowerCase().includes(query) ||
            donation.foodType.toLowerCase().includes(query)
        );
      }

      // Filter by food types
      if (filters.foodTypes.length > 0) {
        filtered = filtered.filter(donation =>
          filters.foodTypes.includes(donation.foodType)
        );
      }

      // Filter by location
      if (filters.location.trim()) {
        const locationQuery = filters.location.toLowerCase();
        filtered = filtered.filter(donation =>
          donation.donorName.toLowerCase().includes(locationQuery)
        );
      }

      // Filter by status
      if (filters.status) {
        filtered = filtered.filter(donation => donation.status === filters.status);
      }

      // Filter by date range
      if (filters.dateRange.startDate) {
        const startDate = new Date(filters.dateRange.startDate);
        filtered = filtered.filter(donation => donation.createdAt >= startDate);
      }
      if (filters.dateRange.endDate) {
        const endDate = new Date(filters.dateRange.endDate);
        endDate.setHours(23, 59, 59, 999);
        filtered = filtered.filter(donation => donation.createdAt <= endDate);
      }

      // Filter by amount range
      filtered = filtered.filter(
        donation =>
          donation.quantity >= filters.amountRange.minAmount &&
          donation.quantity <= filters.amountRange.maxAmount
      );

      // Apply sorting
      filtered.sort((a, b) => {
        const fieldA = a[filters.sortBy as keyof DonationWithUIDetails];
        const fieldB = b[filters.sortBy as keyof DonationWithUIDetails];

        if (fieldA instanceof Date && fieldB instanceof Date) {
          return filters.sortOrder === 'asc'
            ? fieldA.getTime() - fieldB.getTime()
            : fieldB.getTime() - fieldA.getTime();
        }

        if (typeof fieldA === 'string' && typeof fieldB === 'string') {
          return filters.sortOrder === 'asc'
            ? fieldA.localeCompare(fieldB)
            : fieldB.localeCompare(fieldA);
        }

        if (typeof fieldA === 'number' && typeof fieldB === 'number') {
          return filters.sortOrder === 'asc' ? fieldA - fieldB : fieldB - fieldA;
        }

        return 0;
      });

      setFilteredDonations(filtered);
      setPagination(prev => ({
        ...prev,
        totalItems: filtered.length,
        currentPage: 1
      }));
    };

    applyFilters();
  }, [donations, filters, searchQuery]);
  
  // Handler functions for various filter actions
  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFoodTypeChange = (type: string) => {
    setFilters(prev => {
      if (prev.foodTypes.includes(type as FoodType)) {
        return {
          ...prev,
          foodTypes: prev.foodTypes.filter(item => item !== (type as FoodType)),
        };
      } else {
        return {
          ...prev,
          foodTypes: [...prev.foodTypes, type as FoodType],
        };
      }
    });
  };

  const handleLocationChange = (location: string) => {
    setFilters(prev => ({
      ...prev,
      location
    }));
  };

  const handleStatusChange = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: status === prev.status ? "" : (status as "" | DonationStatus),
    }));
  };

  const handleDateRangeChange = (field: 'startDate' | 'endDate', value: string) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [field]: value
      }
    }));
  };

  const handleAmountRangeChange = (field: 'minAmount' | 'maxAmount', value: number) => {
    setFilters(prev => ({
      ...prev,
      amountRange: {
        ...prev.amountRange,
        [field]: value
      }
    }));
  };

  const handleSortChange = (sortBy: string) => {
    setFilters(prev => ({
      ...prev,
      sortBy,
    }));
  };

  const handleSortOrderChange = () => {
    setFilters(prev => ({
      ...prev,
      sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc'
    }));
  };

  const resetFilters = () => {
    setFilters({
      foodTypes: [],
      location: "",
      dateRange: {
        startDate: "",
        endDate: "",
      },
      amountRange: {
        minAmount: 0,
        maxAmount: 100,
      },
      status: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
    setSearchQuery("");
  };

  const changePage = (page: number) => {
    setPagination(prev => ({
      ...prev,
      currentPage: page
    }));
  };

  // Calculate pagination values
  const indexOfLastItem = pagination.currentPage * pagination.itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - pagination.itemsPerPage;
  const currentItems = filteredDonations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);

  // Check if any filters are applied
  const hasActiveFilters = Object.values(filters).some(val =>
    Array.isArray(val) ? val.length > 0 : val !== "" && val !== 0 && val !== 100
  ) || searchQuery.trim() !== "";

  return {
    // State
    filters,
    searchQuery,
    filteredDonations,
    currentItems,
    pagination: {
      ...pagination,
      totalPages
    },
    hasActiveFilters,
    
    // Actions
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
  };
};
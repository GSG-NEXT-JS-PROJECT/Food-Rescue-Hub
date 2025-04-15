"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { ApiResponse, DonationResponse, Filters, SearchParamsType } from "../typeDonation";
import { usePathname, useRouter } from "next/navigation";
import socket from "@/lib/socketClient";

export const useDonations = (
  initialData: ApiResponse,
  initialFilters: SearchParamsType
) => {
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState(initialFilters.keyword || "");
  const [tempFilters, setTempFilters] = useState({
    foodType: initialFilters?.foodType || "",
    startDate: initialFilters?.startDate || "",
    endDate: initialFilters?.endDate || "",
    minAmount: initialFilters?.minAmount || "",
    maxAmount: initialFilters?.maxAmount || "",
    status: initialFilters?.status || "",
  });
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || "date");
  const [sortOrder, setSortOrder] = useState(
    initialFilters.sortOrder || "desc"
  );
  const [page, setPage] = useState(
    parseInt((initialFilters.page as string) || "1", 10)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const initialRender = useRef(true);
  const limit = 10;

  const defaultFilters: Filters = {
    keyword: "",
    foodType: "",
    status: "",
    dateFrom: "",
    dateTo: "",
    amountMin: "",
    amountMax: "",
    sortBy: "date",
    sortOrder: "desc",
    page: "1",
    limit: limit.toString(),
  };

  // Socket.IO integration for real-time updates
  useEffect(() => {
    socket.emit('join-donations');
    console.log('Joined donations room');

    socket.on('connect', () => console.log('Socket.IO connected'));
    socket.on('connect_error', (err) => console.error('Socket.IO connect error:', err));
    socket.on('donation-update', (updatedDonation: DonationResponse) => {
      console.log('Received donation update:', updatedDonation);
      setData((prev) => {
        // Check if donation already exists
        const index = prev.donations.findIndex((d) => d._id === updatedDonation._id);
        if (index >= 0) {
          // Update existing donation
          const updatedDonations = [...prev.donations];
          updatedDonations[index] = updatedDonation;
          return {
            ...prev,
            donations: updatedDonations,
          };
        }

        // Handle new donation
        const matchesFilters = checkDonationMatchesFilters(updatedDonation, {
          keyword: search,
          foodType: tempFilters.foodType,
          status: tempFilters.status,
          startDate: tempFilters.startDate,
          endDate: tempFilters.endDate,
          minAmount: tempFilters.minAmount,
          maxAmount: tempFilters.maxAmount,
          sortBy,
          sortOrder,
        });

        if (!matchesFilters) {
          // Donation doesn’t match filters, increment total only
          return {
            ...prev,
            total: prev.total + 1,
          };
        }

        // Add new donation to the start
        const newDonations = [updatedDonation, ...prev.donations];

        // Trim to respect limit (simulate pagination)
        if (newDonations.length > limit) {
          newDonations.pop(); // Remove oldest to stay within limit
        }

        return {
          ...prev,
          donations: newDonations,
          total: prev.total + 1,
        };
      });
    });

    return () => {
      socket.off('connect');
      socket.off('connect_error');
      socket.off('donation-update');
      socket.emit('leave-donations');
    };
  }, [search, tempFilters, sortBy, sortOrder, limit]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if(initialRender.current) {
        initialRender.current = false;
        return;
      }
      setIsLoading(true);
      startTransition(() => {
        const params = createCleanParams({
          ...tempFilters,
          sortBy,
          sortOrder,
          page: page.toString(),
          limit: limit.toString(),
          keyword: search,
        } as Record<string, string>);
        router.push(`${pathname}?${params.toString()}`);
        fetch(`/api/donations?${params.toString()}`)
          .then((res) => res.json())
          .then((newData: ApiResponse) => {
            setData(newData);
            setIsLoading(false);
          })
          .catch(() => setIsLoading(false));
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Apply filters with batch update
  const applyFilters = (sortBy: string, sortOrder: string) => {
    setIsLoading(true);
    startTransition(() => {
      const params = createCleanParams({
        ...tempFilters,
        keyword: search,
        sortBy,
        sortOrder,
        page: "1",
        limit: limit.toString(),
      } as Record<string, string>);

      router.push(`${pathname}?${params.toString()}`);
      fetch(`/api/donations?${params.toString()}`)
        .then((res) => res.json())
        .then((newData: ApiResponse) => {
          setData(newData);
          setPage(1);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    });
  };

  // Change page
  const changePage = (newPage: number) => {
    setIsLoading(true);
    startTransition(() => {
      setPage(newPage);
      const params = createCleanParams({
        ...tempFilters,
        keyword: search,
        sortBy,
        sortOrder,
        page: newPage.toString(),
        limit: limit.toString(),
      } as Record<string, string>);
      router.push(`${pathname}?${params.toString()}`);
      fetch(`/api/donations?${params.toString()}`)
        .then((res) => res.json())
        .then((newData: ApiResponse) => {
          setData(newData);
          setIsLoading(false);
        })
        .catch(() => setIsLoading(false));
    });
  };

  // Update sort and trigger apply
  const updateSort = (newSortBy: string, newSortOrder: string) => {
     setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    applyFilters(newSortBy, newSortOrder);
  };

  function createCleanParams(filters: Filters) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (
        value &&
        value.trim() !== "" &&
        value !== defaultFilters[key as keyof Filters]
      ) {
        params.set(key, value);
      }
    });
    return params;
  }

  function checkDonationMatchesFilters(donation: DonationResponse, filters: Filters) {
    const {
      keyword = "",
      foodType = "",
      status = "",
      dateFrom = "",
      dateTo = "",
      amountMin = "",
      amountMax ="",

    } = filters;

    if (keyword && !donation.title.toLowerCase().includes(keyword.toLowerCase())) {
      return false;
    }
    if (foodType && donation.foodType !== foodType) {
      return false;
    }
    if (status && donation.status !== status) {
      return false;
    }
    if (dateFrom && new Date(donation.createdAt) < new Date(dateFrom)) {
      return false;
    }
    if (dateTo && new Date(donation.createdAt) > new Date(dateTo)) {
      return false;
    }
    if (amountMin && (donation.quantity || 0) < parseFloat(amountMin)) {
      return false;
    }
    if (amountMax && (donation.quantity || 0) > parseFloat(amountMax)) {
      return false;
    }

    return true;
  }

  return {
    isLoading,
    isPending,
    setTempFilters,
    search,
    setSearch,
    tempFilters,
    sortBy,
    sortOrder,
    updateSort,
    data,
    page,
    limit,
    changePage,
    applyFilters,
  };
};
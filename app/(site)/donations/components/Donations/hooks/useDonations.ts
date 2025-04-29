"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { ApiResponse, Filters, SearchParamsType } from "../typeDonation";
import { usePathname, useRouter } from "next/navigation";
import socket from "@/lib/socketClient";
import { DonationWithDonor, DonationStatus } from "@/@types";

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
    status: initialFilters?.status || DonationStatus.Available,
  });
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || "createdAt");
  const [sortOrder, setSortOrder] = useState(
    initialFilters.sortOrder || "desc"
  );
  const [page, setPage] = useState(
    parseInt((initialFilters.page as string) || "1", 10)
  );
  const [isPending, startTransition] = useTransition();
  const initialRender = useRef(true);
  const limit = 10;

  const defaultFilters: Filters = useMemo(
    () => ({
      keyword: "",
      foodType: "",
      status: "",
      dateFrom: "",
      dateTo: "",
      amountMin: "",
      amountMax: "",
      sortBy: "createdAt",
      sortOrder: "desc",
      page: "1",
      limit: limit.toString(),
    }),
    [limit]
  );

  useEffect(() => {
    setData(initialData);
    setPage(initialData.page);
  }, [initialData]);

  useEffect(() => {
    if (initialRender.current) {
      return;
    }
    const timer = setTimeout(() => {
      startTransition(() => {
        const params = new URLSearchParams();
        if (!search) {
          params.delete("keyword");
        } else {
          params.set("keyword", search);
        }
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [search, router, pathname]);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const params = new URLSearchParams();
    Object.entries({ sortOrder, sortBy }).forEach(([key, value]) => {
      if (
        value &&
        value.trim() !== "" &&
        value !== defaultFilters[key as keyof Filters]
      ) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  }, [sortBy, sortOrder, router, defaultFilters, pathname]);

  useEffect(() => {
    console.log("Socket.IO setup: Joining donations room");
    socket.emit("join-donations");

    socket.on("connect", () => console.log("Socket.IO connected"));
    socket.on("connect_error", (err) =>
      console.error("Socket.IO connect error:", err)
    );
    socket.on("donation-update", (updatedDonation: DonationWithDonor) => {
      setData((prev) => {
        const index = prev.donations.findIndex(
          (d) => d._id === updatedDonation._id
        );
        let newDonations = [...prev.donations];

        if (index >= 0) {
          if (
            updatedDonation.status === DonationStatus.Expired ||
            updatedDonation.status === DonationStatus.Claimed
          ) {
            // Remove if status filter is set and not Expired
            if (tempFilters.status !== updatedDonation.status) {
              newDonations.splice(index, 1);
              // Force API refresh to ensure sync
              return {
                ...prev,
                donations: [...newDonations],
                total: prev.total - 1,
              };
            }
            newDonations[index] = { ...updatedDonation };
            return {
              ...prev,
              donations: newDonations,
            };
          }
          newDonations[index] = updatedDonation;
          return {
            ...prev,
            donations: newDonations,
          };
        }

        const matchesFilters = checkDonationMatchesFilters(updatedDonation, {
          keyword: search,
          foodType: tempFilters.foodType,
          status: tempFilters.status,
          dateFrom: tempFilters.startDate,
          dateTo: tempFilters.endDate,
          amountMin: tempFilters.minAmount,
          amountMax: tempFilters.maxAmount,
          sortBy,
          sortOrder,
        });

        if (
          !matchesFilters ||
          updatedDonation.status === DonationStatus.Expired ||
          updatedDonation.status === DonationStatus.Claimed
        ) {
          return prev;
        }

        newDonations = [updatedDonation, ...newDonations];
        if (newDonations.length > limit) {
          newDonations.pop();
        }

        return {
          ...prev,
          donations: newDonations,
          total: prev.total + 1,
        };
      });
    });

    socket.on("donation-deleted", ({ donationId }) => {
      console.log(
        `Received donation-deleted event for donation: ${donationId}`
      );
      setData((prev) => {
        const newDonations = prev.donations.filter((d) => d._id !== donationId);
        console.log(
          "New state:",
          newDonations.map((d) => ({ id: d._id, status: d.status })),
          "Total:",
          prev.total - 1
        );
        return {
          ...prev,
          donations: newDonations,
          total: prev.total - 1,
        };
      });
    });

    return () => {
      console.log("Cleaning up Socket.IO listeners");
      socket.off("connect");
      socket.off("connect_error");
      socket.off("donation-update");
      socket.emit("leave-donations");
    };
  }, [search, tempFilters, sortBy, sortOrder, limit]);

  const createCleanParams = useCallback(
    (filters: Filters) => {
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
    },
    [defaultFilters]
  );

  // Apply filters with batch update
  const applyFilters = useCallback(() => {
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
    });
  }, [
    createCleanParams,
    tempFilters,
    search,
    sortBy,
    sortOrder,
    limit,
    pathname,
    router,
  ]);

  // Change page
  const changePage = (newPage: number) => {
    startTransition(() => {
      setPage(newPage);
      const params = createCleanParams({
        ...tempFilters,
        sortBy,
        sortOrder,
        page: newPage.toString(),
        limit: limit.toString(),
        keyword: search,
      });
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  // Update sort and trigger apply
  const updateSort = (newSortBy: string, newSortOrder: string) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  function checkDonationMatchesFilters(
    donation: DonationWithDonor,
    filters: Filters
  ) {
    const {
      keyword = "",
      foodType = "",
      status = "",
      dateFrom = "",
      dateTo = "",
      amountMin = "",
      amountMax = "",
    } = filters;

    if (
      keyword &&
      !donation.title.toLowerCase().includes(keyword.toLowerCase())
    ) {
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

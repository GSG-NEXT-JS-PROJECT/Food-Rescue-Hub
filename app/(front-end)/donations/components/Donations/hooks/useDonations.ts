"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import {
  ApiResponse,
  Filters,
  SearchParamsType,
} from "../typeDonation";
import { usePathname, useRouter } from "next/navigation";

// Clean URL params by excluding empty values

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
  const [page, setPage] = useState(parseInt(initialFilters.page as string || "1", 10));
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
  const applyFilters = () => {
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
          setPage(1); // Reset to page 1
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
    applyFilters();
  };

  function createCleanParams(filters: Filters) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      // Only include if value is non-empty and differs from default
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

"use client";

import { UserProfile } from "@/@types";
import { useState } from "react";

export const useDonationList = (userData: UserProfile | undefined) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of donations to show per page
  const donations = userData?.donations || [];

  const getStatusBadgeVariant = (
    status: string
  ): "secondary" | "outline" | "default" | "destructive" | null | undefined => {
    switch (status.toLowerCase()) {
      case "available":
        return "outline";
      case "claimed":
        return "secondary";
      case "completed":
        return "default";
      default:
        return "destructive";
    }
  };

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData?.donations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    donations,
    currentItems,
    handlePageChange,
    getStatusBadgeVariant,
    itemsPerPage,
    currentPage
  }
};

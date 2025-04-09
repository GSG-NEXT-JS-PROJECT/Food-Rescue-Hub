"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  total,
  limit,
  isLoading,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / limit);
  const isFirstPage = page === 1;
  const isLastPage = page >= totalPages;

  return (
    <div className="mt-8 flex justify-center">
      <div className="flex items-center gap-2 sm:gap-4">
        <Button
          variant="outline"
          size="icon"
          disabled={isFirstPage || isLoading}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
          className="h-8 w-8 sm:h-9 sm:w-9"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="text-sm sm:text-base">
          <span className="hidden sm:inline">Page </span>
          <span className="font-medium">{page}</span>
          <span className="mx-1">/</span>
          <span className="font-medium">{totalPages}</span>
        </div>

        <Button
          variant="outline"
          size="icon"
          disabled={isLastPage || isLoading}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
          className="h-8 w-8 sm:h-9 sm:w-9"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

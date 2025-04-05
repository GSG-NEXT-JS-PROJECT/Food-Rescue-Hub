import { DonationStatus, FoodType, IDonation } from "@/@types";

export interface DonationWithUIDetails extends IDonation {
  donorName: string;
  id: string;
  createdAt: Date;
}

export interface FilterState {
  foodTypes: FoodType[];
  location: string;
  dateRange: {
    startDate: string;
    endDate: string;
  };
  amountRange: {
    minAmount: number;
    maxAmount: number;
  };
  status: DonationStatus | "";
  sortBy: string;
  sortOrder: "asc" | "desc";
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}
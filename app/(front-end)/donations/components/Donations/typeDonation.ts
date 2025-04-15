import { DonationStatus, FoodType, IDonation } from "@/@types";
import { useDonations } from "./hooks/useDonations";

export type SearchParamsType = { [key: string]: string | string[] | undefined };

export interface DonationResponse extends IDonation {
  _id: string;
  createdAt: string
}

export interface ApiResponse {
  donations: DonationResponse[];
  total: number;
  page: number;
  limit: number;
}

export interface DonationWithUIDetails extends IDonation {
  donorName: string;
  id: string;
  createdAt: Date;
}

export interface Filters {
  keyword?: string | string[];
  foodType?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  amountMin?: string;
  amountMax?: string;
  sortBy?: string | string[];
  sortOrder?: string | string[];
  page?: string;
  limit?: string;
}

export interface FilterState {
  foodType?: FoodType | "";
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
  status?: DonationStatus | "";
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export type DonationsReturnType = ReturnType<typeof useDonations>;
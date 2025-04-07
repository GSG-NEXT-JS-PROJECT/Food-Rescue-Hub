import { DonationStatus, FoodType, IDonation } from "@/@types";

export type SearchParamsType = { [key: string]: string | string[] | undefined };
// export type SearchParamsType = string | URLSearchParams | string[][] | Record<string, string> | undefined

export interface ApiResponse {
  donations: IDonation[];
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

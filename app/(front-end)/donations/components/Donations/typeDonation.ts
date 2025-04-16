import { DonationStatus, FoodType, IDonation, IUser } from "@/@types";
import { useDonations } from "./hooks/useDonations";

export type SearchParamsType = { [key: string]: string | undefined };

export interface DonationResponse extends Omit<IDonation, "donorId"> {
  _id: string;
  createdAt: string;
  donorId: IUser & {
    _id: string;
  };
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
  keyword?: string;
  foodType?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  amountMin?: string;
  amountMax?: string;
  sortBy?: string;
  sortOrder?: string;
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

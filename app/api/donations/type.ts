import { IDonation } from "@/@types";

export type DonationPostRequestBody = Omit<
  IDonation,
  "donorId" | "status" | "recipientId"
>;

export type DonationUpdateRequestBody = IDonation & {
  donationId: string;
};


export type DonationDeleteRequestBody = {
  donationId: string;
  donorId: string
};

export interface FilterOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface SortOptions {
  [key: string]: 1 | -1;
}
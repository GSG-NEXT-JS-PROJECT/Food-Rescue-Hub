import { IDonation } from "@/@types";

export type DonationPostRequestBody = Omit<
  IDonation,
  "donorId" | "status" | "recipientId"
>;

export type DonationUpdateRequestBody = IDonation & {
  donationId: string;
};

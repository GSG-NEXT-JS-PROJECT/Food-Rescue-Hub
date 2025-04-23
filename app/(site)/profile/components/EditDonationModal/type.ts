import { DonationStatus } from "@/@types";
import { IPostDonation } from "@/app/(site)/post-donation/components/PostDonationForm/type";

export type IEditDonation = IPostDonation & {
  status: DonationStatus;
};

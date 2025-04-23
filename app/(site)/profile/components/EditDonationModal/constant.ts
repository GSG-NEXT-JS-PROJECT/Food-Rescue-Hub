import { DonationWithDonor, DonationWithRecipient, FoodType } from "@/@types";
import { convertISOToLocal, getLocalISOStringNow } from "@/lib/dateUtils";
import { IEditDonation } from "./type";

export const generateInitialValues = (
  donationData: DonationWithDonor | DonationWithRecipient
): IEditDonation => ({
  title: donationData.title,
  description: donationData.description || '',
  quantity: donationData.quantity,
  foodType: donationData.foodType || FoodType.Bakery,
  pickupDeadline: convertISOToLocal(donationData.pickupDeadline) || getLocalISOStringNow(),
  location: donationData.location,
  imageUrl: donationData.imageUrl || '',
  pickupInstruction: donationData.pickupInstruction || '',
  status: donationData.status 
});

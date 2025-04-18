import { FoodType, LocationType } from "@/@types";
import { IPostDonation } from "./type";
import { getLocalISOStringNow } from "@/lib/dateUtils";

export const generateInitialValues = (
  userLocation: LocationType
): IPostDonation => ({
  title: "",
  description: "",
  quantity: 1,
  foodType: FoodType.Bakery,
  pickupDeadline: getLocalISOStringNow(),
  location: userLocation,
  imageUrl: undefined,
  pickupInstruction: "",
});

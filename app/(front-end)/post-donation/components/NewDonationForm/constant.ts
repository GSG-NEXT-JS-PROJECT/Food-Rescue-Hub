import { FoodType, LocationType } from "@/@types";
import { INewDonation } from "./type";
import { getLocalISOStringNow } from "@/lib/dateUtils";

export const generateInitialValues = (
  userLocation: LocationType
): INewDonation => ({
  title: "",
  description: "",
  quantity: 1,
  foodType: FoodType.Bakery,
  pickupDeadline: getLocalISOStringNow(),
  location: userLocation,
  imageUrl: undefined,
  pickupInstruction: "",
});

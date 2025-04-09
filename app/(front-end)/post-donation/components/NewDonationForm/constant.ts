import { FoodType, LocationType } from "@/@types";
import { INewDonation } from "./type";

export const generateInitialValues = (
  userLocation: LocationType
): INewDonation => ({
  title: "",
  description: "",
  quantity: 1,
  foodType: FoodType.Bakery,
  pickupDeadline: new Date().toISOString().slice(0, 16),
  location: userLocation,
  imageUrl: undefined,
});

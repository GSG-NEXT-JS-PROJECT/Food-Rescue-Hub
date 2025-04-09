import { FoodType, LocationType } from "@/@types";

export interface INewDonation {
  title: string;
  description?: string;
  quantity: number;
  foodType: FoodType;
  pickupDeadline: string;
  location: LocationType;
  imageUrl?: string;
  pickupInstruction?: string;
}
import { DonationStatus, FoodType } from "@/@types";

export const foodTypeOptions = Object.values(FoodType);

export const statusOptions = Object.values(DonationStatus);

export const sortOptions = [
  { value: "createdAt", label: "Date Created" },
  { value: "pickupDeadline", label: "Pickup Deadline" },
  { value: "quantity", label: "Quantity" },
  { value: "title", label: "Title" },
];

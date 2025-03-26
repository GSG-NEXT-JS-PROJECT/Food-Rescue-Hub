import { Types } from "mongoose";

export interface LocationType {
  lat: number;
  lng: number;
}

export enum FoodType {
  GrainsCereals = "Grains & Cereals",
  Vegetables = "Vegetables",
  Fruits = "Fruits",
  ProteinSources = "Protein Sources",
  DairyAlternatives = "Dairy & Dairy Alternatives",
  FatsOils = "Fats & Oils",
  SweetsDesserts = "Sweets & Desserts",
  Beverages = "Beverages",
  ProcessedFastFoods = "Processed & Fast Foods",
}

export enum DonationStatus {
  Available = "available",
  Claimed = "claimed",
  Expired = "expired",
}

export enum Role {
  Donor = "donor",
  Recipient = "recipient",
  Admin = "admin",
}

export interface IUser {
  email: string;
  name: string;
  location: LocationType;
  password: string;
  role: Role;
}

export interface IDonation {
  donorId: Types.ObjectId;
  recipientId: Types.ObjectId;
  title: string;
  description?: string;
  quantity: number;
  foodType: FoodType;
  pickupDeadline: Date;
  location: LocationType;
  status: DonationStatus;
  imageUrl?: string;
  pickupInstruction?: string;
}

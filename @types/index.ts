import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

export interface LocationType {
  lat: number;
  lng: number;
  address: string;
}

export enum FoodType {
  Bakery = "Bakery",
  Dairy = "Dairy",
  Fruits = "Fruits",
  Vegetables = "Vegetables",
  Grains = "Grains",
  Meat = "Meat",
  Poultry = "Poultry",
  Fish = "Fish",
  Seafood = "Seafood",
  Legumes = "Legumes",
  Nuts = "Nuts",
  Seeds = "Seeds",
  Eggs = "Eggs",
  Beverages = "Beverages",
  Sweets = "Sweets",
  Snacks = "Snacks",
  PreparedMeals = "Prepared Meals",
  CannedGoods = "Canned Goods",
  FrozenFoods = "Frozen Foods",
  Spices = "Spices",
  Condiments = "Condiments",
  Pasta = "Pasta",
  Rice = "Rice",
  Bread = "Bread",
  Cereals = "Cereals",
  Oils = "Oils",
  Soups = "Soups",
  Sauces = "Sauces",
  Desserts = "Desserts",
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
  isVerified: boolean;
}

export interface IDonation {
  donorId: Types.ObjectId;
  recipientId?: Types.ObjectId;
  title: string;
  description?: string;
  quantity: number;
  foodType: FoodType;
  pickupDeadline: string;
  location: LocationType;
  status: DonationStatus;
  imageUrl?: string;
  pickupInstruction?: string;
}

export interface DonationWithDonor extends Omit<IDonation, "donorId"> {
  _id: string;
  createdAt: string;
  donorId: IUser & {
    _id: string;
  };
}

export interface DonationWithRecipient extends Omit<IDonation, "recipientId"> {
  _id: string;
  createdAt: string;
  recipientId: IUser & {
    _id: string;
  };
}

export enum RequestMethod {
  Get = "GET",
  Post = "POST",
  Patch = "PATCH",
  Delete = "DELETE",
}

export interface TokenPayload extends JwtPayload {
  userId: string;
  userRole: Role;
}

export interface EmailTemplateProps {
  link?: string;
  title: string;
  description: string;
  secondary: string;
  button?: string;
}

export type UserProfile = Omit<IUser, "password" | "isVerified"> & {
  id: string;
  donations: DonationWithDonor[] | DonationWithRecipient[];
  createdAt: string;
};

export interface INotification {
  userId: Types.ObjectId;
  message: string;
  read: boolean;
}

import { DonationStatus, FoodType } from "@/@types";
import { Document, Schema, Types, model, models } from "mongoose";

interface Donation extends Document {
  donorId: Types.ObjectId;
  recipientId: Types.ObjectId;
  title: string;
  description?: string;
  quantity: number;
  foodType: FoodType;
  pickupDeadline: Date;
  location: { lat: number; lng: number };
  status: DonationStatus;
  imageUrl?: string;
  pickupInstruction?: string;
}

const donationSchema: Schema<Donation> = new Schema(
  {
    donorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    foodType: { type: String, required: true, enum: Object.values(FoodType) },
    pickupDeadline: { type: Date, required: true },
    location: {
      lat: {
        type: Number,
        required: true,
      },
      lng: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(DonationStatus),
      default: DonationStatus.Available,
    },
    imageUrl: { type: String },
    pickupInstruction: { type: String },
  },
  {
    timestamps: true,
  }
);

const Donation = models.Donation || model<Donation>("Donation", donationSchema);

export default Donation;
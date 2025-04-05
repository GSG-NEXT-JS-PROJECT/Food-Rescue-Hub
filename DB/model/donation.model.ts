import { DonationStatus, FoodType, IDonation } from "@/@types";
import { Document, Schema, model, models } from "mongoose";

export interface DonationDocument extends Document, IDonation {}

const donationSchema: Schema<DonationDocument> = new Schema(
  {
    donorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    recipientId: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String },
    quantity: { type: Number, required: true },
    foodType: { type: String, required: true, enum: Object.values(FoodType) },
    pickupDeadline: { type: String, required: true },
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

const Donation = models?.Donation || model<DonationDocument>("Donation", donationSchema);

export default Donation;
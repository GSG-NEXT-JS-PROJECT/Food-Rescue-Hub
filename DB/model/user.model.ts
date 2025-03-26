import { IUser, Role } from "@/@types";
import { Document, Schema, model, models } from "mongoose";

export interface UserDocument extends Document, IUser {}

const userSchema: Schema<UserDocument> = new Schema(
  {
    role: {
      type: String,
      required: true,
      enum: Object.values(Role),
    },
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
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
  },
  { timestamps: true }
);

const User = models.User || model<UserDocument>("User", userSchema);

export default User;

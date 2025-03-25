import { Role } from "@/@types";
import { Document, Schema, model, models } from "mongoose";

interface User extends Document {
  role: Role;
  name: string;
  email: string;
  password: string;
  location: { lat: number; lng: number };
}

const userSchema: Schema<User> = new Schema(
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

const User = models.User || model<User>("User", userSchema);

export default User;

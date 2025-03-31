import { IUser, Role } from "@/@types";
import crypto from "crypto";
import { Document, Schema, model, models } from "mongoose";

export interface UserDocument extends Document, IUser {
  verifyToken: string;
  verifyTokenExpire: Date;
  getVerificationToken(): string;
}

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
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyToken: {
      type: String,
    },
    verifyTokenExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.methods.getVerificationToken = function (): string {
  const verificationToken = crypto.randomBytes(20).toString("hex");

  this.verifyToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  this.verifyTokenExpire = new Date(Date.now() + 30 * 60 * 1000);

  return verificationToken;
};

const User = models?.User || model<UserDocument>("User", userSchema);

export default User;

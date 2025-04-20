import { INotification } from "@/@types";
import { Schema, model, models } from "mongoose";

export interface NotificationDocument extends Document, INotification {}

const NotificationSchema:Schema<NotificationDocument> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Notification = models?.Notification || model<NotificationDocument>("Notification", NotificationSchema);

export default Notification;

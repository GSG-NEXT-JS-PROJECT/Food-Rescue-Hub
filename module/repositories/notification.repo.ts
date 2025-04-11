import dbConnect from "@/DB/connection";
import { NotificationDocument } from "@/DB/model/notification.model";
import Notification from "@/DB/model/notification.model";
import { Types } from "mongoose";

export class NotificationRepository {
  async createNotification(
    userId: Types.ObjectId,
    message: string
  ): Promise<NotificationDocument> {
    await dbConnect();
    const newNotification = new Notification({ userId, message });

    const savedNotification = await newNotification.save();
    return savedNotification;
  }

  async findNotificationByUserId(userId: string) {
    await dbConnect();
    return Notification.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async markAsRead(notificationId: string) {
    await dbConnect();
    return Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    ).exec();
  }

  async markAllAsRead(userId: string) {
    await dbConnect();
    return Notification.updateMany(
      { userId, read: false },
      { read: true }
    ).exec();
  }
}
const notificationRepo = new NotificationRepository();
export default notificationRepo;

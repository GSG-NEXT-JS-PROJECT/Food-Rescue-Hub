import { sendPushNotification } from "@/lib/firebaseAdmin";
import notificationRepo from "../repositories/notification.repo";
import { Types } from "mongoose";

class NotificationService {
  async notifyUser(userId: string, message: string, deviceToken?: string) {
    // Create notification in DB
    const notification = await notificationRepo.createNotification(
      new Types.ObjectId(userId),
      message
    );

    // Send push notification if device token exists
    if (deviceToken) {
      await sendPushNotification(deviceToken, message);
      console.log("Push notification sent to user:", userId);
    }

    // Emit via Socket.IO
    await fetch("http://localhost:4000/emit-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        notification,
      }),
    });

    return notification;
  }
}

const notificationService = new NotificationService();
export default notificationService;

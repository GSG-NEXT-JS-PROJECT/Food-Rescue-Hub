import { sendPushNotification } from "@/lib/firebaseAdmin";
import notificationRepo from "../repositories/notification.repo";
import { Types } from "mongoose";
class NotificationService {
  private SOCKET_IO_URL: string;

  constructor() {
    const SOCKET_IO_URL = process.env.NEXT_PUBLIC_SOCKET_IO_URL;

    if (!SOCKET_IO_URL) {
      throw new Error("SOCKET_IO_URL is not defined in environment variables");
    }

    this.SOCKET_IO_URL = SOCKET_IO_URL;
  }

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
    await fetch(`${this.SOCKET_IO_URL}/emit-notification`, {
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

"use client";

import { useCallback, useEffect, useState } from "react";
import socket from "@/lib/socketClient";
import { INotification } from "@/@types";
import { useRouter } from "next/navigation";

interface NotificationRes extends INotification {
  _id: string;
}

export const useNotifications = (userId: string) => {
  const [notifications, setNotifications] = useState<NotificationRes[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const router = useRouter();

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications", {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch notifications");
      const data: NotificationRes[] = await res.json();
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.read).length);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
    socket.emit("join", userId);

    socket.on("notification", (newNotification: NotificationRes) => {
      console.log("Received notification:", newNotification);
      setNotifications((prev) => [newNotification, ...prev]);
      if (!newNotification.read) setUnreadCount((prev) => prev + 1);
    });

    socket.on("connect", () => console.log("Connected to Socket.IO"));
    socket.on("connect_error", (err) =>
      console.error("Socket.IO connection error:", err)
    );

    return () => {
      socket.off("notification");
      socket.off("connect");
      socket.off("connect_error");
    };
  }, [userId, fetchNotifications]);

  useEffect(() => {
    router.refresh();
  },[router])

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        body: JSON.stringify({ notificationId }),
        headers: { "Content-Type": "application/json" },
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "PUT",
        body: JSON.stringify({ markAll: true, userId }),
        headers: { "Content-Type": "application/json" },
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  return {
    notifications,
    unreadCount,
    handleMarkAsRead,
    handleMarkAllAsRead,
  };
};

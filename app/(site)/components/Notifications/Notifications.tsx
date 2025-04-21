import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, CheckCircle, Circle } from "lucide-react";
import { useNotifications } from "./hooks/useNotifications";

export default function Notifications({ userId }: { userId: string }) {
  const { notifications, unreadCount, handleMarkAsRead, handleMarkAllAsRead } =
    useNotifications(userId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative focus:outline-none">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 bg-white shadow-lg rounded-md p-2">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {notifications.length > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-sm text-blue-500 hover:underline"
            >
              Mark all as read
            </button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 h-px bg-gray-200" />
        {notifications.length === 0 ? (
          <DropdownMenuItem className="text-gray-500">
            No notifications
          </DropdownMenuItem>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification._id}
              className={`flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer ${
                notification.read ? "text-gray-500" : "text-black"
              }`}
              onClick={() =>
                !notification.read && handleMarkAsRead(notification._id)
              }
            >
              {notification.read ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <Circle className="h-4 w-4 text-blue-500" />
              )}
              <span>{notification.message}</span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

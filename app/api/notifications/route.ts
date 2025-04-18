import notificationRepo from '@/module/repositories/notification.repo';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const userId = req.headers.get('x-user-id')!;
   
  if (!userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 });

  try {
    const notifications = await notificationRepo.findNotificationByUserId(userId);
    return NextResponse.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const { notificationId, markAll, userId } = await req.json();

  try {
    if (markAll) {
      await notificationRepo.markAllAsRead(userId);
      return NextResponse.json({ message: 'All notifications marked as read' });
    }
    await notificationRepo.markAsRead(notificationId);
    return NextResponse.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error updating notifications:', error);
    return NextResponse.json({ error: 'Failed to update notifications' }, { status: 500 });
  }
}
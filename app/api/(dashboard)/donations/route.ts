import { DonationStatus } from '@/@types';
import dbConnect from '@/DB/connection';
import Donation from '@/DB/model/donation.model';
import { NextRequest, NextResponse } from 'next/server';

interface DonationRequestBody {
  title: string;
  description?: string;
  quantity: number;
  foodType: string[];
  pickupDeadline: string;
  location: { lat: number; lng: number };
  imageUrl?: string;
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Get user data from headers set by middleware
    const donorId = req.headers.get('x-user-id');

    const body: DonationRequestBody = await req.json();
    const { title, description, quantity, foodType, pickupDeadline, location, imageUrl } = body;

    if (!title || !quantity || !foodType || !pickupDeadline || !location) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newDonation = new Donation({
      donorId,
      title,
      description,
      quantity,
      foodType,
      pickupDeadline: new Date(pickupDeadline),
      location,
      imageUrl,
      status: DonationStatus.Available,
    });

    const savedDonation = await newDonation.save();

    return NextResponse.json(
      { message: 'Donation added successfully', donation: savedDonation },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding donation:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
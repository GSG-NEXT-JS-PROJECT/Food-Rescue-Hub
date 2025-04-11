import dbConnect from "@/DB/connection";
import donationService from "@/module/services/donation.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { donationId } = await req.json();
    const recipientId = req.headers.get('x-user-id');

    if (!donationId || !recipientId) {
      return NextResponse.json(
        { error: 'donationId and recipientId are required' },
        { status: 400 }
      );
    }

    const claimedDonation = await donationService.claimDonation(donationId, recipientId);

    return NextResponse.json({
      message: 'Donation claimed and donor notified',
      donation: claimedDonation,
    });
  } catch (error) {
    console.error('Error in claim-donation:', error);
    if (error instanceof Error) {
      const status = error.message.includes('required') || error.message.includes('Invalid') ? 400 : error.message === 'Donation not found' ? 404 : 500;
      return NextResponse.json({ error: error.message }, { status });
    }
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

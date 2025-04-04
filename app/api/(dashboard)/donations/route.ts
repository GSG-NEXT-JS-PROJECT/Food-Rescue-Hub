import { IDonation } from "@/@types";
import donationService from "@/module/services/donation.service";
import { NextRequest, NextResponse } from "next/server";

export type DonationRequestBody = Omit<
  IDonation,
  "donorId" | "status" | "recipientId"
>;

export async function POST(req: NextRequest) {
  try {
    const donorId = req.headers.get("x-user-id");
    if (!donorId) {
      return NextResponse.json(
        { error: "Donor ID is required" },
        { status: 400 }
      );
    }
    const body: DonationRequestBody = await req.json();

    const savedDonation = await donationService.createDonation(donorId, body);

    return NextResponse.json(
      { message: "Donation added successfully", donation: savedDonation },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding donation:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        {
          status:
            error.message.includes("required") ||
            error.message.includes("Invalid")
              ? 400
              : 500,
        }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

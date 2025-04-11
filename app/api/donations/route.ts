import { IDonation } from "@/@types";
import dbConnect from "@/DB/connection";
import donationService from "@/module/services/donation.service";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export type DonationRequestBody = Omit<
  IDonation,
  "donorId" | "status" | "recipientId"
>;

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const userRole = request.headers.get("x-user-role")!;

    const params = {
      scope: searchParams.get("scope") || "all",
      page: parseInt(searchParams.get("page") || "1", 10),
      limit: parseInt(searchParams.get("limit") || "10", 10),
      status: searchParams.get("status") || undefined,
      startDate: searchParams.get("startDate") || undefined,
      endDate: searchParams.get("endDate") || undefined,
      minAmount: searchParams.get("minAmount") || undefined,
      maxAmount: searchParams.get("maxAmount") || undefined,
      foodType: searchParams.get("foodType") || undefined,
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
      keyword: searchParams.get("keyword") || undefined,
    };

    const result = await donationService.getDonations(userRole, params);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error fetching donations:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Invalid scope" ? 400 : 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export async function POST(req: NextRequest) {
  try {
    const donorId = req.headers.get("x-user-id");

    if (!donorId) {
      return NextResponse.json(
        { error: "Donor ID is required" },
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(donorId)) {
      return new NextResponse(JSON.stringify({ message: "invalid userId" }), {
        status: 400,
      });
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

// not ready
// export const PATCH = async (request: NextRequest) => {
//   try {
//     await dbConnect();

//     const recipientId = request.headers.get("x-user-id");
//     if (!recipientId) {
//       return new NextResponse(
//         JSON.stringify({ message: "Recipient ID is required" }),
//         { status: 400 }
//       );
//     }

//     const { donationId } = await request.json(); 
//     if (!donationId) {
//       return new NextResponse(
//         JSON.stringify({ message: "Donation ID is required" }),
//         { status: 400 }
//       );
//     }

//     const updatedDonation = await donationService.updateDonation(
//       donationId,
//       recipientId
//     );

//     return new NextResponse(
//       JSON.stringify({
//         message: "Donation updated successfully",
//         donation: updatedDonation,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     if (error instanceof Error) {
//       const status =
//         error.message.includes("required") ||
//         error.message.includes("Invalid") ||
//         error.message === "Donation not found"
//           ? 400
//           : 500;
//       return new NextResponse(JSON.stringify({ message: error.message }), {
//         status,
//       });
//     }
//     return new NextResponse(
//       JSON.stringify({ message: "Internal server error" }),
//       { status: 500 }
//     );
//   }
// };

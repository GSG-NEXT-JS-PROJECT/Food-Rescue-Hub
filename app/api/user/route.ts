import dbConnect from "@/DB/connection";
import User from "@/DB/model/user.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse(JSON.stringify({ message: "ID are not found" }), {
        status: 400,
      });
    }

    if (!Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "invalid userId" }), {
        status: 400,
      });
    }

    await dbConnect();
    const user = await User.findById(new Types.ObjectId(userId));

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "user is not found" }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify( user ),
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new NextResponse(`Error in deleting user ${error.message}`, {
        status: 500,
      });
    }
  }
};
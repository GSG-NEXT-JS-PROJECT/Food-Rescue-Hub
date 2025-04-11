import User from "@/DB/model/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { token } = await request.json();
  const userId = request.headers.get("x-user-id")!;
  try {
    await User.findByIdAndUpdate(userId, { deviceToken: token });
    return NextResponse.json(
      { message: "Device token registered" },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Failed to register device token" },
      { status: 500 }
    );
  }
}

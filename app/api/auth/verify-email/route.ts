import { NextResponse } from "next/server";
import dbConnect from "@/DB/connection";
import authService from "@/module/services/auth.service";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const verificationToken = searchParams.get("verifyToken") as string;
    const userId = searchParams.get("id");

    if (!userId || !verificationToken) {
      return NextResponse.json({ error: "Token nor exist" }, { status: 400 });
    }
    const result = await authService.verifyEmail(userId, verificationToken);

    return NextResponse.json({ message: result.message }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: `Something went wrong ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      },
      { status: 500 }
    );
  }
}

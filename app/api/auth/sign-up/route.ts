import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/module/services/auth.service";
import dbConnect from "@/DB/connection";
import { IUser } from "@/@types/index";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const data: IUser = await req.json();
    if (!data) {
      return NextResponse.json({ error: "Data is required" }, { status: 400 });
    }
    const { user, emailSent } = await AuthService.signUp(data);
    return NextResponse.json(
      {
        message: "User created successfully",
        user,
        emailSent,
      },
      { status: 201 }
    );
  } catch (error) {
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

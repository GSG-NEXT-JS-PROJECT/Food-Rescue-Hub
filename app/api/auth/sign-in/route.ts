import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/module/services/auth.service";
import { createSession } from "@/lib/StoreGetDeleteSession";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data || !data.email || !data.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }
    
    const user = await AuthService.signIn(data);
    const token = await createSession(user.id, user.role);
    return NextResponse.json(
      {
        message: "User logged in successfully",
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import userService from "@/module/services/user.service";

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id') || '';
    const user = await userService.getUserData(userId);
    
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message },  { status: error.message === 'User not found' ? 400 : 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

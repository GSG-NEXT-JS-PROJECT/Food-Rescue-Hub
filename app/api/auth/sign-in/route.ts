import { NextRequest, NextResponse } from "next/server";
import AuthService from "@/module/services/auth.service";
import dbConnect from "@/DB/connection";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const data = await req.json();
        if (!data || !data.email || !data.password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }
        
        const { user, token } = await AuthService.signIn(data);
        
        return NextResponse.json({
            message: "User logged in successfully",
            user,
            token
        }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}
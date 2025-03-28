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
        const { user } = await AuthService.signUp(data);
        return NextResponse.json({
            message: "User created successfully",
            user
        }, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 401 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}

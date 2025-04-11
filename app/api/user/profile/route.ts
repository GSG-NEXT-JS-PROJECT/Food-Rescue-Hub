import { NextRequest, NextResponse } from "next/server";
import userService from "@/module/services/user.service";
import { Types } from "mongoose";
import * as yup from "yup";
import { IUser } from "@/@types";
import { validationSchemaUpdateUser } from "./validationSchemaUpdateUser";

export type UserRequestBody = Omit<IUser, "isVerified" | "password">;

export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id")!;
    const user = await userService.getUserData(userId);
    const donations = await userService.getUserDonations(userId);

    return NextResponse.json({ ...user, donations }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "User not found" ? 400 : 500 }
      );
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const body = await req.json();

    // Validate request body
    try {
      await validationSchemaUpdateUser.validate(body, { abortEarly: false });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        return NextResponse.json(
          { error: error.errors.join(", ") },
          { status: 400 }
        );
      }
      throw error;
    }

    const updatedUser = await userService.updateUser(userId, body);

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
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

import "server-only";
import { cookies } from "next/headers";
import {  Role, TokenPayload } from "../@types/index";
import { generateToken, verifyToken } from "./generateAndVerify";

export async function createSession(userId: string, userRole: Role):Promise<string> {
    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
    const token = await generateToken({ userId, userRole });

    (await cookies()).set("Session", token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
    });
    return token;
}

export async function getSession(): Promise<TokenPayload | undefined | null > {
    const token = (await cookies()).get("Session")?.value;

    if(!token) return undefined;
    const payload =await verifyToken(token);
    console.log("verifyToken",payload);
    return payload;
}

export async function deleteSession() {
    (await cookies()).delete("Session");
}

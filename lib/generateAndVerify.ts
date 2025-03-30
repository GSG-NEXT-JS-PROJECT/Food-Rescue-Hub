import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { JwtPayload } from "jsonwebtoken";
import { Role } from "../@types/index";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export interface TokenPayload extends JwtPayload {
    userId: string;
    userRole?: Role;
}

export async function generateToken(
    payload: TokenPayload,
    expirationTime: string | Date = "1d"
): Promise<string> {
    const t = new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(expirationTime);

    const token = await t.sign(encodedKey);
    return token;
}

export async function verifyToken(token: string | undefined = ""):Promise<TokenPayload | null>{
    try {
        const { payload } = await jwtVerify(token, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload as TokenPayload;
    } catch (error) {
        return null;
    }
}
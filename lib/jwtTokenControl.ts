import { TokenPayload } from "@/@types";
import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

export const getUserFromToken = async (
  token: string
): Promise<TokenPayload | null> => {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jose.jwtVerify<TokenPayload>(token, secret);
    return payload;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};

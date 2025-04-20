import { UserProfile } from "@/@types";
import { cookies } from "next/headers";
import { getServerOrigin } from "./getServerOrigin";

export async function fetchUser() : Promise<UserProfile | undefined> {
  const serverOrigin = await getServerOrigin();
  const url = `${serverOrigin}/api/user/profile`;
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("Session")?.value;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token to the API
      },
    });
    if (!response.ok) return undefined;
     return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return undefined;
  }
}
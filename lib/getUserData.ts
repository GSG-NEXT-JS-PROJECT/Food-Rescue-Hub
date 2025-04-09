import { UserProfile } from "@/@types";
import { cookies, headers } from "next/headers";

export async function fetchUser() : Promise<UserProfile | undefined> {
  const headersList = headers();
  const host = (await headersList).get("host"); // e.g., 'localhost:3000'
  const protocol = (await headersList).get("x-forwarded-proto") || "http";
  const url = `${protocol}://${host}/api/user/profile`;
  console.log(url)
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("Session")?.value;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token to the API
      },
    });
    console.log(response.status)
    if (!response.ok) throw new Error("Failed to fetch user profile data");
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return undefined;
  }
}
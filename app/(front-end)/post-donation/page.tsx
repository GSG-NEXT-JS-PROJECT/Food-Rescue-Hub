import { UserProfile } from "@/@types";
import PostDonationForm from "./components/PostDonationForm";
import { getServerOrigin } from "@/lib/getServerOrigin";
import { cookies } from "next/headers";

export const metadata = {
  title: "Post Donation | Food Rescue Hub",
  description: "Share your surplus food and help reduce waste.",
  keywords: ["food rescue", "donation", "zero waste", "sustainability"],
};

async function fetchUserLocation() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("Session")?.value;
    const serverOrigin = await getServerOrigin();
    const response = await fetch(`${serverOrigin}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token to the API
      },
    });
    if (!response.ok) {
      return { lat: 0, lng: 0, address: "" };
    }
    const data: UserProfile = await response.json();
    return data.location;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { lat: 0, lng: 0, address: "" };
  }
}

export default async function DonationPage() {
  const userLocation = await fetchUserLocation();
  return (
    <div className="container mx-auto py-10 px-4">
      <PostDonationForm userLocation={userLocation} />
    </div>
  );
}

export const dynamic = "force-dynamic";

import { UserProfile } from "@/@types";
import PostDonationForm from "./components/PostDonationForm";
import { getServerOrigin } from "@/lib/getServerOrigin";
import { cookies } from "next/headers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Post Donation",
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
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Food Donation Form
          </CardTitle>
          <CardDescription>
            Fill out the form below to donate food items to those in need.
          </CardDescription>
          <CardContent className="space-y-4">
            <PostDonationForm userLocation={userLocation} />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}

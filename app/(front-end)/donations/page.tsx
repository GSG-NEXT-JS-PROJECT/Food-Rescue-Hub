import { cookies } from "next/headers";
import { FC } from "react";
import {
  ApiResponse,
  SearchParamsType,
} from "./components/Donations/typeDonation";
import Donations from "./components/Donations";
import { DonationStatus } from "@/@types";
import { getServerOrigin } from "@/lib/getServerOrigin";

export const metadata = {
  title: 'Donations',
  description:
    'Browse all food donations shared by the community. Claim surplus food and help reduce waste today.',
  keywords: [
    'available donations',
    'claim food',
    'food sharing',
    'surplus food',
    'rescue food',
    'community support',
    'food rescue hub'
  ],
}

interface DonationsPageProps {
  searchParams: Promise<SearchParamsType>;
}

async function fetchDonations(
  searchParams: SearchParamsType
): Promise<ApiResponse> {
  const serverOrigin = await getServerOrigin(); 
  const urlSearchParams = new URLSearchParams(
    searchParams as Record<string, string>
  );
  if(!urlSearchParams.has('status')) {
    urlSearchParams.append('status', DonationStatus.Available)
  }
  const url = `${serverOrigin}/api/donations?${urlSearchParams.toString()}`;
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("Session")?.value;
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token to the API
      },
    });
    if (!response.ok) throw new Error("Failed to fetch donations");
    return response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return { donations: [], total: 0, page: 1, limit: 10 }; // Fallback on error
  }
}

const DonationsPage: FC<DonationsPageProps> = async ({ searchParams }) => {
  const params = await searchParams;
  const data = await fetchDonations(params);
  return <Donations initialData={data} initialFilters={params} />;
};

export default DonationsPage;

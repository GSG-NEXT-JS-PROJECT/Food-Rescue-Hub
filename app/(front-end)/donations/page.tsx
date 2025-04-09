import { cookies, headers } from "next/headers";
import { FC } from "react";
import {
  ApiResponse,
  SearchParamsType,
} from "./components/Donations/typeDonation";
import Donations from "./components/Donations";

interface DonationsPageProps {
  searchParams: Promise<SearchParamsType>;
}

async function fetchDonations(
  searchParams: SearchParamsType
): Promise<ApiResponse> {
  const headersList = headers();
  const host = (await headersList).get("host"); // e.g., 'localhost:3000'
  const protocol = (await headersList).get("x-forwarded-proto") || "http";
  const url = `${protocol}://${host}/api/donations?${new URLSearchParams(
    searchParams as Record<string, string>
  ).toString()}`;
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
    console.log(response.status);
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

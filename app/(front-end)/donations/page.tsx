import { cookies } from "next/headers";
import Donations from "./components/Donations";
import { FC } from "react";
import { ApiResponse, SearchParamsType } from "./typeDonation";

interface DonationsPageProps {
  searchParams: Promise<SearchParamsType>;
}

async function fetchDonations(
  searchParams: SearchParamsType
): Promise<ApiResponse> {
  const url = `http://localhost:3000/api/donations?${new URLSearchParams(
    searchParams as Record<string, string>
  ).toString()}`;
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("session")?.value;
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

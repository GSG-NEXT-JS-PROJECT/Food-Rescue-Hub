import React, { FC } from "react";
import { AnalyticsData, SearchParamsType } from "./analyticsType";
import { getServerOrigin } from "@/lib/getServerOrigin";
import { cookies } from "next/headers";
import Analytics from "./components/Analytics";

const fetchAnalyticsData = async (searchParams: SearchParamsType) : Promise<AnalyticsData | undefined> => {
  const serverOrigin = await getServerOrigin();
  const urlSearchParams = new URLSearchParams(
    searchParams as Record<string, string>
  );
  const url = `${serverOrigin}/api/analytics?${urlSearchParams.toString()}`;
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

    if (!response.ok) {
      throw new Error("Failed to fetch analytics data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    return undefined; 
  }
};

interface AnalyticsPageProps {
  searchParams: Promise<SearchParamsType>;
}

const AnalyticsPage: FC<AnalyticsPageProps> = async ({ searchParams }) => {
  const params = await searchParams;
  const data = await fetchAnalyticsData(params);
  return <Analytics data={data} initialFilters={params}/>
};

export default AnalyticsPage;

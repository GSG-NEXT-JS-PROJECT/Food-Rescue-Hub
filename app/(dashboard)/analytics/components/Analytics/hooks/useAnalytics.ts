"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import { AnalyticsData, SearchParamsType } from "../../../analyticsType";
import { usePathname, useRouter } from "next/navigation";
import { exportAnalyticsToPDF } from "../../../utils/pdfExport";
import { toast } from "sonner";

export const useAnalytics = (
  data: AnalyticsData | undefined,
  initialFilters: SearchParamsType
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeRange, setTimeRange] = useState(
    initialFilters?.timeRange || "7days"
  );
  const initialRender = useRef(true);
  const router = useRouter();
  const pathname = usePathname();
  const [analyticsData, setAnalyticsData] = useState(data);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setIsLoading(true);
      const url = `${pathname}?timeRange=${timeRange}`;
      startTransition(() => {
        router.push(url);
        fetch(url)
          .then((res) => res.json())
          .then((newData: AnalyticsData) => {
            setAnalyticsData(newData);
            setIsLoading(false);
          })
          .catch(() => setIsLoading(false))
          .finally(() => setIsLoading(false));
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [timeRange]);

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  const handleExportData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ timeRange }),
      });

      if (!response.ok) {
        throw new Error("Failed to export analytics data");
      }

      const { data } = await response.json();

      exportAnalyticsToPDF(data);

      toast.success("Analytics data exported to PDF");
    } catch (error) {
      console.error("Error exporting analytics data:", error);
      toast.error("Failed to export analytics data");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analyticsData,
    isLoading,
    timeRange,
    handleExportData,
    handleTimeRangeChange,
  };
};

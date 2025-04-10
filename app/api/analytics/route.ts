import { Role } from "@/@types";
import dbConnect from "@/DB/connection";
import analyticsService from "@/module/services/analytics.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();
    const userRole = request.headers.get("x-user-role");
    
    if (userRole !== Role.Admin) {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }
    const { searchParams } = new URL(request.url);
    
    const params = {
      timeRange: searchParams.get("timeRange") || "7days",
      date: searchParams.get("date") || undefined,
      searchTerm: searchParams.get("searchTerm") || undefined,
      chartType: searchParams.get("chartType") || "all" 
    };
    
    if (params.chartType !== "all") {
      let chartData;
      
      switch (params.chartType) {
        case "donationActivity":
          chartData = await analyticsService.getDonationActivity(params);
          break;
        case "foodTypeDistribution":
          chartData = await analyticsService.getFoodTypeDistribution(params);
          break;
        case "donationsByLocation":
          chartData = await analyticsService.getDonationsByLocation(params);
          break;
        case "topDonors":
          chartData = await analyticsService.getTopDonors(params);
          break;
        case "donationStatus":
          chartData = await analyticsService.getDonationStatus(params);
          break;
        case "timeToClaim":
          chartData = await analyticsService.getTimeToClaimData(params);
          break;
        case "userGrowth":
          chartData = await analyticsService.getUserGrowthData(params);
          break;
        case "userTypeDistribution":
          chartData = await analyticsService.getUserTypeDistribution(params);
          break;
        default:
          return NextResponse.json(
            { error: "Invalid chart type specified" },
            { status: 400 }
          );
      }
      
      return NextResponse.json({ data: chartData }, { status: 200 });
    }
    
    const dashboardData = await analyticsService.getDashboardData(params);
    
    return NextResponse.json(dashboardData, { status: 200 });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message.includes("Invalid") ? 400 : 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};


export const POST = async (request: NextRequest) => {
  try {
    await dbConnect();
    
    
    const userRole = request.headers.get("x-user-role");
    
    if (userRole !== Role.Admin) {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { timeRange, date } = body;
    
    if (!timeRange) {
      return NextResponse.json(
        { error: "Time range is required" },
        { status: 400 }
      );
    }
    
    const exportData = await analyticsService.exportAnalytics({
      timeRange,
      date
    });
  
    return NextResponse.json(
      { 
        message: "Export data retrieved successfully",
        data: exportData
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error exporting analytics:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message.includes("Invalid") ? 400 : 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
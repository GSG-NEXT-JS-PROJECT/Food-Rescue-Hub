import { Role } from "@/@types";
import dbConnect from "@/DB/connection";
import analyticsService from "@/module/services/analytics.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    
    const params = {
      timeRange: searchParams.get("timeRange") || "7days",
    };
    
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
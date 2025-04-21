import { FoodType } from "@/@types";

export type SearchParamsType = {
  timeRange?: string | undefined;
};

export interface DashboardHeaderProps {
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
  onExportData: () => void;
  isExporting?: boolean;
}

export interface DonationStats {
  totalDonations: number;
  claimedDonations: number;
  expiredDonations: number;
  totalWeight: number;
  wasteReduced: number;
}

export interface UserStats {
  totalUsers: number;
  donors: number;
  recipients: number;
  activeUsers: number;
}

export interface SummaryCardsProps {
  donationStats: {
    totalDonations: number;
    claimedDonations: number;
    totalWeight: number;
    wasteReduced: number;
  };
  userStats: {
    activeUsers: number;
    donors: number;
    recipients: number;
  };
  timeSeriesData: Array<{ date: string; donations: number }>;
}

export interface TimeSeriesData {
  date: string;
  donations: number;
  claims: number;
}

export interface DonationActivityChartProps {
  data: TimeSeriesData[];
}

export interface FoodTypeData {
  name: FoodType;
  value: number;
  color: string;
}

export interface FoodTypeDistributionChartProps {
  data: FoodTypeData[];
}

export interface DonationByLocationData {
  location: string;
  donations: number;
}

export interface DonationsByLocationChartProps {
  data: DonationByLocationData[];
}

export interface DonationStatusChartProps {
  available: number;
  claimed: number;
  expired: number;
}

export interface TopDonorsData {
  name: string;
  donations: number;
  totalWeight: number;
}

export interface TopDonorsChartProps {
  data: TopDonorsData[];
}

export interface UserTypeDistributionChartProps {
  donors: number;
  recipients: number;
  admins: number;
}

export interface AnalyticsExportData {
  donationStats: DonationStats;
  userStats: UserStats;
  foodTypeData: FoodTypeData[];
  topDonors: TopDonorsData[];
  timeRange: string;
}
export interface DonationAnalytics {
  totalDonations: number;
  claimedDonations: number;
  expiredDonations: number;
  totalWeight: number;
  wasteReduced: number;
}

export interface UserAnalytics {
  totalUsers: number;
  donors: number;
  recipients: number;
  admins: number;
  activeUsers: number;
}

export interface TimeSeriesData {
  date: string;
  donations: number;
  claims: number;
}

export interface FoodTypeData {
  name: FoodType;
  value: number;
  color: string;
}

export interface DonationByLocationData {
  location: string;
  donations: number;
}

export interface TopDonorsData {
  name: string;
  donations: number;
  totalWeight: number;
}

export interface TimeToClaimData {
  day: string;
  hours: number;
  dayNum: number;
}

export interface UserGrowthData {
  month: string;
  users: number;
}
export interface AnalyticsData {
  donationStats: DonationAnalytics;
  userStats: UserAnalytics;
  timeSeriesData: TimeSeriesData[];
  foodTypeData: FoodTypeData[];
  donationsByLocation: DonationByLocationData[];
  topDonors: TopDonorsData[];
  timeToClaimData: TimeToClaimData[];
  userGrowthData: UserGrowthData[];
}

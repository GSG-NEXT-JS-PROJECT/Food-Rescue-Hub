import { FoodType } from "@/@types";
import { DonationByLocationData, DonationStats, FoodTypeData, TimeSeriesData, TopDonorsData, UserStats } from "./analyticsType";


export const TIME_RANGES = {
  SEVEN_DAYS: '7days',
  THIRTY_DAYS: '30days',
  NINETY_DAYS: '90days',
  ONE_YEAR: '1year',
  CUSTOM: 'custom',
};


export const DONATION_STATS: DonationStats = {
  totalDonations: 342,
  claimedDonations: 287,
  expiredDonations: 55,
  totalWeight: 1240,
  wasteReduced: 975,
};


export const USER_STATS: UserStats = {
  totalUsers: 189,
  donors: 67,
  recipients: 120,
  activeUsers: 145,
};


export const TIME_SERIES_DATA: TimeSeriesData[] = [
  { date: '2025-03-31', donations: 12, claims: 10 },
  { date: '2025-04-01', donations: 15, claims: 13 },
  { date: '2025-04-02', donations: 18, claims: 14 },
  { date: '2025-04-03', donations: 14, claims: 12 },
  { date: '2025-04-04', donations: 21, claims: 18 },
  { date: '2025-04-05', donations: 25, claims: 22 },
  { date: '2025-04-06', donations: 20, claims: 17 },
];


export const FOOD_TYPE_DATA: FoodTypeData[] = [
  { name: FoodType.Fruits, value: 26, color: '#FF6384' },
  { name: FoodType.Vegetables, value: 32, color: '#36A2EB' },
  { name: FoodType.Grains, value: 18, color: '#FFCE56' },
  { name: FoodType.Meat, value: 12, color: '#4BC0C0' },
  { name: FoodType.Dairy, value: 8, color: '#9966FF' },
  { name: FoodType.Oils, value: 5, color: '#FF9F40' },
];


export const DONATIONS_BY_LOCATION: DonationByLocationData[] = [
  { location: 'Downtown', donations: 87 },
  { location: 'North End', donations: 65 },
  { location: 'West Side', donations: 58 },
  { location: 'East Village', donations: 43 },
  { location: 'South Point', donations: 39 },
  { location: 'Harbor District', donations: 50 },
];


export const TOP_DONORS: TopDonorsData[] = [
  { name: 'Metro Grocery', donations: 42, totalWeight: 210 },
  { name: 'Fresh Farms', donations: 38, totalWeight: 185 },
  { name: 'City Bakery', donations: 29, totalWeight: 90 },
  { name: 'Green Kitchen Restaurant', donations: 26, totalWeight: 130 },
  { name: 'Harvest Co-op', donations: 24, totalWeight: 120 },
];


export const TIME_TO_CLAIM_DATA = [
  { day: 'Monday', hours: 3.2 },
  { day: 'Tuesday', hours: 2.8 },
  { day: 'Wednesday', hours: 4.1 },
  { day: 'Thursday', hours: 2.5 },
  { day: 'Friday', hours: 1.9 },
  { day: 'Saturday', hours: 1.4 },
  { day: 'Sunday', hours: 2.2 },
];


export const USER_GROWTH_DATA = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 135 },
  { month: 'Mar', users: 162 },
  { month: 'Apr', users: 189 },
];


export const CHART_COLORS = {
  primary: '#8884d8',
  secondary: '#82ca9d',
  tertiary: '#ffc658',
  quaternary: '#ff8042',
  available: '#36A2EB',
  claimed: '#4BC0C0',
  expired: '#FF6384',
  donor: '#FF6384',
  recipient: '#36A2EB',
  admin: '#FFCE56',
};


export const generateTimeSeriesData = (days: number): TimeSeriesData[] => {
  const result: TimeSeriesData[] = [];
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);


    const donations = Math.floor(Math.random() * 30) + 10;
    const claims = Math.floor(donations * (0.7 + Math.random() * 0.2));

    result.push({
      date: date.toISOString().split('T')[0],
      donations,
      claims,
    });
  }

  return result;
};
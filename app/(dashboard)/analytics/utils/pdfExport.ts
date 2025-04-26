import { jsPDF } from 'jspdf';
import { autoTable, type UserOptions } from 'jspdf-autotable';
import { format } from 'date-fns';
import { FoodType } from '@/@types';

interface AutoTableOptions extends UserOptions {
  startY?: number;
  headStyles?: { fillColor: [number, number, number] };
  theme?: 'striped' | 'grid' | 'plain';
}

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: AutoTableOptions) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

interface DonationStats {
  totalDonations: number;
  claimedDonations: number;
  expiredDonations: number;
  totalWeight: number;
  wasteReduced: number;
}

interface UserStats {
  totalUsers: number;
  donors: number;
  recipients: number;
  activeUsers: number;
}

interface FoodTypeData {
  name: FoodType;
  value: number;
  color: string;
}

interface TopDonorData {
  name: string;
  donations: number;
  totalWeight: number;
}

interface AnalyticsExportData {
  donationStats: DonationStats;
  userStats: UserStats;
  foodTypeData: FoodTypeData[];
  topDonors: TopDonorData[];
  timeRange: string;
}

export const exportAnalyticsToPDF = (data: AnalyticsExportData): void => {
  const { donationStats, userStats, foodTypeData, topDonors, timeRange } = data;

  const doc = new jsPDF();

  
  doc.setFontSize(20);
  doc.text('Food Rescue Hub Analytics Report', 14, 22);
  doc.setFontSize(12);
  doc.text(`Generated on: ${format(new Date(), 'PPP')}`, 14, 30);
  doc.text(
    `Time Range: ${
      timeRange === '7days'
        ? 'Last 7 Days'
        : timeRange === '30days'
        ? 'Last 30 Days'
        : timeRange === '90days'
        ? 'Last 90 Days'
        : timeRange === '1year'
        ? 'Last Year'
        : 'Custom'
    }`,
    14,
    38
  );

  
  doc.setFontSize(16);
  doc.text('Summary Statistics', 14, 50);
  const summaryData = [
    ['Total Donations', donationStats.totalDonations.toString()],
    ['Claimed Donations', donationStats.claimedDonations.toString()],
    ['Expired Donations', donationStats.expiredDonations.toString()],
    ['Food Waste Reduced', `${donationStats.wasteReduced} kg`],
    [
      'Claim Rate',
      `${Math.round((donationStats.claimedDonations / donationStats.totalDonations) * 100)}%`,
    ],
    ['Total Users', userStats.totalUsers.toString()],
    ['Donors', userStats.donors.toString()],
    ['Recipients', userStats.recipients.toString()],
  ];

  autoTable(doc,{
    startY: 55,
    head: [['Metric', 'Value']],
    body: summaryData,
    theme: 'striped',
    headStyles: { fillColor: [66, 139, 202] },
  });

  const finalY = doc.lastAutoTable.finalY || 120;
  doc.setFontSize(16);
  doc.text('Food Type Distribution', 14, finalY + 10);

  const foodTypeTableData = foodTypeData.map((item) => [
    item.name,
    item.value.toString(),
    `${Math.round(
      (item.value / foodTypeData.reduce((acc, curr) => acc + curr.value, 0)) * 100
    )}%`,
  ]);

  autoTable(doc,{
    startY: finalY + 15,
    head: [['Food Type', 'Count', 'Percentage']],
    body: foodTypeTableData,
    theme: 'striped',
    headStyles: { fillColor: [66, 139, 202] },
  });

  
  const finalY2 = doc.lastAutoTable.finalY || 180;
  doc.setFontSize(16);
  doc.text('Top Donors', 14, finalY2 + 10);

  const topDonorsData = topDonors.map((donor) => [
    donor.name,
    donor.donations.toString(),
    `${donor.totalWeight} kg`,
  ]);

autoTable(doc,{
    startY: finalY2 + 15,
    head: [['Donor', 'Donations', 'Total Weight']],
    body: topDonorsData,
    theme: 'striped',
    headStyles: { fillColor: [66, 139, 202] },
  });

  doc.save('food-rescue-hub-analytics.pdf');
};

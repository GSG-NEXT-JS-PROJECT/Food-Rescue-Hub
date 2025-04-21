"use client";
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Role } from '@/@types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChartIcon, BarChartIcon, PieChartIcon } from 'lucide-react';
import { exportAnalyticsToPDF } from './utils/pdfExport';
import DashboardHeader from './components/DashboardHeader';
import SummaryCards from './components/SummaryCards';
import DonationActivityChart from './components/DonationActivityChart';
import FoodTypeDistributionChart from './components/FoodTypeDistributionChart';
import DonationsByLocationChart from './components/DonationsByLocationChart';
import TopDonorsChart from './components/TopDonorsChart';
import DonationStatusChart from './components/DonationStatusChart';
import TimeToClaimChart from './components/TimeToClaimChart';
import UserGrowthChart from './components/UserGrowthChart';
import UserTypeDistributionChart from './components/UserTypeDistributionChart';
// import { useToast } from '@/components/ui/use-toast';
import { AnalyticsData } from './analyticsType';
import { unauthorized } from 'next/navigation';


const AnalyticsPage = () => {
  // const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeRange, setTimeRange] = useState('7days');
  const [searchTerm, setSearchTerm] = useState('');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const userRole = localStorage.getItem('userRole') || '';
        if (userRole !== Role.Admin) {
          setIsAdmin(false);
          // unauthorized()

        }

        setIsAdmin(true);
        const response = await fetch(`/api/analytics?timeRange=${timeRange}&searchTerm=${searchTerm}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch analytics data');
        }
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
        // toast({
        //   title: "Error",
        //   description: "Failed to load analytics data. Please try again.",
        //   variant: "destructive"
        // });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [timeRange, searchTerm]);

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  const handleExportData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ timeRange }),
      });

      if (!response.ok) {
        throw new Error('Failed to export analytics data');
      }

      const { data } = await response.json();

      exportAnalyticsToPDF(data);

      // toast({
      //   title: "Success",
      //   description: "Analytics data exported to PDF",
      // });
    } catch (error) {
      console.error('Error exporting analytics data:', error);
      // toast({
      //   title: "Error",
      //   description: "Failed to export analytics data",
      //   variant: "destructive"
      // });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin || !analyticsData) {
    return null;
  }

  const { donationStats, userStats, timeSeriesData, foodTypeData, donationsByLocation, topDonors, timeToClaimData, userGrowthData } = analyticsData;

  return (
    <>
      <Head>
        <title>Analytics Dashboard | Food Rescue Hub</title>
        <meta name="description" content="Admin analytics dashboard for Food Rescue Hub" />
      </Head>

      <div className="container mx-auto p-4 md:p-6 space-y-6">
        <DashboardHeader
          timeRange={timeRange}
          date={date}
          searchTerm={searchTerm}
          onTimeRangeChange={handleTimeRangeChange}
          onDateChange={setDate}
          onSearchChange={setSearchTerm}
          onExportData={handleExportData}
        />
        <SummaryCards
          donationStats={donationStats}
          userStats={userStats}
          timeSeriesData={timeSeriesData}
        />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <LineChartIcon className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="donations" className="flex items-center gap-2">
              <BarChartIcon className="h-4 w-4" />
              Donations
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Donation Activity</CardTitle>
                  <CardDescription>Donations and claims over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <DonationActivityChart data={timeSeriesData} />
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Donation by Food Type</CardTitle>
                  <CardDescription>Distribution of donations by category</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <FoodTypeDistributionChart data={foodTypeData} />
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Donations by Location</CardTitle>
                  <CardDescription>Geographic distribution of food donations</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <DonationsByLocationChart data={donationsByLocation} />
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Top Donors</CardTitle>
                  <CardDescription>Most active food donors on the platform</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <TopDonorsChart data={topDonors} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="donations" className="space-y-4">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Donation Status Distribution</CardTitle>
                  <CardDescription>Breakdown of donation statuses</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <DonationStatusChart
                    available={donationStats.totalDonations - donationStats.claimedDonations - donationStats.expiredDonations}
                    claimed={donationStats.claimedDonations}
                    expired={donationStats.expiredDonations}
                  />
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Average Time to Claim</CardTitle>
                  <CardDescription>How quickly donations are being claimed</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <TimeToClaimChart data={timeToClaimData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>New user registration over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <UserGrowthChart data={userGrowthData} />
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>User Type Distribution</CardTitle>
                  <CardDescription>Breakdown of user roles</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <UserTypeDistributionChart
                    donors={userStats.donors}
                    recipients={userStats.recipients}
                    admins={userStats.admins}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AnalyticsPage;
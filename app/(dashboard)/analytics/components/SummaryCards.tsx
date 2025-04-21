import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SummaryCardsProps } from '../analyticsType';

const SummaryCards: React.FC<SummaryCardsProps> = ({ 
  donationStats, 
  userStats, 
  timeSeriesData 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{donationStats.totalDonations}</div>
          <p className="text-xs text-muted-foreground">
            +{timeSeriesData[timeSeriesData.length - 1].donations} today
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Claimed Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {Math.round((donationStats.claimedDonations / donationStats.totalDonations) * 100)}%
          </div>
          <p className="text-xs text-muted-foreground">
            {donationStats.claimedDonations} out of {donationStats.totalDonations}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Food Waste Reduced</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{donationStats.wasteReduced} kg</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((donationStats.wasteReduced / donationStats.totalWeight) * 100)}% efficiency
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userStats.activeUsers}</div>
          <p className="text-xs text-muted-foreground">
            {userStats.donors} donors, {userStats.recipients} recipients
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
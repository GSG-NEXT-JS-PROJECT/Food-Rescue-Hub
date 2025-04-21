import analyticsRepo from "../repositories/analytics.repo"

interface AnalyticsParams {
  timeRange: string;
  date?: string;
  searchTerm?: string;
}

class AnalyticsService {
  async getDashboardData(params: AnalyticsParams) {
    const { timeRange } = params;


    const validTimeRanges = ['7days', '30days', '90days', '1year'];
    if (!validTimeRanges.includes(timeRange)) {
      throw new Error('Invalid time range');
    }

    const [
      donationStats,
      userStats,
      timeSeriesData,
      foodTypeData,
      donationsByLocation,
      topDonors,
      timeToClaimData,
      userGrowthData
    ] = await Promise.all([
      analyticsRepo.getDonationStats(timeRange),
      analyticsRepo.getUserStats(timeRange),
      analyticsRepo.getTimeSeriesData(timeRange),
      analyticsRepo.getFoodTypeDistribution(timeRange),
      analyticsRepo.getDonationsByLocation(timeRange),
      analyticsRepo.getTopDonors(timeRange),
      analyticsRepo.getTimeToClaimData(timeRange),
      analyticsRepo.getUserGrowthData(timeRange)
    ]);

    return {
      donationStats,
      userStats,
      timeSeriesData,
      foodTypeData,
      donationsByLocation,
      topDonors,
      timeToClaimData,
      userGrowthData
    };
  }

  async exportAnalytics(params: AnalyticsParams) {
    const { timeRange } = params;
    const [
      donationStats,
      userStats,
      foodTypeData,
      topDonors
    ] = await Promise.all([
      analyticsRepo.getDonationStats(timeRange),
      analyticsRepo.getUserStats(timeRange),
      analyticsRepo.getFoodTypeDistribution(timeRange),
      analyticsRepo.getTopDonors(timeRange)
    ]);

    return {
      donationStats,
      userStats,
      foodTypeData,
      topDonors,
      timeRange,
      exportDate: new Date().toISOString()
    };
  }

  async getDonationActivity(params: AnalyticsParams) {
    const { timeRange } = params;
    return await analyticsRepo.getTimeSeriesData(timeRange);
  }

  async getFoodTypeDistribution(params: AnalyticsParams) {
    const { timeRange } = params;
    return await analyticsRepo.getFoodTypeDistribution(timeRange);
  }

  async getDonationsByLocation(params: AnalyticsParams) {
    const { timeRange } = params;
    return await analyticsRepo.getDonationsByLocation(timeRange);
  }

  async getTopDonors(params: AnalyticsParams) {
    const { timeRange } = params;
    return await analyticsRepo.getTopDonors(timeRange);
  }

  async getDonationStatus(params: AnalyticsParams) {
    const { timeRange } = params;
    const stats = await analyticsRepo.getDonationStats(timeRange);

    return {
      available: stats.totalDonations - stats.claimedDonations - stats.expiredDonations,
      claimed: stats.claimedDonations,
      expired: stats.expiredDonations
    };
  }

  async getTimeToClaimData(params: AnalyticsParams) {
    const { timeRange } = params;
    return await analyticsRepo.getTimeToClaimData(timeRange);
  }

  async getUserGrowthData(params: AnalyticsParams) {
    const { timeRange } = params;
    return await analyticsRepo.getUserGrowthData(timeRange);
  }

  async getUserTypeDistribution(params: AnalyticsParams) {
    const { timeRange } = params;
    const userStats = await analyticsRepo.getUserStats(timeRange);

    return {
      donors: userStats.donors,
      recipients: userStats.recipients,
      admins: userStats.admins
    };
  }
}

const analyticsService = new AnalyticsService();
export default analyticsService;
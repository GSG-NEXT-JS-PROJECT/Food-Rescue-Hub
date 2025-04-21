import dbConnect from "@/DB/connection";
import Donation from "@/DB/model/donation.model";
import User from "@/DB/model/user.model";
import { DonationStatus, FoodType, Role } from "@/@types";

interface TimeRangeParams {
  startDate: Date;
  endDate: Date;
}

class AnalyticsRepository {
  async getTimeRangeParams(timeRange: string): Promise<TimeRangeParams> {
    const endDate = new Date();
    const startDate = new Date();

    switch (timeRange) {
      case "7days":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "30days":
        startDate.setDate(endDate.getDate() - 30);
        break;
      case "90days":
        startDate.setDate(endDate.getDate() - 90);
        break;
      case "1year":
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(endDate.getDate() - 7);
    }

    return { startDate, endDate };
  }

  async getDonationStats(timeRange: string) {
    await dbConnect();

    const { startDate, endDate } = await this.getTimeRangeParams(timeRange);

    const filter = {
      createdAt: { $gte: startDate, $lte: endDate },
    };

    const totalDonations = await Donation.countDocuments(filter);

    const claimedDonations = await Donation.countDocuments({
      ...filter,
      status: DonationStatus.Claimed,
    });

    const expiredDonations = await Donation.countDocuments({
      ...filter,
      status: DonationStatus.Expired,
    });

    const aggregateResult = await Donation.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalWeight: { $sum: "$quantity" },
          wasteReduced: {
            $sum: {
              $cond: [
                { $eq: ["$status", DonationStatus.Claimed] },
                "$quantity",
                0,
              ],
            },
          },
        },
      },
    ]);

    const { totalWeight = 0, wasteReduced = 0 } = aggregateResult[0] || {};

    return {
      totalDonations,
      claimedDonations,
      expiredDonations,
      totalWeight,
      wasteReduced,
    };
  }

  async getUserStats(timeRange: string) {
    await dbConnect();

    const { startDate, endDate } = await this.getTimeRangeParams(timeRange);

    const filter = {
      createdAt: { $gte: startDate, $lte: endDate },
    };

    const totalUsers = await User.countDocuments(filter);

    const donors = await User.countDocuments({
      ...filter,
      role: Role.Donor,
    });

    const recipients = await User.countDocuments({
      ...filter,
      role: Role.Recipient,
    });

    const admins = await User.countDocuments({
      ...filter,
      role: Role.Admin,
    });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const activeUsers = await User.countDocuments({
      lastSignin: { $gte: thirtyDaysAgo },
    });

    return {
      totalUsers,
      donors,
      recipients,
      admins,
      activeUsers,
    };
  }

  async getTimeSeriesData(timeRange: string) {
    await dbConnect();

    const { startDate, endDate } = await this.getTimeRangeParams(timeRange);

    let groupBy;

    switch (timeRange) {
      case "7days":
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        break;
      case "30days":
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        break;
      case "90days":
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        break;
      case "1year":
        groupBy = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
        break;
      default:
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
    }

    const donationsByDate = await Donation.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: groupBy,
          donations: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          donations: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);

    const claimsByDate = await Donation.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: DonationStatus.Claimed,
        },
      },
      {
        $group: {
          _id: groupBy,
          claims: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          claims: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);

    const dateMap = new Map();

    donationsByDate.forEach((item) => {
      dateMap.set(item.date, {
        date: item.date,
        donations: item.donations,
        claims: 0,
      });
    });

    claimsByDate.forEach((item) => {
      if (dateMap.has(item.date)) {
        const existing = dateMap.get(item.date);
        existing.claims = item.claims;
      } else {
        dateMap.set(item.date, {
          date: item.date,
          donations: 0,
          claims: item.claims,
        });
      }
    });

    const result = Array.from(dateMap.values());
    return result.sort((a, b) => a.date.localeCompare(b.date));
  }

  async getFoodTypeDistribution(timeRange: string) {
    await dbConnect();

    const { startDate, endDate } = await this.getTimeRangeParams(timeRange);

    const result = await Donation.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: "$foodType",
          value: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          value: 1,
        },
      },
    ]);

    const colors: Record<FoodType, string> = {
      [FoodType.Fruits]: "#FF6384",
      [FoodType.Vegetables]: "#36A2EB",
      [FoodType.Grains]: "#FFCE56",
      [FoodType.Meat]: "#4BC0C0",
      [FoodType.Dairy]: "#9966FF",
      [FoodType.Oils]: "#FF9F40",
      [FoodType.Bakery]: "#FFD700",
      [FoodType.Poultry]: "#C71585",
      [FoodType.Fish]: "#4682B4",
      [FoodType.Seafood]: "#20B2AA",
      [FoodType.Legumes]: "#8FBC8F",
      [FoodType.Nuts]: "#D2691E",
      [FoodType.Seeds]: "#BDB76B",
      [FoodType.Eggs]: "#FFFACD",
      [FoodType.Beverages]: "#00CED1",
      [FoodType.Sweets]: "#FFB6C1",
      [FoodType.Snacks]: "#F08080",
      [FoodType.PreparedMeals]: "#BC8F8F",
      [FoodType.CannedGoods]: "#708090",
      [FoodType.FrozenFoods]: "#1E90FF",
      [FoodType.Spices]: "#DAA520",
      [FoodType.Condiments]: "#DEB887",
      [FoodType.Pasta]: "#F5DEB3",
      [FoodType.Rice]: "#FFF8DC",
      [FoodType.Bread]: "#F4A460",
      [FoodType.Cereals]: "#FFE4B5",
      [FoodType.Soups]: "#CD853F",
      [FoodType.Sauces]: "#DC143C",
      [FoodType.Desserts]: "#FF69B4",
    };

    return result.map((item) => ({
      ...item,
      color: colors[item.name as FoodType] || "#CCCCCC",
    }));
  }

  async getDonationsByLocation(timeRange: string) {
    await dbConnect();

    const { startDate, endDate } = await this.getTimeRangeParams(timeRange);

    return await Donation.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: "$location.address",
          donations: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          location: "$_id",
          donations: 1,
        },
      },
      { $sort: { donations: -1 } },
      { $limit: 6 },
    ]);
  }

  async getTopDonors(timeRange: string) {
    await dbConnect();

    const { startDate, endDate } = await this.getTimeRangeParams(timeRange);

    return await Donation.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: "$donorId",
          donations: { $sum: 1 },
          totalWeight: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "donorInfo",
        },
      },
      { $unwind: "$donorInfo" },
      {
        $project: {
          _id: 0,
          name: "$donorInfo.name",
          donations: 1,
          totalWeight: 1,
        },
      },
      { $sort: { donations: -1 } },
      { $limit: 5 },
    ]);
  }

  async getTimeToClaimData(timeRange: string) {
    await dbConnect();

    const { startDate, endDate } = await this.getTimeRangeParams(timeRange);

    const result = await Donation.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
          status: DonationStatus.Claimed, // Remove claimedAt check
        },
      },
      {
        $project: {
          dayOfWeek: { $dayOfWeek: "$createdAt" },
          claimTime: {
            // Use updatedAt instead of claimedAt
            $divide: [{ $subtract: ["$updatedAt", "$createdAt"] }, 3600000],
          },
        },
      },
      {
        $group: {
          _id: "$dayOfWeek",
          hours: { $avg: "$claimTime" },
        },
      },
      {
        $project: {
          _id: 0,
          dayNum: "$_id",
          hours: { $round: ["$hours", 1] },
          day: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "Sunday" },
                { case: { $eq: ["$_id", 2] }, then: "Monday" },
                { case: { $eq: ["$_id", 3] }, then: "Tuesday" },
                { case: { $eq: ["$_id", 4] }, then: "Wednesday" },
                { case: { $eq: ["$_id", 5] }, then: "Thursday" },
                { case: { $eq: ["$_id", 6] }, then: "Friday" },
                { case: { $eq: ["$_id", 7] }, then: "Saturday" },
              ],
              default: "Unknown",
            },
          },
        },
      },
      { $sort: { dayNum: 1 } },
    ]);

    return result;
  }

  async getUserGrowthData(timeRange: string) {
    await dbConnect();

    const { endDate } = await this.getTimeRangeParams(timeRange);

    let groupBy;

    switch (timeRange) {
      case "7days":
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        break;
      case "30days":
        groupBy = { $dateToString: { format: "%G-%V", date: "$createdAt" } };
        break;
      case "90days":
        groupBy = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
        break;
      case "1year":
        groupBy = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
        break;
      default:
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
    }

    const result = await User.aggregate([
      {
        $match: {
          createdAt: { $lte: endDate },
        },
      },
      {
        $group: {
          _id: groupBy,
          newUsers: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    let totalUsers = 0;
    return result.map((period) => {
      totalUsers += period.newUsers;
      return {
        month: period._id,
        users: totalUsers,
      };
    });
  }
}

const analyticsRepo = new AnalyticsRepository();
export default analyticsRepo;

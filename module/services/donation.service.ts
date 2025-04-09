/* eslint-disable @typescript-eslint/no-explicit-any */
import { DonationStatus, IDonation, Role } from "@/@types";
import { Types } from "mongoose";
import donationRepo from "../repositories/donation.repo";
import { DonationRequestBody } from "@/app/api/donations/route";
import { validationSchemaNewDonation } from "@/app/(front-end)/post-donation/components/NewDonationForm/ValidationSchemaNewDonation";
import * as yup from "yup";

interface FilterParams {
  scope?: string;
  page?: number;
  limit?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
  minAmount?: string;
  maxAmount?: string;
  foodType?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  keyword?: string;
}
class DonationService {
  async createDonation(donorId: string, data: DonationRequestBody) {
    try {
      await validationSchemaNewDonation.validate(data, { abortEarly: false });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        throw new Error(error.errors.join(", "));
      }
      throw error;
    }

    // Validate input
    const {
      title,
      description,
      quantity,
      foodType,
      pickupDeadline,
      location,
      imageUrl,
    } = data;

    // Prepare donation data
    const donationData: IDonation = {
      donorId: new Types.ObjectId(donorId),
      title,
      description,
      quantity,
      foodType,
      pickupDeadline,
      location,
      imageUrl,
      status: DonationStatus.Available,
    };

    // Delegate to repository
    const savedDonation = await donationRepo.createDonation(donationData);

    return {
      id: savedDonation._id,
      donorId: savedDonation.donorId,
      title: savedDonation.title,
      description: savedDonation.description,
      quantity: savedDonation.quantity,
      foodType: savedDonation.foodType,
      pickupDeadline: savedDonation.pickupDeadline,
      location: savedDonation.location,
      imageUrl: savedDonation.imageUrl,
      status: savedDonation.status,
    };
  }

  async getDonations(userId: string, userRole: string, params: FilterParams) {
    const {
      scope = "all",
      page = 1,
      limit = 10,
      status,
      startDate,
      endDate,
      minAmount,
      maxAmount,
      foodType,
      // lat,
      // lng,
      // radius,
      sortBy = "createdAt",
      sortOrder = "desc",
      keyword,
    } = params;

    // Build the filter object
    const filter: any = {};

    // Apply user-based filtering
    if (userRole === Role.Donor) {
      filter.donorId = new Types.ObjectId(userId);
    } else {
      filter.recipientId = new Types.ObjectId(userId);
    }

    // Add geospatial filter if lat/lon are provided
    // if (lat !== null && lng !== null) {
    //   filter.location = {
    //     $near: {
    //       $geometry: {
    //         type: "Point",
    //         coordinates: [lng, lat], // [longitude, latitude]
    //       },
    //       $maxDistance: radius * 1000, // Convert km to meters
    //     },
    //   };
    // }

    // Apply additional filters
    if (status) filter.status = status;
    if (foodType) filter.foodType = foodType;

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    if (minAmount || maxAmount) {
      filter.quantity = {}; // Assuming 'amount' is 'quantity'
      if (minAmount) filter.quantity.$gte = Number(minAmount);
      if (maxAmount) filter.quantity.$lte = Number(maxAmount);
    }

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { foodType: { $regex: keyword, $options: "i" } },
      ];
    }

    // Sort options
    const sort: { [key: string]: 1 | -1 } = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    // Handle scope
    switch (scope) {
      case "total": {
        const total = await donationRepo.countDonations(filter);
        return { total };
      }

      case "all":
      case "user": {
        const skip = (page - 1) * limit;
        const donations = await donationRepo.findDonations(
          filter,
          skip,
          limit,
          sort
        );
        const total = await donationRepo.countDonations(filter);

        return {
          donations,
          total,
          page,
          totalPages: Math.ceil(total / limit),
        };
      }

      default:
        throw new Error("Invalid scope");
    }
  }

  async updateDonation(donationId: string, recipientId: string) {
    if (!donationId) {
      throw new Error("Donation ID is required");
    }
    if (!Types.ObjectId.isValid(donationId)) {
      throw new Error("Invalid donation ID");
    }
    if (!recipientId) {
      throw new Error("Recipient ID is required");
    }
    if (!Types.ObjectId.isValid(recipientId)) {
      throw new Error("Invalid recipient ID");
    }

    // Update donation with recipientId
    const updatedDonation = await donationRepo.updateDonationById(
      donationId,
      { recipientId: new Types.ObjectId(recipientId) }
    );

    if (!updatedDonation) {
      throw new Error("Donation not found");
    }

    return {
      id: updatedDonation._id,
      donorId: updatedDonation.donorId,
      recipientId: updatedDonation.recipientId,
      title: updatedDonation.title,
      description: updatedDonation.description,
      quantity: updatedDonation.quantity,
      foodType: updatedDonation.foodType,
      pickupDeadline: updatedDonation.pickupDeadline,
      location: updatedDonation.location,
      status: updatedDonation.status,
    };
  }
}

const donationService = new DonationService();
export default donationService;

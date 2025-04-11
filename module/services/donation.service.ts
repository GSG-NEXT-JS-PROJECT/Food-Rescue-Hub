/* eslint-disable @typescript-eslint/no-explicit-any */
import { DonationStatus, IDonation } from "@/@types";
import { Types } from "mongoose";
import donationRepo from "../repositories/donation.repo";
import { DonationRequestBody } from "@/app/api/donations/route";
import { validationSchemaNewDonation } from "@/app/(front-end)/post-donation/components/NewDonationForm/ValidationSchemaNewDonation";
import * as yup from "yup";
import notificationService from "./notification.service";

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

  async getDonations(userRole: string, params: FilterParams) {
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

      case "all": {
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

  async claimDonation(donationId: string, recipientId: string) {
    // Validate inputs
    if (!donationId) throw new Error("Donation ID is required");
    if (!Types.ObjectId.isValid(donationId))
      throw new Error("Invalid donation ID");
    if (!recipientId) throw new Error("Recipient ID is required");
    if (!Types.ObjectId.isValid(recipientId))
      throw new Error("Invalid recipient ID");

    // Update donation
    const updatedDonation = await donationRepo.findByIdAndUpdate(donationId, {
      status: DonationStatus.Claimed,
      recipientId: new Types.ObjectId(recipientId),
    });

    if (!updatedDonation) {
      throw new Error("Donation not found");
    }

    // Notify donor
    const donorId = updatedDonation.donorId._id.toString();
    const message = `Your donation "${updatedDonation.title}" was claimed by ${recipientId}!`;
    await notificationService.notifyUser(
      donorId,
      message,
      updatedDonation.donorId.deviceToken
    );

    return {
      id: updatedDonation._id,
      donorId: updatedDonation.donorId._id,
      recipientId: updatedDonation.recipientId,
      title: updatedDonation.title,
      status: updatedDonation.status,
    };
  }
}

const donationService = new DonationService();
export default donationService;

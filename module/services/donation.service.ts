import { DonationStatus, IDonation, Role } from "@/@types";
import { Types } from "mongoose";
import donationRepo from "../repositories/donation.repo";
import * as yup from "yup";
import notificationService from "./notification.service";
import userRepo from "../repositories/user.repo";
import Donation, { DonationDocument } from "@/DB/model/donation.model";
import { convertLocalToISO } from "@/lib/dateUtils";
import { validationSchemaPostDonation } from "@/app/(site)/post-donation/components/PostDonationForm/ValidationSchemaNewDonation";
import {
  DonationDeleteRequestBody,
  DonationPostRequestBody,
  DonationUpdateRequestBody,
  FilterOptions,
  SortOptions,
} from "@/app/api/donations/type";
import { validationSchemaUpdateDonation } from "@/app/(site)/profile/components/EditDonationModal/ValidationSchemaUpdateDonation";

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
  private SOCKET_IO_URL: string;

  constructor() {
    const SOCKET_IO_URL = process.env.NEXT_PUBLIC_SOCKET_IO_URL;

    if (!SOCKET_IO_URL) {
      throw new Error("SOCKET_IO_URL is not defined in environment variables");
    }

    this.SOCKET_IO_URL = SOCKET_IO_URL;
  }

  async createDonation(donorId: string, data: DonationPostRequestBody) {
    try {
      await validationSchemaPostDonation.validate(data, { abortEarly: false });
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
      pickupDeadline: convertLocalToISO(pickupDeadline),
      location,
      imageUrl,
      status: DonationStatus.Available,
    };

    // Delegate to repository
    const savedDonation = await donationRepo.createDonation(donationData);

    // Emit donation update
    await this.emitDonationUpdate(savedDonation);

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

    const now = new Date();
    // Mark expired donations
    await Donation.updateMany(
      {
        status: DonationStatus.Available,
        pickupDeadline: { $lte: now.toISOString() },
      },
      { status: DonationStatus.Expired, updatedAt: new Date() }
    );

    // Build the filter object
    const filter: FilterOptions = {};

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
    const sort: SortOptions = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    // Handle scope
    switch (scope) {
      case "total": {
        const total = await donationRepo.countDonations(filter);
        return { total };
      }

      case "user": {
        // Apply user-based filtering
        if (userRole === Role.Donor) {
          filter.donorId = new Types.ObjectId(userId);
        } else {
          filter.recipientId = new Types.ObjectId(userId);
        }
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

    const donation = await donationRepo.findById(donationId);

    if (!donation) {
      throw new Error("Donation not found");
    }

    if (donation.status !== DonationStatus.Available || donation.recipientId) {
      throw new Error("Donation is claimed or expired");
    }

    // Update donation
    const updatedDonation = await donationRepo.findByIdAndUpdate(donationId, {
      status: DonationStatus.Claimed,
      recipientId: new Types.ObjectId(recipientId),
    });

    // Notify donor
    const { name: recipientName } = await userRepo.findUserById(recipientId);
    const donorId = updatedDonation.donorId._id.toString();
    const message = `Your donation "${updatedDonation.title}" was claimed by ${recipientName}!`;
    const donor = await userRepo.findUserById(donorId);
    await notificationService.notifyUser(donorId, message, donor.deviceToken);

    // Emit donation update
    await this.emitDonationUpdate(updatedDonation);

    return {
      id: updatedDonation._id,
      donorId: updatedDonation.donorId._id,
      recipientId: updatedDonation.recipientId,
      title: updatedDonation.title,
      status: updatedDonation.status,
    };
  }

  async emitDonationUpdate(donation: DonationDocument) {
    try {
      const socketRes = await fetch(
        `${this.SOCKET_IO_URL}/emit-donation-update`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ donation }),
        }
      );
      if (!socketRes.ok) {
        console.error(
          "Socket.IO donation update failed:",
          await socketRes.json()
        );
      }
    } catch (error) {
      console.error("Error emitting donation update:", error);
    }
  }

  async expireDonations() {
    const now = new Date();
    const expiredDonations = await donationRepo.findExpiredDonations(now);
    let updatedCount = 0;

    for (const donation of expiredDonations) {
      const updatedDonation = await donationRepo.findByIdAndUpdate(
        donation._id.toString(),
        {
          status: DonationStatus.Expired,
        }
      );

      if (updatedDonation) {
        updatedCount++;
        // Notify donor
        const donorId = updatedDonation.donorId._id.toString();
        const message = `Your donation "${updatedDonation.title}" has expired.`;
        const donor = await userRepo.findUserById(donorId); // Fetch full user details
        await notificationService.notifyUser(
          donorId,
          message,
          donor.deviceToken
        );
        // Emit donation update
        await this.emitDonationUpdate(updatedDonation);
      }
    }

    return updatedCount;
  }

  async updateDonation(
    donationId: string,
    data: DonationUpdateRequestBody,
    role: Role
  ) {
    const updateData: Partial<DonationUpdateRequestBody> = {};
    if (role === Role.Recipient) {
      if (
        data.status &&
        (data.status === DonationStatus.Claimed ||
          data.status === DonationStatus.Completed)
      )
        updateData.status = data.status;
    } else {
      if (role === Role.Donor) {
        const donation = await donationRepo.findDonationByIdAndDonor(
          new Types.ObjectId(donationId),
          new Types.ObjectId(data.donorId)
        );
        if (!donation) {
          throw new Error("No donation found for the provided ID and donor.");
        }
      }

      // Validate request body
      try {
        await validationSchemaUpdateDonation.validate(data, {
          abortEarly: false,
        });
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          throw new Error(error.errors.join(", "));
        }
        throw error;
      }

      // Prepare update data
      if (data.title) updateData.title = data.title;
      if (data.description) updateData.description = data.description;
      if (data.quantity) updateData.quantity = data.quantity;
      if (data.foodType) updateData.foodType = data.foodType;
      if (data.pickupDeadline) updateData.pickupDeadline = data.pickupDeadline;
      if (data.location) updateData.location = data.location;
      if (data.status) updateData.status = data.status;
      if (data.imageUrl) updateData.imageUrl = data.imageUrl;
      if (data.pickupInstruction)
        updateData.pickupInstruction = data.pickupInstruction;
    }
    // Delegate to repository
    const updatedDonation = await donationRepo.findByIdAndUpdate(
      donationId,
      updateData
    );

    if (!updatedDonation) {
      throw new Error("Donation not found");
    }

    // Emit donation update
    await this.emitDonationUpdate(updatedDonation);
    return updatedDonation;
  }

  async deleteDonation(
    donationId: string,
    data: DonationDeleteRequestBody,
    role: Role
  ) {
    if (role !== Role.Admin) {
      const donation = await donationRepo.findDonationByIdAndDonor(
        new Types.ObjectId(donationId),
        new Types.ObjectId(data.donorId)
      );
      if (!donation) {
        throw new Error("No donation found for the provided ID and donor.");
      }
    }

    const deletedDonation = await donationRepo.findByIdAndDelete(donationId);

    if (!deletedDonation) {
      throw new Error("Donation not found");
    }

    // Emit donation update
    await this.emitDonationDelete(deletedDonation._id);
    return deletedDonation;
  }

  async emitDonationDelete(donationId: string) {
    try {
      const socketRes = await fetch(
        `${this.SOCKET_IO_URL}/emit-donation-deleted`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ donationId }),
        }
      );
      if (!socketRes.ok) {
        console.error(
          "Socket.IO donation update failed:",
          await socketRes.json()
        );
      }
    } catch (error) {
      console.error("Error emitting donation update:", error);
    }
  }
}

const donationService = new DonationService();
export default donationService;

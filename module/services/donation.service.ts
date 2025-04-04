import { DonationStatus, IDonation } from "@/@types";
import { Types } from "mongoose";
import donationRepo from "../repositories/donation.repo";
import { DonationRequestBody } from "@/app/api/(dashboard)/donations/route";
import { validationSchemaNewDonation } from "@/app/(front-end)/donations/new/components/NewDonationForm/ValidationSchemaNewDonation";
import * as yup from 'yup';

class DonationService {
  async createDonation(donorId: string, data: DonationRequestBody) {
     try {
      await validationSchemaNewDonation.validate(data, { abortEarly: false });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        throw new Error(error.errors.join(', ')); 
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
    // if (!title || !quantity || !foodType || !pickupDeadline || !location) {
    //   throw new Error("Missing required fields");
    // }

    // // Convert pickupDeadline to Date
    // const pickupDeadlineDate = new Date(pickupDeadline);
    // if (isNaN(pickupDeadlineDate.getTime())) {
    //   throw new Error("Invalid pickup deadline");
    // }

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
}

const donationService = new DonationService();
export default donationService;

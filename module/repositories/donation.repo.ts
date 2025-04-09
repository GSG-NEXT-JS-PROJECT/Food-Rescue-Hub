import { IDonation } from "@/@types";
import dbConnect from "@/DB/connection";
import Donation, { DonationDocument } from "@/DB/model/donation.model";
import { Types } from "mongoose";
interface FilterOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface SortOptions {
  [key: string]: 1 | -1;
}

class DonationRepository {
  async createDonation(donationData: IDonation): Promise<DonationDocument> {
    dbConnect();
    const newDonation = new Donation({
      ...donationData,
    });

    const savedDonation = await newDonation.save();
    return savedDonation;
  }

  async countDonations(filter: FilterOptions) {
    return await Donation.countDocuments(filter);
  }

  async findDonations(
    filter: FilterOptions,
    skip: number,
    limit: number,
    sort: SortOptions
  ) {
    return await Donation.find(filter).skip(skip).limit(limit).sort(sort);
  }

  async updateDonationById(
    donationId: string,
    updateData: Partial<IDonation>
  ) {
    return await Donation.findOneAndUpdate(
      { _id: new Types.ObjectId(donationId) },
      updateData,
      { new: true } // Return the updated document
    );
  }
}

const donationRepo = new DonationRepository();
export default donationRepo;

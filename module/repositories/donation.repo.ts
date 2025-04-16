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
    await dbConnect();
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
    const donations = await Donation.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort)
      .populate({
        path: "donorId",
        select: "-password", // exclude password
      });
    return donations;
  }

  async findByIdAndUpdate(
    donationId: string,
    updateData: Partial<DonationDocument>
  ) {
    return await Donation.findByIdAndUpdate(
      new Types.ObjectId(donationId),
      updateData,
      { new: true }
    ).populate("donorId", "name deviceToken");
  }

  async findById(id: string): Promise<DonationDocument> {
    await dbConnect();
    const donation = await Donation.findById(id);
    return donation;
  }
}

const donationRepo = new DonationRepository();
export default donationRepo;

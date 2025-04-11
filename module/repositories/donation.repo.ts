import { DonationStatus, IDonation } from "@/@types";
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
    return await Donation.find(filter).skip(skip).limit(limit).sort(sort);
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

  // async updateDonationById(donationId: string, updateData: Partial<IDonation>) {
  //   return await Donation.findOneAndUpdate(
  //     { _id: new Types.ObjectId(donationId) },
  //     updateData,
  //     { new: true } // Return the updated document
  //   );
  // }

  // async findById(id: string) {
  //   await dbConnect();
  //   return Donation.findById(id).populate("donorId", "deviceToken").exec();
  // }

  // async claimDonation(
  //   id: string,
  //   recipientId: string
  // ): Promise<DonationDocument | null> {
  //   await dbConnect();
  //   return Donation.findByIdAndUpdate(
  //     id,
  //     { recipientId, status: DonationStatus.Claimed, updatedAt: new Date() },
  //     { new: true }
  //   )
  //     .populate("donorId", "deviceToken")
  //     .exec();
  // }
}

const donationRepo = new DonationRepository();
export default donationRepo;

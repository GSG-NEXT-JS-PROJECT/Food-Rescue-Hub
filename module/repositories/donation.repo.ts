import { DonationStatus, IDonation } from "@/@types";
import { FilterOptions, SortOptions } from "@/app/api/donations/type";
import dbConnect from "@/DB/connection";
import Donation, { DonationDocument } from "@/DB/model/donation.model";
import { Types } from "mongoose";

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
    sort: SortOptions,
    populateFields: string[] = ["donorId"]
  ) {
    const query = Donation.find(filter).skip(skip).limit(limit).sort(sort);

    if (populateFields.length > 0) {
      query.populate(
        populateFields.map((field) => ({
          path: field,
          select: "-password", // Exclude password
        }))
      );
    }

    return await query.exec();
  }

  async findByIdAndUpdate(
    donationId: string,
    updateData: Partial<DonationDocument>
  ): Promise<DonationDocument> {
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

  async findExpiredDonations(currentTime: Date) {
    return await Donation.find({
      status: DonationStatus.Available,
      pickupDeadline: { $lte: currentTime.toISOString() },
    }).populate("donorId", "name deviceToken");
  }

  async findDonationByIdAndDonor(
    donationId: Types.ObjectId,
    donorId: Types.ObjectId
  ) {
    await dbConnect();
    const donation = await Donation.findOne({
      _id: donationId,
      donorId: donorId,
    });
    return donation;
  }

  async findByIdAndDelete(donationId: string) {
    const donation = await Donation.findByIdAndDelete(donationId);
    return donation;
  }
}

const donationRepo = new DonationRepository();
export default donationRepo;

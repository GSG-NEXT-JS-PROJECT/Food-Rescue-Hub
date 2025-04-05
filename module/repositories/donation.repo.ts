import { IDonation } from "@/@types";
import dbConnect from "@/DB/connection";
import Donation, { DonationDocument } from "@/DB/model/donation.model";
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

  async findDonations(filter: FilterOptions, skip: number, limit: number, sort: SortOptions) {
    return await Donation.find(filter)
      .skip(skip)
      .limit(limit)
      .sort(sort);
  }
}

const donationRepo = new DonationRepository();
export default donationRepo;

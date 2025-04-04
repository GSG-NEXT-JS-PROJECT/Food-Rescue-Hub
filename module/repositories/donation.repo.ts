import { IDonation } from "@/@types";
import dbConnect from "@/DB/connection";
import Donation, { DonationDocument } from "@/DB/model/donation.model";

class DonationRepository {
  async createDonation(donationData: IDonation): Promise<DonationDocument> {
    dbConnect();
    const newDonation = new Donation({
      ...donationData,
    });

    const savedDonation = await newDonation.save();
    return savedDonation;
  }
}

const donationRepo = new DonationRepository();
export default donationRepo;

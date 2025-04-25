import userModel, { UserDocument } from "@/DB/model/user.model";
import dbConnect from "@/DB/connection";
import { Types } from "mongoose";
import donationRepo from "./donation.repo";
import { DonationWithDonor, DonationWithRecipient, Role } from "@/@types";
import { SortOptions } from "@/app/api/donations/type";

export class UserRepository {
  async findUserByEmail(email: string): Promise<UserDocument | null> {
    await dbConnect();
    return await userModel.findOne({ email });
  }

  async findUserById(userId: string): Promise<UserDocument> {
    await dbConnect();
    const user = await userModel.findById(userId);
    return user;
  }

  async findUserByVerificationToken(
    userId: string,
    verifyToken: string
  ): Promise<UserDocument | null> {
    return await userModel.findOne({
      _id: userId,
      verifyToken,
      verifyTokenExpire: { $gt: new Date() },
    });
  }

  async findByIdAndUpdate(userId: string, updateData: Partial<UserDocument>) {
    return await userModel.findByIdAndUpdate(
      new Types.ObjectId(userId),
      updateData,
      { new: true }
    );
  }

  async findUserDonations(
    userId: string,
    role: Role
  ): Promise<DonationWithDonor[] | DonationWithRecipient[]> {
    const filter = {
      $or: [
        { donorId: new Types.ObjectId(userId) },
        { recipientId: new Types.ObjectId(userId) },
      ],
    };
    if (role === Role.Donor) {
      return await donationRepo.findDonations(
        filter,
        0,
        0,
        {
          createdAt: -1,
        },
        ["recipientId"]
      );
    }
    return await donationRepo.findDonations(
      filter,
      0,
      0,
      {
        updatedAt: -1,
      },
      ["donorId"]
    );
  }
}
export default new UserRepository();

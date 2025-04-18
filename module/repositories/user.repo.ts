import userModel, { UserDocument } from "@/DB/model/user.model";
import dbConnect from "@/DB/connection";
import { Types } from "mongoose";

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
}
export default new UserRepository();

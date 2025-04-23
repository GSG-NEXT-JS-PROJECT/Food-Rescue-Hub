import { Role, UserProfile } from "@/@types";
import userRepo from "../repositories/user.repo";
import { Types } from "mongoose";
import { UserRequestBody } from "@/app/api/user/profile/route";
import { convertISOToLocal } from "@/lib/dateUtils";

class UserService {
  async getUserData(userId: string): Promise<Omit<UserProfile, "donations">> {
    if (!userId) {
      throw new Error("ID are not found");
    }

    if (!Types.ObjectId.isValid(userId)) {
      throw new Error("invalid userId");
    }

    const user = await userRepo.findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      id: user._id as string,
      name: user.name,
      email: user.email,
      location: user.location,
      role: user.role,
      createdAt: convertISOToLocal(user.createdAt.toISOString()),
      lastSignin: user.lastSignin
    };
  }

  async getUserDonations(userId: string, role: Role) {
    if (!userId) {
      throw new Error("ID are not found");
    }

    if (!Types.ObjectId.isValid(userId)) {
      throw new Error("invalid userId");
    }

    const donations = await userRepo.findUserDonations(userId, role);
    return donations;
  }

  async updateUser(userId: string, data: UserRequestBody) {
    // Prepare update data
    const updateData: Partial<UserRequestBody> = {};

    if (data.email) updateData.email = data.email;
    if (data.name) updateData.name = data.name;
    if (data.location) updateData.location = data.location;
    if (data.role) updateData.role = data.role;

    // Delegate to repository
    const updatedUser = await userRepo.findByIdAndUpdate(userId, updateData);

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return {
      id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      location: updatedUser.location,
      role: updatedUser.role,
      isVerified: updatedUser.isVerified,
    };
  }
}

const userService = new UserService();
export default userService;

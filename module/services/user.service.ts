import { UserProfile } from "@/@types";
import userRepo from "../repositories/user.repo";
import { Types } from "mongoose";

class UserService {
  async getUserData(
    userId: string
  ): Promise<UserProfile> {
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
      id: user._id,
      name: user.name,
      email: user.email,
      location: user.location,
      role: user.role,
    };
  }
}

const userService = new UserService();
export default userService;

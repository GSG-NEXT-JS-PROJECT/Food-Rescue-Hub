import { IUser } from "@/@types";
import userRepo from "../repositories/user.repo";

class UserService {
  async getUserData(userId: string): Promise<Omit<IUser, 'isVerified' | 'password'>> {
    if (!userId || typeof userId !== 'string') {
      throw new Error('Invalid user ID');
    }

    const user = await userRepo.findUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    return {
      name: user.name,
      email: user.email,
      location: user.location,
      role: user.role
    };
  }
}

const userService = new UserService();
export default userService;

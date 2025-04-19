import User, { UserDocument } from "@/DB/model/user.model";
import { IUser } from "@/@types/index";

export class AuthRepository {
    async createUser(data: IUser, hashedPassword: string): Promise<UserDocument> {
        const user = await User.create({
            ...data,
            password: hashedPassword,
        });
        return user;
    }

    async verifyUser(user: any) {
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpire = undefined;
        return await user.save();
    }

    async resetPassword(user: any, password: string) {
        user.password = password;
        return await user.save();
    }
}
export default new AuthRepository();

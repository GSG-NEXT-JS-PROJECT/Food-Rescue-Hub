import userModel, { UserDocument } from "@/DB/model/user.model";
import { IUser } from "@/@types/index";
import dbConnect from "@/DB/connection";

export class UserRepository {
    async findUserByEmail(email: string): Promise<UserDocument | null> {
        await dbConnect();
        return await userModel.findOne({ email });
    }

    async createUser(data: IUser, hashedPassword: string): Promise<UserDocument> {
        const user = await userModel.create({
            ...data,
            password: hashedPassword,
        });
        return user;
    }

    async findUserByVerificationToken(userId: string, verifyToken: string): Promise<UserDocument | null> {
        return await userModel.findOne({
            _id: userId,
            verifyToken,
            verifyTokenExpire: { $gt: new Date() },
        });
    }
    
    async verifyUser(user: any) {
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpire = undefined;
        return await user.save();
    }
}
export default new UserRepository();
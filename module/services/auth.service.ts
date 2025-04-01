import crypto from "crypto";
import { IUser } from "@/@types/index";
import { sendEmail } from "@/lib/sendEmail";
import { comparePassword, hashPassword } from "@/lib/hashAndCompare";
import UserRepository from "../repositories/auth.repo";
import { verificationEmailTemplate } from "@/lib/verificationEmailTemplate";
import jwt from "jsonwebtoken";

class AuthService {
    async signUp(data: IUser) {
        const existingUser = await UserRepository.findUserByEmail(data.email);
        if (existingUser) {
            throw new Error("Email is already in use");
        }
        const hashedPassword: string = await hashPassword(data.password);
        const newUser = await UserRepository.createUser(data, hashedPassword);
        const verificationToken = newUser.getVerificationToken();
        await newUser.save();
        const verificationLink = `${process.env.NEXT_PUBLIC_URL}/verify-email?verifyToken=${verificationToken}&id=${newUser?._id}`;
        const message = verificationEmailTemplate(verificationLink);

        await sendEmail(newUser?.email, "Email Verification", message);
        return { user: newUser };
    }
    async signIn({ email, password }: { email: string; password: string }) {

        const user = await UserRepository.findUserByEmail(email);

        if (!user) {
            throw new Error("Invalid email or password");
        }


        if (!user.isVerified) {
            throw new Error("Please verify your email before signing in");
        }


        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }


        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET || "your_jwt_secret",
            { expiresIn: "1d" }
        );


        const userWithoutSensitiveInfo = {
            _id: user._id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerified

        };

        return { user: userWithoutSensitiveInfo, token };
    }

    async verifyEmail(userId: string, verificationToken: string) {
        const verifyToken = crypto
            .createHash("sha256")
            .update(verificationToken)
            .digest("hex");
        const user = await UserRepository.findUserByVerificationToken(userId, verifyToken);
        if (!user) {
            throw new Error("user not found, token not found, or token expired")
        }
        await UserRepository.verifyUser(user);
        return { message: "success" };
    }

}

export default new AuthService();
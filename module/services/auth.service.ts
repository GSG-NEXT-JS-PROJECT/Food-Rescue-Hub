import crypto from "crypto";
import { IUser } from "@/@types/index";
import { sendEmail } from "@/lib/sendEmail";
import { comparePassword, hashPassword } from "@/lib/hashAndCompare";
import UserRepository from "../repositories/user.repo";
import { EmailTemplate } from "@/lib/EmailTemplate";
import authRepository from "../repositories/auth.repo";
import { getServerOrigin } from "@/lib/getServerOrigin";
import { validationSchemaSignin } from "@/app/(auth)/sign-in/components/SigninForm/ValidationSchemaSignin";
import * as yup from "yup";
import { validationSchemaSignup } from "@/app/(auth)/sign-up/components/SignupForm/ValidationSchemaSignup";

class AuthService {
  async signUp(data: IUser) {
    try {
      await validationSchemaSignup.validate(
        data,
        { abortEarly: false }
      );
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        throw new Error(error.errors.join(", "));
      }
      throw error;
    }

    const existingUser = await UserRepository.findUserByEmail(data.email);
    if (existingUser) {
      throw new Error("Email is already in use");
    }
    const hashedPassword: string = await hashPassword(data.password);
    const newUser = await authRepository.createUser(data, hashedPassword);
    const verificationToken = newUser.getVerificationToken();
    await newUser.save();
    const serverOrigin = await getServerOrigin();
    const verificationLink = `${serverOrigin}/verify-email?verifyToken=${verificationToken}&id=${newUser?._id}`;
    const message = EmailTemplate({
      link: verificationLink,
      title: "Verify Your Email Address",
      description:
        "Thank you for signing up! To complete your registration, please click the button below to verify your email address.",
      secondary: "This link will expire in 30 minutes.",
      button: "Verify Email",
    });

    await sendEmail(newUser?.email, "Email Verification", message);
    return { user: newUser };
  }

  async signIn({ email, password }: { email: string; password: string }) {
    try {
      await validationSchemaSignin.validate(
        { email, password },
        { abortEarly: false }
      );
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        throw new Error(error.errors.join(", "));
      }
      throw error;
    }

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

    const user2 = await UserRepository.findByIdAndUpdate(user.id, {lastSignin: new Date()});
    console.log(user2)
    return user;
  }

  async verifyEmail(userId: string, verificationToken: string) {
    const verifyToken = crypto
      .createHash("sha256")
      .update(verificationToken)
      .digest("hex");
    const user = await UserRepository.findUserByVerificationToken(
      userId,
      verifyToken
    );
    if (!user) {
      throw new Error("user not found, token not found, or token expired");
    }
    await authRepository.verifyUser(user);
    return { message: "success" };
  }

  async ForgetPassword(email: string) {
    const user = await UserRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const resetToken = user.getVerificationToken();
    await user.save();
    const serverOrigin = await getServerOrigin();
    const ResetLink = `${serverOrigin}/reset-password?resetToken=${resetToken}&id=${user?._id}`;
    const message = EmailTemplate({
      link: ResetLink,
      title: "",
      description: "",
      secondary: "",
      button: "Reset Password",
    });
    await sendEmail(user?.email, "Reset Password", message);
  }

  async ResetPassword(password: string, resetToken: string, userId: string) {
    const verifyToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await UserRepository.findUserByVerificationToken(
      userId,
      verifyToken
    );
    if (!user) {
      throw new Error("user not found, token not found, or token expired");
    }
    const hashedPassword: string = await hashPassword(password);
    try {
      await authRepository.resetPassword(user, hashedPassword);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new AuthService();

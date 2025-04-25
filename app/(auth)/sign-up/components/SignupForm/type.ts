import { IUser } from "@/@types/index";

export interface FormValues extends Omit<IUser, "lastSignin"> {
  confirmPassword: string;
}
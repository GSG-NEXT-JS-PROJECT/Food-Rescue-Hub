import { IUser } from "@/@types/index";

export interface FormValues extends IUser{
    confirmPassword: string
}
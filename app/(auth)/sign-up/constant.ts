import { Role } from "@/@types/index";
import { FormValues } from "./type";

export const INITIAL_VALUES: FormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: {lng: 0, lat: 0},
    role: Role.Recipient,
};

export const roleOptions: Exclude<Role, "Admin"> []= [Role.Donor, Role.Recipient];
import { Roles } from "@/@types/index";
import { FormValues } from "./type";

export const INITIAL_VALUES: FormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: {lng: 0, lat: 0},
    role: 'Recipient',
};

export const roleOptions: Exclude<Roles, "Admin"> []= ["Donor", "Recipient"];
import { Role } from "@/@types/index";
import { FormValues } from "./type";

export const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  isVerified: false,
  location: { lng: 0, lat: 0, address: "" },
  role: Role.Recipient,
  imageUrl: "",
};

export const roleOptions: Exclude<Role, "Admin">[] = [
  Role.Donor,
  Role.Recipient,
];

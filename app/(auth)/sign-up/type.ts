import { Roles } from "@/@types/index";

export interface LocationType{
    lat: Number;
    lng: Number;
}

export interface FormValues {
    email: string;
    name: string;
    location: LocationType;
    password: string;
    role: Roles
    confirmPassword: string
}
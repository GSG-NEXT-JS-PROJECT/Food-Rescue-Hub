import * as Yup from "yup";
import { Role } from "@/@types/index";
import { roleOptions } from "./constant";

export const validationSchemaSignup = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),

  location: Yup.object().shape({
    lat: Yup.number()
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90")
      .required("Latitude is required"),
    lng: Yup.number()
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180")
      .required("Longitude is required"),
    address: Yup.string().required("Address is required"),
  }),

  role: Yup.mixed<Role>()
    .oneOf(Object.values(roleOptions), "Invalid role")
    .required("Role is required"),
});

import { Role } from "@/@types";
import * as yup from "yup";

export const validationSchemaUpdateUser = yup
  .object({
    email: yup.string().email("Invalid email format").optional(),

    name: yup
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .optional(),

    location: yup.object().shape({
      lat: yup.number()
        .min(-90, "Latitude must be between -90 and 90")
        .max(90, "Latitude must be between -90 and 90")
        .optional(),
      lng: yup.number()
        .min(-180, "Longitude must be between -180 and 180")
        .max(180, "Longitude must be between -180 and 180")
        .optional(),
    }),

    role: yup
      .mixed<Role>()
      .oneOf(Object.values(Role), "Invalid role")
      .optional(),
  })
  .strict(true);
import * as Yup from "yup";

export const validationSchemaNewDonation = Yup.object({
  title: Yup.string().required("Title is required"),

  description: Yup.string(),

  quantity: Yup.number()
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),

  foodType: Yup.string().required("Food type is required"),

  pickupDeadline: Yup.date()
    .min(new Date(), "Pickup deadline must be in the future")
    .required("Pickup deadline is required"),

  location: Yup.object({
    lat: Yup.number().required("Latitude is required"),
    lng: Yup.number().required("Longitude is required"),
  }).required("Location is required"),

  pickupInstruction: Yup.string(),

  imageUrl: Yup.string(),
});

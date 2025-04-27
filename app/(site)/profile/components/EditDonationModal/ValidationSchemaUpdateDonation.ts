import * as Yup from "yup";
import { validationSchemaPostDonation } from "@/app/(site)/post-donation/components/PostDonationForm/ValidationSchemaNewDonation";
import { DonationStatus } from "@/@types";

export const validationSchemaUpdateDonation = Yup.object().shape({
  ...Object.fromEntries(
    Object.entries(validationSchemaPostDonation.fields).map(([key, schema]) => [
      key,
      (schema as Yup.AnySchema).optional(),
    ])
  ),
  location: Yup.object({
    lat: Yup.number().optional(),
    lng: Yup.number().optional(),
    address: Yup.string().optional(),
  }).optional(),
  status: Yup.string()
    .oneOf(
      Object.values(DonationStatus).filter(
        (status) => [DonationStatus.Available, DonationStatus.Expired, DonationStatus.Confirmed].includes(status)
      ),
      "Invalid status value"
    )
    .optional(),
});

import * as Yup from "yup";
import { validationSchemaPostDonation } from "@/app/(site)/post-donation/components/PostDonationForm/ValidationSchemaNewDonation";
import { DonationStatus } from "@/@types";

export const validationSchemaUpdateDonation = Yup.object().shape({
  ...Object.fromEntries(Object.entries(validationSchemaPostDonation.fields)),
  status: Yup.string()
    .oneOf(Object.values(DonationStatus), "Invalid status value")
    .required("Status is required"),
});

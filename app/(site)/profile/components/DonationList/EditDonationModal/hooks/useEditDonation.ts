"use client";

import { useFormik } from "formik";
import { generateInitialValues } from "../constant";
import { DonationWithDonor, DonationWithRecipient } from "@/@types";
import { toast } from "sonner";
import { IEditDonation } from "../type";
import { validationSchemaUpdateDonation } from "../ValidationSchemaUpdateDonation";
import { DonationUpdateRequestBody } from "@/app/api/donations/type";
import { Types } from "mongoose";

const useEditDonation = (
  donationData: DonationWithDonor | DonationWithRecipient,
  onUpdate: (values: IEditDonation) => void
) => {
  const formik = useFormik<IEditDonation>({
    initialValues: generateInitialValues(donationData),
    onSubmit: (values, { setSubmitting }) => {
      handleEditDonation(values, setSubmitting);
    },
    validationSchema: validationSchemaUpdateDonation,
    validateOnMount: true,
    // enableReinitialize: true,
  });

  async function handleEditDonation(
    values: IEditDonation,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    setSubmitting(true);

    try {
      const updatedDonationData: DonationUpdateRequestBody = {
        donationId: donationData._id,
        donorId: donationData.donorId as Types.ObjectId,
        title: values.title,
        description: values.description,
        quantity: values.quantity,
        foodType: values.foodType,
        pickupDeadline: values.pickupDeadline,
        location: values.location,
        imageUrl: values.imageUrl || "",
        pickupInstruction: values.pickupInstruction,
        status: values.status,
      };

      const response = await fetch("/api/donations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDonationData),
      });

      if (response.ok) {
        toast.success("Donation updated successfully!");
        onUpdate(values);
      } else {
        const errorData = await response.json();
        console.log(errorData);
        toast.error(errorData.message || "Error updating donation");
      }
    } catch (error) {
      console.log(error);
      toast.error("Network error: Unable to connect to the server");
    } finally {
      setSubmitting(false);
    }
  }

  return { formik };
};

export default useEditDonation;

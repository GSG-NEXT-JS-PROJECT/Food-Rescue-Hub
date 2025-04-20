"use client";

import { useFormik } from "formik";
import { generateInitialValues } from "../constant";
import { validationSchemaPostDonation } from "../ValidationSchemaNewDonation";
import { IPostDonation } from "../type";
import { LocationType } from "@/@types";
import { toast } from "sonner";

const usePostDonation = (userLocation: LocationType) => {
  const formik = useFormik<IPostDonation>({
    initialValues: generateInitialValues(userLocation),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      handlePostDonation(values, resetForm, setSubmitting);
    },
    validationSchema: validationSchemaPostDonation,
    validateOnMount: true,
    // enableReinitialize: true,
  });

  async function handlePostDonation(
    values: IPostDonation,
    resetForm: () => void,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    setSubmitting(true);

    try {
      const donationData: IPostDonation = {
        title: values.title,
        description: values.description,
        quantity: values.quantity,
        foodType: values.foodType,
        pickupDeadline: values.pickupDeadline,
        location: values.location,
        imageUrl: values.imageUrl || "",
        pickupInstruction: values.pickupInstruction,
      };

      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donationData),
      });

      if (response.ok) {
        toast.success("Donation created successfully!");
        resetForm();
      } else {
        const errorData = await response.json();
        console.log(errorData);
        toast.error(errorData.error || "Error creating donation");
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

export default usePostDonation;

"use client";

import { useFormik } from "formik";
import { generateInitialValues } from "../constant";
import { validationSchemaNewDonation } from "../ValidationSchemaNewDonation";
import { INewDonation } from "../type";
import { useEffect, useState } from "react";
import { IUser, LocationType } from "@/@types";
import { toast } from "sonner";

const useNewDonation = () => {
  const [userLocation, setUserLocation] = useState<LocationType>({
    lat: 0,
    lng: 0,
    address: ''
  });

  const formik = useFormik<INewDonation>({
    initialValues: generateInitialValues(userLocation),
    onSubmit: (values, { resetForm, setSubmitting }) => {
      handlePostDonation(values, resetForm, setSubmitting);
    },
    validationSchema: validationSchemaNewDonation,
    validateOnMount: true,
    enableReinitialize: true,
  });

  useEffect(() => {
    fetchUserProfile().then(async (location) => {
      if (location) {
        setUserLocation(location);
      }
    });
  }, []);

  async function handlePostDonation(
    values: INewDonation,
    resetForm: () => void,
    setSubmitting: (isSubmitting: boolean) => void
  ) {
    setSubmitting(true);

    try {
      const donationData: INewDonation = {
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

  async function fetchUserProfile() {
    try {
      const response = await fetch("/api/user/profile");
      const data: IUser = await response.json();
      return data.location;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }

  return { formik, userLocation};
};

export default useNewDonation;

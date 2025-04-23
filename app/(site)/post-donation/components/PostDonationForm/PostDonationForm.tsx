"use client";

import React, { FC } from "react";
import { LocationType } from "@/@types";
import usePostDonation from "./hooks/usePostDonation";
import DonationForm from "@/components/DonationForm";

interface PostDonationFormProps {
  userLocation: LocationType;
}

const PostDonationForm: FC<PostDonationFormProps> = ({ userLocation }) => {
  const { formik } = usePostDonation(userLocation);

  return <DonationForm formik={formik} isPostForm={true} />;
};

export default PostDonationForm;

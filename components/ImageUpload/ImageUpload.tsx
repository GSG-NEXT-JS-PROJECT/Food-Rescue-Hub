"use client";

import { ErrorMessage } from "formik";
import { CldImage, CldUploadButton } from "next-cloudinary";
import React, { FC } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEditDonation from "@/app/(site)/profile/components/DonationList/EditDonationModal/hooks/useEditDonation";
import usePostDonation from "@/app/(site)/post-donation/components/PostDonationForm/hooks/usePostDonation";

type UpdateDonationFormikType = ReturnType<typeof useEditDonation>["formik"];
type PostDonationFormikType = ReturnType<typeof usePostDonation>['formik'];

interface ImageUploadProps {
  formik: UpdateDonationFormikType | PostDonationFormikType
}

const ImageUpload:FC<ImageUploadProps> = ({formik}) => {
  return (
    <div className="grid grid-cols-1 gap-4 space-y-2">
      <div className="flex items-center gap-4">
        <CldUploadButton
          uploadPreset="food-rescue-hub"
          onSuccess={(result) => {
            if (typeof result.info !== "string" && result.info?.secure_url) {
              formik.setFieldValue("imageUrl", result.info.secure_url);
            }
          }}
          className="flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Image
        </CldUploadButton>
        <ErrorMessage
          name="imageUrl"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Image Preview */}
      {formik.values.imageUrl && (
        <div className="relative mt-2 rounded-md overflow-hidden flex flex-col items-center">
          <p className="text-sm text-gray-600">Image Preview:</p>
          <CldImage
            src={formik.values.imageUrl}
            alt="Uploaded donation image"
            width={100}
            height={100}
            crop="fill"
            loading="lazy"
            className="rounded-md shadow-sm mb-2"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="top-2 right-2"
            onClick={() => {
              formik.setFieldValue("imageUrl", null);
            }}
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

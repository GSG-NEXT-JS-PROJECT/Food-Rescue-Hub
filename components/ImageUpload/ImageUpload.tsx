"use client";

import { ErrorMessage } from "formik";
import { CldImage, CldUploadButton } from "next-cloudinary";
import React, { FC, ReactNode } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import usePostDonation from "@/app/(site)/post-donation/components/PostDonationForm/hooks/usePostDonation";
import useEditDonation from "@/app/(site)/profile/components/EditDonationModal/hooks/useEditDonation";
import { useImageUpload } from "./hooks/useImageUpload";
import useSignup from "@/app/(auth)/sign-up/components/SignupForm/hooks/useSignup";
import { useProfileSidebar } from "@/app/(site)/profile/components/ProfileSidebar/hooks/useProfileSidebar";

type UpdateDonationFormikType = ReturnType<typeof useEditDonation>["formik"];
type PostDonationFormikType = ReturnType<typeof usePostDonation>["formik"];
type SignupFormikType = ReturnType<typeof useSignup>["formik"];
type UpdateUserFormikType = ReturnType<typeof useProfileSidebar>["formik"];

interface ImageUploadProps {
  formik:
    | UpdateDonationFormikType
    | PostDonationFormikType
    | SignupFormikType
    | UpdateUserFormikType;
  children?: ReactNode;
  isImagePreview?: boolean
  className?: string
}

const ImageUpload: FC<ImageUploadProps> = ({ formik, children, isImagePreview = true, className = ''}) => {
  const { setIsWidgetOpen } = useImageUpload();

  return (
    <div className="grid grid-cols-1 gap-4 space-y-2  z-[1000] pointer-events-auto">
      <div className="flex items-center gap-4">
        <CldUploadButton
          uploadPreset="food-rescue-hub"
          onSuccess={(result) => {
            setIsWidgetOpen(false);
            if (typeof result.info !== "string" && result.info?.secure_url) {
              formik.setFieldValue("imageUrl", result.info.secure_url);
            }
          }}
          onOpen={() => setIsWidgetOpen(true)}
          onClose={() => setIsWidgetOpen(false)}
          className={`${Boolean(className) ? className : "flex h-10 w-full cursor-pointer items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"}`}
        >
          {Boolean(children) ? (
            children
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Image
            </>
          )}
        </CldUploadButton>
        <ErrorMessage
          name="imageUrl"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      {/* Image Preview */}
      {isImagePreview && formik.values.imageUrl && (
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

"use client";

import type { FC } from "react";
import { Form, FormikProvider } from "formik";
import { DonationStatus, FoodType } from "@/@types";
import TextField from "@/components/text-field";
import SelectField from "@/components/select-field";
import GooglePlacesAutocomplete from "@/components/GooglePlacesAutocomplete";
import ImageUpload from "../ImageUpload";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import TextAreaField from "@/components/text-area";
import useEditDonation from "@/app/(site)/profile/components/EditDonationModal/hooks/useEditDonation";
import usePostDonation from "@/app/(site)/post-donation/components/PostDonationForm/hooks/usePostDonation";

type UpdateDonationFormikType = ReturnType<typeof useEditDonation>["formik"];
type PostDonationFormikType = ReturnType<typeof usePostDonation>["formik"];

interface DonationFormProps {
  formik: UpdateDonationFormikType | PostDonationFormikType;
  isPostForm?: boolean;
  onCancel?: () => void;
}

const DonationForm: FC<DonationFormProps> = ({
  isPostForm = false,
  onCancel,
  formik,
}) => {
  return (
    <FormikProvider value={formik}>
      <Form className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <TextField
            type="text"
            label="Title"
            name="title"
            placeholder="Enter donation title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={cn(
              "w-full",
              formik.touched.title && formik.errors.title
                ? "border-red-500"
                : ""
            )}
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <TextAreaField
            label="Description"
            name="description"
            placeholder="Describe your donation (optional)"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="min-h-[100px] w-full"
          />
        </div>

        <div
          className={`grid grid-cols-1 ${
            isPostForm ? "md:grid-cols-2" : "md:grid-cols-3"
          }  gap-4 md:gap-6`}
        >
          {/* Status Dropdown - Only show if not a post form */}
          {!isPostForm && "status" in formik.values && (
            <div className="space-y-2">
              <SelectField
                label="Status"
                name="status"
                options={Object.values(DonationStatus).filter(
                  (d) => d !== DonationStatus.Claimed
                )}
                placeholder="Select a donation status"
                onValueChange={(value) => formik.setFieldValue("status", value)}
                defaultValue={formik.values.status}
                value={formik.values.status}
                className="w-full"
              />
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-2">
            <TextField
              type="number"
              label="Quantity"
              name="quantity"
              placeholder="Enter donation quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full"
            />
          </div>

          {/* Food Type Dropdown */}
          <div className="space-y-2">
            <SelectField
              label="Food Type"
              name="foodType"
              options={Object.values(FoodType)}
              placeholder="Select a food type"
              onValueChange={(value) => formik.setFieldValue("foodType", value)}
              defaultValue={formik.values.foodType}
              value={formik.values.foodType}
              className="w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Pickup Deadline */}
          <div className="space-y-2">
            <TextField
              type="datetime-local"
              label="Pickup Deadline"
              name="pickupDeadline"
              value={formik.values.pickupDeadline}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full"
            />
          </div>

          {/* Google Places Autocomplete */}
          <div className="space-y-2">
            <GooglePlacesAutocomplete
              defaultAddress={formik.values.location?.address}
            />
          </div>
        </div>

        {/* Pickup Instructions */}
        <div className="space-y-2">
          <TextAreaField
            label="Pickup Instructions"
            name="pickupInstruction"
            placeholder="Add pickup instructions (optional)"
            value={formik.values.pickupInstruction}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="min-h-[100px] w-full"
          />
        </div>

        {/* Image Upload with Cloudinary */}
        <div className="space-y-2">
          <ImageUpload formik={formik} />
        </div>

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 border-t pt-[16px] mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (onCancel) {
                onCancel();
              } else {
                formik.resetForm();
              }
            }}
            className="w-full sm:w-auto"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {isPostForm ? "Post Donation" : "Save Changes"}
          </Button>
        </div>
      </Form>
    </FormikProvider>
  );
};

export default DonationForm;

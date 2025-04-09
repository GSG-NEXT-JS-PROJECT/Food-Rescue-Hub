"use client";

import React from "react";
import { Form, FormikProvider } from "formik";
import { FoodType } from "@/@types";
import useNewDonation from "./hooks/useNewDonation";
import TextField from "@/components/text-field";
import SelectField from "@/components/select-field";
import GooglePlacesAutocomplete from "../GooglePlacesAutocomplete";
import ImageUpload from "../ImageUpload";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import TextAreaField from "@/components/text-area";

const NewDonationForm = () => {
  const { formik, defaultAddress } = useNewDonation();

  return (
    <div>
      <FormikProvider value={formik}>
        <Form>
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Food Donation Form
              </CardTitle>
              <CardDescription>
                Fill out the form below to donate food items to those in need.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Title */}
              <TextField
                type="text"
                label="title"
                name="title"
                placeholder="Enter donation title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={cn(
                  formik.touched.title && formik.errors.title
                    ? "border-red-500"
                    : ""
                )}
              />

              {/* Description */}
              <TextAreaField
                label="description"
                name="description"
                placeholder="Describe your donation (optional)"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="min-h-[100px]"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quantity */}
                <TextField
                  type="number"
                  label="quantity"
                  name="quantity"
                  placeholder="Enter donation quantity"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="space-y-2"
                />

                {/* Food Type Dropdown */}
                <SelectField
                  label="Food Type"
                  name="foodType"
                  options={Object.values(FoodType)}
                  placeholder="Select a food type"
                  onValueChange={(value) =>
                    formik.setFieldValue("foodType", value)
                  }
                  defaultValue={formik.values.foodType}
                  className="space-y-2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pickup Deadline */}
                <TextField
                  type="datetime-local"
                  label="Pickup Deadline"
                  name="pickupDeadline"
                  value={formik.values.pickupDeadline}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="space-y-2"
                />

                {/* Google Places Autocomplete */}
                <GooglePlacesAutocomplete defaultAddress={defaultAddress} />
              </div>

              {/* pickup instruction */}
              <TextAreaField
                label="pickupInstruction"
                name="pickupInstruction"
                placeholder="add pickup instruction (optional)"
                value={formik.values.pickupInstruction}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="min-h-[100px]"
              />

              {/* Image Upload with Cloudinary */}
              <ImageUpload />

              {/* Submit Button */}
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  formik.resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex justify-end space-x-2"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <Icons.spinner className="mr-3 h-6 w-6 animate-spin" />
                ) : null}
                post donation
              </Button>
            </CardFooter>
          </Card>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default NewDonationForm;

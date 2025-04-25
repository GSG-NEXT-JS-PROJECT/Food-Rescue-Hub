"use client";

import { roleOptions } from "./constant";
import { Button } from "@/components/ui/button";
import { FormikProvider, Form } from "formik";
import useSignup from "./hooks/useSignup";
import Link from "next/link";
import TextField from "@/components/text-field";
import SelectField from "@/components/select-field";
import Icons from "@/components/ui/icons";
import GooglePlacesAutocomplete from "@/components/GooglePlacesAutocomplete";
import ImageUpload from "@/components/ImageUpload";

const SignupForm = () => {
  const { formik } = useSignup();

  return (
    <FormikProvider value={formik}>
      <Form className="space-y-4">
        {/* Name */}
        <TextField
          type="text"
          label="Name"
          name="name"
          placeholder="Enter your name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {/* Email */}
        <TextField
          type="email"
          label="Email"
          name="email"
          placeholder="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* Password */}
        <TextField
          label="Password"
          type="password"
          name="password"
          placeholder="******"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* Confirm Password */}
        <TextField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="******"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />

        {/* Location */}
        <GooglePlacesAutocomplete />

        {/* Role Selection */}
        <SelectField
          label="Role"
          name="role"
          options={roleOptions}
          placeholder="Select Role"
          onValueChange={(value) => formik.setFieldValue("role", value)}
          defaultValue={formik.values.role}
        />

        <ImageUpload formik={formik} />

        {/* Submit Button */}

        <Button
          type="submit"
          className="w-full bg-green-700 text-white border-transparent rounded-xl px-4 py-2 my-2 transition-all duration-300 ease-in-out hover:bg-white hover:border-2 hover:border-green-700 hover:text-green-700 cursor-pointer"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <Icons.spinner className="mr-3 h-6 w-6 animate-spin" />
          ) : null}
          Signup
        </Button>

        {/* Link to Login Page */}
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-green-700 hover:underline">
            Signin
          </Link>
        </p>
      </Form>
    </FormikProvider>
  );
};

export default SignupForm;

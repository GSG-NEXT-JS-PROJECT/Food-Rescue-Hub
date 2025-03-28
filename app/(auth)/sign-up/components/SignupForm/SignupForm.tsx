"use client";

import { roleOptions } from "./constant";
import { Button } from "@/components/ui/button";
import { FormikProvider, Form } from "formik";
import useSignup from "./hooks/useSignup";
import { useEffect, useState } from "react";
import Link from "next/link";
import TextField from "@/components/text-field";
import useSignin from "@/app/(auth)/sign-in/hooks/useSignin";

const SignupForm = () => {
    const { formik } = useSignin();
    return (
        <FormikProvider value={formik}>
            <Form className="space-y-4">
                <TextField
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

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
                <TextField
                    label="Location"
                    type="text"
                    name="location"
                    placeholder="Your location (Latitude, Longitude)"
                    value={`Lat: ${location.lat}, Lng: ${location.lng}`}
                    onChange={(e) => {
                        formik.setFieldValue("location", {
                            lat: location.lat,
                            lng: location.lng,
                        });
                    }}
                    readOnly
                />

                {/* Role Selection */}
                <SelectField
                    label="Role"
                    name="role"
                    options={roleOptions}
                    placeholder="Select Role"
                    onValueChange={(value) => formik.setFieldValue("role", value)}
                    defaultValue={formik.values.role}
                />

                {/* Submit Button */}
        
                <Button 
                type="submit" 
                className="w-full bg-green-700 text-white border-transparent rounded-xl px-4 py-2 my-2 transition-all duration-300 ease-in-out hover:bg-white hover:border-2 hover:border-green-700 hover:text-green-700 cursor-pointer"
                disabled={formik.isSubmitting}>
                    Signup
                </Button>

                <p className="text-center text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-green-700 hover:underline">
                        Sign up
                    </Link>
                </p>
            </Form>
        </FormikProvider>
    );
};

export default SignupForm;

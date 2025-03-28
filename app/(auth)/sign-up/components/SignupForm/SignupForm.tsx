"use client";

import { roleOptions } from "./constant";
import { Button } from "@/components/ui/button";
import { FormikProvider, Form } from "formik";
import useSignup from "./hooks/useSignup";
import { useEffect, useState } from "react";
import Link from "next/link";
import TextField from "@/components/text-field";
import SelectField from "@/components/select-field";

const SignupForm = () => {
    const { formik } = useSignup();
    const [location, setLocation] = useState({ lat: 0, lng: 0 });

    useEffect(() => {
        // Automatically get the location from the browser
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error("Error getting location: ", error);
                    setLocation({
                        lat: 0,
                        lng: 0,
                    });
                }
            );
        } else {
            console.error("Geolocation not supported");
        }
    }, []);

    useEffect(() => {
        if (location.lat !== 0 && location.lng !== 0) {
            formik.setFieldValue("location", { lat: location.lat, lng: location.lng });
        }
    }, [location]);

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

                {/* Link to Login Page */}
                <p className="text-center text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-green-700 hover:underline">
                        Login
                    </Link>
                </p>
            </Form>
        </FormikProvider>
    )
}

export default SignupForm;

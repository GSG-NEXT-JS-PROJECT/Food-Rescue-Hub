"use client";

import { Button } from "@/components/ui/button";
import { FormikProvider, Form } from "formik";
import TextField from "@/components/text-field";
import Icons from "@/components/ui/icons";
import useForgetPassword from "./hook/useForgetPassword";

const ForgetPasswordForm = () => {
    const { formik } = useForgetPassword();

    return (
        <FormikProvider value={formik}>
            <Form className="space-y-4">
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

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full bg-green-700 text-white border-transparent rounded-xl px-4 py-2 my-2 transition-all duration-300 ease-in-out hover:bg-white hover:border-2 hover:border-green-700 hover:text-green-700 cursor-pointer"
                    disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? (
                        <Icons.spinner className="mr-3 h-6 w-6 animate-spin" />
                    ) : null}
                    Forget Password
                </Button>
            </Form>
        </FormikProvider>
    )
}

export default ForgetPasswordForm;
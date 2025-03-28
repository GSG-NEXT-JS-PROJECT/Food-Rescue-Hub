"use client";
import { Button } from "@/components/ui/button";
import { FormikProvider, Form } from "formik";
import Link from "next/link";
import TextField from "@/components/text-field";
import useSignin from "@/app/(auth)/sign-in/hooks/useSignin";

const SigninForm = () => {
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

                <Button 
                    type="submit" 
                    className="w-full bg-green-700 text-white border-none rounded-xl px-4 py-2 my-2"
                    disabled={formik.isSubmitting}
                >
                    Log In
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

export default SigninForm;

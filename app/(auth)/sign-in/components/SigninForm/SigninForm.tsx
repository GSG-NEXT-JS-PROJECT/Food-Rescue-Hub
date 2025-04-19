"use client";
import React from "react";
import { FormikProvider, Form } from "formik";
import { Button } from "@/components/ui/button";
import TextField from "@/components/text-field";
import useSignin from "./hooks/useSignin";
import Icons from "@/components/ui/icons";
import Link from "next/link.js";

const SigninForm: React.FC = () => {
  const { formik } = useSignin();
  
  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <TextField
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
        />
        
        <TextField
          name="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
        />
        
              <Link
                href="/forget-password"
                className="text-green-600 hover:text-green-800 font-medium mb-4"
              >
                Forget Password?
              </Link>
          
        <Button
          type="submit"
          className="w-full bg-green-700 text-md text-white border-transparent rounded-xl px-4 py-4 my-5 transition-all duration-300 ease-in-out hover:bg-white hover:border-2 hover:border-green-700 hover:text-green-700 cursor-pointer"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? (
            <Icons.spinner className="mr-3 h-6 w-6 animate-spin " />
          ) : null}
          Sign in
        </Button>
      </Form>
    </FormikProvider>
  );
};

export default SigninForm;
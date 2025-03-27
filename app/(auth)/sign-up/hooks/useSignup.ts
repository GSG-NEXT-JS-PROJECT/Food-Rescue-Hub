"use client";

import { useFormik } from "formik";
import { FormValues } from "../type";
import { INITIAL_VALUES } from "../constant";
import { validationSchema } from "../ValidationSchema";
import { toast } from "sonner"

const useSignup = () => {
    const handleSignup = async (values: FormValues, resetForm: () => void, setSubmitting: (isSubmitting: boolean) => void) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/sign-up`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            console.log(data);
            if (!response.ok) {
                toast.error(`${data.error}`);
                return;
            }
            resetForm();
            toast.success("Signup successful");
        } catch (error: any) {
            toast.error(`Signup error: ${error.message}`);
        }finally{
            setSubmitting(false); 
        }
    };

    const formik = useFormik<FormValues>({
        initialValues: INITIAL_VALUES,
        onSubmit: (values, { resetForm, setSubmitting }) => {
            handleSignup(values, resetForm, setSubmitting);
        },
        validationSchema,
        validateOnMount: true,
    });

    return { formik };
};

export default useSignup;
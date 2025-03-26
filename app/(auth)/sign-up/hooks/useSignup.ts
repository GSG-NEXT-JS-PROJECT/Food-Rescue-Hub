"use client";

import { useFormik } from "formik";
import { FormValues } from "../type";
import { INITIAL_VALUES } from "../constant";
import { validationSchema } from "../ValidationSchema";

const useSignup = () => {
    const handleSignup = (values: FormValues) => {
        console.log(values);
    };

    const formik = useFormik<FormValues>({
        initialValues: INITIAL_VALUES,
        onSubmit: (values) => {
            handleSignup(values);
        },
        validationSchema,
        validateOnMount: true,
    });

    return { formik };
};

export default useSignup;
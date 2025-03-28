"use client";

import { useFormik } from "formik";
import { INITIAL_VALUES } from "../constantSignin";
import { validationSchemaSignin } from "../ValidationSchemaSignin";
import { ILogin } from "@/@types";

const useSignin = () => {
    const handleSignin = (values: ILogin) => {
        console.log(values);
    };

    const formik = useFormik<ILogin>({
        initialValues: INITIAL_VALUES,
        onSubmit: (values) => {
            handleSignin(values);
        },
        validationSchema: validationSchemaSignin,
        validateOnMount: true,
    });

    return { formik };
};

export default useSignin;
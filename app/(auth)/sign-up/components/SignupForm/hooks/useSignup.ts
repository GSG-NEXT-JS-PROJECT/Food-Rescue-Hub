"use client";

import { useFormik } from "formik";
import { FormValues } from "../type";
import { INITIAL_VALUES } from "../constant";
import { toast } from "sonner";
import { validationSchema } from "../ValidationSchema";

const useSignup = () => {
  const handleSignup = async (
    values: FormValues,
    resetForm: () => void,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    try {
      const response = await fetch(`/api/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(`${data.error}`);
        return;
      }
      resetForm();
      toast.success("Signup successful");
    } catch (error: any) {
      toast.error(`Signup error: ${error.message}`);
    } finally {
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

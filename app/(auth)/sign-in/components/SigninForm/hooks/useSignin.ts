"use client";

import { useFormik } from "formik";
import { INITIAL_VALUES } from "../constant";
import { validationSchemaSignin } from "../ValidationSchemaSignin";
import { ILogin } from "../type";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const useSignin = () => {
  const router = useRouter();

  const handleSignin = async (
    values: ILogin,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);

    try {
      const authValues: ILogin = {
        email: values.email,
        password: values.password,
      };

      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authValues),
      });

      if (response.ok) {
        router.push("/");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "something is wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error: Unable to connect to the server");
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik<ILogin>({
    initialValues: INITIAL_VALUES,
    onSubmit: (values, { setSubmitting }) => {
      handleSignin(values, setSubmitting);
    },
    validationSchema: validationSchemaSignin,
    validateOnMount: true,
  });

  return { formik };
};

export default useSignin;

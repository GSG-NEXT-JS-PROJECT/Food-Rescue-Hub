import * as Yup from "yup";

export const validationSchemaSignin = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email address")
        .required("Invalid email"),

    password: Yup.string()
        .required("Invalid password "),
});

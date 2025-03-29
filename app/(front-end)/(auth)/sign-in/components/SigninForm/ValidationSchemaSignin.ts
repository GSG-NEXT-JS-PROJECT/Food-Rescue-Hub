import * as Yup from "yup";

export const validationSchemaSignin = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email format")
        .required("Invalid email"),

    password: Yup.string()
        .required("Invalid password "),
});

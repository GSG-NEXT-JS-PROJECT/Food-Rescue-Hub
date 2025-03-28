import * as Yup from "yup";

export const validationSchemaSignin = Yup.object().shape({

    email: Yup.string()
        .email("Invalid email format")
        .required("Invalid email"),

    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .required("Invalid password "),

});

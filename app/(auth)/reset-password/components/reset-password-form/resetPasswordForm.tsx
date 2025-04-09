import { Form, FormikProvider } from "formik";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import TextField from "@/components/text-field";
import useResetPassword from "./hook/useResetPassword";

interface IProps {
    resetToken: string;
    id: string;
}

const ResetPasswordForm = (props: IProps) => {
    const { formik } = useResetPassword(props.resetToken, props.id);

    return (
        <FormikProvider value={formik}>
            <Form className="space-y-4">
                {/* Password */}
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="******"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                {/* Confirm Password */}
                <TextField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    placeholder="******"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full bg-green-700 text-white border-transparent rounded-xl px-4 py-2 my-2 transition-all duration-300 ease-in-out hover:bg-white hover:border-2 hover:border-green-700 hover:text-green-700 cursor-pointer"
                    disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? (
                        <Icons.spinner className="mr-3 h-6 w-6 animate-spin" />
                    ) : null}
                    Reset Password
                </Button>
            </Form>
        </FormikProvider>
    )
}

export default ResetPasswordForm;

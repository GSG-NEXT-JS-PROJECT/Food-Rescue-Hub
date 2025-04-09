import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ForgetPasswordForm from "./component/forget-password-form";

const page = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center w-full">
        <Card className="w-md mx-auto p-6 shadow-lg h-fit">
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-center text-green-700">Forget Password</CardTitle>
            </CardHeader>
            <CardContent>
                <ForgetPasswordForm />
            </CardContent>
        </Card>
        </div>
    )
}

export default page;

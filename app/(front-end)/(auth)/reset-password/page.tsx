"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResetPasswordForm from "./component/reset-password-form/resetPasswordForm";
import { useSearchParams } from "next/navigation";

const page = () => {
    const searchParams = useSearchParams();
    const resetToken = searchParams.get('resetToken');
    const id = searchParams.get('id');
    console.log(resetToken);
    console.log(id);
    
    if (!resetToken || !id) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-4">
                <div className="text-red-500">Invalid password reset link</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center w-full">
        <Card className="w-md mx-auto p-6 shadow-lg h-fit">
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-center text-green-700">Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
                <ResetPasswordForm resetToken={resetToken} id={id} />
            </CardContent>
        </Card>
        </div>
    )
}

export default page;

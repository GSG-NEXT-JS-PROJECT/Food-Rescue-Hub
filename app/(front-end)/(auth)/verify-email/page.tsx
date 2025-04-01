"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleX, SquareCheckBig } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-toastify";

const VerifyEmail = () => {
    const [loading, setLoading] = React.useState(false);
    const [verified, setVerified] = React.useState(false);
    const [error, setError] = React.useState(false);

    const searchParams = useSearchParams();
    const verifyToken = searchParams.get("verifyToken");
    const id = searchParams.get("id");

    const initialized = React.useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            verifyEmail();
        }
    }, []);

    const verifyEmail = async () => {
        if (!verifyToken || !id) {
            return toast.error("Invalid URL");
        }

        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/api/auth/verify-email?verifyToken=${verifyToken}&id=${id}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.ok) {
                setLoading(false);
                setVerified(true);
                toast.success("Email Verified!"); 
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
            toast.error("Verification failed!"); 
        }
    };

    if (loading)
        return (
            <h1 className="flex justify-center items-center h-screen">
                Verifying your Email address. Please wait...
            </h1>
        );

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md">
                {verified && (
                    <Alert variant="default" className="mb-5">
                        <SquareCheckBig color="green" />
                        <AlertTitle>Email Verified!</AlertTitle>
                        <AlertDescription>
                            Your email has been verified successfully.
                        </AlertDescription>
                    </Alert>
                )}

                {error && (
                    <Alert variant="destructive" className="mb-5">
                        <CircleX color="red" />
                        <AlertTitle>Email Verification Failed!</AlertTitle>
                        <AlertDescription>
                            Your verification token is invalid or expired.
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </div>
    );
};

export default VerifyEmail;

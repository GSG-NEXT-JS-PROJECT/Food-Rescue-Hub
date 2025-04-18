"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleX, SquareCheckBig } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { VerifyEmailRes } from "./verifyEmailTypes";

type VerifyEmailProps = {
  initialState: VerifyEmailRes;
};

const VerifyEmail: React.FC<VerifyEmailProps> = ({ initialState }) => {
  const verified = initialState.success;
  const error = initialState.error;

  useEffect(() => {
    if (verified) {
      toast.success("Email Verified!");
    } else if (error) {
      toast.error(error);
    }
  }, [verified, error]);

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
              {error}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
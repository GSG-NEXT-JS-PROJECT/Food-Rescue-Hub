"use client";

import React from "react";
import SigninForm from "./components/SigninForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Signin: React.FC = () => {
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col justify-center p-6">
    <Card className="w-full mx-auto mt-10 p-6">
    <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">
        <div className="text-center">
            <h2 className="text-3xl  font-extrabold mb-4 text-green-700">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Sign in to continue to Food Rescue Hub and make a difference
            </p>
          </div>
        </CardTitle>
    </CardHeader>
    <CardContent>
    <SigninForm />
    </CardContent>
</Card>
    </div>
  );
};

export default Signin;

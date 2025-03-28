"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "../../../components/ui/icons";
import SigninForm from "./components/SigninForm";
const Signin: React.FC = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex bg-green-50 items-center justify-center px-6 xl:px-16 2xl:px-24">
        <div className="max-w-xl space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-green-800 leading-tight">
              Transform Surplus <br /> into Community Support
            </h1>

            <p className="text-xl xl:text-2xl text-green-700 font-medium">
              Food Rescue Hub: Bridging Food Abundance and Community Needs
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-green-600 text-white rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-lg font-bold">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800">
                  Connect & Redistribute
                </h3>
                <p className="text-green-700">
                  Link food donors directly with local communities, ensuring
                  surplus food reaches those who need it most.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-600 text-white rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-lg font-bold">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800">
                  Reduce Food Waste
                </h3>
                <p className="text-green-700">
                  Implement smart redistribution strategies to minimize food
                  waste and support sustainable practices.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-green-600 text-white rounded-full w-10 h-10 flex-shrink-0 flex items-center justify-center text-lg font-bold">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-800">
                  Empower Communities
                </h3>
                <p className="text-green-700">
                  Create lasting social impact by connecting resources and
                  building stronger, more resilient neighborhoods.
                </p>
              </div>
            </div>
          </div>

          <blockquote className="border-l-4 border-green-600 pl-4 py-2 italic text-xl text-green-700">
            &quot;Every meal shared is a step towards ending hunger and building
            a more compassionate world.&quot;
          </blockquote>
        </div>
      </div>
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-xl space-y-10">
          <div className="text-center">
            <h2 className="text-4xl xl:text-5xl font-extrabold text-gray-900 mb-4">
              Welcome Back
            </h2>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Sign in to continue to Food Rescue Hub and make a difference
            </p>
          </div>
          <SigninForm />
          <div className="text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-base">
                <span className="px-3 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4">
              <Button variant="outline" size="lg" className="h-14">
                <Icons.google className="h-6 w-6 mr-2" />
                Google
              </Button>
              <Button variant="outline" size="lg" className="h-14">
                <Icons.facebook className="h-6 w-6 mr-2" />
                Facebook
              </Button>
              <Button variant="outline" size="lg" className="h-14">
                <Icons.github className="h-6 w-6 mr-2" />
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

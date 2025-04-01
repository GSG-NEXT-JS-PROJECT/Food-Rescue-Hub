"use client";
import React from "react";
import SigninForm from "./components/SigninForm";
import Icons from "@/components/ui/icons";
import Link from "next/link";

const Signin: React.FC = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex bg-gradient-to-br from-green-700 to-green-500 items-center justify-center px-6 xl:px-16 2xl:px-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-white"></div>
          <div className="absolute right-20 bottom-40 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute left-40 bottom-20 w-32 h-32 rounded-full bg-white"></div>
        </div>

        <div className="max-w-xl space-y-10 relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-2">
              <Icons.IconLogo />
            </div>
            <h2 className="text-2xl font-bold text-white">Food Rescue Hub</h2>
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl xl:text-4xl 2xl:text-6xl font-bold text-white leading-tight">
              Connecting Abundance With Need
            </h1>

            <p className="text-xl text-green-100 font-medium leading-relaxed">
              Join our community working to eliminate food waste and nourish
              neighborhoods across the city.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="bg-white text-green-600 rounded-full p-2">
                  <Icons.IconList />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Over 5,000+ Donations
                  </h3>
                  <p className="text-green-100">
                    Successfully redirected to communities in need
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="flex items-center space-x-4">
                <div className="bg-white text-green-600 rounded-full p-2">
                  <Icons.IconPerson />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    Join 1,200+ Members
                  </h3>
                  <p className="text-green-100">
                    Creating impact in our growing network
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <blockquote className="text-xl italic text-white">
              &quot;Every rescued meal creates ripples of positive change
              throughout our communities.&quot;
            </blockquote>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white">
        <div className="w-full max-w-md space-y-10">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 mb-8 text-md ">
              Sign in to continue your food rescue journey
            </p>
          </div>

          <SigninForm />

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              Don&apos;t have an account?
              <Link
                href="/signup"
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

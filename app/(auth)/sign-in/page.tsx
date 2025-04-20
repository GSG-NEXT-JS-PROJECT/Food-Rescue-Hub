import type React from "react";
import SigninForm from "./components/SigninForm";
import Icons from "@/components/ui/icons";
import Link from "next/link";

export const metadata = {
  title: 'Sign In',
  description: 'Access your Food Rescue Hub account to donate or receive food.',
  keywords: ['sign in', 'login', 'account', 'food donation'],
};

const Signin: React.FC = () => {
  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* Left side - Brand section (hidden on mobile) */}
      <div className="hidden lg:flex bg-gradient-to-br from-green-700 to-green-500 items-center justify-center p-4 relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-white"></div>
          <div className="absolute right-20 bottom-40 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute left-40 bottom-20 w-32 h-32 rounded-full bg-white"></div>
        </div>

        <div className="max-w-lg space-y-4 relative z-10">
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
              <Icons.IconLogo />
            </div>
            <h2 className="text-lg font-bold text-white">Food Rescue Hub</h2>
          </div>

          <div className="space-y-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
              Connecting Abundance With Need
            </h1>

            <p className="text-sm text-green-100 font-medium leading-relaxed">
              Join our community working to eliminate food waste and nourish
              neighborhoods across the city.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 mt-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="flex items-center space-x-2">
                <div className="bg-white text-green-600 rounded-full p-1">
                  <Icons.IconList className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Over 5,000+ Donations
                  </h3>
                  <p className="text-xs text-green-100">
                    Successfully redirected to communities in need
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <div className="flex items-center space-x-2">
                <div className="bg-white text-green-600 rounded-full p-1">
                  <Icons.IconPerson className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Join 1,200+ Members
                  </h3>
                  <p className="text-xs text-green-100">
                    Creating impact in our growing network
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 hidden sm:block">
            <blockquote className="text-sm italic text-white">
              &quot;Every rescued meal creates ripples of positive change
              throughout our communities.&quot;
            </blockquote>
          </div>
        </div>
      </div>

      {/* Right side - Sign in form (visible on all screens) */}
      <div className="flex items-center justify-center p-4 bg-white">
        <div className="w-full max-w-xs space-y-4">
          {/* Mobile logo - only visible on small screens */}
          <div className="flex items-center justify-center space-x-2 lg:hidden mb-2">
            <div className="w-6 h-6 bg-green-600 rounded-lg flex items-center justify-center">
              <Icons.IconLogo className="text-white" />
            </div>
            <h2 className="text-lg font-bold text-gray-900">Food Rescue Hub</h2>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Welcome Back
            </h2>
            <p className="text-xs text-gray-600 mb-3">
              Sign in to continue your food rescue journey
            </p>
          </div>

          <SigninForm />

          <div className="text-center pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/sign-up"
                className="text-green-600 hover:text-green-800 font-medium ml-1"
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

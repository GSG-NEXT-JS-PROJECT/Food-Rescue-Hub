import Icons from "@/components/ui/icons";
import Link from "next/link";
import React from "react";
const NavBar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-3">
              <Icons.IconLogo />
              <span className="text-green-600 text-xl font-bold">
                Food Rescue Hub
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/sign-in"
              className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Log in
            </Link>
            <Link
              href="/sign-up"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

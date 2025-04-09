"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import food from "../assets/food.jpg";
import { Role, UserProfile } from "@/@types";
import { ArrowRight, Leaf } from "lucide-react";

const HeroSection = ({ user }: { user: UserProfile | undefined }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Text Content */}
          <div
            className={`relative z-10 pb-8 pt-10 bg-white sm:pb-16 md:pb-20 lg:w-1/2 lg:pb-28 xl:pb-32 px-4 sm:px-6 lg:px-8 
                      transition-all duration-700 ease-out transform ${
                        isVisible
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-10 opacity-0"
                      }`}
          >
            <div className="inline-flex items-center px-2.5 py-1 mb-6 rounded-full border border-green-100 bg-green-50 text-sm text-green-700">
              <Leaf className="w-4 h-4 mr-1.5" />
              <span>Fighting food waste together</span>
            </div>

            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Rescue Food.</span>{" "}
                <span className="block text-green-600 xl:inline">
                  Build Community.
                </span>
              </h1>
              <p className="mt-4 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Food Rescue Hub connects those with surplus food to those who
                need it most. Join our community of restaurants, grocery stores,
                farms, and charities fighting food waste together.
              </p>

              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                <Link
                  href="/sign-up"
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 md:py-4 md:text-lg md:px-10 shadow-lg shadow-green-600/20 hover:shadow-green-600/30"
                >
                  Get started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                {user?.role === Role.Recipient && (
                  <Link
                    href="/donations"
                    className="mt-3 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-colors duration-200 md:py-4 md:text-lg md:px-10"
                  >
                    Browse donations
                  </Link>
                )}
                {user?.role === Role.Donor && (
                  <Link
                    href="/donations/new"
                    className="mt-3 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-colors duration-200 md:py-4 md:text-lg md:px-10"
                  >
                    Post Donation
                  </Link>
                )}
                {user?.role === Role.Admin && (
                  <Link
                    href="/dashboard"
                    className="mt-3 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-colors duration-200 md:py-4 md:text-lg md:px-10"
                  >
                    Dashboard
                  </Link>
                )}
              </div>

              <div className="mt-10 flex items-center text-sm text-gray-500">
                <div className="flex -space-x-2 mr-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-2 border-white bg-green-${
                        i * 100 + 200
                      }`}
                    ></div>
                  ))}
                </div>
                <span>Joined by 2,000+ organizations</span>
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div
            className={`w-full lg:w-1/2 p-4 lg:p-8 flex items-center transition-all duration-700 ease-out transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-10 opacity-0"
            }`}
          >
            <div className="w-full h-[400px] md:h-[500px] relative rounded-2xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/20 to-transparent z-10"></div>
              <Image
                src={food || "/placeholder.svg"}
                alt="Food donation"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

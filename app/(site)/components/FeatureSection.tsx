"use client";
import Icons from "@/components/ui/icons";
import React from "react";

const FeatureSection = () => {
  return (
    <div id="features" className="py-16 bg-gray-50 overflow-hidden lg:py-24">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <div className="relative">
          <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Advanced Features for Seamless Coordination
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
            Our platform leverages modern technology to make food rescue simple
            and efficient.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-16 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start">
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
              For Food Donors
            </h3>
            <p className="mt-3 text-lg text-gray-500">
              Reduce waste and make a difference in your community with our
              easy-to-use platform.
            </p>

            <dl className="mt-10 space-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                   <Icons.IconPlus/>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Easy Posting
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  List available donations in minutes with our user-friendly
                  interface.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <Icons.IconTrue/>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Track Your Impact
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Access analytics on your contributions and environmental
                  impact.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <Icons.IconList/>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Real-time Notifications
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Get instant updates when your donations are claimed and picked
                  up.
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-10 lg:-mx-4 xl:-mx-4  relative lg:mt-0">
            <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
              For Recipients
            </h3>
            <p className="mt-3 text-lg text-gray-500">
              Find available food donations in your area and connect directly
              with donors.
            </p>

            <dl className="mt-10 space-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <Icons.IconLocation/>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Map-based Search
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Find nearby donations with our interactive map view.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <Icons.IconListTask/>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Advanced Filtering
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Filter donations by food type, location, and more to find
                  exactly what you need.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                   <Icons.IconCalculate/>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                    Easy Claiming
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Claim donations with a single click and coordinate pickup
                  directly with donors.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;

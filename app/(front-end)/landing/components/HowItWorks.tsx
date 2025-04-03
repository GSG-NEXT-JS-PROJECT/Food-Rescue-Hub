import React from "react";

const HowItWorks = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">
            How It Works
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A simple way to reduce food waste
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform makes it easy to connect surplus food with those who
            need it.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                For Donors
              </h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Post your surplus food, set pickup instructions, and connect
                with local recipients in minutes.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                For Recipients
              </h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Browse available donations near you, claim what you need, and
                arrange pickup directly with donors.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                  />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Track Your Impact
              </h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                See metrics on food saved, waste reduced, and community
                connections made through your contributions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;

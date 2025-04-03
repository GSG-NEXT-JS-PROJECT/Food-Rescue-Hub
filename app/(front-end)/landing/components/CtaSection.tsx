import Link from "next/link";
import React from "react";

const CtaSection = () => {
  return (
    <div className="bg-green-700">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to reduce food waste?</span>
          <span className="block">Start using Food Rescue Hub today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-green-200">
          Join our community and be part of the solution. Whether you&apos;re a
          donor or recipient, your contribution matters.
        </p>
        <Link
          href="/sign-up"
          className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-700 bg-white hover:bg-green-50 sm:w-auto"
        >
          Sign up for free
        </Link>
      </div>
    </div>
  );
};

export default CtaSection;

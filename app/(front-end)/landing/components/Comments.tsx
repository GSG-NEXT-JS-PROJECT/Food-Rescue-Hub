import Link from "next/link";
import React from "react";

const Comments = () => {
  return (
    <div className="bg-white py-16 lg:py-24">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative py-8 px-6 bg-green-600 rounded-lg shadow-xl overflow-hidden lg:px-16 lg:grid lg:grid-cols-2 lg:gap-x-8">
          <div className="relative lg:col-span-1">
            <blockquote className="mt-6 text-white">
              <p className="text-xl font-medium sm:text-2xl">
                &quot;Food Rescue Hub has transformed how we handle surplus
                food. Instead of throwing away perfectly good items, we&apos;re
                now able to connect with local charities. It&apos;s a win-win
                for everyone.&quot;
              </p>
              <footer className="mt-6">
                <p className="flex flex-col font-medium">
                  <span>Sarah Johnson</span>
                  <span>Owner, Green Leaf Restaurant</span>
                </p>
              </footer>
            </blockquote>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-1 flex items-center justify-center">
            <div className="relative text-center lg:text-left">
              <h3 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
                Join our growing community
              </h3>
              <p className="mt-3 text-lg text-green-200">
                Discover the impact you can make, whether you&apos;re a donor or
                recipient. Get started today and be part of the solution.
              </p>
              <div className="mt-8">
                <div className="rounded-md shadow">
                  <Link
                    href="/sign-up"
                    className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-green-50"
                  >
                    Sign up now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;

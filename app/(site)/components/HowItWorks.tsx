
import Icons from '@/components/ui/icons';
import React from 'react';

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A simple way to reduce food waste
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform makes it easy to connect surplus food with those who need it.
          </p>
        </div>
        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mb-4">
                <Icons.IconPlusOutLined />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">For Donors</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Post your surplus food, set pickup instructions, and connect with local recipients in minutes.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mb-4">
                <Icons.IconCart />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">For Recipients</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                Browse available donations near you, claim what you need, and arrange pickup directly with donors.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mb-4">
                <Icons.IconImprove />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Track Your Impact</h3>
              <p className="mt-2 text-base text-gray-500 text-center">
                See metrics on food saved, waste reduced, and community connections made through your contributions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import Link from "next/link";
import React from "react";

const FooterSection = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          <div className="px-5 py-2">
            <Link
              href="/about"
              className="text-base text-gray-500 hover:text-gray-900"
            >
              About
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="/how-it-works"
              className="text-base text-gray-500 hover:text-gray-900"
            >
              How it Works
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="/faq"
              className="text-base text-gray-500 hover:text-gray-900"
            >
              FAQ
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="/contact"
              className="text-base text-gray-500 hover:text-gray-900"
            >
              Contact
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="/privacy"
              className="text-base text-gray-500 hover:text-gray-900"
            >
              Privacy
            </Link>
          </div>
          <div className="px-5 py-2">
            <Link
              href="/terms"
              className="text-base text-gray-500 hover:text-gray-900"
            >
              Terms
            </Link>
          </div>
        </nav>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2025 Food Rescue Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;

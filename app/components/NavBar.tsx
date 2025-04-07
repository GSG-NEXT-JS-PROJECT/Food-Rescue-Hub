// components/Navbar.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Icons from '@/components/ui/icons';

type NavbarProps = {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
};

export default function Navbar({ activeSection, scrollToSection }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-green-600 text-xl font-bold">Food Rescue Hub</span>
            </div>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <button
                onClick={() => scrollToSection('home')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeSection === 'home'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeSection === 'how-it-works'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                How It Works
              </button>
              <button
                onClick={() => scrollToSection('stats')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeSection === 'stats'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Impact
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeSection === 'testimonials'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Success Stories
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${activeSection === 'features'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                Features
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in" className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium">
              Log in
            </Link>
            <Link href="/sign-up" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Sign up
            </Link>
            <div className="md:hidden flex items-center">
              <button
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
                aria-label="Main menu"
                aria-expanded="false"
                onClick={() => {
                  const mobileMenu = document.getElementById('mobile-menu');
                  mobileMenu?.classList.toggle('hidden');
                }}
              >
                <Icons.IconListNavBar />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button
            onClick={() => {
              scrollToSection('home');
              document.getElementById('mobile-menu')?.classList.add('hidden');
            }}
            className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeSection === 'home'
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              scrollToSection('how-it-works');
              document.getElementById('mobile-menu')?.classList.add('hidden');
            }}
            className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeSection === 'how-it-works'
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            How It Works
          </button>
          <button
            onClick={() => {
              scrollToSection('stats');
              document.getElementById('mobile-menu')?.classList.add('hidden');
            }}
            className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeSection === 'stats'
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            Impact
          </button>
          <button
            onClick={() => {
              scrollToSection('testimonials');
              document.getElementById('mobile-menu')?.classList.add('hidden');
            }}
            className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeSection === 'testimonials'
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            Success Stories
          </button>
          <button
            onClick={() => {
              scrollToSection('features');
              document.getElementById('mobile-menu')?.classList.add('hidden');
            }}
            className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left ${activeSection === 'features'
                ? 'bg-green-50 text-green-600'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            Features
          </button>
        </div>
      </div>
    </nav>
  );
}
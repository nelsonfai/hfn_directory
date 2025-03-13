'use client'
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="mb-8 md:mb-0 md:mr-6 md:max-w-sm">
            <div className="flex items-center mb-4">
              <img
                src="/h.f.n.-logo1.png"
                alt="HFN Logo"
                className="h-12 w-auto mr-2"
              />
              <h2 className="text-lg font-semibold">HFN Directory</h2>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-white">Our Mission:</h3>
              <p className="mt-1 text-sm text-gray-400">
                Advocacy, capacity building, improving access to finance for the private sector in collaboration with the public sector
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-white">Our Vision:</h3>
              <p className="mt-1 text-sm text-gray-400">
                To support the achievement of universal healthcare coverage through private sector activation
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8">
            <div className="md:mr-6">
              <h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/register" className="text-gray-400 hover:text-[#fb8c01] text-sm">
                    Register
                  </Link>
                </li>
                <li>
                  <Link href="/members" className="text-gray-400 hover:text-[#fb8c01] text-sm">
                    Members
                  </Link>
                </li>

              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Get In Touch</h3>
              <p className="text-sm text-gray-400">
                <a href="mailto:info@hfnigeria.com" className="hover:text-[#fb8c01]">
                  info@hfnigeria.com
                </a>
              </p>
              <p className="mt-1 text-sm text-gray-400">
                <a href="tel:+2347030567554" className="hover:text-[#fb8c01]">
                  +234 703 056 7554
                </a>
              </p>
              <p className="mt-1 text-sm text-gray-400">
                3rd floor, 109, Awolowo Road, <br />
                Opposite Standard Chartered Bank, <br />
                Ikoyi, Lagos State, Nigeria.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Healthcare Federation of Nigeria. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-[#fb8c01] text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-gray-400 hover:text-[#fb8c01] text-sm">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-[#fb8c01] text-sm">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
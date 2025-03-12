// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between flex-col md:flex-row items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">HFN Directory</h2>
            <p className="mt-2 text-gray-400">Connecting healthcare professionals worldwide.</p>
          </div>
          <div className="flex space-x-6 justify-center md:justify-end">
            <a href="/privacy-policy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
            <a href="/contact" className="text-gray-400 hover:text-white">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} HFN Directory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

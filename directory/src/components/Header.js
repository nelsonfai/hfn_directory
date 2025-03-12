'use client'
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <img
                className="h-48 w-auto"
                src="/h.f.n.-logo1.png" 
                alt="HFN Directory Logo"
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link href="/register" className="border-transparent text-gray-800 hover:border-[#fb8c01] hover:text-[#fb8c01] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Register
            </Link>
            <Link href="/members" className="border-transparent text-gray-800 hover:border-[#fb8c01] hover:text-[#fb8c01] inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
              Members
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-[#fb8c01] focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
            <Link
              href="/register"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-800 hover:bg-gray-50 hover:border-[#fb8c01] hover:text-[#fb8c01] text-base font-medium"
            >
              Register
            </Link>
            <Link
              href="/members"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-800 hover:bg-gray-50 hover:border-[#fb8c01] hover:text-[#fb8c01] text-base font-medium"
            >
              Members
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
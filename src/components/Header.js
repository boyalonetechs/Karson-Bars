"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex scale-200 lg:ml-5 items-center space-x-3"
        >
          <Image
            src="/logo-t.png"
            alt="Gifter Breadfruit Bars"
            width={60}
            height={48}
            className="rounded-full object-cover"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-[#801B1B] transition-colors">
            Home
          </Link>
          <Link
            href="/about"
            className="hover:text-[#801B1B] transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/#products"
            className="hover:text-[#801B1B] transition-colors"
          >
            Products
          </Link>
          <Link
            href="/contact"
            className="hover:text-[#801B1B] transition-colors"
          >
            Contact Us
          </Link>
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
      >
        <div className="bg-[#FFFDF0] px-6 pb-6 pt-2 space-y-4 border-b border-yellow-200/50">
          <Link
            href="/"
            className="block text-sm font-medium text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block text-sm font-medium text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/#products"
            className="block text-sm font-medium text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/contact"
            className="block text-sm font-medium text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}

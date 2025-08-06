import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white shadow-inner min-h-[120px] flex items-center">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-6 w-full space-y-4 md:space-y-0">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-5 text-sm">
          <Link
            href="/"
            className="hover:underline hover:text-red-800 font-serif"
          >
            Privacy Policy
          </Link>
          <Link
            href="/"
            className="hover:underline hover:text-red-800 font-serif"
          >
            Terms of Service
          </Link>
          <Link
            href="/"
            className="hover:underline hover:text-red-800 font-serif"
          >
            Contact
          </Link>
        </div>

        <div className="text-sm text-center md:text-right font-serif">
          Bringing 21st century skill development to the forefront
        </div>
      </div>
    </footer>
  );
}

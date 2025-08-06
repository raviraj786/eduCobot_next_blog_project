import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="bg-blue-950 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-3 space-y-3 md:space-y-0">
        {/* Left Menu */}
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-5">
          <Link
            href="/"
            className="text-[18px] font-bold font-serif text-white"
          >
            eduCOBOT
          </Link>

          <Link
            href="/"
            className="hover:underline hover:text-red-800 font-serif text-white"
          >
            All
          </Link>

          <Link
            href="/blogs"
            className="hover:underline hover:text-red-800 font-serif text-white"
          >
            Blogs
          </Link>

          <Link
            href="/"
            className="hover:underline hover:text-red-800 text-white"
          >
            Extra
          </Link>
        </div>

        {/* Right Menu */}
        <div className="flex flex-wrap justify-center md:justify-end items-center gap-5">
          <Link
            href="/about"
            className="hover:underline hover:text-red-800 font-serif text-white"
          >
            About
          </Link>

          <Link
            href="/login"
            className="hover:underline hover:text-red-800 bg-amber-500 text-black px-4 py-1 rounded"
          >
            Account
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-400 text-black rounded-full flex items-center justify-center font-bold text-xl">
            I
          </div>
          <Link href="/" className="text-2xl font-bold tracking-wide">
            Inkwell
          </Link>
          <span className="text-sm text-slate-300 hidden md:block">
            Professional Blogging Platform
          </span>
        </div>

        <nav className="flex gap-4 md:gap-6 ml-2  text-sm font-medium items-center ">
          <Link href="/blogs" className="hover:text-amber-400 transition ">
            Blogs
          </Link>

          <Link href="/about" className="hover:text-amber-400 transition">
            About
          </Link>

          <Link
            href="/admin"
            className="px-4 py-2 rounded-md bg-amber-400 text-black font-semibold hover:bg-amber-500 transition"
          >
            Publish Your Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}

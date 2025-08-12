"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  console.log(isLoggedIn, "Dddddddddddddd");

  async function handleLogout() {
    await fetch("/api/logout", { method: "POST" });
    setIsLoggedIn(false);
    router.push("/login");
  }

  return (
    <header className="bg-blue-950 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 py-4 gap-4 md:gap-0">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-6">
          <Link
            href="/"
            className="text-2xl font-bold font-serif tracking-wide"
          >
            eduCOBOT
          </Link>

          <nav className="flex gap-4 text-base font-medium">
            {/* <Link href="/" className="hover:text-amber-400 transition">
              All
            </Link> */}
            <Link href="/blogs" className="hover:text-amber-400 transition">
              Blogs
            </Link>

            {isLoggedIn && (
              <Link href="/admin" className="hover:text-amber-400 transition">
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-4 py-2 rounded transition"
            >
              Account
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

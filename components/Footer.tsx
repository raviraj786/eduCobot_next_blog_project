import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-slate-900 to-slate-800 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

     
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Inkwell</h2>
          <p className="text-sm leading-relaxed">
            A professional blogging platform to share knowledge, stories, and
            ideas with the world.
          </p>
        </div>

      
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/blogs" className="hover:text-amber-400 transition">
                Blogs
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-amber-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-400 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="hover:text-amber-400 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-amber-400 transition">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

     
      <div className="border-t border-slate-700 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Inkwell. All rights reserved.
      </div>
    </footer>
  );
}

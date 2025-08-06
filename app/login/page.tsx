"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState({ email: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const validAdmin = {
      email: "admin@gmail.com",
      password: "12345",
    };

    if (
      admin.email === validAdmin.email &&
      admin.password === validAdmin.password
    ) {
      const email = admin.email;
      localStorage.setItem("token", email); 
      console.log("Token saved in localStorage:", email);
      router.push("/admin");
      setAdmin({ email: "", password: "" });
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm space-y-8 p-8 bg-white rounded shadow">
        <div>
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Admin Login
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={admin.email}
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={admin.password}
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded bg-black text-white font-medium hover:bg-indigo-700 focus:outline-none"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useRouter } from "next/navigation";
import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [admin, setAdmin] = useState({ email: "", password: "" });

 
  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/admin"); 
    }
  }, [isLoggedIn, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const validAdmin = {
      email: "admin@gmail.com",
      password: "12345",
    };

    if (
      admin.email === validAdmin.email &&
      admin.password === validAdmin.password
    ) {
      const res = await fetch("/api/set-cookie", { method: "POST" });
      if (res.ok) {
        setIsLoggedIn(true);
        router.push("/admin");
      } else {
        alert("Login failed, please try again.");
      }
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm space-y-8 p-8 bg-white rounded shadow">
        <h2 className="text-center text-2xl font-bold text-gray-900">
          Admin Login
        </h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <input
            type="email"
            required
            value={admin.email}
            onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="password"
            required
            value={admin.password}
            onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
            placeholder="Password"
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-950 text-white rounded"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

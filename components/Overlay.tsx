"use client";
import React, { useEffect } from "react";

interface OverlayProps {
  type: "loader" | "alert";
  msg?: string;
  onClose?: () => void; // alert ke liye optional
}

export default function Overlay({ type, msg, onClose }: OverlayProps) {
  // Agar alert type hai, to 3 sec baad auto close karne ka option
  useEffect(() => {
    if (type === "alert" && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [type, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent  bg-opacity-40">
      {type === "loader" && (
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-700 rounded-full animate-spin"></div>
      )}
      {type === "alert" && (
        <div className="bg-red-600 text-white px-8 py-4 rounded shadow-lg text-center max-w-sm">
          {msg}
        </div>
      )}
    </div>
  );
}

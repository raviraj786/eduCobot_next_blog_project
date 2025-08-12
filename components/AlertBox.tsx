"use client";
import React from "react";

interface AlertBoxProps {
  msg: string;
  onClose: () => void;
  type?: "error" | "success" | "info";
}

export default function AlertBox({ msg, onClose, type = "info" }: AlertBoxProps) {
  const bgColor =
    type === "error"
      ? "bg-red-600"
      : type === "success"
      ? "bg-green-600"
      : "bg-blue-600";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className={`max-w-md w-full rounded p-6 ${bgColor} text-white shadow-lg`}>
        <p className="mb-4">{msg}</p>
        <button
          onClick={onClose}
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
          autoFocus
        >
          OK
        </button>
      </div>
    </div>
  );
}

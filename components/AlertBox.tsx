import React, { useEffect, useState } from "react";

type AlertBoxProps = {
  msg: string;
  onClose?: () => void;
};

export default function AlertBox({ msg, onClose }: AlertBoxProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose?.();
    }, 300); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div
        className={`bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center transform transition-all duration-300 ${
          show ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <p className="text-lg font-medium text-gray-800">{msg}</p>
        <button
          onClick={handleClose}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}

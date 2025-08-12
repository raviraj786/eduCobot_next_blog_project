import React from "react";

export default function Loader() {
  return (
    <div className="  flex items-center justify-center  absolute  bg-amber-600  z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-700"></div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Typography, CircularProgress } from "@mui/material";
import Loader from "./Loader";

export default function Addbutton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    router.push("/admin/add");
  };

 if(loading){
  <Loader/>
 }


  return (
    <div className="flex justify-between items-center mb-6">
      <Typography variant="h5">Admin Dashboard</Typography>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow flex items-center"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <>
            <CircularProgress size={20} color="inherit" />
            <span className="ml-2">Loading...</span>
          </>
        ) : (
          "Add Blog"
        )}
      </button>
    </div>
  );
}

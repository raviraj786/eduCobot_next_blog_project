"use client";

import HomeScreen from "@/components/HomeScreen";
import React from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();

  return (
    <>
      <HomeScreen />
    </>
  );
}

export default page;

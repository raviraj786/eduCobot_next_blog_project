"use client";

import dynamic from "next/dynamic";
import Loader from "./Loader";
import { Suspense } from "react";

const BlogDes = dynamic(() => import("./BlogDes"), {
  ssr: false,
});

export default function BlogDesWrapper({ id }: { id: string }) {
  return (
    <Suspense fallback={<Loader />}>
      <BlogDes id={id} />
    </Suspense>
  );
}

// "use client";
// import React, { useEffect, useState, Suspense } from "react";
// import ImgMediaCard from "@/components/ImgMediaCard";
// import Loader from "@/components/Loader";
// import axios from "axios";
// import Blog from "@/types";
// import Link from "next/link";

// type TabType = "latest" | "recommended";

// export default function Home() {
//   const [activeTab, setActiveTab] = useState<TabType>("latest");
//   const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
//   const [recommendedBlogs, setRecommendedBlogs] = useState<Blog[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState("");

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const startTime = Date.now();
//         const response = await axios.get("/api/blogs/?limit=10");
//         const elapsed = Date.now() - startTime;
//         const delay = Math.max(1500 - elapsed, 0);

//         setTimeout(() => {
//           if (response.data?.blogs?.length > 0) {
//             setLatestBlogs(response.data.blogs);
//           } else {
//             setErrorMsg("No blogs found.");
//           }
//           setLoading(false);
//         }, delay);
//       } catch (error: any) {
//         console.error("Error loading blogs", error);
//         setErrorMsg("Failed to fetch blogs. Try again later.");
//         setLoading(false);
//       }
//     };

//     fetchBlogs();
//   }, []);

//   if (loading) return <Loader />;
//   if (errorMsg)
//     return <div className="text-red-500 text-center">{errorMsg}</div>;

//   return (
//     <div className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-10 space-y-16">
//       <div className="w-full max-w-7xl">
//         <div className="flex gap-4 mb-6">
//           <span
//             onClick={() => setActiveTab("latest")}
//             className={`cursor-pointer px-4 py-2 rounded ${
//               activeTab === "latest"
//                 ? "bg-blue-950 text-white"
//                 : "text-gray-600 hover:underline"
//             }`}
//           >
//             Latest Blogs
//           </span>
//           <span
//             onClick={() => setActiveTab("recommended")}
//             className={`cursor-pointer px-4 py-2 rounded ${
//               activeTab === "recommended"
//                 ? "bg-blue-950 text-white"
//                 : "text-gray-600 hover:underline"
//             }`}
//           >
//             Recommended Blogs
//           </span>
//         </div>

//         <Suspense fallback={<Loader />}>
//           {activeTab === "latest" && (
//             <section className="text-left">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {latestBlogs?.length > 0 ? (
//                   latestBlogs.map((blog) => (
//                     <Link
//                       href={`/blogs/${blog.blog_id}`}
//                       key={blog.id}
//                       className="block hover:opacity-90 transition"
//                     >
//                       <ImgMediaCard
//                         title={blog.title}
//                         content={blog.content}
//                         image={blog.image}
//                         tag={blog.tag}
//                         createdAt={blog.createdAt}
//                       />
//                     </Link>
//                   ))
//                 ) : (
//                   <p className="col-span-3 text-center text-gray-500">
//                     No blogs found.
//                   </p>
//                 )}
//               </div>
//             </section>
//           )}

//           {activeTab === "recommended" && (
//             <section className="text-left">
//               <h2 className="text-2xl font-semibold text-cyan-900 mb-8">
//                 Recommended Blogs
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {recommendedBlogs?.length > 0 ? (
//                   recommendedBlogs.map((blog) => (
//                     <Link
//                       href={`/blogs/${blog.blog_id}`}
//                       key={blog._id}
//                       className="block hover:opacity-90 transition"
//                     >
//                       <ImgMediaCard
//                         title={blog.title}
//                         content={blog.content}
//                         image={blog.image}
//                         tag={blog.tag}
//                         createdAt={blog.createdAt}
//                       />
//                     </Link>
//                   ))
//                 ) : (
//                   <p className="col-span-3 text-center text-gray-500">
//                     No recommended blogs.
//                   </p>
//                 )}
//               </div>
//             </section>
//           )}
//         </Suspense>
//       </div>
//     </div>
//   );
// }

import HomeScreen from '@/components/HomeScreen'
import React from 'react'

function page() {
  return (
   <>
   <HomeScreen/>
   </> 
  )
}

export default page
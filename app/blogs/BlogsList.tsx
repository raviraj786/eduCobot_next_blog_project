"use client";
import React, { useEffect, useState, Suspense } from "react";
import ImgMediaCard from "@/components/ImgMediaCard";
import Loader from "@/components/Loader";
import axios from "axios";
import Blog from "@/types";


type TabType = "latest" | "recommended";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("latest");
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
  const [recommendedBlogs, setRecommendedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const LIMIT = 6;

  const fetchBlogs = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/blogs?page=${page}&limit=${LIMIT}`);
      const data = response.data;

      if (data.success) {
        setLatestBlogs(data.blogs || []);
        setTotalPages(Math.ceil(data.total / LIMIT));
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-10 space-y-16">
      <div className="w-full max-w-7xl">
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <span
            onClick={() => setActiveTab("latest")}
            className={`cursor-pointer px-4 py-2 rounded ${
              activeTab === "latest"
                ? "bg-blue-950 text-white"
                : "text-gray-600 hover:underline"
            }`}
          >
            Latest Blogs
          </span>
          <span
            onClick={() => setActiveTab("recommended")}
            className={`cursor-pointer px-4 py-2 rounded ${
              activeTab === "recommended"
                ? "bg-blue-950 text-white"
                : "text-gray-600 hover:underline"
            }`}
          >
            Recommended Blogs
          </span>
        </div>

        {/* Blog Lists */}
        <Suspense fallback={<Loader />}>
          {activeTab === "latest" && (
            <section className="text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestBlogs?.length > 0 ? (
                  latestBlogs.map((blog) => (
                    <ImgMediaCard
                      key={blog.id}
                      title={blog.title}
                      content={blog.content}
                      image={blog.image}
                      tag={blog.tag}
                      createdAt={blog.createdAt}
                    />
                  ))
                ) : (
                  <p className="col-span-3 text-center text-gray-500">No blogs found.</p>
                )}
              </div>

              {/* Pagination */}
              <div className="mt-10 flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 border rounded ${
                      currentPage === i + 1
                        ? "bg-blue-950 text-white"
                        : "bg-white text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </section>
          )}

          {activeTab === "recommended" && (
            <section className="text-left">
              <h2 className="text-2xl font-semibold text-cyan-900 mb-8">
                Recommended Blogs
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedBlogs?.length > 0 ? (
                  recommendedBlogs.map((blog) => (
                    <ImgMediaCard
                      key={`recommended-${blog.id}`}
                      title={blog.title}
                      content={blog.content}
                      image={blog.image}
                      tag={blog.tag}
                      createdAt={blog.createdAt}
                    />
                  ))
                ) : (
                  <p className="col-span-3 text-center text-gray-500">No recommended blogs.</p>
                )}
              </div>
            </section>
          )}
        </Suspense>
      </div>
    </div>
  );
}

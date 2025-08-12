"use client";
import React, { useEffect, useState, Suspense } from "react";
import ImgMediaCard from "@/components/ImgMediaCard";
import Overlay from "@/components/Overlay";
import axios from "axios";
import Blog from "@/types";
import Link from "next/link";

type TabType = "latest" | "recommended";

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<TabType>("latest");
  const [latestBlogs, setLatestBlogs] = useState<Blog[]>([]);
  const [recommendedBlogs, setRecommendedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");

  const showAlert = (msg: string) => {
    setAlertMsg(msg);
  };

  const closeAlert = () => {
    setAlertMsg("");
  };

  const fetchLatestBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/blogs/latest?limit=6");
      console.log(response.data);
      if (response.data?.blogs?.length > 0) {
        setLatestBlogs(response.data.blogs);
      } else {
        showAlert("No latest blogs found.");
      }
    } catch (error) {
      console.error("Error loading latest blogs", error);
      showAlert("Failed to fetch latest blogs. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendedBlogs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/blogs/recommended?limit=6");

      if (response.data?.blogs?.length > 0) {
        setRecommendedBlogs(response.data.blogs);
      } else {
        showAlert("No recommended blogs found.");
      }
    } catch (error) {
      console.error("Error loading recommended blogs", error);
      showAlert("Failed to fetch recommended blogs. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "latest") {
      fetchLatestBlogs();
    } else {
      fetchRecommendedBlogs();
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-10 space-y-16 relative">
      {loading && <Overlay type="loader" />}
      {alertMsg && <Overlay type="alert" msg={alertMsg} onClose={closeAlert} />}

      <div className="w-full max-w-7xl">
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

        <Suspense fallback={<Overlay type="loader" />}>
          {activeTab === "latest" ? (
            latestBlogs.length > 0 ? (
              <section className="text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {latestBlogs.map((blog) => (
                    <Link
                      href={`/blogs/${blog.blog_id}`}
                      key={blog.blog_id}
                      className="block hover:opacity-90 transition"
                    >
                      <ImgMediaCard
                        title={blog.title}
                        content={blog.content}
                        image={blog.image}
                        tag={blog.tag}
                        createdAt={blog.updatedAt}
                      />
                    </Link>
                  ))}
                </div>
              </section>
            ) : (
              <section>
                <div>No blogs found.</div>
              </section>
            )
          ) : recommendedBlogs.length > 0 ? (
            <section className="text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedBlogs.map((blog) => (
                  <Link
                    href={`/blogs/${blog.blog_id}`}
                    key={blog._id}
                    className="block hover:opacity-90 transition"
                  >
                    <ImgMediaCard
                      title={blog?.title}
                      content={blog?.content}
                      image={blog?.image}
                      tag={blog?.tag}
                      createdAt={blog?.updatedAt}
                    />
                  </Link>
                ))}
              </div>
            </section>
          ) : (
            <section>
              <div>No blogs found.</div>
            </section>
          )}
        </Suspense>
      </div>
    </div>
  );
}

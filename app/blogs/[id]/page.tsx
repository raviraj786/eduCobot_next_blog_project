"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, CircularProgress } from "@mui/material";
import BlogContent from "@/components/BlogContent";

type Blog = {
  title: string;
  content: string;
  image?: string;
  authorName: string;
  createdAt?: string;
  tag?: string[];
};

export default function BlogDetailPage() {
  const { id } = useParams();


  const blog_id = id;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!blog_id) return;
    const fetchBlog = async () => {
      try {
        // console.log(blog_id);
        const res = await fetch(`/api/blogs/${blog_id}`);
        const data = await res.json();
        // console.log(data, "data find....");

        if (data.success && data.blog) {
          setBlog(data.blog);
        } else {
          console.error("Blog not found in API response.");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (!blog) {
    return (
      <Box className="text-center mt-10">
        <Typography variant="h5">Blog not found</Typography>
      </Box>
    );
  }

  return <BlogContent blog={blog} blog_id={id} />;
}

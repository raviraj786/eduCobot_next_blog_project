"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Divider,
} from "@mui/material";
import { AccessTime, CalendarToday, Person } from "@mui/icons-material";

type Blog = {
  title: string;
  content: string;
  image?: string;
  authorName: string;
  createdAt?: string;
  tag?: string[];
};

function BlogContent({ blog }: { blog: Blog }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Typography
        variant="h4"
        className="font-extrabold leading-tight text-gray-900 mb-6"
      >
        {blog.title}
      </Typography>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="rounded-xl w-full max-h-[400px] object-cover mb-6 shadow-md mt-5 "
        />
      )}

      <Box className="flex flex-wrap gap-4 text-sm text-gray-600 items-center mb-4">
        <Box className="flex items-center gap-1">
          <CalendarToday fontSize="small" />
          {new Date(blog.createdAt || "").toLocaleDateString()}
        </Box>
        <Box className="flex items-center gap-1">
          <Person fontSize="small" />
          {blog.authorName}
        </Box>
        <Box className="flex items-center gap-1">
          <AccessTime fontSize="small" />
          10 min read
        </Box>
      </Box>

      {blog.tag?.length > 0 && (
        <Box className="flex gap-2 flex-wrap mb-6">
          {blog.tag.map((tag, i) => (
            <Chip key={i} label={`#${tag}`} variant="outlined" />
          ))}
        </Box>
      )}

      <Divider className="my-6" />

      <div className="space-y-6 text-[17px] text-gray-800 leading-relaxed">
        {blog.content.split("\n\n").map((para, index) => {
          const trimmed = para.trim();

          if (trimmed.startsWith("##")) {
            const heading = trimmed.replace(/^##+/, "").trim();
            const id = heading.toLowerCase().replace(/\s+/g, "-");
            return (
              <Typography
                key={index}
                id={id}
                variant="h5"
                className="font-semibold text-gray-900 mt-10 scroll-mt-24"
              >
                {heading}
              </Typography>
            );
          }

          return <p key={index}>{trimmed}</p>;
        })}
      </div>
    </div>
  );
}

export default function BlogDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        setBlog(data.blog);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  return (
    <Suspense
      fallback={
        <Box className="flex justify-center items-center h-screen">
          <CircularProgress />
        </Box>
      }
    >
      {loading ? (
        <Box className="flex justify-center items-center h-screen">
          <CircularProgress />
        </Box>
      ) : blog ? (
        <BlogContent blog={blog} />
      ) : (
        <Box className="text-center mt-10">
          <Typography variant="h5">Blog not found</Typography>
        </Box>
      )}
    </Suspense>
  );
}

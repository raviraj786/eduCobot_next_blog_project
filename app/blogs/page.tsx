"use client";

import React, { useEffect, useState } from "react";
import { Box, Pagination, Typography } from "@mui/material";
import ImgMediaCard from "@/components/ImgMediaCard";
import axios from "axios";
import Link from "next/link";

export default function BlogListingPage() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async (page = 1) => {
    try {
      const res = await axios.get(`/api/blogs?page=${page}&limit=6`);
      if (res.data.success) {
        setBlogs(res.data.blogs);
        setPage(res.data.page);
        setTotalPages(res.data.totalpage);
      }
    } catch (err) {
      console.error("Error fetching blogs", err);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-10 space-y-16">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog, i) => (
            <Link
                      href={`/blogs/${blog.blog_id}`}
                      key={blog.id}
                      className="block hover:opacity-90 transition"
                    >
            <ImgMediaCard key={`blog-${i}`} {...blog} />
            </Link>
          ))
        ) : (
          <Typography variant="body1" className="col-span-3 text-center">
            No blogs found.
          </Typography>
        )}
      </section>

      <Box className="flex justify-center mt-10">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Pagination,
  Button,
  CardActions,
  CircularProgress,
} from "@mui/material";
import ImgMediaCard from "@/components/ImgMediaCard";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDeshboard() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const fetchBlogs = async (page = 1) => {
    setLoading(true);
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
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      `Are you sure you want to delete this blog? ${id}`
    );

    console.log(id , "Ddddddddddd")



    if (!confirm) return;
    try {
      await axios.delete(`/api/blogs/${id}`);
      alert("data deleted")
      fetchBlogs(page); 
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete blog.");
    }
  };

 

  return (
    <Box className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-10 space-y-16">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.length > 0 ? (
              blogs.map((blog, i) => (
                <Box
                  key={`blog-${i}`}
                  className="border rounded-lg overflow-hidden shadow-md transition hover:shadow-lg"
                >
                  <Link
                    href={`/blogs/${blog._id}`}
                    className="block hover:opacity-90 transition"
                  >
                    <ImgMediaCard {...blog} />
                  </Link>
                  <CardActions className="flex justify-between p-3">
                    <Button
                      size="small"
                      color="primary"
                      variant="outlined"
                      onClick={() => handleEdit(blog.blog_id)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={() => handleDelete(blog.blog_id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Box>
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
        </>
      )}
    </Box>
  );
}

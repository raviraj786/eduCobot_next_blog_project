"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminDashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/blogs?page=${page + 1}&limit=${pageSize}`
      );
      const formatted = res.data.blogs.map((blog) => ({
        id: blog._id,
        blog_id: blog._id,
        title: blog.title,
        content: blog.content?.replace(/<[^>]+>/g, "").slice(0, 100),
        image: blog.image,
        author: blog.authorName,
        tag: blog.tag,
        createdAt: new Date(blog.createdAt).toLocaleString(),
      }));
      setBlogs(formatted);
      setTotalBlogs(res.data.totalblogs);
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Failed to load blogs. Please try again later.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs(page, pageSize);
  }, [page, pageSize]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`/api/blogs/${id}`);
        fetchBlogs(page, pageSize);
      } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting blog.");
      }
    }
  };

  const handleAdd = () => {
    router.push("/admin/add");
  };

  const handleEdit = (row) => {
    
    router.push(`/admin/edit/${row.id}`);

  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Blog Image"
          style={{ width: 50, height: 50, borderRadius: 4 }}
        />
      ),
    },
    { field: "title", headerName: "Title", width: 200 },
    { field: "content", headerName: "Content", width: 300 },
    { field: "author", headerName: "Author", width: 150 },
    { field: "tag", headerName: "Tag", width: 120 },
    { field: "createdAt", headerName: "Created At", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditNoteIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
            <DeleteForeverIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box className="flex  ">
      <Box className="flex-1 p-4" sx={{}}>
        <Box className="flex justify-between items-center mb-4">
          <Typography variant="h5" fontWeight="bold">
            Blog Management
          </Typography>
          <Button sx={{ bgcolor: "blue", color: "#ffff" }} onClick={handleAdd}>
            add-blog
          </Button>
        </Box>

        {loading ? (
          <Box className="flex justify-center p-10">
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={blogs}
            columns={columns}
            pagination
            page={page}
            pageSize={pageSize}
            rowCount={totalBlogs}
            paginationMode="server"
            onPageChange={(newPage) => setPage(newPage)}
            onPageSizeChange={(newSize) => {
              setPageSize(newSize);
              setPage(0);
            }}
            loading={loading}
            rowsPerPageOptions={[6, 10, 20]}
            autoHeight
            sx={{
              boxShadow: 2,
              borderRadius: 2,
              bgcolor: "background.paper",
            }}
          />
        )}
      </Box>
    </Box>
  );
}

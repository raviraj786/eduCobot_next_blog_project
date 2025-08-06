"use client";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Link } from "@mui/material";
import axios from "axios";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import IconButton from "@mui/material/IconButton";

export default function BlogTable() {
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0); 
  const [loading, setLoading] = useState(false);

  const fetchData = async (page, pageSize) => {
    setLoading(true);
    try {
      const res = await axios.get("/api/blogs", {
        params: {
          page: page + 1,
          pageSize,
        },
      });

      const blogs = res.data.blogs.map((blog, index) => ({
        id: blog._id,
        title: blog.title,
        description: blog.description?.replace(/<[^>]+>/g, "").slice(0, 100),
        createdAt: blog.createdAt,
      }));

      setRows(blogs);
      setRowCount(res.data.total);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page, pageSize);
  }, [page, pageSize]);

  const handleEdit = (row) => {
    console.log("Edit row", row);
    // Open form, set state, navigate, etc.
  };



  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`/api/blogs/${id}`);
        fetchData(page, pageSize);
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "description", headerName: "Description", width: 400 },
    { field: "createdAt", headerName: "Created At", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
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
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        page={page}
        pageSize={pageSize}
        rowCount={rowCount}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          setPage(0);
        }}
        loading={loading}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </Box>
  );
}

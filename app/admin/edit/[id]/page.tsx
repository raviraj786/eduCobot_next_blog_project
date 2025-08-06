// app/admin/blogs/edit/[id]/page.tsx

"use client";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tag: "",
    authorName: "",
    image: null,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`);
        const blog = res.data;
        console.log("Fetched for edit:", blog);

        setFormData({
          title: blog.title,
          content: blog.content,
          tag: blog.tag,
          authorName: blog.authorName,
          image: null,
        });
      } catch (err) {
        console.error("Fetch for edit error:", err);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("tag", formData.tag);
      data.append("authorName", formData.authorName);
      if (formData.image) {
        data.append("image", formData.image);
      }

      console.log("Updating blog:", formData);
      const res = await axios.put(`/api/blogs/${id}`, data);
      console.log("Updated successfully:", res.data);

      router.push("/admin");
    } catch (err) {
      console.error("Update blog error:", err);
    }
  };

  return (
    <Box className="p-6 max-w-3xl mx-auto">
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Edit Blog
      </Typography>
      <Paper className="p-4">
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            fullWidth
            multiline
            rows={6}
          />
          <TextField
            label="Tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
          />
          <TextField
            label="Author Name"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
          />
          <input type="file" onChange={handleFileChange} />
          <Button variant="contained" onClick={handleUpdate}>
            Update Blog
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

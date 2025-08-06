"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// ⛔ SSR OFF to prevent hydration error
const RichTextEditorClient = dynamic(
  () => import("@/components/RichTextEditorClient"),
  { ssr: false }
);

export default function AddBlogPage() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [editorReady, setEditorReady] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    authorName: "",
    image: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async () => {
    console.log(formData , "solutions")
    if (!content || content.trim() === "") {
      alert("Blog content is required.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", content);
    data.append("tag", formData.tag);
    data.append("authorName", formData.authorName);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      await axios.post("/api/blogs", data);
      router.push("/admin");
    } catch (err) {
      console.error("Error creating blog:", err);
      alert("Failed to create blog");
    }
  };

  return (
    <Box className="p-6 max-w-5xl mx-auto">
      <Typography variant="h4" fontWeight="bold" mb={3}>
        ✍️ Create New Blog
      </Typography>

      <Paper elevation={3} className="p-6">
        <Stack spacing={3}>
          <TextField
            label="Blog Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Tag"
            name="tag"
            value={formData.tag}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Author Name"
            name="authorName"
            value={formData.authorName}
            onChange={handleChange}
            fullWidth
          />

          <input type="file" onChange={handleFileChange} accept="image/*" />

          <Typography variant="h6">Blog Content</Typography>

          <RichTextEditorClient
            value={content}
            onChange={setContent}
            onInit={() => setEditorReady(true)}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!editorReady}
          >
            Submit Blog
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

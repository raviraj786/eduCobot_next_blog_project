"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  TextField,
  Button,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function BlogEditPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [tag, setTag] = useState("");
  const [image, setImage] = useState<File | string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load blog data
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        console.log("Fetching blog for ID:", id);
        const res = await axios.get(`/api/blogs/${id}`);
        console.log("Fetched blog data:", res.data);
        const blog = res.data.blog;

        setTitle(blog.title || "");
        setContent(blog.content || "");
        setAuthorName(blog.authorName || "");
        setTag((blog.tag || []).join(", "));
        setImage(blog.image || "");
      } catch (error) {
        console.error("Failed to load blog:", error);
        alert("Failed to load blog.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Handle new image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG and PNG files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be under 5MB.");
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("author", authorName);
      formData.append("tag", tag);

      if (image instanceof File) {
        formData.append("image", image);
      }

      // Debug: log form data
      console.group("FormData being sent to backend");
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`${key}: FILE ->`, value.name, value.type, value.size + " bytes");
        } else {
          console.log(`${key}:`, value);
        }
      }
      console.groupEnd();

      const res = await axios.put(`/api/blogs/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Response from backend:", res.data);

      if (res.data.success) {
        alert("Blog updated successfully!");
        router.push("/admin");
      } else {
        alert(res.data.message || "Update failed.");
      }
    } catch (error) {
      console.error("Update error:", error);
      alert("Error updating blog.");
    }
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box className="max-w-7xl mx-auto mt-10 p-6 shadow-md bg-white rounded-lg space-y-6 m-10 ">
      <Typography variant="h5" fontWeight="bold" sx={{ textAlign: "center" }}>
        Edit Blog
      </Typography>

      <form onSubmit={handleSubmit} className="space-y-4 m-5">
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ marginBlock: 4 }}
        />

        <TextField
          fullWidth
          label="Tags (comma-separated)"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          sx={{ marginBlock: 4 }}
        />

        <TextField
          fullWidth
          label="Author Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          sx={{ marginBlock: 4 }}
        />

        {image && (
          <div className="mb-6">
            <img
              src={imagePreview || (typeof image === "string" ? image : "")}
              alt="Blog cover preview"
              className="max-h-64 rounded border mb-3 object-contain"
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => document.getElementById("imageInput")?.click()}
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition"
              >
                Replace
              </button>
            </div>
            <input
              id="imageInput"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        )}

        <JoditEditor value={content} onChange={setContent} />

        <Button
          type="submit"
          variant="contained"
          className="w-full mt-6 mb-6 bg-blue-950 "
        >
          Update Blog
        </Button>
      </form>
    </Box>
  );
}

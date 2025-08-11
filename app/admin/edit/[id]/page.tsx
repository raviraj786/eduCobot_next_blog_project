

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
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        console.log("Fetching blog for ID:", id);
        const res = await axios.get(`/api/blogs/${id}`);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const body = {
        title,
        content,
        authorName,
        tag: tag.split(",").map((t) => t.trim()),
        image,
      };

      const res = await axios.put(`/api/blogs/${id}`, body);

      console.log(res.data, "Dddddddddddddddddddddddd");

      if (res.data.success) {
        alert("Blog updated successfully!");
        router.push("/admin");
      } else {
        alert("Update failed.");
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

      <form onSubmit={handleSubmit} className="space-y-4 m-5  ">
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

        <TextField
          fullWidth
          label="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          sx={{ marginBlock: 4 }}
        />

        {image && (
          <Box className="space-y-2">
            <img
              src={image}
              alt="Preview"
              className="w-full max-h-60 object-cover rounded"
            />

            <Box className="flex gap-4">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setImage("")}
              >
                Delete Image
              </Button>

              <Button
                variant="outlined"
                onClick={() => {
                  const newUrl = prompt("Enter new image URL:", image);
                  if (newUrl !== null) setImage(newUrl.trim());
                }}
              >
                Replace Image
              </Button>
            </Box>
          </Box>
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

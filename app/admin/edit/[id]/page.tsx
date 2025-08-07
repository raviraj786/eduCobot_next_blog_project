"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import { useEffect, useRef, useState, Suspense } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams();
  const editor = useRef(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogs/${id}`);
        const blog = res.data;

        console.log(blog  , "Ddddd")

        setTitle(blog.title);
        setTag(blog.tag);
        setAuthorName(blog.authorName);
        setContent(blog.content);
        setImagePreview(blog.imageUrl);
      } catch (err) {
        console.error("Fetch error:", err);
        setToast({ type: "error", message: "Failed to load blog." });
      }
    };

    if (id) fetchBlog();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setToast({ type: "error", message: "Only JPG, JPEG, and PNG files allowed." });
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("tag", tag);
      formData.append("authorName", authorName);
      formData.append("content", content);
      if (image) formData.append("image", image);

      const res = await axios.put(`/api/blogs/${id}`, formData);
      setToast({ type: "success", message: "Blog updated successfully!" });
      setTimeout(() => router.push("/admin/blogs"), 1000);
    } catch (err) {
      console.error("Update error:", err);
      setToast({ type: "error", message: "Failed to update blog." });
    }
    setLoading(false);
  };

  const resetForm = () => {
    setTitle("");
    setTag("");
    setAuthorName("");
    setContent("");
    setImage(null);
    setImagePreview(null);
    setToast(null);
  };

  const config = {
    readonly: false,
    height: 400,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">✍️ Edit Blog</h1>

      {toast && (
        <div
          className={`p-3 mb-4 rounded ${
            toast.type === "error"
              ? "bg-red-100 text-red-700"
              : toast.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {toast.message}
        </div>
      )}

      <input
        type="text"
        placeholder="Blog Title"
        className="w-full p-2 border rounded mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Author Name"
        className="w-full p-2 border rounded mb-3"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full p-2 border rounded mb-3"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 border rounded mb-1"
      />

      {!imagePreview && (
        <p className="text-sm text-red-600 mb-4">
          Only JPG, JPEG, and PNG images are allowed.
        </p>
      )}

      {imagePreview && (
        <img
          src={imagePreview}
          alt="Image Preview"
          className="max-h-64 rounded border mb-5"
        />
      )}

      <Suspense fallback={<div className="text-gray-500 mb-3">Loading editor...</div>}>
        <JoditEditor
          ref={editor}
          value={content}
          config={config}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={() => {}}
        />
      </Suspense>

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>

        <button
          onClick={resetForm}
          disabled={loading}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Reset
        </button>

        <button
          onClick={() => router.push("/admin/blogs")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View All Blogs
        </button>
      </div>
    </div>
  );
}

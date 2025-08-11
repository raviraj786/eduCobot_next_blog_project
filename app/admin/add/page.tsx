"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

type Toast = {
  message: string;
  type: "error" | "success" | "info";
};

export default function AddBlogPage() {
  const editor = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  // Form state
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Loading & UI state
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  // Validation errors (inline)
  const [errors, setErrors] = useState({
    title: "",
    authorName: "",
    content: "",
    image: "",
  });

  // Jodit Editor config
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Write your blog post here...",
      height: 400,
      minHeight: 300,
      maxHeight: 2000,
      style: {
        overflow: "auto",
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      },
    }),
    []
  );

  // Fetch existing blog data if editing
  useEffect(() => {
    if (!blogId) return;
    setInitialLoading(true);
    axios
      .get(`/api/blogs/${blogId}`)
      .then((res) => {
        const data = res.data;
        setTitle(data.title || "");
        setAuthorName(data.authorName || "");
        setTag(data.tag || "");
        setContent(data.content || "");
        setImagePreview(data.imageUrl || null);
      })
      .catch(() => {
        showToast("Failed to load blog data. Please try again later.", "error");
      })
      .finally(() => setInitialLoading(false));
  }, [blogId]);

  const showToast = (message: string, type: Toast["type"]) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        image: "Only JPG, JPEG, and PNG images are allowed.",
      }));
      showToast(
        "Invalid image type. Only JPG, JPEG, and PNG allowed.",
        "error"
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        image: "Image size should be under 5MB.",
      }));
      showToast("Image size too large (max 5MB).", "error");
      return;
    }

    setErrors((prev) => ({ ...prev, image: "" }));
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const validateForm = () => {
    const newErrors = {
      title: title.trim() ? "" : "Title is required.",
      authorName: authorName.trim() ? "" : "Author name is required.",
      content: content.trim() ? "" : "Content cannot be empty.",
      image: errors.image,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const resetForm = () => {
    setTitle("");
    setAuthorName("");
    setTag("");
    setContent("");
    setImage(null);
    setImagePreview(null);
    setErrors({ title: "", authorName: "", content: "", image: "" });
    setToast(null);
  };

  const handleSubmit = async () => {
    if (loading) return;
    if (!validateForm()) {
      showToast("Please fix validation errors before submitting.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("authorName", authorName.trim());
    formData.append("tag", tag.trim());
    formData.append("content", content);
    if (image) formData.append("image", image);

    setLoading(true);
    setToast(null);

    try {
      const res = blogId
        ? await axios.put(`/api/blogs/${blogId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        : await axios.post("/api/blogs", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

      if (res.data?.success) {
        console.log(res.data, "data......");
        alert("Blog created successfully!");
        router.push("/admin");
        showToast(
          blogId ? "Blog created successfully!" : "Blog created successfully!",
          "success"
        );
        if (!blogId) resetForm();
      } else {
        showToast(res.data?.message || "Failed to save blog.", "error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      showToast("Error submitting blog. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">
        {blogId ? "Edit Blog" : "Create New Blog"}
      </h1>

      {toast && (
        <div
          role="alert"
          className={`mb-6 rounded px-4 py-3 ${toast.type === "error"
              ? "bg-red-100 text-red-700"
              : toast.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
        >
          {toast.message}
        </div>
      )}

      {initialLoading ? (
        <Loader />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          noValidate
        >
          <label className="block mb-2 font-medium" htmlFor="title">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            type="text"
            className={`w-full p-3 border rounded mb-3 ${errors.title ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            aria-invalid={!!errors.title}
            aria-describedby="title-error"
          />
          {errors.title && (
            <p id="title-error" className="text-red-600 mb-3 text-sm">
              {errors.title}
            </p>
          )}

          <label className="block mb-2 font-medium" htmlFor="authorName">
            Author Name <span className="text-red-600">*</span>
          </label>
          <input
            id="authorName"
            type="text"
            className={`w-full p-3 border rounded mb-3 ${errors.authorName ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Author name"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            disabled={loading}
            aria-invalid={!!errors.authorName}
            aria-describedby="authorName-error"
          />
          {errors.authorName && (
            <p id="authorName-error" className="text-red-600 mb-3 text-sm">
              {errors.authorName}
            </p>
          )}

          <label className="block mb-2 font-medium" htmlFor="tag">
            Tags (comma separated)
          </label>
          <input
            id="tag"
            type="text"
            className="w-full p-3 border border-gray-300 rounded mb-5"
            placeholder="e.g. tech, programming, nextjs"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            disabled={loading}
          />

          <label className="block mb-2 font-medium" htmlFor="imageInput">
            Cover Image
          </label>

          {!imagePreview && (
            <>
              <input
                id="imageInput"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
                disabled={loading}
                className={`w-full p-2 border rounded mb-2 ${errors.image ? "border-red-500" : "border-gray-300"
                  }`}
                aria-describedby="image-error"
              />
              {errors.image && (
                <p id="image-error" className="text-red-600 mb-4 text-sm">
                  {errors.image}
                </p>
              )}
              <p className="text-sm text-gray-600 mb-4">
                Allowed formats: JPG, JPEG, PNG. Max size: 5MB.
              </p>
            </>
          )}

          {imagePreview && (
            <div className="mb-6">
              <img
                src={imagePreview}
                alt="Blog cover preview"
                className="max-h-64 rounded border mb-3 object-contain"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => document.getElementById("imageInput")?.click()}
                  disabled={loading}
                  className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Replace
                </button>
                <button
                  type="button"
                  onClick={removeImage}
                  disabled={loading}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
              <input
                id="imageInput"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageChange}
                disabled={loading}
                className="hidden"
              />
            </div>
          )}

          <label className="block mb-2 font-medium">
            Content <span className="text-red-600">*</span>
          </label>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
            onChange={() => { }}
            disabled={loading}
          />
          {errors.content && (
            <p className="text-red-600 mt-2 mb-5 text-sm">{errors.content}</p>
          )}

          <div className="flex items-center gap-4 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading
                ? blogId
                  ? "Updating..."
                  : "Submitting..."
                : blogId
                  ? "Update Blog"
                  : "Submit Blog"}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition disabled:opacity-60"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin")}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              View All Blogs
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

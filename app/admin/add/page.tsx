// "use client";

// import { useState, useRef, useMemo, Suspense, useEffect } from "react";
// import dynamic from "next/dynamic";
// import axios from "axios";
// import { useSearchParams, useRouter } from "next/navigation";


// const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// export default function AddBlogPage() {
//   const editor = useRef(null);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const blogId = searchParams.get("id"); 
//   const [title, setTitle] = useState("");
//   const [authorName, setAuthorName] = useState("");
//   const [tag, setTag] = useState("");
//   const [content, setContent] = useState("");
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [toast, setToast] = useState<{ message: string; type: "error" | "success" | "info" } | null>(null);

//   const config = useMemo(
//     () => ({
//       readonly: false,
//       placeholder: "Write your blog post here...",
//       height: "auto",
//       minHeight: 300,
//       maxHeight: 2000,
//       style: {
//         overflow: "auto",
//         padding: "20px",
//       },
//     }),
//     []
//   );

//   useEffect(() => {
//     if (blogId) {
//       axios.get(`/api/blogs/${blogId}`).then((res) => {
//         const data = res.data;
//         setTitle(data.title);
//         setAuthorName(data.authorName);
//         setTag(data.tag);
//         setContent(data.content);
//         setImagePreview(data.imageUrl); 
//       });
//     }
//   }, [blogId]);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//     if (!allowedTypes.includes(file.type)) {
//       setToast({ message: "Only JPG, JPEG, and PNG images are allowed.", type: "error" });
//       return;
//     }

//     setImage(file);
//     setImagePreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async () => {
//     if (!title || !authorName || !content) {
//       setToast({ message: "Please fill all required fields.", type: "error" });
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("authorName", authorName);
//     formData.append("tag", tag);
//     formData.append("content", content);
//     if (image) formData.append("image", image);

//     setLoading(true);
//     setToast(null);

//     try {
//       let res;
//       if (blogId) {
//         res = await axios.put(`/api/blogs/${blogId}`, formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       } else {
//         res = await axios.post("/api/blogs", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//       }

//       const data = res.data;
//       if (data.success) {
//         setToast({ message: blogId ? "Blog updated successfully!" : "Blog created successfully!", type: "success" });
//         if (!blogId) resetForm();
//         // router.push("/admin/blogs"); // uncomment if you want to redirect
//       } else {
//         setToast({ message: "Failed to save blog.", type: "error" });
//       }
//     } catch (err) {
//       console.error("Error during submission:", err);
//       setToast({ message: "Error submitting blog.", type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetForm = () => {
//     setTitle("");
//     setAuthorName("");
//     setTag("");
//     setContent("");
//     setImage(null);
//     setImagePreview(null);
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">{blogId ? "✍️ Edit Blog" : "✍️ New Blog"}</h1>

//       {toast && (
//         <div
//           className={`p-3 mb-4 rounded ${
//             toast.type === "error"
//               ? "bg-red-100 text-red-700"
//               : toast.type === "success"
//               ? "bg-green-100 text-green-700"
//               : "bg-blue-100 text-blue-700"
//           }`}
//         >
//           {toast.message}
//         </div>
//       )}

//       <input
//         type="text"
//         placeholder="Blog Title"
//         className="w-full p-2 border rounded mb-3"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <input
//         type="text"
//         placeholder="Author Name"
//         className="w-full p-2 border rounded mb-3"
//         value={authorName}
//         onChange={(e) => setAuthorName(e.target.value)}
//       />

//       <input
//         type="text"
//         placeholder="Tags (comma separated)"
//         className="w-full p-2 border rounded mb-3"
//         value={tag}
//         onChange={(e) => setTag(e.target.value)}
//       />

//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//         className="w-full p-2 border rounded mb-1"
//       />

//       {!imagePreview && (
//         <p className="text-sm text-red-600 mb-4">Only JPG, JPEG, and PNG images are allowed.</p>
//       )}

//       {imagePreview && (
//         <img
//           src={imagePreview}
//           alt="Image Preview"
//           className="max-h-64 rounded border mb-5"
//         />
//       )}

//       <Suspense fallback={<div className="text-gray-500 mb-3">Loading editor...</div>}>
//         <JoditEditor
//           ref={editor}
//           value={content}
//           config={config}
//           tabIndex={1}
//           onBlur={(newContent) => setContent(newContent)}
//           onChange={() => {}}
//         />
//       </Suspense>

//       <div className="flex items-center gap-4 mt-4">
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {loading ? (blogId ? "Updating..." : "Submitting...") : blogId ? "Update Blog" : "Submit Blog"}
//         </button>

//         <button
//           onClick={resetForm}
//           disabled={loading}
//           className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
//         >
//           Reset
//         </button>

//         <button
//           onClick={() => router.push("/admin")}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           View All Blogs
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useRef, useMemo, Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function AddBlogPage() {
  const editor = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const blogId = searchParams.get("id");

  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [tag, setTag] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "error" | "success" | "info" } | null>(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Write your blog post here...",
      height: "auto",
      minHeight: 300,
      maxHeight: 2000,
      style: {
        overflow: "auto",
        padding: "20px",
      },
    }),
    []
  );

  useEffect(() => {
    if (blogId) {
      setInitialLoading(true);
      axios.get(`/api/blogs/${blogId}`).then((res) => {
        const data = res.data;
        setTitle(data.title);
        setAuthorName(data.authorName);
        setTag(data.tag);
        setContent(data.content);
        setImagePreview(data.imageUrl);
        setInitialLoading(false);
      }).catch(() => {
        setToast({ message: "Failed to load blog.", type: "error" });
        setInitialLoading(false);
      });
    }
  }, [blogId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      setToast({ message: "Only JPG, JPEG, and PNG images are allowed.", type: "error" });
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async () => {
    if (!title || !authorName || !content) {
      setToast({ message: "Please fill all required fields.", type: "error" });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("authorName", authorName);
    formData.append("tag", tag);
    formData.append("content", content);
    if (image) formData.append("image", image);

    setLoading(true);
    setToast(null);

    try {
      let res;
      if (blogId) {
        res = await axios.put(`/api/blogs/${blogId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axios.post("/api/blogs", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      const data = res.data;
      if (data.success) {
        setToast({ message: blogId ? "Blog updated successfully!" : "Blog created successfully!", type: "success" });
        if (!blogId) resetForm();
      } else {
        setToast({ message: "Failed to save blog.", type: "error" });
      }
    } catch (err) {
      console.error("Error during submission:", err);
      setToast({ message: "Error submitting blog.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setAuthorName("");
    setTag("");
    setContent("");
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{blogId ? "✍️ Edit Blog" : "✍️ New Blog"}</h1>

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

      {initialLoading ? <Loader /> : (
        <>
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

          {!imagePreview && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 border rounded mb-2"
              />
              <p className="text-sm text-red-600 mb-4">Only JPG, JPEG, and PNG images are allowed.</p>
            </>
          )}

          {imagePreview && (
            <div className="mb-5">
              <img src={imagePreview} alt="Preview" className="max-h-64 rounded border mb-2" />
              <div className="flex gap-2">
                <button
                  onClick={() => document.getElementById("imageInput")?.click()}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Replace
                </button>
                <button
                  onClick={removeImage}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          )}

          <Suspense fallback={<Loader />}>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
              onChange={() => {}}
            />
          </Suspense>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loading ? (blogId ? "Updating..." : "Submitting...") : blogId ? "Update Blog" : "Submit Blog"}
            </button>

            <button
              onClick={resetForm}
              disabled={loading}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Reset
            </button>

            <button
              onClick={() => router.push("/admin")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              View All Blogs
            </button>
          </div>
        </>
      )}
    </div>
  );
}


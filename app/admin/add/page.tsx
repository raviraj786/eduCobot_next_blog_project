// "use client";

// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Stack,
//   Paper,
// } from "@mui/material";
// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import RichTextEditorClient from "@/components/RichTextEditorClient";

// import dynamic from "next/dynamic";

// export default function AddBlogPage() {
//   const router = useRouter();
//   const [content, setContent] = useState("");
//   const [editorReady, setEditorReady] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     tag: "",
//     authorName: "",
//     image: null as File | null,
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setFormData((prev) => ({ ...prev, image: file }));
//   };

//   const handleSubmit = async () => {

//    console.log(formData , "form data........")

//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("content", content);
//     data.append("tag", formData.tag);
//     data.append("authorName", formData.authorName);
//     if (formData.image) {
//       data.append("image", formData.image);
//     }

//     try {
//       await axios.post("/api/blogs", data);
//       router.push("/admin");
//     } catch (err) {
//       console.error("Error creating blog:", err);
//       alert("Failed to create blog");
//     }
//   };

//   return (
//     <Box className="p-6 max-w-5xl mx-auto">
//       <Typography variant="h4" fontWeight="bold" mb={3}>
//         ✍️ Create New Blog
//       </Typography>

//       <Paper elevation={3} className="p-6">
//         <Stack spacing={3}>
//           <TextField
//             label="Blog Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             label="Tag"
//             name="tag"
//             value={formData.tag}
//             onChange={handleChange}
//             fullWidth
//           />

//           <TextField
//             label="Author Name"
//             name="authorName"
//             value={formData.authorName}
//             onChange={handleChange}
//             fullWidth
//           />

//           <input
//             type="file"
//             onChange={handleFileChange}
//             accept="image/*"
//           />

//           <Typography variant="h6">Blog Content</Typography>

//            <Box
//             ref={editorContainerRef}
//             id="rich-text-editor-root"
//             sx={{
//               border: "1px solid #ddd",
//               borderRadius: "8px",
//               padding: 2,
//               backgroundColor: "#fff",
//               minHeight: "300px",
//             }}
//           />

//           <Button
//             variant="contained"
//             onClick={handleSubmit}

//           >
//             Submit Blog
//           </Button>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// }

"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  Paper,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const RichTextEditorClient = dynamic(
  () => import("@/components/RichTextEditorClient"),
  {
    ssr: false,
  }
);

export default function AddBlogPage() {
  const router = useRouter();
  const editorContainerRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<any>(null);

  const [formData, setFormData] = useState({
    title: "",
    tag: "",
    authorName: "",
    image: null as File | null,
  });

  useEffect(() => {
    if (!editorContainerRef.current) return;

    // Wait for the DOM to mount, then initialize
    const { makeRichText } = require("rich-text-editor/dist/rich-text-editor");

    editorInstanceRef.current = makeRichText({
      container: editorContainerRef.current,
      language: "FI",
      baseUrl: "",
      allowedFileTypes: ["image/png", "image/jpeg"],
      onValueChange: () => {},
      textAreaProps: {
        id: "blog-editor",
        className: "editor",
        editorStyle: {
          minHeight: "300px",
          padding: "1rem",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#fff",
        },
      },
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async () => {
    const content = editorInstanceRef.current?.getHTML?.();
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
      const res = await axios.post("/api/blogs", data);
      console.log("Blog created:", res.data);
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

          <input type="file" onChange={handleFileChange} />

          <Typography variant="h6">Blog Content</Typography>
          <RichTextEditorClient
            initialContent=""
            onChange={handleEditorChange}
          />

          <Button variant="contained" onClick={handleSubmit}>
            Submit Blog
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}

import React from "react";
import { Typography, Box, Chip, Divider } from "@mui/material";
import { AccessTime, CalendarToday, Person } from "@mui/icons-material";

type Blog = {
  title: string;
  content: string;
  image?: string;
  authorName: string;
  createdAt?: string;
  tag?: string[];
};

export default function BlogContent({ blog }: { blog: Blog; blog_id: string }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Typography variant="h4" className="font-extrabold text-red-600 mb-6">
        {blog.title}
      </Typography>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="rounded-xl w-full max-h-[400px] object-cover mb-6 shadow-md mt-5"
        />
      )}

      <Box className="flex flex-wrap gap-4 text-sm text-gray-600 items-center mb-4">
        <Box className="flex items-center gap-1">
          <CalendarToday fontSize="small" />
          {new Date(blog.createdAt || "").toLocaleDateString()}
        </Box>
        <Box className="flex items-center gap-1">
          <Person fontSize="small" />
          {blog.authorName}
        </Box>
        <Box className="flex items-center gap-1">
          <AccessTime fontSize="small" />
          10 min read
        </Box>
      </Box>

      {blog.tag?.length > 0 && (
        <Box className="flex gap-2 flex-wrap mb-6">
          {blog.tag.map((tag, i) => (
            <Chip key={i} label={`#${tag}`} variant="outlined" />
          ))}
        </Box>
      )}

      <Divider className="my-6" />

      <div
        className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}

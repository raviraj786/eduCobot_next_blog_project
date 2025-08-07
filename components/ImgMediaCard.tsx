import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import DOMPurify from "dompurify";
import Props from "@/types/index";
import { format } from "date-fns";

export default function ImgMediaCard({
  id,
  title,
  content,
  image,
  tag,
  createdAt,
}: Props) {
  const cleanContent = DOMPurify.sanitize(content || "");
  const formattedDate = createdAt
    ? format(new Date(createdAt), "MMMM d, yyyy • h:mm a")
    : "Unknown Date";


    console.log(content , "Ddddddd")

  return (
    <Card
      sx={{
        width: 360,
        height: 480,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "#ffffff",
        boxShadow: 4,
        margin: 2,
      }}
    >
      <CardMedia
        component="img"
        alt={title}
        height="160"
        image={image || "/fallback.jpg"}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ px: 3, py: 2, flex: "1 1 auto" }}>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: "1.2rem",
            fontFamily: "Georgia, serif",
            mb: 1,
            lineHeight: 1.3,
            height: "3em",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title || "Untitled Blog"}
        </Typography>

       
      <Typography  style={{
            maxHeight: "90px",
            overflow: "auto",
            fontSize: "14px",
            color: "#444",
            fontFamily: "Georgia, serif",
            lineHeight: "1.5em",
          }}>VIEW THESE RESOURCES</Typography>
      </CardContent>

      <CardActionArea>
        <div className="px-4 pb-4">
          {/* Tags */}
          <div className="flex flex-wrap mb-2">
            {tag?.map((item, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mr-2 mb-2"
              >
                #{item}
              </span>
            ))}
          </div>

          {/* Date */}
          <p className="text-sm text-gray-600 font-serif">📅 {formattedDate}</p>
        </div>
      </CardActionArea>
    </Card>
  );
}

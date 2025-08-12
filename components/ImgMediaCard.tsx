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
import { format, differenceInHours } from "date-fns";
import { AccessTime, CalendarToday, Person } from "@mui/icons-material";

export default function ImgMediaCard({
  id,
  title,
  content,
  image,
  tag,
  createdAt,
}: Props) {
  const cleanContent = DOMPurify.sanitize(content || "");


  const dateObj = new Date(createdAt);
  const hoursAgo = differenceInHours(new Date(), dateObj);

  let displayTime;
  if (hoursAgo < 24) {
    displayTime = `${hoursAgo} hours ago`;
  } else {
    displayTime = format(dateObj, "dd MMM yyyy, hh:mm a");
  }

  return (
    <Card
      sx={{
        width: "80%",
        height: 480,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 3,
        overflow: "hidden",
        backgroundColor: "#ffffff",
        boxShadow: 4,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          backgroundColor: "#000",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
        className="h-[320px] sm:h-[250px] md:h-[300px] lg:h-[250px]"
      >
        <CardMedia
          component="img"
          alt={title}
          image={image || "/fallback.jpg"}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            backgroundColor: "#000",
          }}
          onError={(e) => {
            e.currentTarget.src = "/fallback.jpg";
          }}
        />
      </div>

      <CardContent sx={{ px: 3, py: 2, flex: "1 1 auto" }}>
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
          {title?.slice(0, 60) || "Untitled Blog"}
        </Typography>

        <Typography
          component="div"
          dangerouslySetInnerHTML={{
            __html: cleanContent + "...",
          }}
          sx={{
            fontSize: "14px",
            color: "#444",
            fontFamily: "Georgia, serif",
            lineHeight: "1.5em",
            maxHeight: "90px",
            overflow: "hidden",
          }}
        />
      </CardContent>

      <CardActionArea>
        <div className="px-4 pb-4">
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
          <div className=" flex items-center gap-1 ">
            <AccessTime fontSize="small" />
            <p className="text-sm text-gray-600 ">{displayTime}</p>
          </div>
        </div>
      </CardActionArea>
    </Card>
  );
}

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Props from "@/types/index";

export default function ImgMediaCard({
  id,
  title,
  content,
  image,
  tag,
  createdAt,
}: Props) {
  return (

    <Card
      sx={{
        maxWidth: 345,
        margin: 2,
        cursor: "pointer",
        backgroundColor: "#f1f1f1",
      }}
    >
      <CardMedia component="img" alt={title} height="140" image={image} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontSize: 17, fontWeight: "700", fontFamily: "serif" }}
        >
         {title?.slice(0, 100)} 
        </Typography>
        <Typography
          variant="body2"
          height="50"
          sx={{ color: "#9f9d9a", fontSize: 18, fontFamily: "serif" }}
        >
          {content?.slice(0, 150)}...
        </Typography>
      </CardContent>
      <CardActionArea>
        <div className="px-4 pt-2 pb-3">
          {/* {tag.map((item, i) => (
            <span
              key={i}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 font-serif "
            >
              #{item}
            </span>
          ))} */}
          <p className="text-sm text-gray-500 mt-2 font-serif ">📅 {createdAt}</p>
        </div>
      </CardActionArea>
    </Card>
  );
}

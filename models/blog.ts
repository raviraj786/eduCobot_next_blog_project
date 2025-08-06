import mongoose, { Document, Schema, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";


export interface IBlog extends Document {
  blog_id: string;
  title: string;
  content: string;
  image?: string;
  tag?: string[];
  authorName: string; 
  createdAt?: Date;
  updatedAt?: Date;
}


const BlogSchema: Schema<IBlog> = new Schema(
  {
    blog_id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Please provide content"],
    },
    image: {
      type: String,
    },
    tag: {
      type: [String],
      default: [],
    },
    authorName: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);

export default Blog;

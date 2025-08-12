import { dbconnction } from "@/lib/db";
import Blogs from "@/models/blog";
import cloudinary from "@/lib/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};


//carete blog api
export async function POST(req: NextRequest) {
  try {
    const conn = await dbconnction();
    console.log("MongoDB connected:", conn?.connection?.readyState);

    const postData = await req.formData();
    const title = postData.get("title") as string;
    const content = postData.get("content") as string;
    const tagString = postData.get("tag") as string;
    const authorName = postData.get("authorName") as string;

    if (!title || !content || !authorName) {
      return NextResponse.json(
        {
          success: false,
          error: "Title, content, and author name are required",
        },
        { status: 400 }
      );
    }

    const tag = tagString ? tagString.split(",").map((t) => t.trim()) : [];

    const file = postData.get("image") as File;
    if (!file || !file.name) {
      return NextResponse.json(
        { success: false, error: "Image is required" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "blogs" }, (err, result) => {
            if (err || !result) return reject(err);
            resolve(result as any);
          })
          .end(buffer);
      }
    );

    const blog = await Blogs.create({
      blog_id: uuidv4(),
      title,
      content,
      tag,
      authorName,
      image: uploadResult.secure_url,
    });

    return NextResponse.json({ success: true, blog }, { status: 201 });
  } catch (error) {
    console.error("Blog creation failed:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}



//show blogs
export async function GET(req: NextRequest) {
  try {
    const conn = await dbconnction();
    console.log("MongoDB connected:", conn?.connection?.readyState);

    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const skip = (page - 1) * limit;

    const blogs = await Blogs.find()
      .skip(skip)
      .limit(limit)
      .sort({ updatedAt: -1  })
      // .sort({ createdAt: -1 });
      
    const totalblogs = await Blogs.countDocuments();
    const totalpage = Math.ceil(totalblogs / limit);
    return NextResponse.json({
      success: true,
      page,
      totalpage,
      totalblogs,
      blogs,
    });
  } catch (error) {
    console.error("Blog fetch failed:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

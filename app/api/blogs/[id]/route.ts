import { dbconnction } from "@/lib/db";
import Blogs from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary"
import { Readable } from "stream";

//find  single blog id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conn = await dbconnction();
    console.log("MongoDB connected:", conn?.connection?.readyState);

    const { id } =  await  params;
    // console.log(id , "idddddddddddddddddddd")
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID format" },
        { status: 400 }
      );
    }

    const blog = await Blogs.findOne({ blog_id: id });

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog }, { status: 200 });
  } catch (error: any) {
    console.error("GET /api/blogs/:blog_id error:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

//update apis

export async function PUT(req: Request, { params }) {
  try {
    console.log(params , "id")
    const id  =  params.id;
    console.log(id)
    const formData = await req.formData();

    const title = formData.get("title");
    const content = formData.get("content");
    const tag = formData.get("tag");
    const author = formData.get("author");
    const imageFile = formData.get("image");
    const existingBlog = await Blogs.findOne({ blog_id: id });
    if (!existingBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }
    let imageUrl = existingBlog.image;
    if (imageFile && typeof imageFile?.arrayBuffer === "function") {
      if (existingBlog.image_public_id) {
        await cloudinary.uploader.destroy(existingBlog.image_public_id);
      }
      const arrayBuffer = await imageFile?.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      imageUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "blogs" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result?.secure_url);
          }
        );
        Readable.from(buffer).pipe(stream);
      });
    }

    const updatedBlog = await Blogs.findOneAndUpdate(
      { blog_id: id },
      { title, content, tag, author, image: imageUrl, createdAt: new Date() },
      { new: true }
    );

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}




//  DELETE
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbconnction();
    const { id } = params;

    console.log(id, "is");

    const deleted = await Blogs.findOneAndDelete({ blog_id: id });

    if (!deleted) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE /blogs/:id error:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

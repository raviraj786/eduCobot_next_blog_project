import { dbconnction } from "@/lib/db";
import Blogs from "@/models/blog";
import { NextRequest, NextResponse } from "next/server";

//find  single blog id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const conn = await dbconnction();
    console.log("MongoDB connected:", conn?.connection?.readyState);

    const { id } = params;
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
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await req.json();
    const updatedBlog = await Blogs.findOneAndUpdate({ blog_id: id }, body, {
      new: true,
    });
    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

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

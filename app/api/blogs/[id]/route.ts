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

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID format" },
        { status: 400 }
      );
    }

    const blog = await Blogs.findOne({ blog_id : id });

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





export async function PUT(
  req: NextRequest,
  { params }: { params: { blog_id: string } }
) {
  try {
     const conn = dbconnction()
     console.log(conn , "db connted")
     
    const { blog_id } = params;
    console.log(blog_id , "id")

    if (!isValidObjectId(blog_id)) {
      return NextResponse.json(
        { success: false, message: "Invalid blog ID" },
        { status: 400 }
      );
    }

    const data = await req.json();

    // Optional: add schema-level validation here

    const updated = await Blogs.findByIdAndUpdate(blog_id, data, {
      new: true,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Blog updated successfully",
        blog: updated,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PUT /blogs/:id error:", error.message);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}





// // ✅ DELETE: Delete blog by ID
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { blog_id: string } }
// ) {
//   try {
//     await dbConnection();
//     const { blog_id } = params;

//     if (!isValidObjectId(blog_id)) {
//       return NextResponse.json(
//         { success: false, message: "Invalid blog ID" },
//         { status: 400 }
//       );
//     }

//     const deleted = await Blogs.findByIdAndDelete(blog_id);

//     if (!deleted) {
//       return NextResponse.json(
//         { success: false, message: "Blog not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { success: true, message: "Blog deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error("DELETE /blogs/:id error:", error.message);
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }

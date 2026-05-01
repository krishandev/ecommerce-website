import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { NextResponse } from "next/server";

/* -------------------- GET ALL BLOGS -------------------- */
export async function GET() {
  await connectDB();

  const blogs = await Blog.find().sort({ createdAt: -1 });

  return NextResponse.json(blogs);
}

/* -------------------- CREATE BLOG -------------------- */
export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();

    // ✅ VALIDATION
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Title & Content required" },
        { status: 400 }
      );
    }

    // ✅ SLUG GENERATE
    const slug = body.title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    // ✅ CHECK DUPLICATE
    const exists = await Blog.findOne({ slug });

    if (exists) {
      return NextResponse.json(
        { error: "Blog already exists" },
        { status: 400 }
      );
    }

    // ✅ CREATE BLOG
    const blog = await Blog.create({
      title: body.title,
      slug,
      description: body.description,
      content: body.content,
      image: body.image,
      category: body.category,
      author: body.author || "Admin",
    });

    return NextResponse.json(blog, { status: 201 });

  } catch (error) {
    console.error("BLOG POST ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
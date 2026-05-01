import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { NextResponse } from "next/server";

/* -------------------- GET SINGLE BLOG -------------------- */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectDB();

  const { slug } = await params;

  const blog = await Blog.findOne({ slug });

  if (!blog) {
    return NextResponse.json(
      { error: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(blog);
}

/* -------------------- UPDATE BLOG -------------------- */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectDB();

  try {
    const { slug } = await params;
    const body = await req.json();

    const newSlug = body.title
      ?.toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const updated = await Blog.findOneAndUpdate(
      { slug },
      {
        title: body.title,
        slug: newSlug,
        description: body.description,
        content: body.content,
        image: body.image,
        category: body.category,
        author: body.author,
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);

  } catch (error) {
    console.error("BLOG UPDATE ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

/* -------------------- DELETE BLOG -------------------- */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectDB();

  const { slug } = await params;

  const deleted = await Blog.findOneAndDelete({ slug });

  if (!deleted) {
    return NextResponse.json(
      { error: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
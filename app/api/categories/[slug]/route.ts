import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { NextResponse } from "next/server";

/* ---------------- UPDATE ---------------- */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectDB();

  try {
    const { slug } = await params;
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Name required" },
        { status: 400 }
      );
    }

    const newSlug = body.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const updated = await Category.findOneAndUpdate(
      { slug },
      { name: body.name, slug: newSlug, image: body.image, },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);

  } catch (error) {
    console.error("PUT ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

/* ---------------- DELETE ---------------- */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await connectDB();

  try {
    const { slug } = await params;

    const deleted = await Category.findOneAndDelete({ slug });

    if (!deleted) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
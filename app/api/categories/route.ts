import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";
import { NextResponse } from "next/server";

/* ---------------- GET ALL ---------------- */
export async function GET() {
  await connectDB();

  const categories = await Category.find().sort({ createdAt: -1 });

  return NextResponse.json(categories);
}

/* ---------------- CREATE CATEGORY ---------------- */
export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();

    if (!body.name) {
      return NextResponse.json(
        { error: "Name required" },
        { status: 400 }
      );
    }

    const slug = body.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const exists = await Category.findOne({ slug });

    if (exists) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 400 }
      );
    }

    const category = await Category.create({
      name: body.name,
      slug,
      image: body.image,
    });

    return NextResponse.json(category, { status: 201 });

  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const blogs = await Blog.find();

  return NextResponse.json(blogs);
}
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  await Product.deleteMany();

  await Product.insertMany([
    {
      name: "Modern Wooden Chair",
      slug: "modern-wooden-chair",
      price: 120,
      oldPrice: 150,
      category: "chairs",
      rating: 4,
      description: "Premium wooden chair",
      stock: true,
      image: "https://images.unsplash.com/photo-1582582429416-0d3c4e54b64b",
      images: [
        "https://images.unsplash.com/photo-1582582429416-0d3c4e54b64b",
      ],
    },
    {
      name: "Minimal Dining Table",
      slug: "minimal-dining-table",
      price: 300,
      category: "tables",
      rating: 4,
      description: "Elegant dining table",
      stock: true,
      image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      images: [
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
      ],
    },
  ]);

  return NextResponse.json({ message: "Seeded successfully" });
}
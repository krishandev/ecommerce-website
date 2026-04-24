import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

/* -------------------- GET ALL PRODUCTS -------------------- */
export async function GET() {
  await connectDB();

  const products = await Product.find().sort({ createdAt: -1 });

  return NextResponse.json(products);
}

/* -------------------- ADD PRODUCT -------------------- */
export async function POST(req: Request) {
  await connectDB();

  try {
    const body = await req.json();

    // ✅ VALIDATION
    if (!body.name || !body.slug || !body.price || !body.category || !body.image) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    // ✅ CHECK DUPLICATE SLUG
    const existing = await Product.findOne({ slug: body.slug });

    if (existing) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      );
    }

    // ✅ CREATE PRODUCT
    const product = await Product.create({
      name: body.name,
      slug: body.slug,
      price: body.price,
      oldPrice: body.oldPrice,
      category: body.category,
      rating: body.rating || 4,
      description: body.description || "",
      stock: body.stock ?? true,
      image: body.image,
      images: body.images || [body.image],
    });

    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error("POST ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
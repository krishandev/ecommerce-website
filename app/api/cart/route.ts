import { connectDB } from "@/lib/mongodb";
import { Cart } from "@/models/Cart";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { items } = await req.json();

  let cart = await Cart.findOne({ userId });

  if (cart) {
    // 🔥 merge carts
    cart.items = items;
await cart.save();

  } else {
    cart = await Cart.create({ userId, items });
  }

  await cart.save();

  return NextResponse.json(cart);
}


// ✅ GET CART
export async function GET() {
  try {
    await connectDB();

    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { items: [] },
        { status: 200 }
      );
    }

    const cart = await Cart.findOne({ userId });

    return NextResponse.json(cart || { items: [] });

  } catch (error) {
    console.error("GET CART ERROR:", error);

    return NextResponse.json(
      { items: [] },
      { status: 500 }
    );
  }
}


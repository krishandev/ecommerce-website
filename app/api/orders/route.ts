import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { Cart } from "@/models/Cart";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  const order = await Order.create({
    userId,
    ...body,
  });

  // 🔥 CLEAR CART AFTER ORDER
  await Cart.findOneAndUpdate(
    { userId },
    { items: [] }
  );

  return NextResponse.json(order);
}
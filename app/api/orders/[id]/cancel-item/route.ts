import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  await connectDB();

  // ✅ FIX
  const { id } = await params;

  const formData = await req.formData();

  const slug = formData.get("slug");

  const order = await Order.findById(id);

  if (!order) {

    return NextResponse.json(
      {
        error: "Order not found",
      },
      {
        status: 404,
      }
    );
  }

  order.items = order.items.map((item: any) => {

    if (item.slug === slug) {
      item.status = "Cancelled";
    }

    return item;
  });

  await order.save();

  return NextResponse.redirect(
    new URL("/dashboard/orders", req.url)
  );
}
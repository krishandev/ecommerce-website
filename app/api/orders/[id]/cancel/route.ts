import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  await connectDB();

  const { id } = await params;

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

  // ✅ UPDATE ORDER STATUS
  order.status = "Cancelled";

  // ✅ ALSO CANCEL ALL PRODUCTS
  order.items = order.items.map((item: any) => ({
    ...item,
    status: "Cancelled",
  }));

  await order.save();

  return NextResponse.redirect(
    new URL("/dashboard/orders", req.url)
  );
}
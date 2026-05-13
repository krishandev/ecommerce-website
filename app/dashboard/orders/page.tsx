import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export default async function OrdersPage() {

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await connectDB();

  const orders = await Order.find({
    userId,
  }).sort({ createdAt: -1 });

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      <div className="space-y-6">

        {orders.length === 0 && (
          <p>No orders found.</p>
        )}

        {orders.map((order: any) => (

          <div
            key={order._id}
            className="border rounded-xl p-6"
          >

            <div className="flex justify-between items-center mb-4">

              <div>
                <p className="font-semibold">
                  Order ID:
                </p>

                <p className="text-sm text-gray-500">
                  {order._id.toString()}
                </p>
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-600">
                  {order.status}
                </span>
              </div>

            </div>

            <div className="space-y-4">

              {order.items.map((item: any) => (

                <div
  key={item.slug}
  className="flex gap-4 items-center border-b pb-4"
>

  <img
    src={item.image}
    alt={item.name}
    className="w-20 h-20 object-cover rounded-lg"
  />

  <div className="flex-1">

    <h2 className="font-semibold">
      {item.name}
    </h2>

    <p>
      Qty: {item.quantity}
    </p>

    <p>
      ${item.price}
    </p>

    <div className="mt-2 flex items-center gap-3">

      <span
        className={`text-xs px-2 py-1 rounded-full ${
          item.status === "Cancelled"
            ? "bg-red-100 text-red-600"
            : "bg-green-100 text-green-600"
        }`}
      >
        {item.status}
      </span>

      {item.status !== "Cancelled" && (
        <form
          action={`/api/orders/${order._id}/cancel-item`}
          method="POST"
        >

          <input
            type="hidden"
            name="slug"
            value={item.slug}
          />

          <button
            className="text-sm text-red-500 hover:underline"
          >
            Cancel Product
          </button>

        </form>
      )}

    </div>

  </div>

</div>

              ))}

            </div>

            <div className="flex justify-between items-center mt-6">

              <h2 className="text-xl font-bold">
                Total: ${order.total}
              </h2>

              {order.status === "Pending" && (

                <form
                  action={`/api/orders/${order._id}/cancel`}
                  method="POST"
                >
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Cancel Order
                  </button>
                </form>

              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
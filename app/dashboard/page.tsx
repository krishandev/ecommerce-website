import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-8">
        My Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Link
          href="/dashboard/orders"
          className="border rounded-xl p-6 hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            My Orders
          </h2>

          <p className="text-gray-500">
            View and manage your orders.
          </p>
        </Link>

      </div>
    </div>
  );
}
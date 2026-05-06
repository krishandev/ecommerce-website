import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-4">
        Order Placed 🎉
      </h1>

      <p className="text-gray-600 mb-6">
        Thank you for your purchase.
      </p>

      <Link
        href="/"
        className="bg-[#ff6a00] text-white px-6 py-3 rounded-full"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
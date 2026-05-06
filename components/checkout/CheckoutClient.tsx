"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type CartItem = {
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
};

export default function CheckoutClient() {
  const { user } = useUser();
  const router = useRouter();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FORM
  const [form, setForm] = useState({
    fullName: "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  // 🔥 LOAD CART
  useEffect(() => {
    const loadCart = async () => {
      const res = await fetch("/api/cart");
      const data = await res.json();

      setCart(data?.items || []);
    };

    loadCart();
  }, []);

  // 🔥 CALCULATIONS
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  // 🔥 HANDLE INPUT
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 PLACE ORDER
const placeOrder = async () => {
  // ✅ VALIDATION
  if (
    !form.fullName ||
    !form.email ||
    !form.phone ||
    !form.address ||
    !form.city ||
    !form.state ||
    !form.zipCode ||
    !form.country
  ) {
    toast.error("Please fill all shipping details");
    return;
  }

  // ✅ EMPTY CART CHECK
  if (cart.length === 0) {
    toast.error("Your cart is empty");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart,
        shippingAddress: form,
        subtotal,
        shipping,
        total,
      }),
    });

    if (!res.ok) {
      throw new Error("Order failed");
    }

    toast.success("Order placed successfully 🎉");

    router.push("/checkout/success");

  } catch (err) {
    console.error(err);

    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-10">

        {/* 📝 SHIPPING FORM */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-semibold mb-6">
            Shipping Details
          </h2>

          <div className="space-y-4">

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
                className="border rounded-lg px-4 py-3"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                onChange={handleChange}
                className="border rounded-lg px-4 py-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                onChange={handleChange}
                className="border rounded-lg px-4 py-3"
              />

              <input
                type="text"
                name="country"
                placeholder="Country"
                onChange={handleChange}
                className="border rounded-lg px-4 py-3"
              />
            </div>

          </div>
        </div>

        {/* 💳 ORDER SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow-sm border h-fit">
          <h2 className="text-xl font-semibold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.slug}
                className="flex justify-between"
              >
                <span>
                  {item.name} × {item.quantity}
                </span>

                <span>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <hr className="my-6" />

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}
            disabled={loading}
            className="w-full mt-6 bg-[#ff6a00] text-white py-3 rounded-full disabled:opacity-50"
          >
            {loading ? "Processing..." : "Place Order"}
          </button>
        </div>

      </div>
    </main>
  );
}
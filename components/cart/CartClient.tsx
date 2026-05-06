"use client";

import { useEffect, useState } from "react";
import { getCart, saveCart } from "@/lib/cart";
import toast from "react-hot-toast";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type CartItem = {
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
};

export default function CartClient() {
  const { isSignedIn, isLoaded } = useUser();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔥 LOAD CART (IMPORTANT)
  useEffect(() => {
    const loadCart = async () => {
      if (!isLoaded) return;

      // ✅ LOGGED-IN USER → LOAD FROM DB
      if (isSignedIn) {
        try {
          const res = await fetch("/api/cart");
          const data = await res.json();

          setCart(data?.items || []);
        } catch (err) {
          console.error("DB cart error:", err);
        }
      } 
      // ✅ GUEST USER → LOAD FROM LOCAL
      else {
        setCart(getCart());
      }

      setLoading(false);
    };

    loadCart();

    // 🔥 listen for updates (for guest cart)
    const handleUpdate = () => {
      if (!isSignedIn) {
        setCart(getCart());
      }
    };

    window.addEventListener("cartUpdated", handleUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleUpdate);
    };
  }, [isSignedIn, isLoaded]);

  // 🔥 UPDATE CART (IMPORTANT)
const updateCart = async (updated: CartItem[]) => {
  setCart(updated);

  // ✅ LOGGED-IN USER → DB
  if (isSignedIn) {
    await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: updated }),
    });

    // 🔥 IMPORTANT
    window.dispatchEvent(new Event("cartUpdated"));
  }

  // ✅ GUEST USER → LOCAL
  else {
    saveCart(updated);

    // 🔥 IMPORTANT
    window.dispatchEvent(new Event("cartUpdated"));
  }
};

  // 🔥 INCREASE QTY
  const increaseQty = (slug: string) => {
    const updated = cart.map((item) =>
      item.slug === slug
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updated);
  };

  // 🔥 DECREASE QTY
  const decreaseQty = (slug: string) => {
    const updated = cart.map((item) =>
      item.slug === slug
        ? {
            ...item,
            quantity: item.quantity > 1 ? item.quantity - 1 : 1,
          }
        : item
    );
    updateCart(updated);
  };

  // 🔥 REMOVE ITEM
  const removeItem = (slug: string) => {
    const item = cart.find((i) => i.slug === slug);

    const updated = cart.filter((i) => i.slug !== slug);
    updateCart(updated);

    if (item) {
      toast(`${item.name} removed from your cart 🗑️`);
    }
  };

  // 🔥 CALCULATIONS
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const shipping = cart.length > 0 ? 0 : 0;
  const total = subtotal + shipping;

  // 🔥 LOADING STATE
  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading cart...
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-4">
            Your cart is empty
          </p>
          <Link
            href="/"
            className="bg-[#ff6a00] text-white px-6 py-2 rounded-full"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* 🛒 ITEMS */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.slug}
                className="flex gap-4 p-4 border rounded-xl shadow-sm bg-white"
              >
                <img
                  src={item.image}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h2 className="font-semibold text-lg">
                    {item.name}
                  </h2>

                  <p className="text-[#ff6a00] font-bold mt-1">
                    ${item.price}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => decreaseQty(item.slug)}
                      className="px-3 py-1 border rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item.slug)}
                      className="px-3 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(item.slug)}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* 💳 SUMMARY */}
          <div className="border p-6 rounded-xl bg-white shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-4">
              Order Summary
            </h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <hr />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
  onClick={() => router.push("/checkout")}
  className="w-full mt-6 bg-[#ff6a00] text-white py-3 rounded-full hover:opacity-90 transition"
>
  Proceed to Checkout
</button>
          </div>
        </div>
      )}
    </main>
  );
}



// "use client";

// import { useEffect, useState } from "react";
// import { getCart, saveCart } from "@/lib/cart";
// import toast from "react-hot-toast";
// import Link from "next/link";

// type CartItem = {
//   name: string;
//   slug: string;
//   image: string;
//   price: number;
//   quantity: number;
// };

// export default function CartClient() {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   // 🔥 Load cart
// useEffect(() => {
//   const loadCart = () => {
//     const data = getCart();
//     setCart(data);
//   };

//   loadCart(); // initial load

//   // 🔥 listen for updates
//   window.addEventListener("cartUpdated", loadCart);

//   return () => {
//     window.removeEventListener("cartUpdated", loadCart);
//   };
// }, []);

//   // 🔥 Calculate subtotal
//   const subtotal = cart.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   const shipping = cart.length > 0 ? 0 : 0;
//   const total = subtotal + shipping;

//   // 🔥 Update cart helper
//   const updateCart = (updated: CartItem[]) => {
//     setCart(updated);
//     saveCart(updated); // triggers header update
//   };

//   // 🔥 Increase quantity
//   const increaseQty = (slug: string) => {
//     const updated = cart.map((item) =>
//       item.slug === slug
//         ? { ...item, quantity: item.quantity + 1 }
//         : item
//     );
//     updateCart(updated);
//   };

//   // 🔥 Decrease quantity
//   const decreaseQty = (slug: string) => {
//     const updated = cart.map((item) =>
//       item.slug === slug
//         ? {
//             ...item,
//             quantity: item.quantity > 1 ? item.quantity - 1 : 1,
//           }
//         : item
//     );
//     updateCart(updated);
//   };

//   // 🔥 Remove item
//   const removeItem = (slug: string) => {
//     const item = cart.find((i) => i.slug === slug);

//     const updated = cart.filter((i) => i.slug !== slug);
//     updateCart(updated);

//     if (item) {
//       toast(`${item.name} removed from your cart 🗑️`);
//     }
//   };

//   // 🔥 Empty cart cleanup
//   useEffect(() => {
//     if (cart.length === 0) {
//       localStorage.removeItem("cart");
//     }
//   }, [cart]);

//   return (
//     <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
//       <h1 className="text-2xl md:text-3xl font-bold mb-8">Your Cart</h1>

//       {cart.length === 0 ? (
//         /* EMPTY STATE */
//         <div className="text-center py-20">
//           <p className="text-gray-500 text-lg mb-4">
//             Your cart is empty
//           </p>
//           <Link
//             href="/"
//             className="bg-[#ff6a00] text-white px-6 py-2 rounded-full"
//           >
//             Continue Shopping
//           </Link>
//         </div>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-8">
          
//           {/* 🛒 CART ITEMS */}
//           <div className="md:col-span-2 space-y-4">
//             {cart.map((item) => (
//               <div
//                 key={item.slug}
//                 className="flex gap-4 p-4 border rounded-xl shadow-sm bg-white"
//               >
//                 {/* IMAGE */}
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-24 h-24 object-cover rounded"
//                 />

//                 {/* DETAILS */}
//                 <div className="flex-1">
//                   <h2 className="font-semibold text-lg">
//                     {item.name}
//                   </h2>
//                   <p className="text-[#ff6a00] font-bold mt-1">
//                     ${item.price}
//                   </p>

//                   {/* QUANTITY */}
//                   <div className="flex items-center gap-2 mt-3">
//                     <button
//                       onClick={() => decreaseQty(item.slug)}
//                       className="px-3 py-1 border rounded hover:bg-gray-100"
//                     >
//                       -
//                     </button>

//                     <span className="px-3">{item.quantity}</span>

//                     <button
//                       onClick={() => increaseQty(item.slug)}
//                       className="px-3 py-1 border rounded hover:bg-gray-100"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 {/* REMOVE */}
//                 <button
//                   onClick={() => removeItem(item.slug)}
//                   className="text-red-500 text-sm hover:underline"
//                 >
//                   Remove
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* 💳 ORDER SUMMARY */}
//           <div className="border rounded-xl p-6 bg-white shadow-sm h-fit md:sticky md:top-20">
//             <h2 className="text-xl font-semibold mb-4">
//               Order Summary
//             </h2>

//             <div className="space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Shipping</span>
//                 <span>
//                   {shipping === 0 ? "Free" : `$${shipping}`}
//                 </span>
//               </div>

//               <hr />

//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//             </div>

//             <button className="w-full mt-6 bg-[#ff6a00] text-white py-3 rounded-full hover:opacity-90 transition">
//               Proceed to Checkout
//             </button>

//             <Link
//               href="/"
//               className="block text-center text-sm text-gray-500 mt-4 hover:underline"
//             >
//               Continue Shopping
//             </Link>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }
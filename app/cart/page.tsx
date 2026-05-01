"use client";

import { useEffect, useState } from "react";
import { getCart, saveCart } from "@/lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const removeItem = (slug: string) => {
    const updated = cart.filter((item) => item.slug !== slug);
    setCart(updated);
    saveCart(updated);
  };

  return (
    <main className="max-w-4xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div className="space-y-4">

          {cart.map((item) => (
            <div
              key={item.slug}
              className="flex items-center justify-between border p-4 rounded"
            >
              <div className="flex items-center gap-4">
                <img src={item.image} className="w-16 h-16 object-cover" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>${item.price}</p>
                  <p>Qty: {item.quantity}</p>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.slug)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}

        </div>
      )}

    </main>
  );
}


// "use client";

// import { useState, useMemo, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";

// /* -------------------- TYPES -------------------- */
// type CartItem = {
//   name: string;
//   slug: string;
//   price: number;
//   quantity: number;
//   image: string;
// };

// /* -------------------- DUMMY DATA -------------------- */
// const INITIAL_CART: CartItem[] = [
//   {
//     name: "Modern Wooden Chair",
//     slug: "modern-wooden-chair",
//     price: 120,
//     quantity: 1,
//     image:
//       "https://images.unsplash.com/photo-1582582429416-0d3c4e54b64b?q=80&w=800",
//   },
//   {
//     name: "Luxury Sofa",
//     slug: "luxury-sofa",
//     price: 400,
//     quantity: 1,
//     image:
//       "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800",
//   },
// ];

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState<CartItem[]>([]);

//   /* -------------------- LOAD FROM LOCAL STORAGE -------------------- */
//   useEffect(() => {
//     const stored = localStorage.getItem("cart");
//     if (stored) {
//       setCartItems(JSON.parse(stored));
//     } else {
//       setCartItems(INITIAL_CART);
//     }
//   }, []);

//   /* -------------------- SAVE TO LOCAL STORAGE -------------------- */
//   useEffect(() => {
//     if (cartItems.length > 0) {
//       localStorage.setItem("cart", JSON.stringify(cartItems));
//     }
//   }, [cartItems]);

//   /* -------------------- UPDATE QUANTITY -------------------- */
//   const updateQty = (slug: string, type: "inc" | "dec") => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.slug === slug
//           ? {
//               ...item,
//               quantity:
//                 type === "inc"
//                   ? item.quantity + 1
//                   : Math.max(1, item.quantity - 1),
//             }
//           : item
//       )
//     );
//   };

//   /* -------------------- REMOVE ITEM -------------------- */
//   const removeItem = (slug: string) => {
//     setCartItems((prev) => prev.filter((item) => item.slug !== slug));
//   };

//   /* -------------------- TOTAL CALCULATION -------------------- */
//   const subtotal = useMemo(() => {
//     return cartItems.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );
//   }, [cartItems]);

//   const shipping = subtotal > 0 ? 20 : 0;
//   const total = subtotal + shipping;

//   /* -------------------- EMPTY STATE -------------------- */
//   if (!cartItems.length) {
//     return (
//       <main className="max-w-7xl mx-auto px-4 py-16 text-center">
//         <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
//         <Link
//           href="/products"
//           className="bg-[#ff6a00] text-white px-6 py-3 rounded-full"
//         >
//           Continue Shopping
//         </Link>
//       </main>
//     );
//   }

//   /* -------------------- UI -------------------- */
//   return (
//     <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">

//       {/* HEADER */}
//       <div className="mb-8">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
//           Shopping Cart
//         </h1>
//         <p className="text-gray-600 text-sm mt-1">
//           Review your selected items before checkout
//         </p>
//       </div>

//       {/* LAYOUT */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//         {/* LEFT: CART ITEMS */}
//         <div className="lg:col-span-2 space-y-6">
//           {cartItems.map((item) => (
//             <div
//               key={item.slug}
//               className="flex gap-4 bg-white p-4 rounded-xl shadow-sm"
//             >
//               {/* IMAGE */}
//               <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden">
//                 <Image
//                   src={item.image}
//                   alt={item.name}
//                   fill
//                   className="object-contain"
//                 />
//               </div>

//               {/* INFO */}
//               <div className="flex-1">
//                 <Link
//                   href={`/products/${item.slug}`}
//                   className="font-semibold hover:text-[#ff6a00]"
//                 >
//                   {item.name}
//                 </Link>

//                 <p className="text-sm text-gray-500 mt-1">
//                   ${item.price.toFixed(2)}
//                 </p>

//                 {/* QUANTITY */}
//                 <div className="flex items-center gap-3 mt-3">
//                   <button
//                     onClick={() => updateQty(item.slug, "dec")}
//                     className="px-3 py-1 border rounded"
//                     aria-label="Decrease quantity"
//                   >
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button
//                     onClick={() => updateQty(item.slug, "inc")}
//                     className="px-3 py-1 border rounded"
//                     aria-label="Increase quantity"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* REMOVE */}
//               <button
//                 onClick={() => removeItem(item.slug)}
//                 className="text-red-500 text-sm"
//                 aria-label="Remove item"
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* RIGHT: SUMMARY */}
//         <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-20">

//           <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

//           <div className="flex justify-between text-sm mb-2">
//             <span>Subtotal</span>
//             <span>${subtotal.toFixed(2)}</span>
//           </div>

//           <div className="flex justify-between text-sm mb-2">
//             <span>Shipping</span>
//             <span>${shipping.toFixed(2)}</span>
//           </div>

//           <div className="border-t my-3"></div>

//           <div className="flex justify-between font-semibold text-lg">
//             <span>Total</span>
//             <span>${total.toFixed(2)}</span>
//           </div>

//           {/* CHECKOUT */}
//           <Link
//             href="/checkout"
//             className="block text-center mt-6 bg-[#ff6a00] text-white py-3 rounded-full hover:bg-orange-600 transition"
//           >
//             Proceed to Checkout
//           </Link>

//           {/* CONTINUE SHOPPING */}
//           <Link
//             href="/products"
//             className="block text-center mt-3 text-sm text-gray-500 hover:text-[#ff6a00]"
//           >
//             Continue Shopping
//           </Link>

//         </div>
//       </div>

//       {/* FAQ (AEO) */}
//       <section className="mt-12">
//         <h2 className="text-xl font-bold mb-4">FAQs</h2>
//         <div className="text-sm text-gray-600 space-y-2">
//           <p>
//             <strong>Can I update quantity?</strong> Yes, you can increase or decrease items anytime.
//           </p>
//           <p>
//             <strong>How do I remove items?</strong> Click the remove button next to the product.
//           </p>
//         </div>
//       </section>

//     </main>
//   );
// }
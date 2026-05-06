import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export default async function CheckoutPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in?redirect_url=/checkout");
  }

  return <CheckoutClient />;
}


// "use client";

// import { useState, useMemo } from "react";

// /* -------------------- TYPES -------------------- */
// type CartItem = {
//   name: string;
//   price: number;
//   quantity: number;
// };

// /* -------------------- DUMMY CART -------------------- */
// const CART_ITEMS: CartItem[] = [
//   { name: "Modern Wooden Chair", price: 120, quantity: 1 },
//   { name: "Luxury Sofa", price: 400, quantity: 1 },
// ];

// export default function CheckoutPage() {
//   /* -------------------- FORM STATE -------------------- */
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//   });

//   const [shipping, setShipping] = useState("standard");
//   const [payment, setPayment] = useState("cod");
//   const [errors, setErrors] = useState<any>({});

//   /* -------------------- TOTAL -------------------- */
//   const subtotal = useMemo(() => {
//     return CART_ITEMS.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );
//   }, []);

//   const shippingCost = shipping === "express" ? 50 : 20;
//   const total = subtotal + shippingCost;

//   /* -------------------- HANDLE CHANGE -------------------- */
//   const handleChange = (e: any) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   /* -------------------- VALIDATION -------------------- */
//   const validate = () => {
//     let newErrors: any = {};

//     if (!form.name) newErrors.name = "Name is required";
//     if (!form.email || !form.email.includes("@"))
//       newErrors.email = "Valid email required";
//     if (!form.phone) newErrors.phone = "Phone is required";
//     if (!form.address) newErrors.address = "Address is required";
//     if (!form.city) newErrors.city = "City is required";
//     if (!form.state) newErrors.state = "State is required";
//     if (!form.zip) newErrors.zip = "ZIP is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* -------------------- SUBMIT -------------------- */
//   const handleSubmit = () => {
//     if (!validate()) return;

//     console.log("Order Placed:", {
//       form,
//       shipping,
//       payment,
//       CART_ITEMS,
//     });

//     alert("Order placed successfully!");
//   };

//   /* -------------------- UI -------------------- */
//   return (
//     <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">

//       {/* HEADER */}
//       <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>
//       <p className="text-gray-600 text-sm mb-8">
//         Secure checkout with fast delivery options
//       </p>

//       {/* LAYOUT */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//         {/* LEFT FORM */}
//         <div className="lg:col-span-2 space-y-6">

//           {/* BILLING */}
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <h2 className="font-semibold mb-4">Billing Details</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {[
//                 { name: "name", label: "Full Name" },
//                 { name: "email", label: "Email" },
//                 { name: "phone", label: "Phone" },
//                 { name: "city", label: "City" },
//                 { name: "state", label: "State" },
//                 { name: "zip", label: "ZIP Code" },
//               ].map((field) => (
//                 <div key={field.name}>
//                   <input
//                     type="text"
//                     name={field.name}
//                     placeholder={field.label}
//                     value={(form as any)[field.name]}
//                     onChange={handleChange}
//                     className="w-full border p-2 rounded"
//                   />
//                   {errors[field.name] && (
//                     <p className="text-red-500 text-xs mt-1">
//                       {errors[field.name]}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* ADDRESS */}
//             <div className="mt-4">
//               <textarea
//                 name="address"
//                 placeholder="Address"
//                 value={form.address}
//                 onChange={handleChange}
//                 className="w-full border p-2 rounded"
//               />
//               {errors.address && (
//                 <p className="text-red-500 text-xs mt-1">
//                   {errors.address}
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* SHIPPING */}
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <h2 className="font-semibold mb-4">Shipping</h2>

//             <label className="block mb-2">
//               <input
//                 type="radio"
//                 checked={shipping === "standard"}
//                 onChange={() => setShipping("standard")}
//               />{" "}
//               Standard (₹20)
//             </label>

//             <label>
//               <input
//                 type="radio"
//                 checked={shipping === "express"}
//                 onChange={() => setShipping("express")}
//               />{" "}
//               Express (₹50)
//             </label>
//           </div>

//           {/* PAYMENT */}
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <h2 className="font-semibold mb-4">Payment</h2>

//             <label className="block mb-2">
//               <input
//                 type="radio"
//                 checked={payment === "cod"}
//                 onChange={() => setPayment("cod")}
//               />{" "}
//               Cash on Delivery
//             </label>

//             <label>
//               <input
//                 type="radio"
//                 checked={payment === "card"}
//                 onChange={() => setPayment("card")}
//               />{" "}
//               Credit / Debit Card
//             </label>
//           </div>

//         </div>

//         {/* RIGHT SUMMARY */}
//         <div className="bg-white p-6 rounded-xl shadow-sm h-fit sticky top-20">

//           <h2 className="font-semibold mb-4">Order Summary</h2>

//           {/* ITEMS */}
//           <div className="space-y-3 text-sm">
//             {CART_ITEMS.map((item, i) => (
//               <div key={i} className="flex justify-between">
//                 <span>
//                   {item.name} x {item.quantity}
//                 </span>
//                 <span>₹{item.price * item.quantity}</span>
//               </div>
//             ))}
//           </div>

//           <div className="border-t my-4"></div>

//           <div className="flex justify-between text-sm">
//             <span>Subtotal</span>
//             <span>₹{subtotal}</span>
//           </div>

//           <div className="flex justify-between text-sm">
//             <span>Shipping</span>
//             <span>₹{shippingCost}</span>
//           </div>

//           <div className="border-t my-4"></div>

//           <div className="flex justify-between font-semibold text-lg">
//             <span>Total</span>
//             <span>₹{total}</span>
//           </div>

//           {/* PLACE ORDER */}
//           <button
//             onClick={handleSubmit}
//             className="w-full mt-6 bg-[#ff6a00] text-white py-3 rounded-full hover:bg-orange-600 transition"
//           >
//             Place Order
//           </button>
//         </div>
//       </div>

//       {/* FAQ (AEO) */}
//       <section className="mt-12">
//         <h2 className="text-xl font-bold mb-4">FAQs</h2>
//         <div className="text-sm text-gray-600 space-y-2">
//           <p>
//             <strong>Is payment secure?</strong> Yes, all payments are encrypted and secure.
//           </p>
//           <p>
//             <strong>What payment methods are available?</strong> COD and card payments are supported.
//           </p>
//         </div>
//       </section>

//     </main>
//   );
// }
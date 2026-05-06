"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { getCart } from "@/lib/cart";

export default function CartSync() {
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const localCart = getCart();

    if (localCart.length === 0) return;

    // 🔥 Sync cart to DB
    fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: localCart }),
    }).then(() => {
      // 🔥 Clear local cart after sync
      localStorage.removeItem("cart");

      // 🔥 Notify UI (header/cart update)
      window.dispatchEvent(new Event("cartUpdated"));
    });
  }, [isLoaded, isSignedIn]);

  return null; // ❗ no UI
}
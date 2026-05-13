"use client";

// ✅ Clerk
import {
  UserButton,
  SignInButton,
  useUser,
} from "@clerk/nextjs";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getCart } from "@/lib/cart";
import {
  Menu,
  X,
  ShoppingCart,
  Heart,
  Search,
} from "lucide-react";


// ✅ Admin config
import { ADMIN_EMAIL } from "@/lib/config";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const [cartCount, setCartCount] = useState(0);

  const { user, isSignedIn, isLoaded } = useUser();

  const userEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase();

  const isAdmin =
    isLoaded &&
    isSignedIn &&
    userEmail === ADMIN_EMAIL?.toLowerCase();

    console.log("isLoaded:", isLoaded);
console.log("isSignedIn:", isSignedIn);
console.log("User email:", user?.primaryEmailAddress?.emailAddress);
console.log("Admin email:", ADMIN_EMAIL);


useEffect(() => {
  const loadCartCount = async () => {
    if (!isLoaded) return;

    // ✅ LOGGED USER → DB
    if (isSignedIn) {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();

        const count =
          data?.items?.reduce(
            (acc: number, item: any) => acc + item.quantity,
            0
          ) || 0;

        setCartCount(count);

      } catch (err) {
        console.error("Header cart error:", err);
      }
    }

    // ✅ GUEST → LOCAL
    else {
      const localCart = getCart();

      const count = localCart.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      setCartCount(count);
    }
  };

  loadCartCount();

  // 🔥 listen for updates
  const handleCartUpdate = () => {
  loadCartCount();
};

window.addEventListener("cartUpdated", handleCartUpdate);

return () => {
  window.removeEventListener(
    "cartUpdated",
    handleCartUpdate
  );
};

  return () => {
    window.removeEventListener(
      "cartUpdated",
      loadCartCount
    );
  };
}, [isSignedIn, isLoaded]);



  return (
    <header
      className={`w-full bg-white z-50 transition-all ${
        isSticky ? "shadow-md fixed top-0 left-0" : "relative"
      }`}
    >
      {/* TOP BAR */}
      <div className="bg-[#222] text-white text-sm py-2 px-4 text-center">
        Free shipping on orders over $50 🚚
      </div>

      {/* MAIN HEADER */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo1.svg"
            alt="Logo"
            width={200}
            height={60}
            priority
          />
        </Link>

        {/* SEARCH */}
        <div className="hidden md:flex flex-1 mx-6">
          <div className="flex w-full border rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-4 py-2 outline-none"
            />
            <button className="bg-[#ff6a00] px-4 text-white">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4">

          {/* LOGIN */}
          {!isSignedIn && (
            <SignInButton mode="modal">
              <button className="text-sm border px-3 py-1 rounded">
                Login
              </button>
            </SignInButton>
          )}

          {/* USER + ADMIN */}
          {/* USER + DASHBOARD */}
{isSignedIn && (
  <div className="flex items-center gap-4">

    {/* DASHBOARD */}
    <Link
      href="/dashboard"
      className="text-sm hover:text-[#ff6a00] transition"
    >
      Dashboard
    </Link>

    {/* ADMIN */}
    {isAdmin && (
      <Link
        href="/admin"
        className="text-sm text-[#ff6a00] font-semibold"
      >
        Admin
      </Link>
    )}

    {/* USER BUTTON */}
    <UserButton />
  </div>
)}

          {/* WISHLIST */}
          <Link href="/wishlist">
            <Heart className="w-5 h-5 hover:text-[#ff6a00]" />
          </Link>

          {/* CART */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="w-5 h-5 hover:text-[#ff6a00]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ff6a00] text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button className="md:hidden" onClick={() => setIsOpen(true)}>
            <Menu />
          </button>

        </div>
      </div>

      {/* NAVBAR */}
      <nav className="hidden md:flex justify-center gap-8 border-t py-3 text-sm font-medium">
        <Link href="/">Home</Link>
        <Link href="/products">All Products</Link>
        <Link href="/category/chairs">Chairs</Link>
        <Link href="/category/tables">Tables</Link>
        <Link href="/category/sofas">Sofas</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50">
          <div className="bg-white w-3/4 h-full p-6">
            <div className="flex justify-between mb-6">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setIsOpen(false)}>
                <X />
              </button>
            </div>

            <div className="flex flex-col gap-4 text-sm">
              <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="/products" onClick={() => setIsOpen(false)}>Products</Link>
              <Link href="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
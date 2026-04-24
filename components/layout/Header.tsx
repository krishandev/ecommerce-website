"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShoppingCart, Heart, User, Search } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [cartCount] = useState(2); // mock (replace with context)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

        {/* SEARCH (Desktop) */}
        <div className="hidden md:flex flex-1 mx-6">
          <div className="flex w-full border rounded-full overflow-hidden">
            <input
              type="text"
              placeholder="Search for products, categories..."
              className="w-full px-4 py-2 outline-none"
              aria-label="Search products"
            />
            <button className="bg-[#ff6a00] px-4 text-white">
              <Search size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4">
          <Link href="/login" aria-label="Account">
            <User className="w-5 h-5 hover:text-[#ff6a00]" />
          </Link>

          <Link href="/wishlist" aria-label="Wishlist">
            <Heart className="w-5 h-5 hover:text-[#ff6a00]" />
          </Link>

          <Link href="/cart" className="relative" aria-label="Cart">
            <ShoppingCart className="w-5 h-5 hover:text-[#ff6a00]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ff6a00] text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="hidden md:flex justify-center gap-8 border-t py-3 text-sm font-medium">
        <Link href="/" className="hover:text-[#ff6a00]">
          Home
        </Link>
        <Link href="/products" className="hover:text-[#ff6a00]">
          All Products
        </Link>

        {/* CATEGORY DROPDOWN */}
        <div className="relative group">
          <button className="hover:text-[#ff6a00]">Our Category</button>
          <div className="absolute hidden group-hover:block bg-white shadow-md mt-2 p-4 min-w-[200px]">
            <Link href="/category/chairs" className="block py-1 hover:text-[#ff6a00]">
              Chairs
            </Link>
            <Link href="/category/tables" className="block py-1 hover:text-[#ff6a00]">
              Tables
            </Link>
            <Link href="/category/sofas" className="block py-1 hover:text-[#ff6a00]">
              Sofas
            </Link>
          </div>
        </div>

        <Link href="/blog" className="hover:text-[#ff6a00]">
          Blog
        </Link>
        <Link href="/about" className="hover:text-[#ff6a00]">
          About
        </Link>
        <Link href="/contact" className="hover:text-[#ff6a00]">
          Contact
        </Link>
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

            {/* MOBILE SEARCH */}
            <div className="mb-4">
              <div className="flex border rounded-full overflow-hidden">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 outline-none"
                />
                <button className="bg-[#ff6a00] px-4 text-white">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* LINKS */}
            <div className="flex flex-col gap-4 text-sm">
              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/products" onClick={() => setIsOpen(false)}>
                All Products
              </Link>
              <Link href="/category" onClick={() => setIsOpen(false)}>
                Our Category
              </Link>
              <Link href="/blog" onClick={() => setIsOpen(false)}>
                Blog
              </Link>
              <Link href="/about" onClick={() => setIsOpen(false)}>
                About
              </Link>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
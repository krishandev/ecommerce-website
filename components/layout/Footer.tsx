"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-12">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

        {/* BRAND */}
        <div>
          <Image
            src="/logo1.svg"
            alt="MartFury Logo"
            width={200}
            height={60}
            className="mb-4"
          />
          <p className="text-sm mb-3">
            Premium furniture for modern homes. Designed for comfort and style.
          </p>
          <p className="text-sm">📍 New York, USA</p>
          <p className="text-sm">📧 support@martfury.com</p>
          <p className="text-sm">📞 +1 234 567 890</p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold mb-4 text-black">Quick Links</h3>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-[#ff6a00]">Home</Link>
            <Link href="/products" className="hover:text-[#ff6a00]">All Products</Link>
            <Link href="/category" className="hover:text-[#ff6a00]">Our Category</Link>
            <Link href="/blog" className="hover:text-[#ff6a00]">Blog</Link>
            <Link href="/about" className="hover:text-[#ff6a00]">About</Link>
            <Link href="/contact" className="hover:text-[#ff6a00]">Contact</Link>
          </nav>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="font-semibold mb-4 text-black">Customer Support</h3>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/faq" className="hover:text-[#ff6a00]">FAQs</Link>
            <Link href="/shipping-policy" className="hover:text-[#ff6a00]">Shipping Policy</Link>
            <Link href="/return-policy" className="hover:text-[#ff6a00]">Return Policy</Link>
            <Link href="/terms" className="hover:text-[#ff6a00]">Terms & Conditions</Link>
            <Link href="/privacy-policy" className="hover:text-[#ff6a00]">Privacy Policy</Link>
          </nav>
        </div>

        {/* CATEGORIES */}
        <div>
          <h3 className="font-semibold mb-4 text-black">Categories</h3>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/category/chairs" className="hover:text-[#ff6a00]">Chairs</Link>
            <Link href="/category/tables" className="hover:text-[#ff6a00]">Tables</Link>
            <Link href="/category/sofas" className="hover:text-[#ff6a00]">Sofas</Link>
            <Link href="/category/beds" className="hover:text-[#ff6a00]">Beds</Link>
            <Link href="/category/storage" className="hover:text-[#ff6a00]">Storage</Link>
          </nav>
        </div>

        {/* NEWSLETTER */}
        <div>
          <h3 className="font-semibold mb-4 text-black">Newsletter</h3>
          <p className="text-sm mb-3">
            Get updates on offers and new products.
          </p>
          <form className="flex items-center border rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full outline-none text-sm"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-[#ff6a00] px-4 py-2 text-white flex items-center justify-center"
            >
              <FaEnvelope size={16} />
            </button>
          </form>

          {/* AEO Hint Section */}
          <div className="mt-4 text-xs text-gray-500">
            <p>How to track order?</p>
            <p>What is return policy?</p>
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t mt-10"></div>

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">

        {/* COPYRIGHT */}
        <p>
          © {new Date().getFullYear()} MartFury. All rights reserved.
        </p>

        {/* SOCIAL + PAYMENT */}
        <div className="flex items-center gap-4">

          {/* SOCIAL */}
          <div className="flex gap-3">
            <Link href="#" aria-label="Facebook">
              <FaFacebook className="w-5 h-5 hover:text-[#ff6a00]" />
            </Link>
            <Link href="#" aria-label="Instagram">
              <FaInstagram className="w-5 h-5 hover:text-[#ff6a00]" />
            </Link>
            <Link href="#" aria-label="Twitter">
              <FaTwitter className="w-5 h-5 hover:text-[#ff6a00]" />
            </Link>
          </div>

          {/* PAYMENT ICONS */}
          <div className="flex items-center gap-2 ml-4">
            <Image src="/payments/visa.png" alt="Visa" width={40} height={20} />
            <Image src="/payments/mastercard.png" alt="Mastercard" width={40} height={20} />
            <Image src="/payments/paypal.png" alt="PayPal" width={40} height={20} />
          </div>

        </div>
      </div>
    </footer>
  );
}
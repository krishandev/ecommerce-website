"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-8">

        {/* LEFT CONTENT */}
        <div className="text-center md:text-left space-y-4 animate-fadeInUp">
          
          {/* Label */}
          <p className="text-sm text-[#ff6a00] font-medium">
            Limited Edition
          </p>

          {/* H1 (SEO Important) */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Modern Furniture Collection for Your Home
          </h1>

          {/* Description (AEO Friendly) */}
          <p className="text-gray-600 text-sm md:text-base">
            Shop modern furniture for your home with premium quality, elegant design, 
            and affordable pricing. Upgrade your living space today.
          </p>

          {/* Price */}
          <p className="text-lg font-semibold text-gray-800">
            Starting from <span className="text-[#ff6a00]">$199.99</span>
          </p>

          {/* CTA */}
          <Link
            href="/products"
            aria-label="Shop furniture products"
            className="inline-block bg-[#ff6a00] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-orange-600 transition"
          >
            Shop Now
          </Link>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative w-full h-[300px] md:h-[450px]">
          <Image
            src="https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1200&auto=format&fit=crop"
            alt="Modern bedroom furniture"
            fill
            priority
            className="object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
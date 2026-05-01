"use client";

import Image from "next/image";
import Link from "next/link";

type Category = {
  name: string;
  slug: string;
  image?: string;
};

type CategoryGridProps = {
  categories: Category[];
  title?: string;
  description?: string;
};

export default function CategoryGrid({
  categories,
  title = "Shop by Category",
  description = "Browse furniture categories to find the perfect items for your home.",
}: CategoryGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">

      {/* HEADING */}
      <div className="text-center md:text-left mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {title}
        </h2>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          {description}
        </p>
      </div>

      {/* EMPTY STATE */}
      {categories.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No categories available
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">

          {categories.map((category) => (
            <Link
              key={category.slug} // ✅ FIX (no index)
              href={`/category/${category.slug}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
            >

              {/* IMAGE */}
              <div className="relative w-full h-[140px] bg-gray-100 overflow-hidden">

                <Image
                  src={category.image || "/placeholder.jpg"} // ✅ fallback
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover group-hover:scale-105 transition duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition"></div>
              </div>

              {/* NAME */}
              <div className="p-3 text-center">
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[#ff6a00] transition">
                  {category.name}
                </h3>
              </div>

            </Link>
          ))}

        </div>
      )}
    </section>
  );
}
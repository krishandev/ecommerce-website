"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

type Product = {
  name: string;
  slug: string;
  image: string;
  price: number;
  oldPrice?: number;
  category?: string;
  rating?: number;
};

type ProductGridProps = {
  products: Product[];
  title?: string;
  description?: string;
  loading?: boolean;
};

export default function ProductGrid({
  products,
  title,
  description,
  loading = false,
}: ProductGridProps) {
  const [visibleCount, setVisibleCount] = useState(4);


  // ✅ SAFETY CHECK
  if (!Array.isArray(products)) {
    console.error("❌ Invalid products:", products);
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      
      {/* HEADING */}
      {title && (
        <div className="mb-6 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {title}
          </h2>
          {description && (
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              {description}
            </p>
          )}
        </div>
      )}

      {/* LOADING */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse h-[300px] rounded-xl"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        /* EMPTY */
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      ) : (
        /* GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, visibleCount).map((product) => (
            <ProductCard
              key={product.slug || product.name}
              {...product}
            />
          ))}
        </div>
      )}

      {/* LOAD MORE */}
      {!loading && visibleCount < products.length && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setVisibleCount((prev) => prev + 4)}
            className="px-6 py-2 border border-gray-300 rounded-full text-sm hover:bg-[#ff6a00] hover:text-white transition"
          >
            Load More ({products.length - visibleCount} left)
          </button>
        </div>
      )}

      {/* END MESSAGE */}
      {!loading && visibleCount >= products.length && products.length > 8 && (
        <p className="text-center mt-6 text-gray-400 text-sm">
          No more products
        </p>
      )}
    </section>
  );
}
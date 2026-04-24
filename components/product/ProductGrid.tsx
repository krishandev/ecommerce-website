"use client";

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

   // ✅ SAFETY CHECK (prevents .map crash)
  if (!Array.isArray(products)) {
    console.error("❌ Invalid products:", products);
    return null;
  }

  
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10">

      {/* Heading (SEO + AEO) */}
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

      {/* LOADING STATE */}
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
        /* EMPTY STATE */
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      ) : (
        /* PRODUCT GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      )}

      {/* LOAD MORE (Optional UI) */}
      {!loading && products.length > 0 && (
        <div className="flex justify-center mt-10">
          <button className="px-6 py-2 border border-gray-300 rounded-full text-sm hover:bg-[#ff6a00] hover:text-white transition">
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
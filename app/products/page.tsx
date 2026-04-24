"use client";

import { useState, useMemo, useEffect } from "react";
import ProductGrid from "@/components/product/ProductGrid";

// ✅ IMPORT ASYNC HELPER
import { getAllProducts, Product } from "@/lib/products";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sort, setSort] = useState<string>("default");

  /* -------------------- FETCH PRODUCTS -------------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* -------------------- FILTER + SORT -------------------- */
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // FILTER
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category === selectedCategory.toLowerCase()
      );
    }

    // SORT
    if (sort === "low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedCategory, sort]);

  /* -------------------- LOADING -------------------- */
  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 py-10">
        <p className="text-center text-gray-500">Loading products...</p>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          All Products
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Browse all furniture products including chairs, sofas, tables, and beds.
        </p>
      </div>

      {/* LAYOUT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* SIDEBAR */}
        <aside className="md:col-span-1 bg-white p-4 rounded-xl shadow-sm h-fit">
          <h3 className="font-semibold mb-4">Filters</h3>

          {/* CATEGORY */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">Category</p>

            {["all", "chairs", "sofas", "tables", "beds", "storage"].map((cat) => (
              <label key={cat} className="flex items-center gap-2 text-sm mb-1 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                />
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </label>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <div className="md:col-span-3">

          {/* TOP BAR */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <p className="text-sm text-gray-500">
              Showing {filteredProducts.length} products
            </p>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border px-3 py-2 rounded-md text-sm"
            >
              <option value="default">Default</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {/* GRID */}
          <ProductGrid products={filteredProducts} />

        </div>
      </div>
    </main>
  );
}
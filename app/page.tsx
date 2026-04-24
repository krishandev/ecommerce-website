import Hero from "@/components/home/Hero";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryGrid from "@/components/home/CategoryGrid";
import Features from "@/components/home/Features";

// ✅ IMPORT API FUNCTION
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic"; // 🔥 IMPORTANT

const categories = [
  {
    name: "Chairs",
    slug: "chairs",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800",
  },
  {
    name: "Sofas",
    slug: "sofas",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800",
  },
  {
    name: "Tables",
    slug: "tables",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800",
  },
  {
    name: "Beds",
    slug: "beds",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800",
  },
  {
    name: "Storage",
    slug: "storage",
    image: "https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=800",
  },
];

export default async function Home() {
  // ✅ FETCH FROM API
  const products = await getAllProducts();

  return (
    <div className="flex flex-col flex-1 bg-zinc-50 dark:bg-black">
      <main>

        {/* HERO */}
        <Hero />

        {/* FEATURES */}
        <Features />

        {/* CATEGORY */}
        <CategoryGrid categories={categories} />

        {/* PRODUCTS */}
        <div className="mt-10 px-4 md:px-8">
          <ProductGrid
            products={products.slice(0, 4)} // 🔥 dynamic now
            title="Featured Products"
            description="Explore our collection of modern furniture designed for comfort and style."
          />
        </div>

      </main>
    </div>
  );
}
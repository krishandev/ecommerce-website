import { getBaseUrl } from "@/lib/getBaseUrl";
import Hero from "@/components/home/Hero";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryGrid from "@/components/home/CategoryGrid";
import Features from "@/components/home/Features";

// ✅ IMPORT API FUNCTION
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic"; // 🔥 IMPORTANT



export default async function Home() {
  // ✅ FETCH FROM API
  const products = await getAllProducts();
  

  const categories = await fetch(
  `${getBaseUrl()}/api/categories`,
  { cache: "no-store" } // 🔥 important
).then((res) => res.json());


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
            products={products} // 🔥 dynamic now
            title="Featured Products"
            description="Explore our collection of modern furniture designed for comfort and style."
          />
        </div>

      </main>
    </div>
  );
}
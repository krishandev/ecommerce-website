import { getProductsByCategory } from "@/lib/products";
import ProductGrid from "@/components/product/ProductGrid";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  // ✅ unwrap params (Next.js 15)
  const { slug } = await params;

  console.log("Category slug:", slug);

  // ✅ FIX: await function
  const products = await getProductsByCategory(slug);

  if (!products || products.length === 0) {
    return notFound();
  }

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">

      <h1 className="text-2xl md:text-3xl font-bold mb-6 capitalize">
        {slug}
      </h1>

      <ProductGrid products={products} />

    </main>
  );
}
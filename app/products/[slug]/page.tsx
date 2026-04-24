export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import ProductDetail from "@/components/product/ProductDetail";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  // ✅ Next.js 15: params is async
  const { slug } = await params;

  console.log("Slug received:", slug);

  // ✅ FIX: await async helper
  const product = await getProductBySlug(slug);

  console.log("Product found:", product);

  if (!product) {
    return notFound();
  }

  return <ProductDetail product={product} />;
}
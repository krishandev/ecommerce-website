"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";
import ProductGrid from "@/components/product/ProductGrid";
import { getRelatedProducts, Product } from "@/lib/products";

export default function ProductDetail({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(product.images?.[0] || product.image);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "reviews" | "info">("desc");

  // ✅ NEW: state for related products
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  // ✅ NEW: fetch related products (async)
  useEffect(() => {
    let mounted = true;

    const fetchRelated = async () => {
      try {
        setLoadingRelated(true);
        const data = await getRelatedProducts(product.category, product.slug);
        if (mounted) {
          setRelatedProducts(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error("Related products error:", e);
        if (mounted) setRelatedProducts([]);
      } finally {
        if (mounted) setLoadingRelated(false);
      }
    };

    fetchRelated();

    return () => {
      mounted = false;
    };
  }, [product.category, product.slug]);

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  const addToCart = () => {
    console.log("Add to cart:", product.slug, "qty:", qty);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">

      {/* BREADCRUMB */}
      <div className="text-sm text-gray-500 mb-6">
        <Link href="/">Home</Link> /{" "}
        <Link href="/products">Products</Link> /{" "}
        <span>{product.name}</span>
      </div>

      {/* TOP */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div>
          <div className="relative w-full h-[400px] bg-gray-50 rounded-xl overflow-hidden">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>

          <div className="flex gap-3 mt-4">
            {(product.images || []).map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setActiveImage(img)}
                className="w-20 h-20 relative border rounded-lg overflow-hidden"
              >
                <Image src={img} alt="thumb" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div>
          <p className="text-sm text-gray-500">{product.category}</p>

          <h1 className="text-2xl font-bold">{product.name}</h1>

          <div className="flex gap-1 text-yellow-500 mt-2">
            {[1, 2, 3, 4, 5].map((s) =>
              s <= product.rating ? <FaStar key={s} /> : <FaRegStar key={s} />
            )}
          </div>

          <div className="flex gap-3 mt-4 items-center">
            <span className="text-xl text-[#ff6a00] font-semibold">
              ${product.price}
            </span>

            {product.oldPrice && (
              <span className="line-through text-gray-400">
                ${product.oldPrice}
              </span>
            )}

            {discount && (
              <span className="bg-[#ff6a00] text-white px-2 py-1 text-xs rounded">
                {discount}% OFF
              </span>
            )}
          </div>

          <p className="mt-4 text-gray-600">{product.description}</p>

          {/* Qty */}
          <div className="flex gap-3 mt-6">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => q + 1)}>+</button>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={addToCart}
              className="bg-[#ff6a00] text-white px-6 py-3 rounded-full"
            >
              Add to Cart
            </button>

            <button className="p-3 border rounded-full">
              <FaHeart />
            </button>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="mt-12">
        <div className="flex gap-6 border-b">
          {["desc", "reviews", "info"].map((t) => (
            <button key={t} onClick={() => setTab(t as any)}>
              {t}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {tab === "desc" && <p>{product.description}</p>}
          {tab === "reviews" && <p>No reviews yet</p>}
          {tab === "info" && <p>Material: Wood</p>}
        </div>
      </section>

      {/* RELATED */}
      <section className="mt-12">
        {loadingRelated ? (
          <p className="text-gray-500">Loading related products...</p>
        ) : Array.isArray(relatedProducts) && relatedProducts.length > 0 ? (
          <ProductGrid products={relatedProducts} title="Related Products" />
        ) : null}
      </section>

    </main>
  );
}
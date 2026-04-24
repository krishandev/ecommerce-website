"use client";

import Image from "next/image";
import Link from "next/link";
import { FaStar, FaRegStar, FaHeart } from "react-icons/fa";

type ProductCardProps = {
  name: string;
  slug: string;
  image: string;
  price: number;
  oldPrice?: number;
  category?: string;
  rating?: number; // 0–5
};

export default function ProductCard({
  name,
  slug,
  image,
  price,
  oldPrice,
  category,
  rating = 4,
}: ProductCardProps) {
  const discount =
    oldPrice && oldPrice > price
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : null;

  const handleAddToCart = () => {
    console.log("Added to cart:", name);
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 relative">

      {/* Wishlist Icon */}
      <button
        aria-label="Add to wishlist"
        className="absolute top-3 right-3 z-10 bg-white p-2 rounded-full shadow hover:text-[#ff6a00]"
      >
        <FaHeart size={14} />
      </button>

      {/* Discount Badge */}
      {discount && (
        <span className="absolute top-3 left-3 z-20 bg-[#ff6a00] text-white text-xs px-2 py-1 rounded">
          {discount}% OFF
        </span>
      )}

      {/* Product Image */}
      <Link href={`/products/${slug}`} className="block overflow-hidden rounded-lg">
        <div className="relative w-full h-[220px] bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
  <div className="relative w-full h-[220px] bg-gray-50 rounded-lg overflow-hidden">
  <Image
    src={image}
    alt={name}
    fill
    className="object-contain group-hover:scale-105 transition duration-300"
  />
</div>
</div>
      </Link>

      {/* Content */}
      <div className="mt-3 space-y-1">

        {/* Category */}
        {category && (
          <p className="text-xs text-gray-500">{category}</p>
        )}

        {/* Product Name */}
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
          <Link href={`/products/${slug}`} className="hover:text-[#ff6a00]">
            {name}
          </Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-xs">
          {[1, 2, 3, 4, 5].map((star) =>
            star <= rating ? (
              <FaStar key={star} />
            ) : (
              <FaRegStar key={star} />
            )
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-[#ff6a00] font-semibold">
            ${price.toFixed(2)}
          </span>
          {oldPrice && (
            <span className="text-gray-400 line-through text-sm">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* AEO Hint */}
        <p className="text-xs text-gray-500">
          Best for modern living room comfort
        </p>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          aria-label="Add product to cart"
          className="w-full mt-2 bg-[#ff6a00] text-white text-sm py-2 rounded-full hover:bg-orange-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
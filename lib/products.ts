import { getBaseUrl } from "@/lib/getBaseUrl";

/* -------------------- TYPES -------------------- */
export type Product = {
  _id?: string;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  category: string;
  rating: number;
  description: string;
  stock: boolean;
  image: string;
  images: string[];
};

/* -------------------- STATIC FALLBACK -------------------- */
export const PRODUCTS: Product[] = [
  {
    name: "Modern Wooden Chair",
    slug: "modern-wooden-chair",
    price: 120,
    oldPrice: 150,
    category: "chairs",
    rating: 4,
    description: "Premium wooden chair designed for comfort and durability.",
    stock: true,
    image: "https://images.unsplash.com/photo-1582582429416-0d3c4e54b64b",
    images: [
      "https://images.unsplash.com/photo-1582582429416-0d3c4e54b64b",
      "https://images.unsplash.com/photo-1503602642458-232111445657",
    ],
  },
];

/* -------------------- API BASE -------------------- */
// 🔥 VERY IMPORTANT


/* -------------------- FETCH HELPER -------------------- */
async function safeFetch<T>(url: string): Promise<T> {
  const res = await fetch(`${getBaseUrl()}${url}`, {
    cache: "no-store", // always fresh
  });

  if (!res.ok) {
    throw new Error(`API Error: ${res.status}`);
  }

  return res.json();
}

/* -------------------- HELPERS -------------------- */

// ✅ Get all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    return await safeFetch<Product[]>("/api/products");
  } catch (error) {
    console.warn("⚠️ Fallback products used");
    return PRODUCTS;
  }
};

// ✅ Get product by slug
export const getProductBySlug = async (
  slug: string
): Promise<Product | undefined> => {
  try {
    return await safeFetch<Product>(`/api/products/${slug}`);
  } catch (error) {
    console.warn("⚠️ Fallback single product used");
    return PRODUCTS.find((p) => p.slug === slug);
  }
};

// ✅ Get products by category
export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  try {
    const products = await getAllProducts();
    return products.filter((p) => p.category === category);
  } catch {
    return PRODUCTS.filter((p) => p.category === category);
  }
};

// ✅ Related products
export const getRelatedProducts = async (
  category: string,
  excludeSlug: string
): Promise<Product[]> => {
  const products = await getProductsByCategory(category);

  return products
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, 4);
};
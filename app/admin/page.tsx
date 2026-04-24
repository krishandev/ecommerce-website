"use client";

import { useEffect, useState } from "react";

type Product = {
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

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    oldPrice: "",
    category: "",
    rating: "4",
    description: "",
    stock: true,
    image: "",
    images: "",
  });

  /* -------------------- FETCH PRODUCTS -------------------- */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();

      setProducts(Array.isArray(data) ? data : data.products || []);
    } catch (error) {
      console.error("Fetch error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* -------------------- CREATE / UPDATE -------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.slug || !form.price || !form.category || !form.image) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const payload = {
        name: form.name,
        slug: form.slug,
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
        category: form.category,
        rating: Number(form.rating) || 4,
        description: form.description,
        stock: form.stock,
        image: form.image,
        images: form.images
          ? form.images.split(",").map((img) => img.trim())
          : [form.image],
      };

      const url = editingSlug
        ? `/api/products/${editingSlug}`
        : `/api/products`;

      const method = editingSlug ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        alert("Something went wrong");
        return;
      }

      // Reset form
      setEditingSlug(null);
      setForm({
        name: "",
        slug: "",
        price: "",
        oldPrice: "",
        category: "",
        rating: "4",
        description: "",
        stock: true,
        image: "",
        images: "",
      });

      fetchProducts();

    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  /* -------------------- DELETE -------------------- */
  const deleteProduct = async (slug: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      await fetch(`/api/products/${slug}`, {
        method: "DELETE",
      });
      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  /* -------------------- EDIT -------------------- */
  const handleEdit = (p: Product) => {
    setEditingSlug(p.slug);

    setForm({
      name: p.name,
      slug: p.slug,
      price: String(p.price),
      oldPrice: p.oldPrice ? String(p.oldPrice) : "",
      category: p.category,
      rating: String(p.rating),
      description: p.description || "",
      stock: p.stock,
      image: p.image,
      images: p.images?.join(", ") || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-10">

      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* -------------------- FORM -------------------- */}
      <section className="mb-10 bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">
          {editingSlug ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">

          <input placeholder="Name *" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
          />

          <input placeholder="Slug *" value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="border p-2 rounded"
          />

          <input type="number" placeholder="Price *" value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-2 rounded"
          />

          <input type="number" placeholder="Old Price" value={form.oldPrice}
            onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
            className="border p-2 rounded"
          />

          <input placeholder="Category *" value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border p-2 rounded"
          />

          <input type="number" placeholder="Rating" value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            className="border p-2 rounded"
          />

          <input placeholder="Main Image URL *" value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="border p-2 rounded md:col-span-2"
          />

          <input placeholder="Extra Images" value={form.images}
            onChange={(e) => setForm({ ...form, images: e.target.value })}
            className="border p-2 rounded md:col-span-2"
          />

          <textarea placeholder="Description" value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 rounded md:col-span-2"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.checked })}
            />
            In Stock
          </label>

          <button className="bg-[#ff6a00] text-white py-2 rounded md:col-span-2">
            {editingSlug ? "Update Product" : "Add Product"}
          </button>

          {editingSlug && (
            <button
              type="button"
              onClick={() => {
                setEditingSlug(null);
                setForm({
                  name: "",
                  slug: "",
                  price: "",
                  oldPrice: "",
                  category: "",
                  rating: "4",
                  description: "",
                  stock: true,
                  image: "",
                  images: "",
                });
              }}
              className="text-gray-500 underline md:col-span-2"
            >
              Cancel Edit
            </button>
          )}

        </form>
      </section>

      {/* -------------------- LIST -------------------- */}
      <section className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4">All Products</h2>

        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <p>No products found</p>
        ) : (
          <div className="grid gap-4">
            {products.map((p) => (
              <div
                key={p._id || p.slug}
                className="flex justify-between items-center border p-4 rounded"
              >
                <div className="flex gap-4 items-center">
                  <img src={p.image} className="w-16 h-16 rounded" />
                  <div>
                    <p>{p.name}</p>
                    <p className="text-sm text-gray-500">
                      ${p.price} • {p.category}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(p.slug)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}
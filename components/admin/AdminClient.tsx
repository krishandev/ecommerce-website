"use client";

import { useEffect, useState, useRef } from "react";
import CategoryManager from "@/components/admin/CategoryManager";

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

export default function AdminClient() {

  const formRef = useRef<HTMLFormElement | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  

  const [form, setForm] = useState<Partial<Product>>({});
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
const [categories, setCategories] = useState<any[]>([]);
  

  /* -------------------- FETCH PRODUCTS -------------------- */
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
  const res = await fetch("/api/categories");
  const data = await res.json();
  setCategories(data);
};


  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  /* -------------------- HANDLE INPUT -------------------- */
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* -------------------- ADD / UPDATE -------------------- */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (editingSlug) {
        // UPDATE
        await fetch(`/api/products/${editingSlug}`, {
          method: "PUT",
          body: JSON.stringify(form),
          headers: { "Content-Type": "application/json" },
        });
        alert("Product updated");
      } else {
        // CREATE
        await fetch(`/api/products`, {
          method: "POST",
          body: JSON.stringify(form),
          headers: { "Content-Type": "application/json" },
        });
        alert("Product added");
      }

      setForm({});
      setEditingSlug(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  /* -------------------- DELETE -------------------- */
  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this product?")) return;

    try {
      await fetch(`/api/products/${slug}`, {
        method: "DELETE",
      });

      fetchProducts();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* -------------------- EDIT -------------------- */
  const handleEdit = (product: Product) => {
    setForm(product);
    setEditingSlug(product.slug);

     // 🔥 scroll to form
  setTimeout(() => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 100);

  };

  /* -------------------- STATS -------------------- */
  const total = products.length;
  const inStock = products.filter((p) => p.stock).length;
  const outStock = products.filter((p) => !p.stock).length;

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Products" value={total} />
        <StatCard title="In Stock" value={inStock} />
        <StatCard title="Out of Stock" value={outStock} />
        <StatCard title="Categories" value={[...new Set(products.map(p => p.category))].length} />
      </div>

      <CategoryManager onCategoryChange={fetchCategories} />

      {/* FORM */}
      <form
      ref={formRef}
  onSubmit={handleSubmit}
  className="bg-white p-6 md:p-8 rounded-2xl shadow space-y-8 mb-10"
>
  {/* 🔹 TITLE */}
  <h2 className="text-xl font-semibold">
    {editingSlug ? "Update Product" : "Add New Product"}
  </h2>

  {/* ---------------- BASIC INFO ---------------- */}
  <div>
    <h3 className="font-medium mb-4 text-gray-700">Basic Information</h3>

    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="label">Product Name *</label>
        <input
          name="name"
          value={form.name || ""}
          onChange={(e) => {
            handleChange(e);

            // 🔥 Auto slug
            const value = e.target.value
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]+/g, "");
            setForm((prev) => ({ ...prev, slug: value }));
          }}
          placeholder="Modern Wooden Chair"
          className="input"
          required
        />
      </div>

      <div>
        <label className="label">Slug *</label>
        <input
          name="slug"
          value={form.slug || ""}
          onChange={handleChange}
          placeholder="modern-wooden-chair"
          className="input"
          required
        />
      </div>

      <div>
        <label className="label">Category *</label>
        <select
  name="category"
  value={form.category || ""}
  onChange={handleChange}
  className="input"
  required
>
  <option value="">Select Category</option>

  {categories.map((cat) => (
    <option key={cat.slug} value={cat.slug}>
      {cat.name}
    </option>
  ))}
</select>

      </div>
    </div>
  </div>

  {/* ---------------- PRICING ---------------- */}
  <div>
    <h3 className="font-medium mb-4 text-gray-700">Pricing</h3>

    <div className="grid md:grid-cols-3 gap-4">
      <div>
        <label className="label">Price *</label>
        <input
          name="price"
          value={form.price || ""}
          onChange={handleChange}
          placeholder="500"
          className="input"
          required
        />
      </div>

      <div>
        <label className="label">Old Price</label>
        <input
          name="oldPrice"
          value={form.oldPrice || ""}
          onChange={handleChange}
          placeholder="700"
          className="input"
        />
      </div>

      <div>
        <label className="label">Rating</label>
        <input
          name="rating"
          value={form.rating || ""}
          onChange={handleChange}
          placeholder="4"
          className="input"
        />
      </div>
    </div>
  </div>

  {/* ---------------- MEDIA ---------------- */}
  <div>
    <h3 className="font-medium mb-4 text-gray-700">Media</h3>

    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <label className="label">Image URL *</label>
        <input
          name="image"
          value={form.image || ""}
          onChange={handleChange}
          placeholder="https://image-url.com"
          className="input"
          required
        />
      </div>

      {/* 🔥 IMAGE PREVIEW */}
      {form.image && (
        <div className="flex items-center justify-center border rounded-lg p-2">
          <img
            src={form.image}
            alt="preview"
            className="h-24 object-contain"
          />
        </div>
      )}
    </div>
  </div>

  {/* ---------------- DESCRIPTION ---------------- */}
  <div>
    <h3 className="font-medium mb-4 text-gray-700">Description</h3>

    <textarea
      name="description"
      value={form.description || ""}
      onChange={handleChange}
      placeholder="Write product description..."
      className="input min-h-[120px]"
    />
  </div>

  {/* ---------------- STOCK ---------------- */}
  <div>
    <h3 className="font-medium mb-4 text-gray-700">Stock</h3>

    <label className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={form.stock ?? true}
        onChange={(e) =>
          setForm((prev) => ({
            ...prev,
            stock: e.target.checked,
          }))
        }
      />
      <span>In Stock</span>
    </label>
  </div>

  {/* ---------------- ACTION BUTTONS ---------------- */}
  <div className="flex gap-4">
    <button
      type="submit"
      className="bg-[#ff6a00] text-white px-6 py-2 rounded-lg hover:opacity-90"
    >
      {editingSlug ? "Update Product" : "Add Product"}
    </button>

    {editingSlug && (
      <button
        type="button"
        onClick={() => {
          setForm({});
          setEditingSlug(null);
        }}
        className="border px-6 py-2 rounded-lg"
      >
        Cancel
      </button>
    )}
  </div>
</form>

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.slug} className="border-t text-center">
                  <td className="p-2">
                    <img src={p.image} className="w-12 h-12 object-cover mx-auto" />
                  </td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>${p.price}</td>
                  <td>{p.stock ? "In Stock" : "Out"}</td>
                  <td className="space-x-2">
                    <button onClick={() => handleEdit(p)} className="text-blue-600 cursor-pointer hover:underline ">Edit</button>
                    <button onClick={() => handleDelete(p.slug)} className="text-red-600 cursor-pointer hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

/* -------------------- SMALL COMPONENT -------------------- */
function StatCard({ title, value }: any) {
  return (
    <div className="bg-white p-4 rounded-xl shadow text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}
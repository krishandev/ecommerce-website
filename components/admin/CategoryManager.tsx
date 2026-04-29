"use client";

import { useEffect, useState, useRef } from "react";

type CategoryManagerProps = {
  onCategoryChange: () => void;
};


type Category = {
  _id?: string;
  name: string;
  slug: string;
  createdAt?: string;
};

export default function CategoryManager({
  onCategoryChange,
}: CategoryManagerProps) {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH ---------------- */
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ---------------- SLUG ---------------- */
  const generateSlug = (value: string) =>
    value
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!name) return alert("Category name required");

    try {
      if (editingSlug) {
        await fetch(`/api/categories/${editingSlug}`, {
          method: "PUT",
          body: JSON.stringify({ name }),
          headers: { "Content-Type": "application/json" },
        });
        alert("Category updated");
      } else {
        await fetch("/api/categories", {
          method: "POST",
          body: JSON.stringify({ name }),
          headers: { "Content-Type": "application/json" },
        });
        alert("Category added");
      }

      setName("");
      setEditingSlug(null);
      await fetchCategories();
      onCategoryChange(); // 🔥 VERY IMPORTANT
    } catch (err) {
      console.error(err);
      alert("Error saving category");
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (slug: string) => {
    if (!confirm("Delete category?")) return;

    await fetch(`/api/categories/${slug}`, {
      method: "DELETE",
    });

    await fetchCategories();
    onCategoryChange();
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (cat: Category) => {
    setName(cat.name);
    setEditingSlug(cat.slug);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  };

  return (
    <section className="bg-white p-6 md:p-8 rounded-2xl shadow mb-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Category Management</h2>
        <span className="text-sm text-gray-500">
          Total: {categories.length}
        </span>
      </div>

      {/* FORM */}
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className={`grid md:grid-cols-3 gap-4 mb-6 ${
          editingSlug ? "ring-2 ring-[#ff6a00] p-4 rounded-lg" : ""
        }`}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          className="input"
        />

        <input
          value={generateSlug(name)}
          readOnly
          className="input bg-gray-100"
        />

        <button className="bg-[#ff6a00] text-white rounded-lg">
          {editingSlug ? "Update Category" : "Add Category"}
        </button>

        {editingSlug && (
          <button
            type="button"
            onClick={() => {
              setName("");
              setEditingSlug(null);
            }}
            className="border rounded-lg"
          >
            Cancel
          </button>
        )}
      </form>

      {/* TABLE */}
      {loading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-gray-500">No categories found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">#</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat, i) => (
                <tr key={cat.slug} className="border-t text-center hover:bg-gray-50">
                  <td className="p-2">{i + 1}</td>
                  <td>{cat.name}</td>
                  <td className="text-gray-500">{cat.slug}</td>
                  <td>
                    {cat.createdAt
                      ? new Date(cat.createdAt).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="space-x-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="text-blue-600 cursor-pointer hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(cat.slug)}
                      className="text-red-600 cursor-pointer hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
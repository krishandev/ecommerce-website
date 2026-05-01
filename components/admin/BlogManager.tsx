"use client";

import { useEffect, useState, useRef } from "react";

type Blog = {
  title: string;
  slug: string;
  description?: string;
  content?: string;
  image?: string;
  category?: string;
  author?: string;
  createdAt?: string;
};

export default function BlogManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState<any>({});
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  /* ---------------- FETCH BLOGS ---------------- */
  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  /* ---------------- HANDLE INPUT ---------------- */
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const method = editingSlug ? "PUT" : "POST";
    const url = editingSlug
      ? `/api/blogs/${editingSlug}`
      : "/api/blogs";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert(editingSlug ? "Blog updated" : "Blog added");

      setForm({});
      setEditingSlug(null);
      fetchBlogs();
    }
  };

  /* ---------------- EDIT ---------------- */
  const handleEdit = (blog: Blog) => {
    setForm(blog);
    setEditingSlug(blog.slug);

    // 🔥 scroll to form
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (slug: string) => {
    if (!confirm("Delete this blog?")) return;

    await fetch(`/api/blogs/${slug}`, { method: "DELETE" });

    fetchBlogs();
  };

  return (
    <div className="space-y-10">

      {/* ================= FORM ================= */}
      <div ref={formRef} className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">
          {editingSlug ? "Edit Blog" : "Add Blog"}
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

          <input
            name="title"
            placeholder="Title"
            value={form.title || ""}
            onChange={handleChange}
            className="input"
            required
          />

          <input
            name="image"
            placeholder="Image URL"
            value={form.image || ""}
            onChange={handleChange}
            className="input"
          />

          <input
            name="category"
            placeholder="Category"
            value={form.category || ""}
            onChange={handleChange}
            className="input"
          />

          <input
            name="author"
            placeholder="Author"
            value={form.author || ""}
            onChange={handleChange}
            className="input"
          />

          <textarea
            name="description"
            placeholder="Short Description"
            value={form.description || ""}
            onChange={handleChange}
            className="input md:col-span-2"
          />

          <textarea
            name="content"
            placeholder="Full Content"
            value={form.content || ""}
            onChange={handleChange}
            className="input md:col-span-2 min-h-[150px]"
          />

          <button className="bg-[#ff6a00] text-white py-2 rounded md:col-span-2">
            {editingSlug ? "Update Blog" : "Add Blog"}
          </button>
        </form>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">All Blogs</h2>

        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b">
              <th className="p-2">Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.slug} className="border-t hover:bg-gray-50">

                <td className="p-2">
                  <img
                    src={blog.image || "/placeholder.jpg"}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>

                <td>{blog.title}</td>
                <td>{blog.category}</td>
                <td>{blog.author}</td>

                <td>
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                <td className="space-x-3">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(blog.slug)}
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

    </div>
  );
}
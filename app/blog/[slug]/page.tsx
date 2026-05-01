import Image from "next/image";
import { connectDB } from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

export const dynamic = "force-dynamic";

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // ✅ FIX

  await connectDB();

  console.log("SLUG:", slug);

  const blog = await Blog.findOne({ slug }).lean();

  console.log("BLOG FOUND:", blog);

  if (!blog) {
    return (
      <div className="text-center mt-20 text-lg">
        Blog not found
      </div>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">

      <h1 className="text-3xl font-bold mb-4">
        {blog.title}
      </h1>

      <p className="text-gray-500 text-sm mb-6">
        By {blog.author || "Admin"} •{" "}
        {blog.createdAt
          ? new Date(blog.createdAt).toLocaleDateString()
          : "No Date"}
      </p>

      <div className="relative w-full h-[300px] mb-6">
        <Image
          src={blog.image || "/placeholder.jpg"}
          alt={blog.title}
          fill
          className="object-cover rounded"
        />
      </div>

      <div className="text-lg text-gray-700 whitespace-pre-line">
        {blog.content}
      </div>

    </main>
  );
}
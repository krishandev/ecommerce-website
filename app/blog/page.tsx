import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getBlogs() {
  const res = await fetch("http://localhost:3000/api/blogs", {
    cache: "no-store",
  });
  return res.json();
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">

      {/* HEADING */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="text-gray-600 mt-2">
          Read latest furniture tips, design ideas & trends.
        </p>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

        {blogs.map((blog: any) => (
          <Link
            key={blog.slug}
            href={`/blog/${blog.slug}`}
            className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
          >

            <div className="relative h-[180px]">
              <Image
                src={blog.image || "/placeholder.jpg"}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <h2 className="font-semibold text-lg">
                {blog.title}
              </h2>

              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {blog.description}
              </p>

              <span className="text-[#ff6a00] text-sm mt-3 inline-block">
                Read More →
              </span>
            </div>

          </Link>
        ))}

      </div>

    </main>
  );
}
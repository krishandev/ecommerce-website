import { auth, currentUser } from "@clerk/nextjs/server";
import { ADMIN_EMAIL } from "@/lib/config";
import BlogManager from "@/components/admin/BlogManager";

export default async function AdminBlogPage() {
  const { userId } = await auth();
  const user = await currentUser();

  const email = user?.primaryEmailAddress?.emailAddress;

  if (!userId || email !== ADMIN_EMAIL) {
    return (
      <div className="text-center mt-20 text-lg">
        Unauthorized
      </div>
    );
  }
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Blog Dashboard</h1>
      <BlogManager />
    </main>
  );
}
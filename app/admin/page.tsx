import { auth, currentUser } from "@clerk/nextjs/server";
import { ADMIN_EMAIL } from "@/lib/config";
import AdminClient from "@/components/admin/AdminClient";

export default async function AdminPage() {
  const { userId } = await auth();
  const user = await currentUser();

  const email = user?.primaryEmailAddress?.emailAddress;

  if (!userId || email !== ADMIN_EMAIL) {
    return <div className="text-center mt-10">Unauthorized</div>;
  }

  return <AdminClient />;
}
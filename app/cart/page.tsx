import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import CartClient from "./../../components/cart/CartClient";

export default async function CartPage() {
  const { userId } = await auth();

  // 🔐 Not logged in → redirect
  if (!userId) {
    redirect("/sign-in");
  }

  return <CartClient/>;
}
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"; // ✅ IMPORTANT

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isAdminRoute(req)) {
    const { userId } = auth(); // ✅ correct

    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url)); // ✅ FIX
    }
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
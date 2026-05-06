import {
  clerkMiddleware,
  createRouteMatcher,
} from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
]);

export default clerkMiddleware(
  async (auth, req) => {

    // ✅ protect admin routes
    if (isAdminRoute(req)) {

      // ✅ IMPORTANT
      const { userId } = await auth();

      // ❌ not logged in
      if (!userId) {
        return NextResponse.redirect(
          new URL("/sign-in", req.url)
        );
      }
    }
  }
);

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
  ],
};
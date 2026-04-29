import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const SECRET = "supersecret123";

  console.log("LOGIN API HIT:", email, password); // ✅ debug

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json(
      { error: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  const response = NextResponse.json({ success: true });

  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: false, // 👉 true in production
    sameSite: "lax",
    path: "/",
  });

  return response;
}
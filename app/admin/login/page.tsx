"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: any) => {
  e.preventDefault();

  console.log("Login clicked");

  const res = await fetch("/api/admin/login", {
    method: "POST",
    credentials: "include", // 🔥 VERY IMPORTANT
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log("Status:", res.status);

  if (res.ok) {
    window.location.href = "/admin"; // 🔥 use this instead
    //router.push("/admin");
  } else {
    const data = await res.json();
    console.log(data);
    alert("Invalid credentials");
  }
};

  return (
    <main className="max-w-md mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-[#ff6a00] text-white w-full py-2 rounded">
          Login
        </button>
      </form>
    </main>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const searchParams = useSearchParams();
  const authError = searchParams.get("error");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log("SESSION AFTER LOGIN", session);

    router.replace("/");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center justify-center p-6">
      <form onSubmit={handleLogin} className="w-full space-y-4">
        <h1 className="text-2xl font-semibold">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border p-3"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded border p-3"
          required
        />

        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        {authError ? (
          <p className="text-sm text-red-500">
            {authError}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded border p-3"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/teacher/questions/create");
    router.refresh();
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-4 rounded-2xl border p-8 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-semibold">Login</h1>
          <p className="text-sm text-muted-foreground">
            Quick auth page for development testing.
          </p>
        </div>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded-xl border px-3 py-2"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-xl border px-3 py-2"
          required
        />

        {error ? <p className="text-sm text-red-500">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl border px-4 py-2"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
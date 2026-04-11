"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        setError("Mot de passe incorrect.");
      }
    } catch {
      setError("Erreur réseau.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1
          className="text-4xl font-light text-stone-800 mb-8 text-center"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Administration
        </h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 shadow-sm space-y-4">
          <div>
            <label
              className="block text-xs tracking-[0.15em] uppercase text-stone-400 mb-2"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-stone-200 bg-white text-stone-700 text-sm focus:outline-none focus:border-stone-400 transition-colors"
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-stone-800 text-stone-100 text-sm tracking-[0.2em] uppercase hover:bg-stone-700 transition-colors disabled:opacity-50"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {loading ? "..." : "Connexion"}
          </button>
        </form>
      </div>
    </main>
  );
}

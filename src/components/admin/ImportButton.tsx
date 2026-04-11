"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ImportButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setStatus(null);

    try {
      const text = await file.text();
      const res = await fetch("/api/admin/import", {
        method: "POST",
        body: text,
        headers: { "Content-Type": "text/plain" },
      });

      const json = await res.json();

      if (!res.ok) {
        setStatus(`Erreur : ${json.error}`);
      } else {
        setStatus(`${json.created} ajouté(s), ${json.updated} mis à jour, ${json.errors} erreur(s)`);
        router.refresh();
      }
    } catch {
      setStatus("Erreur lors de la lecture du fichier.");
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="px-4 py-2 border border-stone-200 text-stone-500 text-xs tracking-wider uppercase hover:border-stone-400 transition-colors disabled:opacity-50"
      >
        {loading ? "Import..." : "Importer CSV"}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        onChange={handleFile}
        className="hidden"
      />
      {status && (
        <p className="text-xs text-stone-400">{status}</p>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

type Guest = {
  id: number;
  firstName: string;
  lastName: string;
  attending: boolean | null;
  mealPreference: string | null;
  dietaryRestrictions: string | null;
  attendsBrunch: boolean | null;
  message: string | null;
  createdAt: string;
  family: {
    id: number;
    name: string;
    attendsBrunch: boolean | null;
    message: string | null;
  } | null;
};

export default function RSVPTable({ guests }: { guests: Guest[] }) {
  const [filter, setFilter] = useState<"tous" | "présents" | "absents" | "en attente">("tous");
  const [search, setSearch] = useState("");

  const filtered = guests.filter((g) => {
    if (filter === "présents" && g.attending !== true) return false;
    if (filter === "absents" && g.attending !== false) return false;
    if (filter === "en attente" && g.attending !== null) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        g.firstName.toLowerCase().includes(q) ||
        g.lastName.toLowerCase().includes(q) ||
        (g.family?.name ?? "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Rechercher par nom ou famille..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-stone-200 text-sm text-stone-700 focus:outline-none focus:border-stone-400 flex-1"
        />
        <div className="flex gap-2">
          {(["tous", "présents", "absents", "en attente"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs tracking-wider uppercase transition-colors ${
                filter === f
                  ? "bg-stone-800 text-stone-100"
                  : "border border-stone-200 text-stone-500 hover:border-stone-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-stone-100">
              {["Nom", "Famille", "Présent", "Menu", "Régime", "Brunch", "Message", "Soumis le"].map((h) => (
                <th
                  key={h}
                  className="text-left py-3 px-3 text-xs tracking-wider uppercase text-stone-400 font-normal"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((g) => {
              const brunch = g.family ? g.family.attendsBrunch : g.attendsBrunch;
              const msg = g.family ? g.family.message : g.message;

              return (
                <tr key={g.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                  <td className="py-3 px-3 text-stone-700">
                    {g.firstName} {g.lastName}
                  </td>
                  <td className="py-3 px-3 text-stone-400">{g.family?.name ?? "—"}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-xs ${
                        g.attending === true
                          ? "bg-green-50 text-green-600"
                          : g.attending === false
                          ? "bg-stone-100 text-stone-400"
                          : "bg-amber-50 text-amber-500"
                      }`}
                    >
                      {g.attending === true ? "Oui" : g.attending === false ? "Non" : "—"}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-stone-500 capitalize">{g.mealPreference ?? "—"}</td>
                  <td className="py-3 px-3 text-stone-400 max-w-32">
                    {g.dietaryRestrictions ? (
                      <span className="truncate block" title={g.dietaryRestrictions}>
                        {g.dietaryRestrictions.length > 30 ? g.dietaryRestrictions.slice(0, 30) + "…" : g.dietaryRestrictions}
                      </span>
                    ) : "—"}
                  </td>
                  <td className="py-3 px-3">
                    {brunch === null || brunch === undefined ? (
                      <span className="text-stone-300">—</span>
                    ) : (
                      <span className={`inline-block px-2 py-0.5 text-xs ${brunch ? "bg-green-50 text-green-600" : "bg-stone-100 text-stone-400"}`}>
                        {brunch ? "Oui" : "Non"}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-stone-400 max-w-48">
                    {msg ? (
                      <span className="truncate block" title={msg}>
                        {msg.length > 40 ? msg.slice(0, 40) + "…" : msg}
                      </span>
                    ) : "—"}
                  </td>
                  <td className="py-3 px-3 text-stone-400 text-xs">
                    {new Date(g.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="text-center text-stone-400 py-12 text-sm">Aucun invité trouvé.</p>
        )}
      </div>
    </div>
  );
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdminToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import RSVPTable from "@/components/admin/RSVPTable";
import ImportButton from "@/components/admin/ImportButton";
import Link from "next/link";
import { WEDDING } from "@/lib/constants";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!verifyAdminToken(token)) {
    redirect("/admin");
  }

  const guests = await prisma.guest.findMany({
    orderBy: { createdAt: "desc" },
    include: { family: true },
  });

  const families = await prisma.family.findMany({ orderBy: { name: "asc" } });

  const attending = guests.filter((g) => g.attending === true);
  const declined = guests.filter((g) => g.attending === false);
  const pending = guests.filter((g) => g.attending === null);

  const mealCounts = attending.reduce<Record<string, number>>((acc, g) => {
    if (g.mealPreference) {
      acc[g.mealPreference] = (acc[g.mealPreference] ?? 0) + 1;
    }
    return acc;
  }, {});

  const serializedGuests = guests.map((g) => ({
    ...g,
    createdAt: g.createdAt.toISOString(),
    updatedAt: g.updatedAt.toISOString(),
    family: g.family
      ? { ...g.family, createdAt: g.family.createdAt.toISOString(), updatedAt: g.family.updatedAt.toISOString() }
      : null,
  }));

  return (
    <main className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-4xl font-light text-stone-800"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Tableau de bord
            </h1>
            <p className="text-stone-400 text-sm mt-1">Maëliss &amp; Stanislas —{" "}
              {new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(WEDDING.date)}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <ImportButton />
            <a
              href="/api/admin/export"
              className="px-4 py-2 border border-stone-200 text-stone-500 text-xs tracking-wider uppercase hover:border-stone-400 transition-colors"
            >
              Exporter CSV
            </a>
            <Link
              href="/"
              className="px-4 py-2 text-stone-400 text-xs tracking-wider uppercase hover:text-stone-600 transition-colors"
            >
              Voir le site
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-6 shadow-sm">
            <p className="text-3xl font-light text-stone-700" style={{ fontFamily: "var(--font-serif)" }}>
              {guests.length}
            </p>
            <p className="text-xs tracking-wider uppercase text-stone-400 mt-1">Invités</p>
          </div>
          <div className="bg-white p-6 shadow-sm">
            <p className="text-3xl font-light text-green-600" style={{ fontFamily: "var(--font-serif)" }}>
              {attending.length}
            </p>
            <p className="text-xs tracking-wider uppercase text-stone-400 mt-1">Présents</p>
          </div>
          <div className="bg-white p-6 shadow-sm">
            <p className="text-3xl font-light text-stone-400" style={{ fontFamily: "var(--font-serif)" }}>
              {declined.length}
            </p>
            <p className="text-xs tracking-wider uppercase text-stone-400 mt-1">Absents</p>
          </div>
          <div className="bg-white p-6 shadow-sm">
            <p className="text-3xl font-light text-amber-500" style={{ fontFamily: "var(--font-serif)" }}>
              {pending.length}
            </p>
            <p className="text-xs tracking-wider uppercase text-stone-400 mt-1">En attente</p>
          </div>
        </div>

        {/* Meal breakdown */}
        {Object.keys(mealCounts).length > 0 && (
          <div className="bg-white p-6 shadow-sm mb-8">
            <p className="text-xs tracking-wider uppercase text-stone-400 mb-4">Répartition des menus</p>
            <div className="flex flex-wrap gap-4">
              {Object.entries(mealCounts).map(([meal, count]) => (
                <div key={meal} className="text-center">
                  <span className="text-2xl font-light text-stone-700" style={{ fontFamily: "var(--font-serif)" }}>
                    {count}
                  </span>
                  <span className="block text-xs text-stone-400 capitalize mt-0.5">{meal}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white p-6 shadow-sm">
          <RSVPTable guests={serializedGuests} />
        </div>
      </div>
    </main>
  );
}

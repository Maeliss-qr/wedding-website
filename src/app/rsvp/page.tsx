import Link from "next/link";
import RSVPLookup from "@/components/rsvp/RSVPLookup";
import { WEDDING } from "@/lib/constants";

export default function RSVPPage() {
  return (
    <main className="min-h-screen bg-stone-50 py-20 px-6">
      <div className="max-w-xl mx-auto">
        <Link
          href="/"
          className="text-xs tracking-widest uppercase text-stone-400 hover:text-stone-600 transition-colors mb-8 inline-block"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          ← Retour
        </Link>

        <h1
          className="text-5xl font-light text-stone-800 mb-2"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          RSVP
        </h1>
        <p
          className="text-stone-500 mb-2"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {WEDDING.bride} &amp; {WEDDING.groom} — 12 septembre 2026
        </p>
        <p className="text-stone-400 text-sm mb-10">
          Merci de répondre avant le{" "}
          {new Intl.DateTimeFormat("fr-FR", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }).format(WEDDING.rsvpDeadline)}
          .
        </p>

        <div className="bg-white p-8 shadow-sm">
          <RSVPLookup />
        </div>
      </div>
    </main>
  );
}

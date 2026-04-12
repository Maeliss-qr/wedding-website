import Link from "next/link";
import RSVPLookup from "@/components/rsvp/RSVPLookup";
import TornCard from "@/components/ui/torn-card";
import { WEDDING } from "@/lib/constants";

export default function RSVPPage() {
  return (
    <main className="min-h-screen bg-background py-20 px-6">
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
          {WEDDING.bride} &amp; {WEDDING.groom} —{" "}
          {new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(WEDDING.date)}
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

        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="torn-paper" x="-6%" y="-6%" width="112%" height="112%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="3" seed="5" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
        </svg>

        <TornCard>
          <RSVPLookup />
        </TornCard>
      </div>
    </main>
  );
}

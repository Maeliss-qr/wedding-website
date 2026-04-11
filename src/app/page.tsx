import Hero from "@/components/landing/Hero";
import CountdownTimer from "@/components/landing/CountdownTimer";
import EventDetails from "@/components/landing/EventDetails";
import Schedule from "@/components/landing/Schedule";
import Link from "next/link";
import { WEDDING } from "@/lib/constants";

export default function Home() {
  return (
    <main>
      <Hero />
      <CountdownTimer />
      <EventDetails />
      <Schedule />

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white text-center">
        <h2
          className="text-4xl md:text-5xl font-light mb-4"
          style={{ fontFamily: "var(--font-serif)", color: "#5e6a8f" }}
        >
          Serez-vous des nôtres ?
        </h2>
        <div className="w-12 h-px bg-stone-300 mx-auto mb-8" />
        <p className="text-stone-500 mb-2 max-w-md mx-auto">
          Merci de répondre avant le{" "}
          {new Intl.DateTimeFormat("fr-FR", { month: "long", day: "numeric", year: "numeric" }).format(
            WEDDING.rsvpDeadline
          )}
          .
        </p>
        <p className="text-stone-400 text-sm mb-10">
          Nous avons hâte de fêter cela avec vous.
        </p>
        <Link
          href="/rsvp"
          className="inline-block px-12 py-4 text-stone-100 text-sm tracking-[0.2em] uppercase transition-colors"
          style={{ backgroundColor: "#5e6a8f" }}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Répondre maintenant
        </Link>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-stone-50 text-center">
        <p
          className="text-stone-400 text-xs tracking-widest uppercase"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {WEDDING.bride} &amp; {WEDDING.groom} &bull;{" "}
          {new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(WEDDING.date)}
        </p>
      </footer>
    </main>
  );
}

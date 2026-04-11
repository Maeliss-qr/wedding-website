import Link from "next/link";
import Image from "next/image";
import { WEDDING } from "@/lib/constants";

export default function Hero() {
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(WEDDING.date);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-900">
      {/* Background photo */}
      <Image
        src="/hero.webp"
        alt="Maëliss & Stanislas"
        fill
        className="object-cover object-center"
        priority
        quality={85}
      />
      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative text-center px-6 py-20">
        <p
          className="text-sm tracking-[0.3em] uppercase text-white/60 mb-6"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Avec leurs familles
        </p>

        <h1
          className="text-7xl md:text-9xl font-light text-white mb-2 leading-none drop-shadow-lg"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {WEDDING.bride}
        </h1>

        <p
          className="text-3xl md:text-4xl text-white/70 my-4"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
        >
          &amp;
        </p>

        <h1
          className="text-7xl md:text-9xl font-light text-white mb-10 leading-none drop-shadow-lg"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {WEDDING.groom}
        </h1>

        <div className="w-16 h-px bg-white/40 mx-auto mb-8" />

        <p
          className="text-lg md:text-xl text-white/80 tracking-widest uppercase mb-2"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 300 }}
        >
          {formattedDate}
        </p>

        <p
          className="text-base text-white/60 mb-12"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {WEDDING.venue.name} &bull; Auneau, France
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/rsvp"
            className="inline-block px-10 py-4 text-stone-100 text-sm tracking-[0.2em] uppercase transition-colors"
            style={{ backgroundColor: "#5e6a8f" }}
            style={{ fontFamily: "var(--font-sans)" }}
          >
            RSVP
          </Link>
          <a
            href="#details"
            className="inline-block px-10 py-4 border border-white/50 text-white text-sm tracking-[0.2em] uppercase hover:border-white transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Détails
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-white/30 animate-pulse" />
      </div>
    </section>
  );
}

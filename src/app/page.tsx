import Hero from "@/components/landing/Hero";
import EventDetails from "@/components/landing/EventDetails";
import DressCode from "@/components/landing/DressCode";
import AccommodationsTeaser from "@/components/landing/AccommodationsTeaser";
import PolaroidDivider from "@/components/landing/PolaroidDivider";
import TornCard from "@/components/ui/torn-card";
import Link from "next/link";
import { WEDDING } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <Hero />
      <EventDetails />
      <PolaroidDivider rotate={-4} tapePosition="top-right" aspect="landscape" />
      <DressCode />
      <AccommodationsTeaser />
      <PolaroidDivider rotate={3} tapePosition="top-left" aspect="tall" />
      {/* CTA Section */}
      <section className="py-24 px-6 bg-background text-center">
        <h2
          className="text-4xl md:text-5xl font-light mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
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
          className={buttonVariants({ variant: "primary", size: "lg" })}
        >
          Confirmez votre venue
        </Link>
      </section>

      <PolaroidDivider rotate={-2} tapePosition="top-center" aspect="square" />

      {/* Contact Section */}
      <section className="py-24 px-6 bg-background text-center">
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="torn-contact" x="-6%" y="-6%" width="112%" height="112%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="3" seed="7" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
        </svg>
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-light text-center mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Une question ? Contactez-nous
          </h2>
          <div className="w-12 h-px bg-stone-300 mx-auto mb-16" />

          <div className="grid md:grid-cols-2 gap-8">
            <TornCard filterId="torn-contact" className="text-left">
              <p
                className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Stanislas
              </p>
              <div className="flex flex-col gap-1">
                <a
                  href="tel:0659055175"
                  className="text-stone-700 hover:text-stone-500 transition-colors"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem" }}
                >
                  06 59 05 51 75
                </a>
                <a
                  href="mailto:stan.henrard@gmail.com"
                  className="text-stone-400 text-sm hover:text-stone-600 transition-colors"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  stan.henrard@gmail.com
                </a>
              </div>
            </TornCard>

            <TornCard filterId="torn-contact" className="text-left">
              <p
                className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Maëliss
              </p>
              <div className="flex flex-col gap-1">
                <a
                  href="tel:0659057160"
                  className="text-stone-700 hover:text-stone-500 transition-colors"
                  style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem" }}
                >
                  06 59 05 71 60
                </a>
                <a
                  href="mailto:maeliss.quere@gmail.com"
                  className="text-stone-400 text-sm hover:text-stone-600 transition-colors"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  maeliss.quere@gmail.com
                </a>
              </div>
            </TornCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background text-center">
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

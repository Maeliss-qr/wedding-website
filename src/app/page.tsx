import Hero from "@/components/landing/Hero";
import EventDetails from "@/components/landing/EventDetails";
import DressCode from "@/components/landing/DressCode";
import AccommodationsTeaser from "@/components/landing/AccommodationsTeaser";
import PolaroidDivider from "@/components/landing/PolaroidDivider";
import TornCard from "@/components/ui/torn-card";
import Image from "next/image";
import Link from "next/link";
import { WEDDING } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="px-6 py-4 max-w-2xl mx-auto text-center">
        <p
          className="text-base md:text-xl text-stone-500"
          style={{ fontFamily: "var(--font-serif)"}}
        >
          Bienvenue sur ce site, nous avons hâte de célébrer ce jour avec vous ! 
          <br /><br />Vous trouverez ici les informations nécessaires pour organiser votre venue et découvrir le programme de la journée.
        </p>
      </div>
      <EventDetails />
      <PolaroidDivider src="/engagement-MS-77.png" rotate={-4} tapePosition="top-left" aspect="landscape"/>
      <DressCode />
      <AccommodationsTeaser />
      <PolaroidDivider src="/engagement-MS-31.jpg" rotate={3} tapePosition="top-right" tapeColor="blue"/>
      {/* CTA Section */}
      <section className="relative py-24 px-6 bg-background text-center overflow-hidden">
        <Image
          src="/flower-yellow.png"
          alt=""
          height={20}
          width={120}
          className="absolute -bottom-16 left-7/12 pointer-events-none z-0 opacity-70 rotate-12"
        />
        <div className="relative z-10">
        <h2
          className="text-4xl md:text-5xl font-light mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Serez-vous des nôtres ?
        </h2>
       
        <div className="w-12 h-px bg-stone-300 mx-auto mb-8" />
          <p className="text-lg text-stone-500 mb-10 max-w-md mx-auto" style={{ fontFamily: "var(--font-serif)"}}>  
          Dîtes-nous avant le 15 juin si vous serez présents pour partager ce moment avec nous ! 
          </p>
        <Link
          href="/rsvp"
          className={buttonVariants({ variant: "primary", size: "lg" })}
        >
          Confirmez votre venue
        </Link>
        </div>
      </section>

      <PolaroidDivider src="/engagement-MS-66.jpg" rotate={-2} tapePosition="top-center" aspect="tall" />

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
                  06 59 07 71 60
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

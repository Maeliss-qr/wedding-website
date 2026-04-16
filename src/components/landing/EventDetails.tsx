import Image from "next/image";
import { WEDDING } from "@/lib/constants";
import TornCard from "@/components/ui/torn-card";

export default function EventDetails() {
  return (
    <section id="details" className="py-24 px-6 bg-background">
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-light text-center mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Déroulé du jour
        </h2>
        <div className="w-12 h-px bg-stone-300 mx-auto mb-16" />

        {/* SVG filter pour l'effet papier arraché */}
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="torn-paper" x="-6%" y="-6%" width="112%" height="112%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="3" seed="5" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
        </svg>

        <div className="flex flex-col gap-8">
          <TornCard
            imageRight={
              <Image
                src="/watercolor-eglise.png"
                alt=""
                fill
                className="object-contain object-center"
              />
            }
            >
              <p
              className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Cérémonie
            </p>
            <p className="text-2xl text-stone-700 mb-2" style={{ fontFamily: "var(--font-serif)" }}>14h30</p>
            <p className="text-stone-500 text-sm mb-4">{WEDDING.church.name}</p>
            <a
              href={WEDDING.church.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-xs tracking-wider uppercase text-stone-500 border-b border-stone-300 hover:border-stone-500 transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Itinéraire →
            </a>
          </TornCard>

          <TornCard >
            <p
              className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Vin d'honneur
            </p>
            <p className="text-2xl text-stone-700 mb-2" style={{ fontFamily: "var(--font-serif)" }}>16h00</p>
            <p className="text-stone-500 text-sm mb-4">{WEDDING.venue.name}. 15min de l'église</p>
            <a
              href="https://maps.app.goo.gl/mSNSsTyXy2L4mG8w5"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-xs tracking-wider uppercase text-stone-500 border-b border-stone-300 hover:border-stone-500 transition-colors w-fit"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Itinéraire →
            </a>
          </TornCard>

          <TornCard 
                      imageRight={
              <Image
                src="/watercolor-reception.png"
                alt=""
                fill
                className="object-contain object-center"
              />
            }>
            <p
              className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Dîner
            </p>
            <p className="text-2xl text-stone-700 mb-2" style={{ fontFamily: "var(--font-serif)" }}>20h00</p>
            <p className="text-stone-500 text-sm mb-4">{WEDDING.venue.name}</p>
            <a
              href={WEDDING.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-xs tracking-wider uppercase text-stone-500 border-b border-stone-300 hover:border-stone-500 transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
            </a>
          </TornCard>

          <TornCard
          imageRight={
              <Image
                src="/watercolor-brunch.png"
                alt=""
                fill
                className="object-contain object-right"
              />
            }
            >
            <p
              className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Brunch du lendemain
            </p>
            <p className="text-2xl text-stone-700 mb-2" style={{ fontFamily: "var(--font-serif)" }}>11h00</p>
            <p className="text-stone-500 text-sm mb-4">{WEDDING.venue.name}</p>
            <a
              href="https://maps.app.goo.gl/mSNSsTyXy2L4mG8w5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-xs tracking-wider uppercase text-stone-500 border-b border-stone-300 hover:border-stone-500 transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Itinéraire →
            </a>
          </TornCard>
        </div>

      </div>
    </section>
  );
}

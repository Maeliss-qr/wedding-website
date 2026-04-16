import Image from "next/image";
import TornCard from "@/components/ui/torn-card";

const seals = [
  { src: "/seal-2.png", alt: "seal 2" },
  { src: "/seal-3.png", alt: "seal 3" },
  { src: "/seal-4.png", alt: "seal 4" },
  { src: "/seal-5.png", alt: "seal 5" },
  { src: "/seal-6.png", alt: "seal 6" },
];

export default function DressCode() {
  return (
    <section className="py-12 px-6 bg-background">

      {/* SVG filter pour l'effet papier arraché */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="torn-paper-dresscode" x="-6%" y="-6%" width="112%" height="112%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="3" seed="7" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
        </defs>
      </svg>

      <div className="max-w-2xl mx-auto">
        <TornCard filterId="torn-paper-dresscode" className="text-center">
          <div className="flex flex-row items-center justify-center" style={{ gap: "12px" }}>
            {seals.map((seal) => (
              <Image
                key={seal.src}
                src={seal.src}
                alt={seal.alt}
                width={32}
                height={74}
                className="object-contain"
              />
            ))}
          </div>
          <p
            className="text-base text-stone-500 mt-4 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-serif)"}}
          >
            Concernant le code vestimentaire il n'y a pas de thème imposé. Mais si vous voulez jouer le jeu, vous pouvez vous inspirer de cette palette de couleur aquarelle qui représente les tons naturels mais colorés de notre mariage.
          </p>
        </TornCard>
      </div>
    </section>
  );
}

import Link from "next/link";
import Image from "next/image";
import { WEDDING } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";

export default function Hero() {
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(WEDDING.date);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-background px-6 py-20 text-center overflow-hidden">

      {/* Names */}
      <h1
        className="text-[52px] font-light text-stone-800 leading-none tracking-wide uppercase"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {WEDDING.bride}
      </h1>

      <p
        className="text-[40px] text-stone-800 my-2 leading-none font-light"
        style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
      >
        &amp;
      </p>

      <h1
        className="text-[52px] font-light text-stone-800 leading-none tracking-wide uppercase"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {WEDDING.groom}
      </h1>

      {/* Date */}
      <p
        className="text-2xl md:text-3xl text-stone-500 mt-4 mb-16"
        style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
      >
        {formattedDate}
      </p>

      {/* Polaroid photo */}
      <div className="relative z-10 mb-16">
        {/* SVG filter — torn paper effect */}
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="hero-torn-paper" x="-6%" y="-6%" width="112%" height="112%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02 0.03" numOctaves="3" seed="5" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="14" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
        </svg>

        {/* Flower — derrière la photo */}
        <Image
          src="/flower.png"
          alt=""
          width={132}
          height={228}
          className="absolute -bottom-32 -left-16 pointer-events-none z-0 opacity-90"
        />

        {/* Tape decoration — coin haut-droite en diagonale */}
        <Image
          src="/tape.png"
          alt=""
          width={75}
          height={27}
          className="absolute top-5 right-0 translate-x-1/2 -translate-y-1/2 rotate-45 z-20"
          style={{ filter: "hue-rotate(85deg) saturate(0.28) brightness(0.92)" }}
        />

        <div className="relative z-10 -rotate-[-4deg] w-56 md:w-64">
          {/* White border with torn effect */}
          <div
            className="absolute inset-0 bg-white"
            style={{ filter: 'url(#hero-torn-paper) drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}
          />
          {/* Image content */}
          <div className="relative p-[4px]">
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src="/hero.jpg"
                alt="Maëliss & Stanislas"
                fill
                className="object-cover object-center grayscale"
                priority
                quality={85}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link href="/rsvp" className={buttonVariants({ variant: "primary", size: "lg" }) + " relative z-10"}>
        Confirmez votre venue
      </Link>
    </section>
  );
}

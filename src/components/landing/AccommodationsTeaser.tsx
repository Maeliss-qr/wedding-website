import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";

export default function AccommodationsTeaser() {
  return (
    <section className="relative py-24 px-6 bg-background text-center overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-light text-center mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Hébergements
        </h2>
        <div className="w-12 h-px bg-stone-300 mx-auto mb-8" />
        <p className="text-lg text-stone-500 text mb-10 max-w-md mx-auto" style={{ fontFamily: "var(--font-serif)"}}>
          Nous avons sélectionné quelques hébergements proches du lieu pour votre confort.
        </p>
        <Link href="/logements" className={buttonVariants({ variant: "primary", size: "lg" })}>
          Voir les hébergements
        </Link>
      </div>
    </section>

  );
}

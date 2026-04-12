import Image from "next/image";

const seals = [
  { src: "/seal-2.png", alt: "seal 2" },
  { src: "/seal-3.png", alt: "seal 3" },
  { src: "/seal-4.png", alt: "seal 4" },
  { src: "/seal-5.png", alt: "seal 5" },
  { src: "/seal-6.png", alt: "seal 6" },
];

export default function DressCode() {
  return (
    <section className="py-12 px-6 bg-background text-center">
      <div className="max-w-4xl mx-auto">
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
          className="text-stone-500 mt-4 max-w-md mx-auto"
          style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
        >
          Voilà le code couleur si vous voulez jouer le jeu du dress code
        </p>
      </div>
    </section>
  );
}

import Link from "next/link";

const accommodations = [
  {
    name: "Gîte du Moulin de Poissac",
    type: "Gîte rural",
    distance: "à Oinville",
    url: "https://www.gites-de-france.com/fr/centre-val-de-loire/eure-et-loir/gite-du-moulin-de-poissac-h28g008510",
  },
  {
    name: "Cherville B&B",
    type: "Chambre d'hôtes",
    distance: "~3 km",
    url: "https://reserving.com/hotels/europe/france/centre/eure-et-loir/oinville-sous-auneau/cherville-b-b",
  },
  {
    name: "Depuis la verrière",
    type: "Chambre d'hôtes",
    distance: "~9 km",
    url: "https://www.depuislaverriere.fr/",
  },
  {
    name: "Logis de Beauce",
    type: "Chambre d'hôtes",
    distance: "~11 km",
    url: "https://maps.app.goo.gl/xGsxWAVQNHER4Ct29",
  },
  {
    name: "Le Camp d'Auneau",
    type: "Gîtes familiaux",
    distance: "~6 km",
    url: "https://maps.app.goo.gl/bfY8wFSaY68NXi676",
  },
  {
    name: "Le relais d'Antoinette",
    type: "Hébergement",
    distance: "~8 km",
    url: "https://maps.app.goo.gl/xVzjdg641xr3hmn1A",
  },
  {
    name: "L'Escale en Beauce",
    type: "Hébergement",
    distance: "~8 km",
    url: "https://maps.app.goo.gl/5KUg8Z2rk5RRrLAx8",
  },
];

export default function LogementsPage() {
  return (
    <main className="min-h-screen bg-background py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="inline-block mb-12 text-xs tracking-wider uppercase text-stone-400 hover:text-stone-600 transition-colors"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          ← Retour
        </Link>

        <h2
          className="text-4xl md:text-5xl font-light text-center mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Hébergements
        </h2>
        <div className="w-12 h-px bg-stone-300 mx-auto mb-6" />
        <p
          className="text-center text-stone-400 text-sm mb-16"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Quelques options à proximité de la Bergerie du Mérinos
        </p>

        <div className="divide-y divide-stone-100">
          {accommodations.map((item) => (
            <div key={item.name} className="flex items-center justify-between py-5 gap-4">
              <div className="flex-1 min-w-0">
                <p
                  className="text-stone-700 text-lg"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.name}
                </p>
                <p
                  className="text-stone-400 text-xs tracking-wider uppercase mt-0.5"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {item.type}
                </p>
              </div>
              <p
                className="text-stone-400 text-sm flex-shrink-0"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {item.distance}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-xs tracking-wider uppercase text-stone-500 border-b border-stone-300 hover:border-stone-500 transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Voir →
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

import { WEDDING } from "@/lib/constants";

export default function EventDetails() {
  return (
    <section id="details" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-light text-center mb-4"
          style={{ fontFamily: "var(--font-serif)", color: "#5e6a8f" }}
        >
          Informations pratiques
        </h2>
        <div className="w-12 h-px bg-stone-300 mx-auto mb-16" />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-stone-100 p-8 hover:shadow-sm transition-shadow">
            <p
              className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Cérémonie
            </p>
            <p
              className="text-2xl text-stone-700 mb-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              15h00
            </p>
            <p className="text-stone-500 text-sm">{WEDDING.venue.name}</p>
            <p className="text-stone-400 text-sm mt-1">{WEDDING.venue.address}</p>
            <a
              href={WEDDING.venue.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-xs tracking-wider uppercase text-stone-500 border-b border-stone-300 hover:border-stone-500 transition-colors"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Itinéraire →
            </a>
          </div>

          <div className="border border-stone-100 p-8 hover:shadow-sm transition-shadow">
            <p
              className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Réception
            </p>
            <p
              className="text-2xl text-stone-700 mb-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              16h00
            </p>
            <p className="text-stone-500 text-sm">{WEDDING.venue.name}</p>
            <p className="text-stone-400 text-sm mt-1">Dîner et fête à suivre</p>
            <p
              className="inline-block mt-4 text-xs tracking-wider uppercase text-stone-400"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Tenue de soirée conseillée
            </p>
          </div>
        </div>

        <div className="mt-8 border border-stone-100 p-8 text-center hover:shadow-sm transition-shadow">
          <p
            className="text-xs tracking-[0.3em] uppercase text-stone-400 mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Date limite de réponse
          </p>
          <p
            className="text-2xl text-stone-700"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {new Intl.DateTimeFormat("fr-FR", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }).format(WEDDING.rsvpDeadline)}
          </p>
          <p className="text-stone-400 text-sm mt-2">
            Merci de répondre avant cette date afin que nous puissions organiser au mieux.
          </p>
        </div>
      </div>
    </section>
  );
}

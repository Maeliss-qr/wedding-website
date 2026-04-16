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
    name: "Petite maison",
    type: "AIRBNB",
    distance: "~7 km",
    url: "https://www.airbnb.fr/rooms/1205877525849431809?check_in=2026-09-05&check_out=2026-09-06&search_mode=regular_search&source_impression_id=p3_1776283954_P3AVVLdZyBC1qmOy&previous_page_section_name=1000&federated_search_id=b137b8db-2509-499d-bae3-f2ddb63868f3",
  },
  {
    name: "Depuis la verrière",
    type: "Chambre d'hôtes",
    distance: "~9 km",
    url: "https://www.depuislaverriere.fr/",
  },
  {
    name: "Studio Gallardon",
    type: "AirBnB",
    distance: "~10 km",
    url: "https://www.airbnb.fr/rooms/52485444?check_in=2026-09-05&check_out=2026-09-06&search_mode=regular_search&source_impression_id=p3_1776283788_P3P5_v4utbS9XWc0&previous_page_section_name=1000&federated_search_id=591e3d0f-1ad7-4de7-8ff1-e30562ac6c1a",
  },
  {
    name: "Appartement Gallardon",
    type: "AirBnB",
    distance: "~10 km",
    url: "https://www.airbnb.fr/rooms/1061475549864294196?check_in=2026-09-05&check_out=2026-09-06&search_mode=regular_search&source_impression_id=p3_1776283954_P3MuLYUXJFJQHT3z&previous_page_section_name=1000&federated_search_id=b137b8db-2509-499d-bae3-f2ddb63868f3",
  
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
  {
    name: "Chambres à Chartres",
    type: "AirBnB",
    distance: "16km (~15 min)",
    url: "https://www.airbnb.fr/s/Chartres/homes?refinement_paths%5B%5D=%2Fhomes&acp_id=fc8fed9c-0bf3-4973-91fc-9fcce40de620&date_picker_type=calendar&place_id=ChIJi-HxJEQM5EcRKe3HU0iIY3g&checkin=2026-09-05&checkout=2026-09-06&search_type=user_map_move&query=Chartres&flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2026-05-01&monthly_length=3&monthly_end_date=2026-08-01&search_mode=regular_search&price_filter_input_type=2&price_filter_num_nights=1&channel=EXPLORE&ne_lat=48.48704274430682&ne_lng=1.6003169708958183&sw_lat=48.41971296383968&sw_lng=1.5069855260716167&zoom=13.073973822481413&zoom_level=13.073973822481413&search_by_map=true",
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
          Nous vous avons listé quelques options à proximité de la Bergerie du Mérinos.
        <br />
         Une chambre dortoir de 5 personnes est également disponible sur place. Contactez-nous pour plus d'informations!
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

const schedule = [
  { time: "15h00", event: "Cérémonie", description: "Échange des vœux dans la chapelle du château" },
  { time: "16h00", event: "Cocktail", description: "Boissons et amuse-bouches dans le jardin" },
  { time: "18h00", event: "Dîner", description: "Dîner en quatre services dans le grand salon" },
  { time: "21h00", event: "Bal", description: "Groupe live et bal jusqu'à minuit" },
  { time: "00h00", event: "Au revoir", description: "En-cas de fin de soirée et départ des mariés" },
];

export default function Schedule() {
  return (
    <section className="py-24 px-6 bg-stone-50">
      <div className="max-w-2xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-light text-center mb-4"
          style={{ fontFamily: "var(--font-serif)", color: "#5e6a8f" }}
        >
          Programme de la journée
        </h2>
        <div className="w-12 h-px bg-stone-300 mx-auto mb-16" />

        <div className="relative">
          <div className="absolute left-24 top-0 bottom-0 w-px bg-stone-200" />

          <div className="space-y-10">
            {schedule.map(({ time, event, description }) => (
              <div key={event} className="flex gap-8 items-start relative">
                <div
                  className="w-24 flex-shrink-0 text-right text-sm text-stone-400"
                  style={{ fontFamily: "var(--font-sans)", paddingTop: "2px" }}
                >
                  {time}
                </div>
                <div className="absolute left-24 top-2 w-2 h-2 rounded-full bg-stone-300 -translate-x-1/2" />
                <div className="pl-6">
                  <p
                    className="text-xl text-stone-700 font-medium"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {event}
                  </p>
                  <p className="text-stone-400 text-sm mt-1">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

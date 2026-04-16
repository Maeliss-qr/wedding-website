export const WEDDING = {
  bride: "Maëliss",
  groom: "Stanislas",
  date: new Date("2026-09-05T14:00:00"),
  venue: {
    name: "Bergerie du Merinos",
    address: "3 Rue des Prunus, 28700 Oinville-sous-Auneau",
    mapsUrl: "https://www.google.fr/maps/place/La+Bergerie+du+Merinos/@48.4667809,1.6959551,17z/data=!3m1!4b1!4m6!3m5!1s0x47e417eab401fc89:0x790bdef0286132a7!8m2!3d48.4667809!4d1.69853!16s%2Fg%2F11jj6lp5mt?entry=ttu&g_ep=EgoyMDI2MDMxNS4wIKXMDSoASAFQAw%3D%3D",
  },
  church: {
    name: "Église de Gallardon",
    address: "Place de l'Église, 28320 Gallardon",
    mapsUrl: "https://maps.app.goo.gl/N2TZsxM8R9L6DQtw9",
  },
  rsvpDeadline: new Date("2026-06-15"),
} as const;



export const MEAL_OPTIONS = [
  { value: "volaille", label: "Volaille" },
  { value: "risotto", label: "Risotto" },
] as const;

export type MealOption = (typeof MEAL_OPTIONS)[number]["value"];

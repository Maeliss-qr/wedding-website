import { z } from "zod";

export const rsvpSchema = z
  .object({
    firstName: z.string().min(1, "Le prénom est requis").max(100),
    lastName: z.string().min(1, "Le nom est requis").max(100),
    attending: z.boolean({ error: "Veuillez indiquer votre présence" }),
    mealPreference: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.attending && !data.mealPreference) return false;
      return true;
    },
    { message: "Veuillez choisir un menu", path: ["mealPreference"] }
  );

export type RsvpFormData = z.infer<typeof rsvpSchema>;

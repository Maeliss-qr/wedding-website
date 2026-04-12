"use client";

import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { rsvpSchema, type RsvpFormData } from "@/lib/schemas/rsvp";
import { MEAL_OPTIONS } from "@/lib/constants";
import Select from "@/components/ui/Select";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-red-500 text-xs mt-1">{message}</p>;
}

export default function RSVPForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RsvpFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      attending: undefined,
    },
  });

  const attending = watch("attending");

  async function onSubmit(data: RsvpFormData) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/rsvp-confirmation");
        return;
      }

      const json = await res.json();
      if (res.status === 400) {
        setSubmitError("Veuillez vérifier le formulaire et réessayer.");
      } else {
        setSubmitError(json.error ?? "Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch {
      setSubmitError("Erreur réseau. Vérifiez votre connexion et réessayez.");
    }
  }

  const inputClass =
    "w-full px-4 py-3 border border-stone-200 bg-white text-stone-700 text-sm focus:outline-none focus:border-stone-400 transition-colors";

  const labelClass =
    "block text-xs tracking-[0.15em] uppercase text-stone-400 mb-2";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Prénom *</label>
          <input
            {...register("firstName")}
            className={inputClass}
            placeholder="Sophie"
          />
          <FieldError message={errors.firstName?.message} />
        </div>
        <div>
          <label className={labelClass}>Nom *</label>
          <input
            {...register("lastName")}
            className={inputClass}
            placeholder="Dupont"
          />
          <FieldError message={errors.lastName?.message} />
        </div>
      </div>

      {/* Attending */}
      <div>
        <label className={labelClass}>Serez-vous présent(e) ? *</label>
        <div className="grid grid-cols-2 gap-3">
          <label className="relative cursor-pointer">
            <input
              {...register("attending", { setValueAs: (v) => v === "true" })}
              type="radio"
              value="true"
              className="sr-only peer"
            />
            <div className="px-4 py-3 border border-stone-200 text-center text-sm text-stone-500 peer-checked:border-stone-700 peer-checked:text-stone-700 peer-checked:bg-stone-50 transition-all hover:border-stone-300">
              Accepte avec joie
            </div>
          </label>
          <label className="relative cursor-pointer">
            <input
              {...register("attending", { setValueAs: (v) => v === "true" })}
              type="radio"
              value="false"
              className="sr-only peer"
            />
            <div className="px-4 py-3 border border-stone-200 text-center text-sm text-stone-500 peer-checked:border-stone-700 peer-checked:text-stone-700 peer-checked:bg-stone-50 transition-all hover:border-stone-300">
              Décline à regret
            </div>
          </label>
        </div>
        <FieldError message={errors.attending?.message} />
      </div>

      {/* Meal — only if attending */}
      {attending === true && (
        <div>
          <label className={labelClass}>Choix du menu *</label>
          <Controller
            name="mealPreference"
            control={control}
            render={({ field }) => (
              <Select
                options={[...MEAL_OPTIONS]}
                value={field.value}
                onChange={field.onChange}
                placeholder="Choisir un menu..."
              />
            )}
          />
          <FieldError message={errors.mealPreference?.message} />
        </div>
      )}

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm">
          {submitError}
        </div>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        fullWidth
        size="lg"
      >
        {isSubmitting ? "Envoi..." : "Envoyer ma réponse"}
      </Button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Select from "@/components/ui/Select";
import { Button } from "@/components/ui/button";
import { MEAL_OPTIONS } from "@/lib/constants";

type GuestData = {
  id: number;
  firstName: string;
  lastName: string;
  attending: boolean | null;
  mealPreference: string | null;
  dietaryRestrictions: string | null;
};

type Props = {
  guestId: number;
  guests: GuestData[];
  familyName?: string;
  initialAttendsBrunch: boolean | null;
  initialMessage: string | null;
  onBack: () => void;
};

type GuestResponse = {
  id: number;
  attending: boolean | null;
  mealPreference: string | undefined;
  dietaryRestrictions: string;
};

export default function FamilyRSVPForm({
  guestId,
  guests,
  familyName,
  initialAttendsBrunch,
  initialMessage,
  onBack,
}: Props) {
  const router = useRouter();
  const [responses, setResponses] = useState<GuestResponse[]>(
    guests.map((g) => ({
      id: g.id,
      attending: g.attending ?? null,
      mealPreference: g.mealPreference ?? undefined,
      dietaryRestrictions: g.dietaryRestrictions ?? "",
    }))
  );
  const [attendsBrunch, setAttendsBrunch] = useState<boolean | null>(initialAttendsBrunch);
  const [message, setMessage] = useState(initialMessage ?? "");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<number, string>>({});

  function setGuestAttending(id: number, value: boolean) {
    setResponses((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, attending: value, mealPreference: value ? r.mealPreference : undefined } : r
      )
    );
    setValidationErrors((e) => { const next = { ...e }; delete next[id]; return next; });
  }

  function setMeal(id: number, value: string) {
    setResponses((prev) =>
      prev.map((r) => (r.id === id ? { ...r, mealPreference: value } : r))
    );
    setValidationErrors((e) => { const next = { ...e }; delete next[id]; return next; });
  }

  function setDietary(id: number, value: string) {
    setResponses((prev) =>
      prev.map((r) => (r.id === id ? { ...r, dietaryRestrictions: value } : r))
    );
  }

  function validate(): boolean {
    const errors: Record<number, string> = {};
    for (const r of responses) {
      if (r.attending === null) {
        errors[r.id] = "Veuillez indiquer la présence.";
      } else if (r.attending && !r.mealPreference) {
        errors[r.id] = "Veuillez choisir un menu.";
      }
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/rsvp/family", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestId,
          responses: responses.map((r) => ({
            id: r.id,
            attending: r.attending,
            mealPreference: r.mealPreference ?? null,
            dietaryRestrictions: r.dietaryRestrictions.trim() || null,
          })),
          attendsBrunch,
          message: message.trim() || null,
        }),
      });

      if (res.ok) {
        router.push("/rsvp-confirmation");
        return;
      }

      const json = await res.json();
      if (res.status === 400) {
        setSubmitError(json.error ?? "Session invalide, veuillez recommencer.");
      } else if (res.status === 403) {
        setSubmitError("Accès refusé.");
      } else {
        setSubmitError("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch {
      setSubmitError("Erreur réseau. Vérifiez votre connexion et réessayez.");
    } finally {
      setSubmitting(false);
    }
  }

  const labelClass = "block text-xs tracking-[0.15em] uppercase text-stone-400 mb-2";
  const inputClass = "w-full px-4 py-3 border border-stone-200 bg-white text-stone-700 text-sm focus:outline-none focus:border-stone-400 transition-colors";

  return (
    <form onSubmit={onSubmit} className="space-y-8">

      {guests.map((guest, i) => {
        const response = responses.find((r) => r.id === guest.id)!;
        const error = validationErrors[guest.id];

        return (
          <div key={guest.id} className={i > 0 ? "pt-8 border-t border-stone-100" : ""}>
            <p className="text-base text-stone-700 mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              {guest.firstName} {guest.lastName}
            </p>

            <div className="space-y-4">
              <div>
                <label className={labelClass}>Présence *</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: true, label: "Accepte avec joie" },
                    { value: false, label: "Décline à regret" },
                  ].map(({ value, label }) => (
                    <label key={String(value)} className="relative cursor-pointer">
                      <input
                        type="radio"
                        name={`attending-${guest.id}`}
                        checked={response.attending === value}
                        onChange={() => setGuestAttending(guest.id, value)}
                        className="sr-only peer"
                      />
                      <div className="px-4 py-3 border border-stone-200 text-center text-sm text-stone-500 peer-checked:border-stone-700 peer-checked:text-stone-700 peer-checked:bg-stone-50 transition-all hover:border-stone-300">
                        {label}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {response.attending === true && (
                <>
                  <div>
                    <label className={labelClass}>Choix du menu *</label>
                    <Select
                      options={[...MEAL_OPTIONS]}
                      value={response.mealPreference}
                      onChange={(v) => setMeal(guest.id, v)}
                      placeholder="Choisir un menu..."
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Restrictions alimentaires (facultatif)</label>
                    <textarea
                      value={response.dietaryRestrictions}
                      onChange={(e) => setDietary(guest.id, e.target.value)}
                      className={`${inputClass} resize-none`}
                      rows={2}
                      maxLength={500}
                      placeholder="Allergies, intolérances, régime particulier..."
                    />
                  </div>
                </>
              )}

              {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>
          </div>
        );
      })}

      {/* Brunch */}
      <div className="pt-8 border-t border-stone-100 space-y-3">
        <div>
          <label className={labelClass}>Brunch du lendemain</label>
          <p className="text-sm text-stone-400 mb-3">
            Le lendemain du mariage, un brunch sera organisé à partir de 11h, à la Bergerie du Merinos. 
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: true, label: "Oui, avec plaisir" },
              { value: false, label: "Non merci" },
            ].map(({ value, label }) => (
              <label key={String(value)} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="attendsBrunch"
                  checked={attendsBrunch === value}
                  onChange={() => setAttendsBrunch(value)}
                  className="sr-only peer"
                />
                <div className="px-4 py-3 border border-stone-200 text-center text-sm text-stone-500 peer-checked:border-stone-700 peer-checked:text-stone-700 peer-checked:bg-stone-50 transition-all hover:border-stone-300">
                  {label}
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="pt-2 space-y-2">
        <label className={labelClass}>Un mot pour les futurs mariés ? (facultatif)</label>
        <p className="text-sm text-stone-400 mb-3">
          Laissez un petit message à Maëliss et Stanislas pour leur grand jour.
        </p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-none`}
          rows={3}
          maxLength={1000}
          placeholder="Tous nos vœux de bonheur..."
        />
      </div>

      {submitError && (
        <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm">
          {submitError}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Button
          type="submit"
          variant="primary"
          disabled={submitting}
          fullWidth
          size="lg"
        >
          {submitting ? "Envoi..." : "Envoyer notre réponse"}
        </Button>
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
        >
          ← Ce n&apos;est pas moi
        </button>
      </div>
    </form>
  );
}

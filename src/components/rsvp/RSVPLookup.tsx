"use client";

import { useState } from "react";
import FamilyRSVPForm from "@/components/rsvp/FamilyRSVPForm";
import { Button, buttonVariants } from "@/components/ui/button";

type GuestData = {
  id: number;
  firstName: string;
  lastName: string;
  attending: boolean | null;
  mealPreference: string | null;
  dietaryRestrictions: string | null;
  attendsBrunch: boolean | null;
  message: string | null;
  family: {
    id: number;
    name: string;
    attendsBrunch: boolean | null;
    message: string | null;
    guests: {
      id: number;
      firstName: string;
      lastName: string;
      attending: boolean | null;
      mealPreference: string | null;
      dietaryRestrictions: string | null;
    }[];
  } | null;
};

type Step =
  | { name: "identify" }
  | { name: "disambiguate"; guests: GuestData[] }
  | { name: "form"; guest: GuestData };

export default function RSVPLookup() {
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<Step>({ name: "identify" });

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/rsvp/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName }),
      });

      if (!res.ok) {
        setError("Une erreur s'est produite. Veuillez réessayer.");
        return;
      }

      const json = await res.json();
      const guests: GuestData[] = json.guests;

      if (guests.length === 0) {
        setError(
          "Nous n'avons pas trouvé votre nom. Vérifiez l'orthographe ou contactez Maëliss & Stanislas."
        );
      } else if (guests.length === 1) {
        setStep({ name: "form", guest: guests[0] });
      } else {
        setStep({ name: "disambiguate", guests });
      }
    } catch {
      setError("Erreur réseau. Vérifiez votre connexion et réessayez.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setStep({ name: "identify" });
    setError(null);
  }

  const inputClass =
    "w-full px-4 py-3 border border-stone-200 bg-white text-stone-700 text-sm focus:outline-none focus:border-stone-400 transition-colors";
  const labelClass =
    "block text-xs tracking-[0.15em] uppercase text-stone-400 mb-2";

  if (step.name === "identify") {
    return (
      <form onSubmit={handleLookup} className="space-y-6">
        <div>
          <label className={labelClass}>Prénom *</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
            placeholder="Sophie"
            autoComplete="given-name"
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={loading || !firstName.trim()}
          fullWidth
          size="lg"
        >
          {loading ? "Recherche..." : "Trouver ma réponse"}
        </Button>
      </form>
    );
  }

  if (step.name === "disambiguate") {
    return (
      <div className="space-y-6">
        <p className="text-sm text-stone-500">
          Plusieurs invités correspondent. Lequel êtes-vous ?
        </p>
        <div className="space-y-3">
          {step.guests.map((g) => (
            <button
              key={g.id}
              type="button"
              onClick={() => setStep({ name: "form", guest: g })}
              className={buttonVariants({ variant: "primary", size: "lg", fullWidth: true })}
            >
              {g.firstName} {g.lastName}
              {g.family && (
                <span className="ml-2 opacity-60">— {g.family.name}</span>
              )}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={reset}
          className="text-xs text-stone-400 hover:text-stone-600 transition-colors"
        >
          ← Recommencer
        </button>
      </div>
    );
  }

  const { guest } = step;
  const formGuests = guest.family ? guest.family.guests : [guest];
  const familyName = guest.family?.name;
  const initialAttendsBrunch = guest.family ? guest.family.attendsBrunch : guest.attendsBrunch;
  const initialMessage = guest.family ? guest.family.message : guest.message;

  return (
    <FamilyRSVPForm
      guestId={guest.id}
      guests={formGuests}
      familyName={familyName}
      initialAttendsBrunch={initialAttendsBrunch ?? null}
      initialMessage={initialMessage ?? null}
      onBack={reset}
    />
  );
}

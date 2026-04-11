import Link from "next/link";
import { WEDDING } from "@/lib/constants";

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-6">
      <div className="max-w-md mx-auto text-center">
        <div className="text-4xl mb-8">✦</div>

        <h1
          className="text-5xl font-light text-stone-800 mb-4"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Merci !
        </h1>
        <div className="w-12 h-px bg-stone-300 mx-auto mb-8" />

        <p className="text-stone-500 mb-2">
          Votre réponse a bien été enregistrée.
        </p>
        <p className="text-stone-400 text-sm mb-10">
          Nous sommes ravis de fêter cela avec vous le 12 septembre 2026 au{" "}
          {WEDDING.venue.name}.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 border border-stone-300 text-stone-600 text-sm tracking-[0.15em] uppercase hover:border-stone-500 transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/rsvp"
            className="inline-block px-8 py-3 bg-stone-800 text-stone-100 text-sm tracking-[0.15em] uppercase hover:bg-stone-700 transition-colors"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Modifier ma réponse
          </Link>
        </div>
      </div>
    </main>
  );
}

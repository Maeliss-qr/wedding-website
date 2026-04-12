import Link from "next/link";
import { WEDDING } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-6">
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
          Nous sommes ravis de fêter cela avec vous le{" "}
          {new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(WEDDING.date)}{" "}
          au{" "}
          {WEDDING.venue.name}.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Retour à l&apos;accueil
          </Link>
          <Link href="/rsvp" className={buttonVariants({ variant: "primary" })}>
            Modifier ma réponse
          </Link>
        </div>
      </div>
    </main>
  );
}

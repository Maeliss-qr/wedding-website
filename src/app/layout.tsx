import type { Metadata } from "next";
import { Cormorant_Garamond, Cormorant_Infant, Lato } from "next/font/google";
import "./globals.css";

const cormorantInfant = Cormorant_Infant({
  variable: "--font-infant",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Maëliss & Stanislas — 5 septembre 2026",
  // Date source: WEDDING.date in src/lib/constants.ts
  description: "Rejoignez-nous pour célébrer notre mariage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cormorant.variable} ${cormorantInfant.variable} ${lato.variable} h-full antialiased`}
    >

      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "var(--font-sans), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}

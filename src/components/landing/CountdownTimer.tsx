"use client";

import { useEffect, useState } from "react";
import { WEDDING } from "@/lib/constants";

function getTimeLeft() {
  const now = new Date().getTime();
  const target = WEDDING.date.getTime();
  const diff = target - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft> | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Jours", value: time?.days ?? 0 },
    { label: "Heures", value: time?.hours ?? 0 },
    { label: "Minutes", value: time?.minutes ?? 0 },
    { label: "Secondes", value: time?.seconds ?? 0 },
  ];

  return (
    <section className="py-16 px-6 bg-background">
      <div className="flex justify-center gap-8 md:gap-16">
        {units.map(({ label, value }) => (
          <div key={label} className="text-center">
            <span
              className="block text-5xl md:text-6xl font-light text-stone-800 tabular-nums"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {String(value).padStart(2, "0")}
            </span>
            <span
              className="block text-xs tracking-widest uppercase text-stone-800 mt-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

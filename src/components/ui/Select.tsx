"use client";

import { useState, useRef, useEffect } from "react";

type Option = { value: string; label: string };

type SelectProps = {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Choisir...",
  disabled = false,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-3 border border-stone-200 bg-white text-sm text-left flex items-center justify-between focus:outline-none focus:border-stone-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className={selected ? "text-stone-700" : "text-stone-400"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-10 w-full mt-px bg-white border border-stone-200 shadow-sm">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`px-4 py-3 text-sm cursor-pointer transition-colors ${
                opt.value === value
                  ? "text-stone-800 bg-stone-50"
                  : "text-stone-500 hover:bg-stone-50 hover:text-stone-700"
              }`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

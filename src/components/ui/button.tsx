import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────

const variants = {
  primary:
    "bg-white text-[#656B51] border border-[#656B51] hover:bg-stone-100",
  secondary:
    "bg-transparent text-white border border-white hover:bg-white/10",
  outline:
    "border border-stone-300 text-stone-600 hover:border-stone-500",
  "ghost-white":
    "border border-white/50 text-white hover:border-white",
  blue:
    "text-white bg-[#5e6a8f] hover:bg-[#4e5a7f]",
} as const;

const sizes = {
  md: "px-8 py-3",
  lg: "px-10 py-4",
  xl: "px-12 py-4",
} as const;

// ─── Utility (for <Link> and <a>) ─────────────────────────────────────────────

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

export function buttonVariants({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
} = {}) {
  return cn(
    "[font-family:var(--font-infant)] inline-block text-[13px] font-normal not-italic leading-[20px] tracking-[2.8px] text-center uppercase transition-colors disabled:bg-stone-200 disabled:border-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    fullWidth && "w-full text-center",
    className
  );
}

// ─── Component (for <button>) ─────────────────────────────────────────────────

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", fullWidth = false, className, ...props }, ref) => (
    <button
      ref={ref}
      className={buttonVariants({ variant, size, fullWidth, className })}
      {...props}
    />
  )
);
Button.displayName = "Button";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  "aria-label"?: string;
}

/**
 * Primary = blue fill (CTA/active only). Outline = white bg / line border / navy.
 * Ghost = transparent w/ light border, for the dark Hero panel.
 * Per the design system there is exactly one primary action per view/section.
 */
export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-[9px] rounded-full font-sans font-semibold transition-[background,border-color,color] duration-200 ease-out";

  const sizes: Record<Size, string> = {
    sm: "px-[26px] py-[14px] text-[15px]",
    md: "px-[30px] py-[17px] text-base",
    lg: "px-[34px] py-[18px] text-base",
  };

  // Flat, nextlab-style: solid fill, darken on hover (no glow / no lift).
  const variants: Record<Variant, string> = {
    primary: "bg-blue text-white hover:bg-blue-hover hover:text-white",
    outline: "bg-white text-navy border border-line hover:border-navy hover:bg-surface",
    ghost:
      "bg-transparent text-white border border-white/[0.34] hover:border-white/70 hover:bg-white/[0.08] hover:text-white",
  };

  return (
    <Link
      href={href}
      className={cn(base, sizes[size], variants[variant], className)}
      {...rest}
    >
      {children}
      {withArrow && <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" />}
    </Link>
  );
}

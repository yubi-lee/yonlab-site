import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

/**
 * Premium dark card — the site-wide card language (kornic-style). Deep navy
 * gradient, a hover glow that lifts and brightens the border, and a soft corner
 * light. Content inside uses light text (white / white-muted / sky accents).
 */
const CARD_BG =
  "linear-gradient(155deg,#0B2A5E 0%,#061A3B 55%,#03102A 100%)";

export function Card({ children, href, className }: CardProps) {
  const cls = cn(
    "group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-white/10 p-7 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-sky/50 hover:shadow-[0_24px_60px_-20px_rgba(1,108,255,0.45)] sm:p-8",
    className,
  );
  const inner = (
    <>
      {/* soft corner light */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-blue/45 opacity-75 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
      />
      {/* top hairline */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <span className="relative flex h-full flex-col">{children}</span>
    </>
  );
  return href ? (
    <Link href={href} className={cls} style={{ background: CARD_BG }}>
      {inner}
    </Link>
  ) : (
    <div className={cls} style={{ background: CARD_BG }}>
      {inner}
    </div>
  );
}

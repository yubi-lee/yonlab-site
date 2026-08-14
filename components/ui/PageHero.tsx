import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

interface PageHeroProps {
  eyebrow: string;
  /** Optional chip shown next to the eyebrow (e.g. a category). */
  category?: string;
  title: ReactNode;
  description?: ReactNode;
  cta?: { href: string; label: string };
  /** Optional right-side visual (kept per-page; text scales to fill when absent). */
  visual?: ReactNode;
}

/**
 * Shared hero for all non-home pages. nextlab-style: clean light background,
 * generous whitespace, confident weight-based headline, one clear CTA, a
 * restrained supporting visual. (The home hero keeps its own navy treatment.)
 */
export function PageHero({
  eyebrow,
  category,
  title,
  description,
  cta,
  visual,
}: PageHeroProps) {
  return (
    <section
      className="relative overflow-hidden border-b border-line px-6 pb-16 pt-20 sm:px-14 lg:pb-24 lg:pt-32"
      style={{ background: "linear-gradient(180deg,#F7FAFF 0%,#FFFFFF 100%)" }}
    >
      <div
        className={cn(
          "relative mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:gap-16",
          visual ? "lg:grid-cols-[1.05fr_0.95fr]" : "lg:grid-cols-1",
        )}
      >
        <div>
          <div className="animate-yfade mb-6 flex items-center gap-3">
            <Eyebrow>{eyebrow}</Eyebrow>
            {category && (
              <span className="rounded-md border border-line bg-white px-2.5 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-muted">
                {category}
              </span>
            )}
          </div>
          <h1
            className="animate-yfade mb-6 max-w-[680px] break-keep font-sans text-[36px] font-extrabold leading-[1.1] tracking-[-0.03em] text-navy sm:text-[48px] lg:text-[56px]"
            style={{ animationDelay: ".06s" }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="animate-yfade mb-8 max-w-[560px] break-keep font-sans text-lg font-normal leading-[1.7] text-muted"
              style={{ animationDelay: ".1s" }}
            >
              {description}
            </p>
          )}
          {cta && (
            <div className="animate-yfade" style={{ animationDelay: ".14s" }}>
              <Button href={cta.href} withArrow>
                {cta.label}
              </Button>
            </div>
          )}
        </div>
        {visual && (
          <div className="animate-yfade" style={{ animationDelay: ".1s" }}>
            {visual}
          </div>
        )}
      </div>
    </section>
  );
}

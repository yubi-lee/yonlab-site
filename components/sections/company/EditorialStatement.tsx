import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/cn";
import type { StatementContent } from "@/lib/company";

interface EditorialStatementProps {
  id: string;
  content: StatementContent;
  /** "light" = white bg (Mission). "surface" = light-blue bg + line graphic (Vision). */
  variant?: "light" | "surface";
}

/** Faint layered-platform line graphic (Vision only) — decorative. */
function LayerGraphic() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 220 160"
      className="pointer-events-none absolute -right-6 top-10 hidden h-[200px] w-[280px] opacity-[0.5] lg:block"
      fill="none"
      stroke="#C6D6EE"
      strokeWidth="1.2"
    >
      <rect x="40" y="20" width="140" height="34" rx="8" />
      <rect x="40" y="66" width="140" height="34" rx="8" />
      <rect x="40" y="112" width="140" height="34" rx="8" />
      <line x1="110" y1="54" x2="110" y2="66" />
      <line x1="110" y1="100" x2="110" y2="112" />
      <circle cx="110" cy="60" r="1.8" fill="#7DB4FF" stroke="none" />
      <circle cx="110" cy="106" r="1.8" fill="#7DB4FF" stroke="none" />
    </svg>
  );
}

/**
 * Shared Mission / Vision layout. Reused via `variant` (no duplicate components):
 * Mission = white background, Vision = light-blue surface + a faint line graphic.
 */
export function EditorialStatement({
  id,
  content,
  variant = "light",
}: EditorialStatementProps) {
  const surface = variant === "surface";
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden scroll-mt-24 border-t border-line px-6 py-20 sm:px-14 lg:py-[120px]",
        surface ? "bg-surface" : "bg-white",
      )}
    >
      {surface && <LayerGraphic />}
      <div className="relative mx-auto grid max-w-content grid-cols-1 items-start gap-8 lg:grid-cols-[300px_1fr] lg:gap-16">
        <div data-reveal>
          <Eyebrow>{content.eyebrow}</Eyebrow>
        </div>

        <div data-reveal style={{ transitionDelay: ".06s" }}>
          <h2 className="mb-8 max-w-[760px] whitespace-pre-line font-sans text-[30px] font-extrabold leading-[1.2] tracking-[-0.02em] text-navy sm:text-[40px] lg:text-[46px]">
            {content.title}
          </h2>
          <div className="flex max-w-[640px] flex-col gap-4">
            {content.paragraphs.map((p, i) => (
              <p
                key={i}
                className={cn(
                  "font-sans font-normal leading-[1.75] text-muted",
                  i === 0 ? "text-[18px]" : "text-[16.5px]",
                )}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Summary — visually distinct from the body */}
          <div
            className={cn(
              "mt-10 max-w-[640px] rounded-panel border p-6 sm:p-8",
              surface ? "border-blue/20 bg-white" : "border-line-soft bg-surface",
            )}
          >
            <p className="mb-2 font-sans text-[19px] font-bold leading-[1.35] tracking-[-0.01em] text-navy">
              {content.summaryTitle}
            </p>
            <p className="font-sans text-[15.5px] leading-[1.7] text-muted">
              {content.summaryDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

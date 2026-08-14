import { cn } from "@/lib/cn";

export interface Metric {
  kicker?: string;
  value: string;
  label: string;
}

interface MetricBandProps {
  metrics: Metric[];
  variant?: "light" | "surface" | "navy" | "card";
  className?: string;
}

/**
 * Big-number proof band. Reusable across pages.
 * `card` = white rounded card floating on the soft ground (onramper-style, home).
 * `navy` = oversized values on a deep-navy band with a blue glow.
 */
export function MetricBand({ metrics, variant = "navy", className }: MetricBandProps) {
  const navy = variant === "navy";
  const card = variant === "card";

  const items = (
    <ul
      className={cn(
        "grid grid-cols-2 md:grid-cols-4",
        card ? "gap-0" : "gap-x-8 gap-y-12 md:gap-x-0",
      )}
    >
      {metrics.map((m, i) => (
        <li
          key={m.value + m.label}
          data-reveal
          style={card ? { transitionDelay: `${0.05 * i}s` } : undefined}
          className={cn(
            "flex flex-col",
            card
              ? "px-7 py-9 md:border-l md:border-line-soft md:first:border-l-0"
              : cn(
                  "md:pl-8 md:first:pl-0 md:first:border-l-0",
                  navy ? "md:border-l md:border-white/15" : "md:border-l md:border-line",
                ),
          )}
        >
          {m.kicker && (
            <span
              className={cn(
                "mb-3 font-sans text-[12px] font-bold uppercase tracking-[0.14em]",
                navy ? "text-sky" : "text-blue",
              )}
            >
              {m.kicker}
            </span>
          )}
          <span
            className={cn(
              "break-keep font-sans font-extrabold leading-[1.05] tracking-[-0.03em]",
              card
                ? "text-[30px] text-navy sm:text-[38px]"
                : "text-[34px] sm:text-[44px] lg:text-[52px]",
              !card && (navy ? "text-white" : "text-navy"),
            )}
          >
            {m.value}
          </span>
          <span
            className={cn(
              "mt-3 break-keep font-sans text-[15px] leading-snug",
              navy ? "text-white/70" : "text-muted",
            )}
          >
            {m.label}
          </span>
        </li>
      ))}
    </ul>
  );

  if (card) {
    return (
      <section className={cn("bg-white px-6 pb-8 pt-4 sm:px-14", className)}>
        <div className="mx-auto max-w-content overflow-hidden rounded-[28px] border border-line bg-surface shadow-[0_18px_50px_-30px_rgba(0,24,80,0.35)]">
          {items}
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden border-t border-line px-6 py-16 sm:px-14 lg:py-24",
        navy ? "bg-navy" : variant === "surface" ? "bg-surface" : "bg-white",
        className,
      )}
    >
      {navy && (
        <>
          <div className="blueprint-grid-light pointer-events-none absolute inset-0 opacity-[0.04]" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(74% 95% at 12% 0%, rgba(1,108,255,0.34) 0%, rgba(1,108,255,0) 56%)",
            }}
          />
        </>
      )}
      <div className="relative mx-auto max-w-content">{items}</div>
    </section>
  );
}

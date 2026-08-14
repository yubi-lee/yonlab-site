import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionConnector } from "@/components/ui/SectionConnector";
import { cn } from "@/lib/cn";

interface StatementBandProps {
  eyebrow?: string;
  statement: string;
  variant?: "light" | "surface" | "navy";
}

/**
 * Full-width typographic statement that interrupts the scroll (is-soft device).
 * Large centered brand statement, generous whitespace. Reusable across variants.
 */
export function StatementBand({
  eyebrow,
  statement,
  variant = "surface",
}: StatementBandProps) {
  const navy = variant === "navy";
  const surface = variant === "surface";

  return (
    <section
      className={cn(
        "relative overflow-hidden border-t px-6 py-24 text-center sm:px-14 lg:py-36",
        navy && "border-navy bg-navy",
        surface && "border-line bg-surface",
        variant === "light" && "border-line bg-white",
      )}
    >
      {navy ? (
        <>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 70% at 50% 0%, rgba(1,108,255,0.28) 0%, rgba(1,108,255,0) 55%)",
            }}
          />
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
        </>
      ) : (
        <>
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.02]" />
          <SectionConnector dotBg={surface ? "#F7FAFF" : "#fff"} />
        </>
      )}

      <div className="relative mx-auto max-w-[1000px]">
        {eyebrow && (
          <div data-reveal className="mb-8 flex justify-center">
            <Eyebrow onDark={navy}>{eyebrow}</Eyebrow>
          </div>
        )}
        <p
          data-reveal
          style={{ transitionDelay: ".06s" }}
          className={cn(
            "whitespace-pre-line break-keep font-sans text-[32px] font-extrabold leading-[1.2] tracking-[-0.03em] sm:text-[48px] lg:text-[60px] lg:leading-[1.15]",
            navy ? "text-white" : "text-navy",
          )}
        >
          {statement}
        </p>
      </div>
    </section>
  );
}

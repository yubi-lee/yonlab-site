import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionConnector } from "@/components/ui/SectionConnector";
import { whyRows } from "@/lib/content";

/** Dashed arrow connector between challenge and solution (tints blue on row hover). */
function ArrowConnector() {
  return (
    <svg
      width="42"
      height="12"
      viewBox="0 0 42 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="1" y1="6" x2="30" y2="6" strokeDasharray="1 5" />
      <path d="M30 2l5 4-5 4" />
    </svg>
  );
}

/** Blue circle with white check. */
function CheckMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 20 20" fill="none" className="mt-0.5 shrink-0" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#016CFF" />
      <path d="M5.8 10.2 L8.6 13 L14.2 6.8" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhyYonlab() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 sm:px-14 lg:py-[120px]">
      <SectionConnector dotBg="#fff" />

      <div className="relative mx-auto grid max-w-content grid-cols-1 items-start gap-12 lg:grid-cols-[340px_1fr] lg:gap-[64px]">
        <div data-reveal>
          <SectionHeading index="01" title="Why YOnLab" />
        </div>

        <div data-reveal style={{ transitionDelay: ".08s" }}>
          {/* Column labels (desktop) */}
          <div className="hidden grid-cols-[52px_minmax(0,1fr)_46px_minmax(0,1.1fr)] gap-x-[18px] pb-4 lg:grid">
            <div />
            <div className="self-end font-sans text-xs font-bold uppercase leading-none tracking-[0.09em] text-muted">
              Customer Challenge
            </div>
            <div />
            {/* Slightly stronger than the challenge label — this is the answer. */}
            <div className="flex flex-col gap-1.5">
              <span className="font-sans text-[13.5px] font-bold uppercase leading-none tracking-[0.08em] text-blue">
                Our Solution
              </span>
              <span className="h-0.5 w-12 rounded bg-blue" aria-hidden="true" />
            </div>
          </div>

          {whyRows.map((row) => (
            <div
              key={row.n}
              className="scroll-rise grid grid-cols-[40px_minmax(0,1fr)] items-start gap-x-4 gap-y-3 border-t border-line py-6 lg:grid-cols-[52px_minmax(0,1fr)_46px_minmax(0,1.1fr)] lg:gap-y-0 lg:py-7"
            >
              {/* Index chip — static, never a hover target */}
              <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-line bg-white">
                <span className="font-sans text-[15px] font-bold leading-none tabular-nums text-idle">
                  {row.n}
                </span>
              </div>

              {/* Challenge — the customer's voice, kept lighter for contrast */}
              <p className="whitespace-pre-line break-keep font-kr text-[17px] font-normal leading-[1.6] text-muted lg:text-[18px]">
                {row.challenge}
              </p>

              {/* Connector */}
              <div className="hidden items-start justify-center pt-2 text-line-deco lg:flex">
                <ArrowConnector />
              </div>

              {/* Solution — the payoff (clean, no box, no keyword emphasis) */}
              <div className="col-start-2 flex items-start gap-3 lg:col-start-auto">
                <CheckMark />
                <p className="whitespace-pre-line break-keep font-kr text-[17px] font-semibold leading-[1.5] text-navy lg:text-[19px]">
                  {row.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

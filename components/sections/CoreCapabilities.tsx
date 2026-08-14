import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionConnector } from "@/components/ui/SectionConnector";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Icon } from "@/components/icons";
import { capabilities } from "@/lib/content";

export function CoreCapabilities() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 sm:px-14 lg:py-28">
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.025]" />
      <svg
        className="pointer-events-none absolute -right-[120px] -top-[120px] h-[520px] w-[520px] opacity-[0.05]"
        viewBox="0 0 520 520"
        fill="none"
        stroke="#001850"
        strokeWidth="1.2"
        aria-hidden="true"
      >
        <circle cx="260" cy="260" r="250" />
        <circle cx="260" cy="260" r="190" strokeDasharray="3 8" />
        <circle cx="260" cy="260" r="130" />
        <line x1="10" y1="260" x2="510" y2="260" />
        <line x1="260" y1="10" x2="260" y2="510" />
      </svg>
      <SectionConnector dotBg="#F7FAFF" />

      <div className="relative mx-auto max-w-wide">
        <div
          data-reveal
          className="mb-14 flex flex-wrap items-end justify-between gap-10"
        >
          <SectionHeading index="02" title="Core Capabilities" faint />
          <p className="mb-2 max-w-[400px] break-keep font-sans text-lg font-medium leading-[1.5] text-muted">
            AI를 현실에서 작동하게 만드는
            <br />
            YOnLab의 핵심 엔지니어링 역량
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {capabilities.map((cap, i) => (
            <div
              key={cap.n}
              data-reveal
              className="scroll-rise h-full"
              style={{ transitionDelay: `${0.06 * i}s` }}
            >
              {/* No link yet — capability detail pages are out of scope for v1.0. */}
              {/* min-height locks the card at its current height; the tighter top
                  padding lifts the whole content group so the slack lands at the
                  bottom and the visual centre sits just above the card's middle. */}
              <Card className="min-h-[374px] !pt-5">
                {/* No index — these are parallel capabilities, not ordered steps.
                    The space the number left is kept as negative space. */}
                <div className="mb-3.5 flex items-center justify-end">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-sky-light">
                    <Icon name={cap.icon} size={26} />
                  </span>
                </div>
                {/* Every title is two words — one per line keeps all five cards
                    on an identical two-line title block. */}
                <h3 className="mb-3 break-keep font-sans text-[24px] font-bold leading-[1.18] tracking-[-0.02em] text-white lg:text-[27px]">
                  {cap.title.split(" ").map((word) => (
                    <span key={word} className="block">
                      {word}
                    </span>
                  ))}
                </h3>
                {/* Fixed-height body so every card's tag row starts at the same y.
                    No flex-grow — slack collects at the bottom of the card. */}
                <p className="min-h-[74px] break-keep font-sans text-[15.5px] font-normal leading-[1.6] text-white/60">
                  {cap.description}
                </p>
                {/* Exactly 4 tags per card → 2×2 grid keeps the block height equal.
                    Columns size to their content so longer labels aren't clipped. */}
                <div className="mt-4 grid grid-cols-[auto_auto] justify-start gap-1.5">
                  {cap.tags.map((t) => (
                    <Tag key={t} dark className="justify-center !px-2 !text-[11px]">
                      {t}
                    </Tag>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

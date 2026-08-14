import { Eyebrow } from "@/components/ui/Eyebrow";
import { companyHero, companySectionIds } from "@/lib/company";

/** Statement-driven company hero — philosophy before product, corporate scale. */
export function CompanyHero() {
  return (
    <section
      id={companySectionIds.hero}
      className="relative overflow-hidden scroll-mt-24 px-6 pb-20 pt-24 sm:px-14 lg:pb-28 lg:pt-32"
      style={{
        background: "linear-gradient(160deg,#EEF3FF 0%,#F7FAFF 55%,#FFFFFF 100%)",
      }}
    >
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.02]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(46% 60% at 88% 4%, rgba(0,104,248,0.10) 0%, rgba(0,104,248,0) 60%)",
        }}
      />
      {/* Oversized outline word backdrop (is-soft-style). */}
      <span
        aria-hidden="true"
        className="outline-index pointer-events-none absolute -right-6 top-4 hidden select-none font-sans text-[220px] font-extrabold leading-none opacity-[0.05] lg:block"
      >
        COMPANY
      </span>

      <div className="relative mx-auto max-w-content">
        <div data-reveal className="mb-7">
          <Eyebrow>{companyHero.eyebrow}</Eyebrow>
        </div>
        <h1
          data-reveal
          style={{ transitionDelay: ".06s" }}
          className="mb-10 max-w-[960px] break-keep font-sans text-[44px] font-extrabold leading-[1.05] tracking-[-0.03em] text-navy sm:text-[60px] lg:text-[76px]"
        >
          {companyHero.title}
        </h1>
        <div
          data-reveal
          style={{ transitionDelay: ".12s" }}
          className="flex max-w-[640px] flex-col gap-4"
        >
          {companyHero.paragraphs.map((p, i) => (
            <p
              key={i}
              className="break-keep font-sans text-lg font-normal leading-[1.75] text-muted"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Scroll cue */}
        <div className="mt-16 hidden items-center gap-3 lg:flex">
          <span className="relative inline-block h-[26px] w-px bg-navy/25">
            <span className="animate-yscroll absolute -left-[1.5px] top-0 h-1 w-1 rounded-full bg-blue" />
          </span>
          <span className="font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.18em] text-faint">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}

import { Zap, Workflow, ShieldCheck, type LucideIcon } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { coreValues, coreValuesIntro, companySectionIds, type ValueIconId } from "@/lib/company";

const valueIcons: Record<ValueIconId, LucideIcon> = {
  execution: Zap,
  connection: Workflow,
  trust: ShieldCheck,
};

export function CoreValues() {
  return (
    <section
      id={companySectionIds.values}
      className="relative scroll-mt-24 border-t border-line bg-white px-6 py-20 sm:px-14 lg:py-[120px]"
    >
      <div className="mx-auto max-w-content">
        <div data-reveal className="mb-14 max-w-[720px]">
          <Eyebrow className="mb-6">{coreValuesIntro.eyebrow}</Eyebrow>
          <h2 className="whitespace-pre-line font-sans text-[30px] font-extrabold leading-[1.2] tracking-[-0.02em] text-navy sm:text-[40px]">
            {coreValuesIntro.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {coreValues.map((v, i) => {
            const IconComp = valueIcons[v.icon];
            return (
              <div key={v.n} data-reveal style={{ transitionDelay: `${0.06 * i}s` }}>
                <Card>
                  <div className="mb-7 flex items-start justify-between">
                    <span
                      className="font-sans text-[64px] font-extrabold leading-[0.85] tabular-nums lg:text-[76px]"
                      style={{ color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.22)" }}
                    >
                      {v.n}
                    </span>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-sky-light">
                      <IconComp size={22} strokeWidth={1.7} aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="font-sans text-[22px] font-extrabold tracking-[-0.01em] text-white">
                    {v.en}
                  </h3>
                  <p className="mb-4 mt-1 font-sans text-[14px] font-semibold text-white/50">
                    {v.ko}
                  </p>
                  <p className="mb-6 font-sans text-[15px] leading-[1.7] text-white/60">
                    {v.desc}
                  </p>
                  <p className="mt-auto border-t border-white/10 pt-5 font-sans text-[14.5px] font-semibold leading-[1.5] text-sky-light">
                    {v.message}
                  </p>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

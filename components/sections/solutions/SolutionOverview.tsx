import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CardCta } from "@/components/ui/CardCta";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import { solutionPanels } from "@/lib/content";

/** All five solutions at a glance. Flagship spans full width; others compact. */
export function SolutionOverview() {
  return (
    <section className="relative border-t border-line bg-surface px-6 py-20 sm:px-14 lg:py-28">
      <div className="mx-auto max-w-content">
        <div data-reveal className="mb-12 max-w-[640px]">
          <Eyebrow className="mb-6">Overview</Eyebrow>
          <h2 className="font-sans text-[30px] font-extrabold leading-[1.2] tracking-[-0.02em] text-navy sm:text-[40px]">
            Solution Overview
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {solutionPanels.map((s, i) => {
            const flagship = i === 0;
            return (
              <div
                key={s.anchor}
                data-reveal
                style={{ transitionDelay: `${0.05 * i}s` }}
                className={cn(flagship && "lg:col-span-2")}
              >
                <Card href={s.href}>
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <Badge>{s.category}</Badge>
                    <span className="font-sans text-[13px] font-extrabold tabular-nums text-white/25 transition-colors duration-300 group-hover:text-white/60">
                      {s.n}
                    </span>
                  </div>
                  <h3 className="mb-2 font-sans text-[22px] font-extrabold tracking-[-0.02em] text-white sm:text-[26px]">
                    {s.title}
                  </h3>
                  <p className="mb-5 max-w-[560px] break-keep font-sans text-[16px] leading-[1.6] text-white/60">
                    {flagship ? s.description : s.oneLine}
                  </p>
                  <div className="mb-7 flex flex-wrap gap-[7px]">
                    {s.tags.map((t) => (
                      <Tag key={t} dark>
                        {t}
                      </Tag>
                    ))}
                  </div>
                  <CardCta label="자세히 보기" />
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

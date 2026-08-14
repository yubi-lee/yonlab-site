import { Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CardCta } from "@/components/ui/CardCta";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { routes, type Capability } from "@/lib/content";
import { getSolutionsByCapability } from "@/lib/solutions";

/** Section heading (eyebrow + H2). */
function SectionHead({
  eyebrow,
  title,
  onDark,
}: {
  eyebrow: string;
  title: string;
  onDark?: boolean;
}) {
  return (
    <div className="mb-10 max-w-[720px]">
      <Eyebrow className="mb-5" onDark={onDark}>
        {eyebrow}
      </Eyebrow>
      <h2
        className={cn(
          "break-keep font-sans text-[26px] font-extrabold leading-[1.2] tracking-[-0.02em] sm:text-[34px]",
          onDark ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
    </div>
  );
}

/** Hero visual: capability icon + scope chips. */
function CapabilityVisual({ capability }: { capability: Capability }) {
  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-[400px] rounded-panel border border-line-soft bg-white p-8 shadow-panel">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface text-navy">
        <Icon name={capability.icon} size={30} />
      </span>
      <div className="mt-6 flex flex-wrap gap-2">
        {capability.tags.map((t) => (
          <span
            key={t}
            className="rounded-md border border-line bg-surface px-3 py-1.5 font-sans text-[12.5px] font-semibold text-muted"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CapabilityDetailTemplate({ capability }: { capability: Capability }) {
  const relatedSolutions = getSolutionsByCapability(capability.title);

  return (
    <>
      {/* 1. Hero */}
      <PageHero
        eyebrow="Capabilities"
        title={capability.title}
        description={capability.oneLine}
        cta={{ href: routes.contact, label: "프로젝트 상담" }}
        visual={<CapabilityVisual capability={capability} />}
      />

      {/* 2. Overview */}
      <section className="border-t border-line bg-white px-6 py-16 sm:px-14 lg:py-20">
        <div className="mx-auto max-w-content">
          <div data-reveal>
            <SectionHead eyebrow="Overview" title="Capability Overview" />
            <p className="max-w-[720px] break-keep font-sans text-[18px] leading-[1.75] text-muted">
              {capability.description}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Scope — dark band */}
      <section className="relative overflow-hidden border-t border-navy bg-navy px-6 py-20 sm:px-14 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 55% at 50% 0%, rgba(1,108,255,0.22) 0%, rgba(1,108,255,0) 55%)",
          }}
        />
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="relative mx-auto max-w-content">
          <div data-reveal>
            <SectionHead eyebrow="Scope" title="핵심 범위" onDark />
            <div className="flex flex-wrap gap-3">
              {capability.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-lg border border-sky/40 bg-white/[0.06] px-5 py-3 font-sans text-[16px] font-semibold text-white shadow-[0_0_22px_rgba(78,160,255,0.18)]"
                >
                  <Check size={16} strokeWidth={2.2} aria-hidden="true" className="text-sky-light" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Related Solutions */}
      <section className="border-t border-line bg-white px-6 py-16 sm:px-14 lg:py-24">
        <div className="mx-auto max-w-content">
          <div data-reveal>
            <SectionHead eyebrow="Related Solutions" title="이 역량이 적용되는 솔루션" />
            <p className="mb-10 max-w-[560px] break-keep font-sans text-[16px] leading-[1.7] text-muted">
              Capability는 기술과 수행 역량이며, Solution은 이를 고객에게 제공하는 해결 방식입니다.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedSolutions.map((s, i) => (
              <li key={s.slug} data-reveal style={{ transitionDelay: `${0.05 * i}s` }}>
                <Card href={s.href}>
                  <span className="mb-4">
                    <Badge>{s.category}</Badge>
                  </span>
                  <span className="mb-2 font-sans text-[18px] font-bold text-white">{s.title}</span>
                  <span className="mb-7 break-keep font-sans text-[14.5px] leading-[1.6] text-white/60">
                    {s.oneLine}
                  </span>
                  <CardCta label="솔루션 보기" />
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

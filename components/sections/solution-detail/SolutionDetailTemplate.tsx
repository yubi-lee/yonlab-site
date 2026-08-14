import { ArrowRight, Check } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { CardCta } from "@/components/ui/CardCta";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/cn";
import { resolveCapabilities, type SolutionDetailContent } from "@/lib/solutions";
import { TodoNote } from "@/components/sections/solution-detail/TodoNote";
import { SolutionHero } from "@/components/sections/solution-detail/SolutionHero";

/** Section heading (eyebrow + H2), shared across detail sections. */
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

/** Horizontal numbered flow (desktop) / vertical timeline (mobile). */
function FlowDiagram({ nodes, dark = false }: { nodes: string[]; dark?: boolean }) {
  const node = dark
    ? "border-sky/40 bg-white/[0.06] text-sky-light shadow-[0_0_22px_rgba(78,160,255,0.30)]"
    : "border-line bg-white text-blue";
  const rail = dark ? "bg-sky/50" : "bg-blue/40";
  const railV = dark ? "bg-white/20" : "bg-line";
  const label = dark ? "text-white" : "text-navy";
  return (
    <>
      {/* Desktop */}
      <ol className="relative hidden gap-2 lg:flex lg:items-start">
        <div aria-hidden="true" className={cn("draw-line absolute left-[6%] right-[6%] top-7 h-px", rail)} />
        {nodes.map((n, i) => (
          <li key={n} className="relative z-[1] flex flex-1 flex-col items-center text-center">
            <span className={cn("mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full border font-sans text-[16px] font-extrabold tabular-nums", node)}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={cn("max-w-[180px] break-keep font-sans text-[15px] font-bold leading-snug", label)}>
              {n}
            </span>
          </li>
        ))}
      </ol>
      {/* Mobile / tablet */}
      <ol className="relative flex flex-col gap-6 lg:hidden">
        <div aria-hidden="true" className={cn("absolute bottom-7 left-7 top-7 w-px", railV)} />
        {nodes.map((n, i) => (
          <li key={n} className="relative flex items-center gap-4">
            <span className={cn("relative z-[1] inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border font-sans text-[16px] font-extrabold tabular-nums", node)}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={cn("break-keep font-sans text-[16px] font-bold", label)}>{n}</span>
          </li>
        ))}
      </ol>
    </>
  );
}

export function SolutionDetailTemplate({ detail }: { detail: SolutionDetailContent }) {
  const caps = resolveCapabilities(detail.capabilityTitles);

  return (
    <>
      {/* 1. Hero — big, dark, glowing */}
      <SolutionHero detail={detail} />

      {/* 2. Overview */}
      <section className="border-t border-line bg-white px-6 py-16 sm:px-14 lg:py-20">
        <div className="mx-auto max-w-content">
          <div data-reveal>
            <SectionHead eyebrow="Overview" title="Solution Overview" />
            <p className="max-w-[720px] break-keep font-sans text-[18px] leading-[1.75] text-muted">
              {detail.description}
            </p>
          </div>
          {detail.notes.length > 0 && (
            <div data-reveal className="mt-8 flex max-w-[720px] flex-col gap-3">
              {detail.notes.map((note, i) => (
                <TodoNote key={i}>{note}</TodoNote>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. Customer Challenge & YOnLab Approach */}
      <section className="border-t border-line bg-surface px-6 py-16 sm:px-14 lg:py-24">
        <div className="mx-auto max-w-content">
          <div data-reveal>
            <SectionHead eyebrow="Challenge & Approach" title="고객 문제와 YOnLab의 접근" />
          </div>
          {detail.challenge ? (
            <div data-reveal className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-8">
              <div className="rounded-panel border border-line bg-white p-7 sm:p-8">
                <span className="mb-4 inline-block font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-faint">
                  Customer Challenge
                </span>
                <p className="break-keep font-sans text-[18px] font-medium leading-[1.6] text-ink">
                  {detail.challenge.problem}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <ArrowRight size={22} strokeWidth={1.8} aria-hidden="true" className="hidden text-line-deco md:block" />
              </div>
              <div className="rounded-panel border border-blue/20 bg-white p-7 sm:p-8">
                <span className="mb-4 inline-flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-blue">
                  <Check size={15} strokeWidth={2.4} aria-hidden="true" /> YOnLab Approach
                </span>
                <p className="break-keep font-sans text-[18px] font-semibold leading-[1.6] text-navy">
                  {detail.challenge.solution}
                </p>
              </div>
            </div>
          ) : (
            <div data-reveal className="max-w-[720px]">
              <TodoNote>
                이 솔루션 고유의 고객 문제 정의가 현재 기획서에 없어 확보 후 보완 예정입니다.
              </TodoNote>
            </div>
          )}
        </div>
      </section>

      {/* 4. Service Scope */}
      <section className="border-t border-line bg-white px-6 py-16 sm:px-14 lg:py-24">
        <div className="mx-auto max-w-content">
          <div data-reveal>
            <SectionHead eyebrow="Service Scope" title="주요 제공 범위" />
            <div className="flex flex-wrap gap-2.5">
              {detail.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 font-sans text-[15px] font-semibold text-navy"
                >
                  <Check size={15} strokeWidth={2.2} aria-hidden="true" className="text-blue" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Workflow / Architecture — dark engineering core */}
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
            <SectionHead eyebrow="How It Works" title="Workflow · Architecture" onDark />
          </div>
          <div data-reveal className="mt-4">
            <FlowDiagram nodes={detail.workflow} dark />
          </div>
        </div>
      </section>

      {/* 6. Expected Outcomes */}
      <section className="relative overflow-hidden border-t border-white/10 bg-navy px-6 py-16 sm:px-14 lg:py-24">
        <div className="blueprint-grid-light pointer-events-none absolute inset-0 opacity-[0.04]" />
        <div className="relative mx-auto max-w-content">
          <div data-reveal>
            <SectionHead eyebrow="Expected Outcomes" title="기대 효과" onDark />
          </div>
          <ul data-reveal className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
            {detail.metrics.map((m) => (
              <li key={m.k} className="flex flex-col sm:border-l sm:border-white/15 sm:pl-8 sm:first:border-l-0 sm:first:pl-0">
                <span className="break-keep font-sans text-[30px] font-extrabold leading-[1.05] tracking-[-0.02em] text-white sm:text-[40px]">
                  {m.v}
                </span>
                <span className="mt-2 break-keep font-sans text-[14px] text-white/70">{m.k}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Related Capabilities */}
      <section className="border-t border-line bg-white px-6 py-16 sm:px-14 lg:py-24">
        <div className="mx-auto max-w-content">
          <div data-reveal>
            <SectionHead eyebrow="Related Capabilities" title="이 솔루션을 뒷받침하는 역량" />
            <p className="mb-10 max-w-[560px] break-keep font-sans text-[16px] leading-[1.7] text-muted">
              Solution은 고객에게 제공하는 해결 방식이며, Capability는 이를 가능하게 하는 기술과
              수행 역량입니다.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {caps.map((cap, i) => (
              <li key={cap.n} data-reveal style={{ transitionDelay: `${0.05 * i}s` }}>
                <Card href={cap.href}>
                  <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-sky-light">
                    <Icon name={cap.icon} size={22} />
                  </span>
                  <h3 className="mb-2 font-sans text-[18px] font-bold tracking-[-0.01em] text-white">
                    {cap.title}
                  </h3>
                  <p className="mb-7 break-keep font-sans text-[14.5px] leading-[1.6] text-white/60">
                    {cap.description}
                  </p>
                  <CardCta label="역량 보기" />
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

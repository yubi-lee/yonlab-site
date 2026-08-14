import { Eyebrow } from "@/components/ui/Eyebrow";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProductVisual } from "@/components/sections/solution-detail/ProductVisual";
import { routes } from "@/lib/content";
import type { SolutionDetailContent } from "@/lib/solutions";

/**
 * Big, bold, dark solution hero (upstage-style "크게 화려"). Deep-navy gradient +
 * blue glow + oversized title + a large glowing product visual + a giant faint
 * index number for scale.
 */
export function SolutionHero({ detail }: { detail: SolutionDetailContent }) {
  const index = parseInt(detail.n, 10) - 1;
  return (
    <section className="relative overflow-hidden bg-navy px-6 pb-20 pt-24 sm:px-14 lg:pb-28 lg:pt-36">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 75% at 78% 18%, rgba(1,108,255,0.30) 0%, rgba(1,108,255,0) 52%), linear-gradient(160deg,#051842 0%,#020B22 60%,#01060F 100%)",
        }}
      />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
      {/* giant faint index for scale */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-4 hidden select-none font-sans text-[240px] font-extrabold leading-none text-white/[0.035] lg:block"
      >
        {detail.n}
      </span>

      <div className="relative mx-auto grid max-w-wide grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <div className="animate-yfade mb-6 flex items-center gap-3">
            <Eyebrow onDark>Solutions</Eyebrow>
            <Badge>{detail.category}</Badge>
          </div>
          <h1
            className="animate-yfade mb-6 break-keep font-sans text-[44px] font-extrabold leading-[1.03] tracking-[-0.035em] text-white sm:text-[64px] lg:text-[80px]"
            style={{ animationDelay: ".06s" }}
          >
            {detail.title}
          </h1>
          <p
            className="animate-yfade mb-10 max-w-[540px] break-keep font-sans text-xl font-normal leading-[1.6] text-white/70"
            style={{ animationDelay: ".1s" }}
          >
            {detail.oneLine}
          </p>
          <div className="animate-yfade flex flex-wrap gap-3" style={{ animationDelay: ".14s" }}>
            <Button href={routes.contact} withArrow>
              프로젝트 상담
            </Button>
            <Button href={routes.solutions.index} variant="ghost">
              전체 솔루션
            </Button>
          </div>
        </div>

        <div className="animate-yfade" style={{ animationDelay: ".12s" }}>
          <ProductVisual title={detail.title} category={detail.category} index={index} />
        </div>
      </div>
    </section>
  );
}

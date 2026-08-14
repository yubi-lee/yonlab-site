"use client";

import { Fragment, useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionConnector } from "@/components/ui/SectionConnector";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import {
  homeSolutionSlugs,
  solutionPanels,
  solutionsSubline,
  type SolutionPanel,
} from "@/lib/content";
import {
  BrowserMockup,
  AppWindowMockup,
  ConsoleMockup,
  AnalyticsMockup,
  PhoneMockup,
} from "@/components/sections/mockups/Mockups";

/** One preview frame for every solution, so switching never resizes the card. */
const PREVIEW_RATIO = "16 / 10";

function PreviewMockup({ panel }: { panel: SolutionPanel }) {
  switch (panel.mockup) {
    case "browser":
      return (
        <BrowserMockup
          placeholder={panel.slot.placeholder}
          ratio={PREVIEW_RATIO}
          src={panel.slot.src}
          address={panel.chrome?.address ?? ""}
        />
      );
    case "appWindow":
      return (
        <AppWindowMockup
          placeholder={panel.slot.placeholder}
          ratio={PREVIEW_RATIO}
          src={panel.slot.src}
          title={panel.chrome?.title ?? ""}
          live={panel.chrome?.live}
        />
      );
    case "console":
      return (
        <ConsoleMockup
          placeholder={panel.slot.placeholder}
          ratio={PREVIEW_RATIO}
          src={panel.slot.src}
          label={panel.chrome?.title ?? ""}
        />
      );
    case "analytics":
      return (
        <AnalyticsMockup
          placeholder={panel.slot.placeholder}
          ratio={PREVIEW_RATIO}
          src={panel.slot.src}
          title={panel.chrome?.title ?? ""}
        />
      );
    case "phone":
      return (
        <PhoneMockup
          placeholder={panel.slot.placeholder}
          ratio={PREVIEW_RATIO}
          src={panel.slot.src}
        />
      );
    default:
      return null;
  }
}

/**
 * Detail-card title. A parenthetical product name (e.g. "AI OCC (OnCare Circle)")
 * breaks before the bracket and never inside it, so the service name stays whole.
 */
function DetailTitle({ title }: { title: string }) {
  const at = title.indexOf(" (");
  if (at === -1) return <>{title}</>;
  return (
    <>
      <span className="block">{title.slice(0, at)}</span>
      <span className="block whitespace-nowrap">{title.slice(at + 1)}</span>
    </>
  );
}

/**
 * Single-solution preview. One fixed frame whose content swaps — every solution
 * uses the same shell (white card, same size, same rhythm); none is featured.
 */
function SolutionPreview({ panel }: { panel: SolutionPanel }) {
  return (
    <div className="relative h-full overflow-hidden rounded-panel border border-line-soft bg-white p-7 shadow-panel sm:p-10 lg:min-h-[504px] lg:p-12">
      <div className="animate-yfade relative grid h-full grid-cols-1 items-start gap-8 md:grid-cols-[0.82fr_1.18fr] md:gap-10">
        {/* Content — number → title → description → tags → CTA */}
        <div className="flex h-full flex-col">
          <span className="mb-4 text-[15px] font-extrabold leading-none tabular-nums text-blue">
            {panel.n}
          </span>
          <h3 className="mb-4 min-h-[42px] font-sans text-[28px] font-extrabold leading-[1.16] tracking-[-0.02em] text-navy sm:text-[34px]">
            <DetailTitle title={panel.title} />
          </h3>
          <p className="mb-6 min-h-[112px] max-w-[440px] break-keep font-sans text-[17px] font-normal leading-[1.65] text-muted">
            {panel.description}
          </p>
          <div className="mb-8 flex min-h-[62px] flex-wrap content-start gap-[7px]">
            {panel.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          <div className="mt-auto">
            <Button href={panel.href} size="sm" withArrow>
              {panel.cta}
            </Button>
          </div>
        </div>

        {/* Preview frame — same box for every solution */}
        <div className="flex w-full items-center">
          <div className="w-full">
            <PreviewMockup panel={panel} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** The five solutions previewed on the home page, in the defined order. */
const homePanels = homeSolutionSlugs
  .map((slug) => solutionPanels.find((p) => p.slug === slug))
  .filter((p): p is SolutionPanel => Boolean(p));

export function Solutions() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="home-solutions"
      className="relative overflow-hidden scroll-mt-20 bg-white px-6 py-20 sm:px-14 lg:py-[120px]"
    >
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.022]" />
      <SectionConnector dotBg="#fff" />

      <div className="relative mx-auto max-w-wide">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-10 lg:mb-16">
          <SectionHeading index="03" title="Solutions" faint />
          <p className="mb-2 max-w-[400px] whitespace-pre-line break-keep font-sans text-lg font-normal leading-[1.6] text-muted">
            {solutionsSubline}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[360px_1fr] lg:gap-14">
          {/* Index list — all 5 always visible; drives the preview / accordion */}
          <div className="flex flex-col">
            {homePanels.map((panel, i) => {
              const isActive = i === active;
              return (
                <Fragment key={panel.n}>
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={`sol-preview-${i}`}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group flex items-center gap-4 rounded-lg border-t border-line px-3 py-5 text-left transition-colors duration-200",
                      isActive ? "bg-surface" : "hover:bg-surface/60",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-8 w-0.5 shrink-0 rounded-full transition-colors duration-200",
                        isActive ? "bg-blue" : "bg-transparent",
                      )}
                    />
                    <span
                      className={cn(
                        "text-[15px] font-extrabold leading-none tabular-nums transition-colors duration-200",
                        isActive ? "text-blue" : "text-idle",
                      )}
                    >
                      {panel.n}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span
                        className={cn(
                          "font-sans text-[17px] font-bold leading-tight transition-colors duration-200",
                          isActive ? "text-navy" : "text-muted",
                        )}
                      >
                        {panel.title}
                      </span>
                      <span className="font-sans text-[13px] font-normal leading-snug text-faint">
                        {panel.oneLine}
                      </span>
                    </span>
                    <ArrowRight
                      size={16}
                      strokeWidth={1.8}
                      aria-hidden="true"
                      className={cn(
                        "hidden shrink-0 transition-all duration-200 lg:block",
                        isActive
                          ? "translate-x-0 text-blue opacity-100"
                          : "-translate-x-1 text-idle opacity-0 group-hover:opacity-60",
                      )}
                    />
                    <ChevronDown
                      size={18}
                      aria-hidden="true"
                      className={cn(
                        "shrink-0 text-muted transition-transform duration-200 lg:hidden",
                        isActive && "rotate-180",
                      )}
                    />
                  </button>

                  {/* Mobile / tablet accordion: inline preview under the active row */}
                  {isActive && (
                    <div id={`sol-preview-${i}`} className="pb-8 pt-4 lg:hidden">
                      <SolutionPreview panel={panel} />
                    </div>
                  )}
                </Fragment>
              );
            })}
            <span className="border-t border-line" aria-hidden="true" />
          </div>

          {/* Desktop preview column */}
          <div
            className="hidden lg:block"
            role="region"
            aria-live="polite"
            aria-label={`선택한 솔루션: ${homePanels[active].title}`}
          >
            <SolutionPreview key={active} panel={homePanels[active]} />
          </div>
        </div>
      </div>
    </section>
  );
}

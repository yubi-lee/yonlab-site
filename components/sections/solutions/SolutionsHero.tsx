import { PageHero } from "@/components/ui/PageHero";
import { routes, footerBlurb } from "@/lib/content";

/** Compact technical architecture visual (documented Physical AI stack labels). */
function StackVisual() {
  const layers = ["AI Model / Software", "On-Device Runtime", "Device"];
  const chips = ["NPU", "Chipset", "SDK"];
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[420px] rounded-panel border border-line-soft bg-white p-6 shadow-panel sm:p-8"
    >
      <div className="flex flex-col gap-3">
        {layers.map((l, i) => (
          <div key={l} className="flex flex-col items-center gap-3">
            <div
              className={
                "flex w-full items-center justify-center rounded-xl border px-4 py-4 text-center font-sans text-[15px] font-bold " +
                (i === 1
                  ? "border-blue/30 bg-surface text-navy"
                  : "border-line bg-white text-navy")
              }
            >
              {l}
            </div>
            {i < layers.length - 1 && <span className="h-4 w-px bg-line-deco" />}
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-2 border-t border-line pt-6">
        {chips.map((c) => (
          <span
            key={c}
            className="rounded-md border border-line bg-surface px-3 py-1.5 font-sans text-[12px] font-semibold text-muted"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SolutionsHero() {
  return (
    <PageHero
      eyebrow="Solutions"
      title="현장에 배포되는 실제 AI 엔지니어링 플랫폼"
      description={footerBlurb}
      cta={{ href: routes.contact, label: "Contact Us" }}
      visual={<StackVisual />}
    />
  );
}

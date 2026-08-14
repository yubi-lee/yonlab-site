import { Icon } from "@/components/icons";
import { industries } from "@/lib/content";

export function TrustBand() {
  return (
    <section className="relative overflow-hidden bg-navy px-6 py-[72px] sm:px-14">
      <div className="blueprint-grid-light pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div className="grain pointer-events-none absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 110% at 88% 50%, rgba(1,108,255,0.30) 0%, rgba(1,108,255,0) 56%)",
        }}
      />
      <div
        data-reveal
        className="relative mx-auto flex max-w-content flex-wrap items-center justify-between gap-10 lg:gap-14"
      >
        <div className="shrink-0">
          <span className="mb-3 block font-sans text-xs font-bold uppercase leading-none tracking-[0.18em] text-sky">
            주요 고객
          </span>
          <p className="m-0 max-w-[280px] font-sans text-2xl font-bold leading-[1.3] tracking-[-0.01em] text-white">
            현장에서 검증된
            <br />
            산업 파트너
          </p>
        </div>

        <div className="min-w-[280px] flex-1 overflow-hidden rounded-xl border border-white/[0.12] bg-white/[0.12]">
          <div className="grid grid-cols-2 gap-px sm:grid-cols-4">
            {industries.map((ind) => (
              <div
                key={ind.key}
                className="flex flex-col items-center gap-3.5 bg-navy px-5 py-7 text-center"
              >
                <span className="text-white/90">
                  <Icon name={ind.icon} size={34} strokeWidth={1.5} />
                </span>
                <span className="font-sans text-[15px] font-semibold leading-[1.3] text-white/[0.86]">
                  {ind.key}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

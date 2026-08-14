import { Button } from "@/components/ui/Button";
import { HeroDiagram } from "@/components/sections/HeroDiagram";

export function Hero() {
  // `pt` stays small so the white band under the header reads as optically
  // centred on the logo (header is 82px tall with 26/26 padding).
  return (
    <section className="relative bg-white px-4 pb-8 pt-2 sm:px-7 sm:pt-2">
      <div className="relative flex min-h-[602px] items-center overflow-hidden rounded-hero bg-navy px-6 py-16 sm:px-12 lg:px-16 lg:py-[88px]">
        {/* Layered panel backgrounds (decorative). */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(118% 98% at 3% 32%, rgba(1,108,255,0.30) 0%, rgba(1,108,255,0.10) 25%, rgba(0,24,80,0) 56%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(116deg, rgba(126,178,255,0.20) 0%, rgba(126,178,255,0) 33%)",
          }}
        />
        <div className="streaks pointer-events-none absolute inset-0" />
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="grain pointer-events-none absolute inset-0" />

        <div className="relative mx-auto grid w-full max-w-hero grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-[52px]">
          {/* Left column */}
          <div className="animate-yfade">
            {/* The headline is the first element in the Hero — no eyebrow, no
                badge. The empty space above it is the design. */}
            {/* Sized so each line sits on exactly one row at lg (the longest,
                "Verified in the", is the constraint). */}
            <h1 className="reveal-lines in mb-10 font-sans text-[44px] font-extrabold leading-[1.04] tracking-[-0.04em] text-white sm:text-[68px] lg:mb-14 lg:whitespace-nowrap lg:text-[94px] lg:leading-[1.02]">
              <span className="line">
                <span>Trusted</span>
              </span>
              <span className="line">
                <span>Intelligence.</span>
              </span>
              <span className="line">
                <span>Verified in the</span>
              </span>
              <span className="line">
                <span>Real World.</span>
              </span>
            </h1>
            <p className="mb-12 max-w-[496px] font-sans text-lg font-normal leading-[1.62] text-white/[0.74] lg:mb-14">
              YOnLab은 AI를 실제 디바이스와 폐쇄망 업무 환경에서 검증, 최적화, 운영
              가능한 솔루션으로 만듭니다.
            </p>
            <div className="flex">
              <Button href="#home-solutions" variant="primary" withArrow>
                Explore Solutions
              </Button>
            </div>
          </div>

          {/* Right column — diagram */}
          <div
            className="animate-yfade mx-auto w-full max-w-[520px]"
            style={{ animationDelay: ".12s" }}
          >
            <HeroDiagram />
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-[30px] left-6 hidden items-center gap-3 sm:left-12 sm:flex lg:left-16">
          <span className="relative inline-block h-[26px] w-px bg-white/[0.28]">
            <span className="animate-yscroll absolute -left-[1.5px] top-0 h-1 w-1 rounded-full bg-blue" />
          </span>
          <span className="font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.18em] text-white/60">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}

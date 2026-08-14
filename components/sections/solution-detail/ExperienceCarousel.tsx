"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ExperienceSlide {
  n: string;
  title: string;
  /** Optional screen / product name shown under the title. */
  subtitle?: string;
  description: string;
  /** Real product screenshot in /public. Null → labelled placeholder frame. */
  src: string | null;
}

/**
 * Experience showcase: one 16:9 media frame (same treatment as the solution
 * hero media) cross-fading between the solution's key screens, with dots for
 * manual control. No invented product UI — slides without a screenshot render
 * the labelled placeholder until the asset lands.
 */
export function ExperienceCarousel({
  slides,
  interval = 4000,
  frameTone = "dark",
}: {
  slides: ExperienceSlide[];
  interval?: number;
  /** Letterbox backdrop behind `object-contain` screenshots. Light UI → "light". */
  frameTone?: "dark" | "light";
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Respect reduced motion: no auto-advance, dots still work.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % slides.length),
      interval,
    );
    return () => window.clearInterval(id);
  }, [slides.length, interval]);

  const current = slides[active];

  return (
    <div>
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-[20px] border border-line shadow-panel lg:rounded-[24px]",
          frameTone === "light" ? "bg-white" : "bg-navy",
        )}
      >
        <div className="relative aspect-video w-full">
          {slides.map((slide, i) => (
            <div
              key={slide.n}
              aria-hidden={i !== active}
              className={cn(
                "absolute inset-0 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
                i === active
                  ? "translate-x-0 opacity-100"
                  : cn(
                      "pointer-events-none opacity-0",
                      i < active ? "-translate-x-3" : "translate-x-3",
                    ),
              )}
            >
              {slide.src ? (
                <Image
                  src={slide.src}
                  alt={`${slide.title} 화면`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1100px"
                  className="object-contain"
                />
              ) : (
                <div
                  role="img"
                  aria-label={`${slide.title} (준비 중인 화면 영역)`}
                  className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[repeating-linear-gradient(135deg,#F7FAFF_0,#F7FAFF_11px,#F1F6FF_11px,#F1F6FF_22px)] text-center"
                >
                  <ImageIcon
                    size={30}
                    strokeWidth={1.4}
                    aria-hidden="true"
                    className="text-line-deco"
                  />
                  <span className="font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-faint">
                    {slide.n} {slide.title}
                  </span>
                  <span className="px-6 font-sans text-[13px] font-medium leading-snug text-faint">
                    {slide.subtitle ?? "서비스 화면"}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Dots — minimal manual control */}
      <div className="mt-8 flex items-center justify-center gap-2.5">
        {slides.map((slide, i) => (
          <button
            key={slide.n}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`${slide.title} 보기`}
            aria-current={i === active}
            className={cn(
              "h-2 rounded-full transition-[width,background-color] duration-200 motion-reduce:transition-none",
              i === active ? "w-6 bg-blue" : "w-2 bg-line-deco hover:bg-faint",
            )}
          />
        ))}
      </div>

      {/* Active slide caption */}
      <div className="mx-auto mt-6 max-w-[560px] text-center">
        <p className="mb-2 font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-blue">
          {current.n} {current.title}
        </p>
        {current.subtitle && (
          <p className="mb-2 break-keep font-sans text-[17px] font-bold tracking-[-0.01em] text-navy">
            {current.subtitle}
          </p>
        )}
        <p className="font-kr break-keep font-sans text-[16px] leading-[1.7] text-muted">
          {current.description}
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { cn } from "@/lib/cn";
import { actionItems, actionThumbs } from "@/lib/content";

export function ActionShowcase() {
  const [active, setActive] = useState(0);
  const current = actionItems[active];

  return (
    <section
      className="relative overflow-hidden border-t border-line px-6 py-20 sm:px-14 lg:py-[120px]"
      style={{
        background:
          "linear-gradient(158deg,#E9F0FF 0%,#F7FAFF 46%,#FFFFFF 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 70% at 88% 6%, rgba(0,104,248,0.10) 0%, rgba(0,104,248,0) 62%)",
        }}
      />
      <div className="relative mx-auto grid max-w-content grid-cols-1 items-center gap-8 lg:grid-cols-[230px_minmax(300px,440px)_minmax(300px,1fr)] lg:gap-12">
        {/* Index list (tabs) */}
        <div
          data-reveal
          role="tablist"
          aria-label="YOnLab 실행 역량"
          aria-orientation="vertical"
          className="flex flex-row flex-wrap gap-x-6 gap-y-2 lg:flex-col lg:gap-[18px]"
        >
          {actionItems.map((item, i) => (
            <button
              key={item.label}
              type="button"
              role="tab"
              id={`act-tab-${i}`}
              aria-selected={i === active}
              aria-controls="act-panel"
              onClick={() => setActive(i)}
              className={cn(
                "flex cursor-pointer items-center gap-4 py-1.5 font-sans text-lg font-bold leading-[1.3] tabular-nums transition-colors duration-200",
                i === active ? "text-navy" : "text-idle hover:text-muted",
              )}
            >
              <span className="whitespace-nowrap">
                {i + 1}. {item.label}
              </span>
              <span
                aria-hidden="true"
                className={cn(
                  "hidden h-px flex-1 transition-colors duration-200 lg:block",
                  i === active ? "bg-navy" : "bg-transparent",
                )}
              />
            </button>
          ))}
        </div>

        {/* Center image slots */}
        <div data-reveal style={{ transitionDelay: ".06s" }}>
          <div className="overflow-hidden rounded-xl border border-line bg-white">
            <ImageSlot
              placeholder={`${current.label} 이미지`}
              ratio="1 / 1"
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {actionThumbs.map((label) => (
              <div
                key={label}
                className="overflow-hidden rounded-xl border border-line bg-white"
              >
                <ImageSlot placeholder={label} ratio="2 / 1" />
              </div>
            ))}
          </div>
        </div>

        {/* Detail */}
        <div
          data-reveal
          style={{ transitionDelay: ".12s" }}
          id="act-panel"
          role="tabpanel"
          aria-labelledby={`act-tab-${active}`}
        >
          <h2 className="mb-6 break-keep font-sans text-[30px] font-extrabold leading-[1.24] tracking-[-0.02em] text-navy sm:text-[40px]">
            {current.title}
          </h2>
          <p className="m-0 max-w-[520px] font-sans text-lg font-normal leading-[1.75] text-muted">
            {current.description}
          </p>
        </div>
      </div>
    </section>
  );
}

import { Mail } from "lucide-react";
import { contactTypes } from "@/lib/content";
import { typeIcons } from "@/components/sections/contactMeta";

/**
 * Contact-oriented hero visual: a central "Contact YOnLab" node connected to the
 * four inquiry types, set inside a soft blue technical field so the group reads
 * as one designed panel rather than floating chips. Consultation vibe (soft
 * cards, blue accents) — NOT a technical architecture diagram.
 */

// Node anchor points (percent of the square), matched by the SVG connectors.
// 24 / 76 keeps the widest chip ("Technical Consultation") inside the panel.
const POS: Record<string, { x: number; y: number; className: string }> = {
  business: { x: 24, y: 22, className: "left-[24%] top-[22%]" },
  partnership: { x: 76, y: 22, className: "left-[76%] top-[22%]" },
  consultation: { x: 24, y: 78, className: "left-[24%] top-[78%]" },
  recruitment: { x: 76, y: 78, className: "left-[76%] top-[78%]" },
};

function Chip({ id, label }: { id: string; label: string }) {
  const IconComp = typeIcons[id as keyof typeof typeIcons];
  return (
    <span className="inline-flex items-center gap-2.5 rounded-2xl border border-line-soft bg-white px-3.5 py-3 shadow-[0_10px_26px_-12px_rgba(0,24,80,0.28)]">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border border-blue/15 bg-blue/[0.08] text-blue">
        <IconComp size={16} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="whitespace-nowrap font-sans text-[13px] font-bold tracking-[-0.01em] text-navy">
        {label}
      </span>
    </span>
  );
}

export function ContactHeroVisual() {
  return (
    <div
      aria-label="문의 유형: Business Inquiry, Partnership, Technical Consultation, Recruitment"
      role="img"
    >
      {/* Desktop node graph, inside a soft blue field */}
      <div className="relative mx-auto hidden w-full max-w-[520px] overflow-hidden rounded-[28px] border border-line-soft lg:ml-auto lg:block xl:max-w-[580px]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg,#FFFFFF 0%,#F7FAFF 46%,#EAF2FF 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(52% 52% at 50% 48%, rgba(1,108,255,0.14) 0%, rgba(1,108,255,0) 72%)",
          }}
        />
        <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:radial-gradient(#016CFF_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(72%_72%_at_50%_50%,#000,transparent)]" />

        <div className="relative aspect-square w-full">
          {/* connectors */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ct-line" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#016CFF" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#7DB4FF" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            {Object.values(POS).map((p, i) => (
              <line
                key={i}
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                stroke="url(#ct-line)"
                strokeWidth="1.4"
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {Object.values(POS).map((p, i) => (
              <circle key={`d${i}`} cx={p.x} cy={p.y} r="1.6" fill="#016CFF" opacity="0.55" />
            ))}
          </svg>

          {/* center node */}
          <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-2xl border border-blue/20 bg-white px-4 py-3.5 shadow-[0_18px_40px_-16px_rgba(1,60,160,0.45)]">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue text-white">
              <Mail size={19} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="font-sans text-[13.5px] font-extrabold leading-tight tracking-[-0.01em] text-navy">
              Contact
              <br />
              YOnLab
            </span>
          </span>

          {/* type nodes */}
          {contactTypes.map((t) => (
            <span
              key={t.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 ${POS[t.id].className}`}
            >
              <Chip id={t.id} label={t.label} />
            </span>
          ))}
        </div>
      </div>

      {/* Tablet / mobile — simplified 2-col grid below the text */}
      <div className="grid grid-cols-2 gap-3 lg:hidden">
        {contactTypes.map((t) => (
          <Chip key={t.id} id={t.id} label={t.label} />
        ))}
      </div>
    </div>
  );
}

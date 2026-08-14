import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealProvider } from "@/components/RevealProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/content";

export const metadata: Metadata = {
  title: "About — YOnLab",
  description:
    "YOnLab은 AI 모델을 단순히 연결하는 데서 끝나지 않고, 디바이스·온프레미스·폐쇄망 등 다양한 운영 조건에 맞춰 구현하고 검증합니다.",
};

/** Engineering scope — one editorial grid, not four product cards. */
const workScope = [
  { n: "01", title: "Private AI", line: "폐쇄망·온프레미스 환경의 AI" },
  { n: "02", title: "Validation Automation", line: "실디바이스 기반 검증 자동화" },
  { n: "03", title: "Connected Care", line: "디바이스와 보호자를 연결하는 AI Care" },
  { n: "04", title: "AI Service Development", line: "아이디어에서 실제 서비스 구현까지" },
];

const howWeWork = [
  {
    n: "01",
    title: "Understand",
    description: "고객의 환경과 해결해야 할 문제를 먼저 확인합니다.",
  },
  {
    n: "02",
    title: "Build",
    description: "필요한 AI 기능과 서비스 구조를 실제로 구현합니다.",
  },
  {
    n: "03",
    title: "Validate",
    description: "실제 디바이스와 운영 환경에서 검증합니다.",
  },
  {
    n: "04",
    title: "Operate",
    description: "배포 이후에도 안정적으로 운영할 수 있는 상태까지 연결합니다.",
  },
];

const industries: { key: string; icon: IconName; line: string }[] = [
  { key: "제조업", icon: "factory", line: "설비와 공정 환경에서의 온디바이스 AI 적용" },
  { key: "자동차", icon: "car", line: "차량용 칩셋과 SDK 환경에 맞춘 실행 검증" },
  { key: "로보틱스", icon: "robot", line: "실시간 동작이 필요한 디바이스 환경 대응" },
  { key: "공공기관", icon: "government", line: "폐쇄망·온프레미스 기반 AI 운영" },
];

/**
 * Identical on all three cards so the row reads as one system: a top-anchored
 * blue glow over a white → ice-blue wash. No per-card variation, no accent
 * colour singling a layer out.
 */
const SCOPE_SURFACE = [
  "radial-gradient(120% 78% at 50% 0%, rgba(1,108,255,0.055) 0%, rgba(1,108,255,0) 58%)",
  "linear-gradient(180deg, #FFFFFF 0%, #FBFDFF 52%, #F4F8FF 100%)",
].join(", ");

/**
 * Execution scope, read left → right. All three cards carry the same weight and
 * accent — no layer is "selected".
 */
const stack = [
  {
    n: "01",
    layer: "Application / AI",
    caption: "사용자가 마주하는 AI 기능",
    items: ["AI Model", "RAG", "AI Service"],
  },
  {
    n: "02",
    layer: "Software",
    caption: "AI를 디바이스 위에서 실행시키는 계층",
    items: ["SDK", "Runtime", "OS · BSP"],
  },
  {
    n: "03",
    layer: "Hardware",
    caption: "AI가 실제로 연산되는 계층",
    items: ["NPU", "Chipset", "Edge Device"],
  },
];

/**
 * Hero visual — the execution stack YOnLab works across, drawn as a connected
 * technical diagram: AI Model → SDK/Runtime → OS·BSP → NPU/Chipset → Edge
 * Device, with Build / Validate / Operate bracketed alongside. Thin lines,
 * nodes and layered panels only; no product UI, no 3D, no glow.
 */
function StackVisual({ className }: { className?: string }) {
  const rows = [
    { label: "AI Model", sub: "모델" },
    { label: "SDK · Runtime", sub: "실행 도구" },
    { label: "OS · BSP", sub: "시스템" },
    { label: "NPU · Chipset", sub: "연산" },
    { label: "Edge Device", sub: "디바이스" },
  ];
  const rowH = 66;
  const gap = 26;
  const top = 38;
  const rowY = (i: number) => top + i * (rowH + gap);
  const lastY = rowY(rows.length - 1);
  const phases = [
    { label: "BUILD", from: 0, to: 1 },
    { label: "VALIDATE", from: 2, to: 3 },
    { label: "OPERATE", from: 4, to: 4 },
  ];

  return (
    <svg
      viewBox="0 0 560 530"
      role="img"
      aria-label="AI Model에서 SDK·Runtime, OS·BSP, NPU·Chipset을 거쳐 Edge Device까지 이어지는 실행 스택 도식"
      className={className}
    >
      <defs>
        <pattern id="ab-grid" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M26 0H0V26" fill="none" stroke="#001850" strokeWidth="0.6" opacity="0.09" />
        </pattern>
      </defs>

      {/* Very light technical field */}
      <rect x="96" y="8" width="456" height="514" rx="22" fill="#F7FAFF" stroke="#E6EDF7" />
      <rect x="96" y="8" width="456" height="514" rx="22" fill="url(#ab-grid)" />

      {/* Spine linking every layer — brand blue, so the flow reads at a glance */}
      <line
        x1="150"
        y1={top + rowH / 2}
        x2="150"
        y2={lastY + rowH / 2}
        stroke="#016CFF"
        strokeWidth="1.4"
        strokeOpacity="0.45"
      />

      {/* Phase bracket — Build / Validate / Operate */}
      <g>
        <line x1="66" y1={top + rowH / 2} x2="66" y2={lastY + rowH / 2} stroke="#7DB4FF" strokeWidth="1" strokeOpacity="0.6" />
        {phases.map((p) => {
          const y1 = rowY(p.from) + rowH / 2;
          const y2 = rowY(p.to) + rowH / 2;
          const mid = (y1 + y2) / 2;
          return (
            <g key={p.label}>
              <line x1="62" y1={y1} x2="70" y2={y1} stroke="#4EA0FF" strokeWidth="1.4" />
              <line x1="62" y1={y2} x2="70" y2={y2} stroke="#4EA0FF" strokeWidth="1.4" />
              <text
                x="52"
                y={mid}
                fontSize="10"
                fontWeight="700"
                letterSpacing="0.18em"
                fill="#4EA0FF"
                textAnchor="middle"
                transform={`rotate(-90 52 ${mid})`}
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </g>

      {/* Layer panels */}
      {rows.map((r, i) => {
        const y = rowY(i);
        const isLast = i === rows.length - 1;
        return (
          <g key={r.label}>
            {/* connector chevron between layers */}
            {i > 0 && (
              <path
                d={`M150 ${y - gap + 8} l0 ${gap - 16}`}
                stroke="#016CFF"
                strokeWidth="1.4"
                strokeOpacity="0.45"
                fill="none"
              />
            )}
            <rect
              x="150"
              y={y}
              width="358"
              height={rowH}
              rx="12"
              fill={isLast ? "#F2F7FF" : "#FFFFFF"}
              stroke={isLast ? "#016CFF" : "#D8E4F5"}
              strokeWidth={isLast ? 1.6 : 1.1}
            />
            {/* left accent tick inside the panel */}
            <rect x="150" y={y + 18} width="3" height={rowH - 36} rx="1.5" fill={isLast ? "#016CFF" : "#7DB4FF"} />
            <text x="176" y={y + 30} fontSize="15" fontWeight="700" fill={isLast ? "#016CFF" : "#001850"}>
              {r.label}
            </text>
            <text x="176" y={y + 50} fontSize="11.5" fontWeight="500" fill="#8496B5">
              {r.sub}
            </text>
            {/* node on the spine — filled on the highlighted layer */}
            <circle
              cx="150"
              cy={y + rowH / 2}
              r="4.5"
              fill={isLast ? "#016CFF" : "#FFFFFF"}
              stroke="#016CFF"
              strokeWidth="1.6"
            />
            {/* hairlines suggesting internal structure */}
            <g stroke={isLast ? "#CFE2FF" : "#EEF3FF"} strokeWidth="1">
              <line x1="372" y1={y + 24} x2="484" y2={y + 24} />
              <line x1="372" y1={y + 42} x2="446" y2={y + 42} />
            </g>
          </g>
        );
      })}
    </svg>
  );
}

export default function AboutPage() {
  return (
    <>
      <RevealProvider />
      <Header />
      <main id="main">
        {/* ------------------------------------------------------ 01. Hero */}
        <section className="relative flex items-center overflow-hidden border-b border-line bg-white px-6 pb-24 pt-24 sm:px-14 lg:min-h-[620px] lg:pb-28 lg:pt-28">
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.035]" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(58% 66% at 86% 22%, rgba(1,108,255,0.07) 0%, rgba(1,108,255,0) 60%)",
            }}
          />
          <div className="relative mx-auto grid w-full max-w-wide grid-cols-1 items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
            <div>
              {/* Headline is the hero's first element — no eyebrow label. */}
              {/* Two lines by design; sized so the first line fits its column. */}
              <h1 className="animate-yfade font-kr mb-9 max-w-[900px] break-keep font-sans text-[34px] font-extrabold leading-[1.1] tracking-[-0.04em] text-navy sm:text-[46px] lg:text-[44px] xl:text-[60px]">
                {/* The space before <br /> keeps the sentence readable as text
                    (copy/paste, screen readers); a trailing space at a line end
                    is not rendered, so the two-line layout is unchanged. */}
                AI를 <span className="text-blue">실제 환경</span>에 적용하는{" "}
                <br />
                일을 합니다.
              </h1>
              <span
                aria-hidden="true"
                className="animate-yfade mb-9 block h-[3px] w-20 rounded-full bg-blue"
                style={{ animationDelay: ".05s" }}
              />
              <p
                className="animate-yfade font-kr max-w-[560px] whitespace-pre-line break-keep font-sans text-[17px] leading-[1.8] text-muted lg:text-[19px]"
                style={{ animationDelay: ".08s" }}
              >
                {
                  "YOnLab은 AI 모델을 단순히 연결하는 데서 끝나지 않고,\n디바이스·온프레미스·폐쇄망 등 다양한 운영 조건에 맞춰\n구현하고 검증합니다."
                }
              </p>
            </div>

            <div className="animate-yfade" style={{ animationDelay: ".14s" }}>
              <StackVisual className="h-auto w-full max-w-[560px] lg:ml-auto lg:max-w-none xl:max-w-[640px]" />
            </div>
          </div>
        </section>

        {/* -------------------------------------------- 02. What We Work On */}
        <section className="bg-white px-6 py-20 sm:px-14 lg:py-[128px]">
          <div className="mx-auto max-w-wide">
            {/* Both columns start on the same line (items-start), so the title
                no longer sits below the copy block. */}
            <div
              data-reveal
              className="mb-12 grid grid-cols-1 gap-8 lg:mb-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-20"
            >
              <h2 className="break-keep font-sans text-[32px] font-extrabold leading-[1.04] tracking-[-0.03em] text-navy sm:text-[38px] lg:text-[44px]">
                What We
                <br />
                Work On
              </h2>
              <div>
                <p className="font-kr mb-4 whitespace-pre-line break-keep font-sans text-[20px] font-bold leading-[1.5] tracking-[-0.02em] text-navy lg:text-[24px]">
                  {"AI 모델부터\n서비스와 실행 환경까지 함께 봅니다."}
                </p>
                <p className="font-kr max-w-[560px] break-keep font-sans text-[16px] leading-[1.75] text-muted lg:text-[17px]">
                  YOnLab은 Private AI, 실디바이스 기반 검증, Connected Care, AI Service
                  Development 등 AI 도입과 서비스 구현에 필요한 엔지니어링과 플랫폼을 함께
                  다룹니다.
                </p>
              </div>
            </div>

            {/* 2x2 editorial grid — hairline dividers, no card chrome */}
            <ul data-reveal className="grid grid-cols-1 border-t border-line sm:grid-cols-2">
              {workScope.map((item, i) => (
                <li
                  key={item.n}
                  className={cn(
                    "group border-b border-line py-8 pr-6 sm:py-11 lg:py-12",
                    i % 2 === 1 && "sm:border-l sm:border-line sm:pl-10 lg:pl-16",
                  )}
                >
                  {/* number only — the accent line under the title carries the marker */}
                  <span className="mb-3 block font-sans text-[22px] font-semibold tabular-nums tracking-[-0.01em] text-blue lg:text-[24px]">
                    {item.n}
                  </span>
                  <h3 className="mb-3 break-keep font-sans text-[26px] font-extrabold leading-[1.2] tracking-[-0.025em] text-navy lg:text-[30px]">
                    {item.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mb-4 block h-[2px] w-12 rounded-full bg-blue/50 transition-all duration-300 ease-out group-hover:w-20 group-hover:bg-blue"
                  />
                  <p className="font-kr max-w-[380px] break-keep font-sans text-[15.5px] leading-[1.7] text-muted lg:text-[16px]">
                    {item.line}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------ 03. How We Work */}
        <section className="relative overflow-hidden border-t border-line bg-surface px-6 py-20 sm:px-14 lg:py-[128px]">
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
          <div className="relative mx-auto max-w-wide">
            <div data-reveal className="mb-16 max-w-[760px] lg:mb-24">
              <h2 className="mb-6 break-keep font-sans text-[32px] font-extrabold leading-[1.04] tracking-[-0.03em] text-navy sm:text-[38px] lg:text-[44px]">
                How We Work
              </h2>
              <p className="font-kr mb-5 whitespace-pre-line break-keep font-sans text-[22px] font-bold leading-[1.4] tracking-[-0.02em] text-navy lg:text-[28px]">
                {"PoC보다,\n그 다음을 더 중요하게 봅니다."}
              </p>
              <p className="font-kr break-keep font-sans text-[16px] leading-[1.78] text-muted lg:text-[18px]">
                아이디어를 확인하는 데서 끝나지 않고, 구현과 검증을 거쳐 운영 가능한
                서비스로 이어질 수 있도록 함께합니다.
              </p>
            </div>

            {/* One markup, two layouts: vertical below lg → 4-across at lg+.
                At lg the numeral block is 64px tall, so rail + nodes share the axis y = 90.
                Rails are decorative only (aria-hidden) — the step content exists once. */}
            <div data-reveal className="relative">
              {/* continuous rail, vertical layout only */}
              <div
                aria-hidden="true"
                className="absolute bottom-6 left-[5px] top-6 w-px bg-blue/30 lg:hidden"
              />
              <ol className="relative flex flex-col gap-10 lg:grid lg:grid-cols-4 lg:gap-0">
                {howWeWork.map((step) => (
                  <li key={step.n} className="group relative pl-9 lg:flex lg:flex-col lg:pl-0 lg:pr-10">
                    {/* rail segment, horizontal layout only */}
                    <span
                      aria-hidden="true"
                      className="absolute left-0 right-0 top-[90px] hidden h-px bg-blue/30 transition-colors duration-200 group-hover:bg-blue/70 lg:block"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[10px] z-[1] h-[11px] w-[11px] rounded-full border-2 border-blue bg-surface transition-colors duration-200 group-hover:bg-blue lg:top-[90px] lg:-translate-y-1/2"
                    />
                    <span className="mb-2 block font-sans text-[40px] font-extrabold leading-none tracking-[-0.04em] tabular-nums text-sky transition-colors duration-200 group-hover:text-blue lg:mb-0 lg:h-[64px] lg:text-[64px]">
                      {step.n}
                    </span>
                    <h3 className="mb-2 break-keep font-sans text-[19px] font-extrabold tracking-[-0.02em] text-navy lg:mb-3 lg:mt-[52px] lg:text-[20px]">
                      {step.title}
                    </h3>
                    <p className="font-kr break-keep font-sans text-[14.5px] leading-[1.65] text-muted lg:max-w-[230px]">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------- 04. Industries */}
        <section className="relative overflow-hidden bg-navy px-6 py-20 sm:px-14 lg:py-[128px]">
          <div className="blueprint-grid-light pointer-events-none absolute inset-0 opacity-[0.05]" />
          <div className="grain pointer-events-none absolute inset-0" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(58% 90% at 84% 26%, rgba(1,108,255,0.26) 0%, rgba(1,108,255,0) 58%)",
            }}
          />
          <div className="relative mx-auto grid max-w-wide grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
            <div data-reveal>
              <span className="mb-5 block font-sans text-xs font-bold uppercase leading-none tracking-[0.18em] text-sky">
                주요 산업
              </span>
              <h2 className="font-kr mb-6 max-w-[420px] break-keep font-sans text-[32px] font-extrabold leading-[1.16] tracking-[-0.03em] text-white sm:text-[38px] lg:text-[44px]">
                다양한 산업 현장을 위한
                <br />
                AI Engineering
              </h2>
              <p className="font-kr max-w-[400px] break-keep font-sans text-[16px] leading-[1.75] text-white/70 lg:text-[17px]">
                산업마다 디바이스와 운영 환경, 요구되는 조건이 다릅니다. YOnLab은 각 현장의
                실행 환경에 맞춰 AI를 구현하고 검증합니다.
              </p>
            </div>

            <ul
              data-reveal
              style={{ transitionDelay: ".06s" }}
              className="grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-sky/25 bg-sky/25 sm:grid-cols-2"
            >
              {industries.map((ind) => (
                <li
                  key={ind.key}
                  className="group flex flex-col bg-navy px-7 py-9 transition-colors duration-200 hover:bg-[#04225E] lg:px-9 lg:py-11"
                >
                  <span className="mb-6 inline-flex text-sky transition-colors duration-200 group-hover:text-sky-light">
                    <Icon name={ind.icon} size={46} strokeWidth={1.4} />
                  </span>
                  <span className="mb-3 font-sans text-[19px] font-bold tracking-[-0.01em] text-white">
                    {ind.key}
                  </span>
                  <span className="font-kr break-keep font-sans text-[15px] leading-[1.65] text-white/70">
                    {ind.line}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------------------------------- 05. Engineering Context */}
        <section className="relative overflow-hidden border-t border-line bg-white px-6 py-20 sm:px-14 lg:py-[128px]">
          <div className="relative mx-auto max-w-wide">
            <div
              data-reveal
              className="mb-16 grid grid-cols-1 gap-8 lg:mb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-20"
            >
              <div>
                <h2 className="mb-6 break-keep font-sans text-[32px] font-extrabold leading-[1.04] tracking-[-0.03em] text-navy sm:text-[38px] lg:text-[44px]">
                  Engineering Context
                </h2>
                <p className="font-kr break-keep font-sans text-[22px] font-bold leading-[1.4] tracking-[-0.02em] text-navy lg:text-[28px]">
                  AI 모델만 보지 않습니다.
                </p>
              </div>
              <div>
                <p className="font-kr max-w-[560px] break-keep font-sans text-[16px] leading-[1.78] text-muted lg:text-[17px]">
                  AI가 실제로 동작하려면 모델뿐 아니라 디바이스와 칩셋, SDK, Runtime, OS
                  환경까지 함께 고려해야 합니다.
                </p>
                <p className="font-kr mt-5 max-w-[560px] break-keep font-sans text-[16px] leading-[1.78] text-muted lg:text-[17px]">
                  YOnLab은 이러한 실행 환경을 함께 이해하고 실제 서비스에 맞는 구현과 검증을
                  진행합니다.
                </p>
              </div>
            </div>

            {/* Execution scope — three cards of equal weight, light variant of the
                site card language (radius / hairline accent / soft shadow). */}
            <ul
              data-reveal
              style={{ transitionDelay: ".06s" }}
              className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
            >
              {stack.map((row) => (
                <li
                  key={row.layer}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line-soft shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-[3px] hover:border-line hover:shadow-panel-hover motion-reduce:transform-none motion-reduce:transition-none"
                >
                  {/* Shared ice-blue surface — same on every card (SCOPE_SURFACE) */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{ backgroundImage: SCOPE_SURFACE }}
                  />
                  {/* Blueprint hairlines, faded out of the top-right corner */}
                  <span
                    aria-hidden="true"
                    className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.055] [mask-image:radial-gradient(115%_95%_at_100%_0%,#000_0%,transparent_62%)]"
                  />
                  {/* Top hairline — the one accent the three cards share */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue/45 to-transparent"
                  />

                  <div className="relative flex h-full flex-col p-7 sm:p-8">
                    {/* Layer index — label, connecting rule, numeral */}
                    <div className="mb-6 flex items-center gap-3.5">
                      <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-faint">
                        Layer
                      </span>
                      <span aria-hidden="true" className="h-px flex-1 bg-line-soft" />
                      <span className="font-sans text-[26px] font-extrabold leading-none tabular-nums tracking-[-0.03em] text-blue">
                        {row.n}
                      </span>
                    </div>

                    <h3 className="mb-2.5 break-keep font-sans text-[22px] font-extrabold tracking-[-0.02em] text-navy">
                      {row.layer}
                    </h3>
                    <p className="font-kr mb-7 break-keep font-sans text-[14px] leading-[1.65] text-muted">
                      {row.caption}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-2">
                      {row.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1.5 rounded-[7px] border border-line-soft bg-white px-2.5 py-[7px] font-sans text-[12.5px] font-semibold tracking-[-0.005em] text-ink shadow-[0_1px_2px_rgba(0,24,80,0.04)] transition-colors duration-300 group-hover:border-line"
                        >
                          <span
                            aria-hidden="true"
                            className="h-1 w-1 shrink-0 rounded-full bg-sky"
                          />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ------------------------------------------------- 06. Final CTA */}
        <section className="bg-white px-6 py-20 sm:px-14 lg:py-28">
          <div
            className="relative mx-auto max-w-wide overflow-hidden rounded-[24px] px-7 py-11 shadow-[0_26px_60px_-32px_rgba(1,60,160,0.55)] sm:px-10 sm:py-14 lg:rounded-[32px] lg:px-14 lg:py-16"
            style={{
              background:
                "linear-gradient(100deg, #2C7BFF 0%, #016CFF 34%, #013A9E 72%, #001A4D 100%)",
            }}
          >
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.06]" />
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
              <h2 className="font-kr break-keep font-sans text-[26px] font-extrabold leading-[1.3] tracking-[-0.025em] text-white sm:text-[32px] lg:text-[38px]">
                AI를 서비스로 구현해야 한다면,
                <br />
                이야기해보세요.
              </h2>

              <div className="relative flex flex-col items-start gap-5 lg:pl-14">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-1/2 hidden h-[70%] w-px -translate-y-1/2 bg-white/10 lg:block"
                />
                <p className="font-kr break-keep font-sans text-[15.5px] leading-[1.65] text-white/80">
                  YOnLab은 고객의 환경과 목적에 맞춰
                  <br />
                  AI를 구현하고 검증해 실제 서비스로 연결합니다.
                </p>
                <Link
                  href={routes.contact}
                  className="group mt-1 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-sans text-[15px] font-semibold text-navy transition-colors duration-[220ms] hover:bg-[#F7FAFF] hover:text-blue"
                >
                  Contact Us
                  <ArrowRight
                    size={17}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-colors duration-[220ms] group-hover:text-blue"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  CircuitBoard,
  Cloud,
  Code,
  Cpu,
  Layers,
  Rocket,
  Settings,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/content";

/** Hardware / device / runtime environments YOnLab works across. */
const ENV_LEFT = [
  { label: "NPU", icon: Cpu },
  { label: "Chipset", icon: CircuitBoard },
  { label: "SDK", icon: Code },
] satisfies { label: string; icon: LucideIcon }[];

const ENV_RIGHT = [
  { label: "Runtime", icon: Layers },
  { label: "OS / BSP", icon: Settings },
  { label: "Edge Device", icon: Cloud },
] satisfies { label: string; icon: LucideIcon }[];

/** How an AXSL service comes together — kept to four plain steps. */
const BUILD_STEPS = [
  { label: "AI Service", icon: Boxes },
  { label: "Easy Access", icon: Zap },
  { label: "Fast Build", icon: Wrench },
  { label: "Deployment", icon: Rocket },
] satisfies { label: string; icon: LucideIcon }[];

/**
 * Home section 2 — positioning statement, then two cards presented as one
 * visual group: an AXSL service card (preview + build flow) and a coverage
 * card (environment hub).
 */
export function HomeBento() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 sm:px-14 lg:py-28">
      <div className="relative mx-auto max-w-content">
        {/* Statement + aside */}
        <div
          data-reveal
          className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12"
        >
          <h2 className="break-keep font-sans text-[32px] font-extrabold leading-[1.15] tracking-[-0.03em] text-navy sm:text-[44px] lg:text-[52px]">
            화면 속 AI를 넘어,
            <br />
            현실에서 작동하는 AI로.
          </h2>
          <div className="break-keep">
            <p className="mb-6 font-sans text-[17px] leading-[1.62] text-muted">
              고객의 환경과 목적에 맞춰 AI를 설계하고, 실제 디바이스에서
              검증·최적화해 운영 가능한 서비스로 구현합니다.
            </p>
            <Link
              href={routes.contact}
              className="inline-flex items-center gap-2 rounded-full bg-blue px-6 py-3 font-sans text-[14.5px] font-semibold text-white transition-colors hover:bg-blue-hover"
            >
              Contact us
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* One grouped visual field holding both cards */}
        <div
          data-reveal
          className="mt-11 rounded-[32px] border border-line-soft bg-surface p-3 sm:p-4"
        >
          <div className="grid grid-cols-1 items-stretch gap-3 sm:gap-4 lg:grid-cols-2">
            {/* Card 1 — AXSL: service preview + build flow */}
            <div className="flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-gradient-to-b from-white via-[#F7FAFF] to-[#EAF2FF] p-7 sm:p-8">
              <h3 className="break-keep font-sans text-[26px] font-extrabold leading-[1.15] tracking-[-0.02em] text-navy">
                복잡한 AI 도입을,
                <br />
                더 빠른 실행으로.
              </h3>
              <p className="mt-2.5 max-w-[24em] break-keep font-sans text-[15px] leading-[1.55] text-muted">
                검증된 기술과 경험으로 개발 부담은 줄이고, 아이디어를 빠르게 실제
                서비스로 연결합니다.
              </p>

              <ServicePreview />
              <BuildFlow />
            </div>

            {/* Card 2 — environment coverage */}
            <div className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-sky/30 p-7 text-white shadow-[0_24px_60px_-32px_rgba(1,108,255,0.55)] sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 130% at 15% 0%, #2C7BFF 0%, #016CFF 34%, #012C86 72%, #001236 100%)",
                }}
              />
              <div className="relative flex h-full flex-col">
                <h3 className="break-keep font-sans text-[26px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white">
                  다양한 환경에서도,
                  <br />
                  안정적으로 작동하도록.
                </h3>
                <p className="mt-2.5 max-w-[24em] break-keep font-sans text-[15px] leading-[1.55] text-white/85">
                  하드웨어와 디바이스 환경에 맞춰 AI를 검증하고 최적화합니다.
                </p>
                <EnvironmentHub />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * AXSL service thumbnail. The frame is real UI chrome; the image region takes
 * the product screenshot once it is supplied.
 */
/**
 * AXSL service thumbnails. Drop the screenshots into /public and set `src` —
 * the frames are already sized, so nothing else needs to change.
 */
const AXSL_SHOTS: { src: string | null; label: string }[] = [
  { src: "/axsl/axsl-hero.png", label: "AXSL — Solution Zoo 홈" },
  { src: "/axsl/axsl-zoo.png", label: "AXSL — Solution Zoo 목록" },
];

function ServicePreview() {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      {AXSL_SHOTS.map((shot) => (
        // Identical frame for both: same aspect, radius, border and shadow.
        // The screenshot is contained (never cropped or stretched); the small
        // letterbox blends into the card's tint.
        <div
          key={shot.label}
          className="flex aspect-[2/1] items-center justify-center overflow-hidden rounded-xl border border-line bg-white/70 p-1.5 shadow-[0_12px_30px_-22px_rgba(0,24,80,0.5)]"
        >
          {shot.src ? (
            <Image
              src={shot.src}
              alt={shot.label}
              width={1654}
              height={730}
              sizes="(max-width: 1024px) 45vw, 280px"
              className="h-full w-full rounded-md object-contain object-center"
            />
          ) : (
            <ImageSlot placeholder={shot.label} ratio="2 / 1" className="h-full" />
          )}
        </div>
      ))}
    </div>
  );
}

/** Four-step build flow. Carries the strong blue that balances the right card. */
function BuildFlow() {
  return (
    <div className="mt-auto pt-5">
      <div className="flex items-start justify-between gap-1">
        {BUILD_STEPS.map(({ label, icon: Icon }, i) => (
          <div key={label} className="flex min-w-0 flex-1 items-start gap-1">
            <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5 text-center">
              <span
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-[10px]",
                  i === BUILD_STEPS.length - 1
                    ? "bg-navy text-white"
                    : "bg-blue text-white",
                )}
              >
                <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
              </span>
              <span className="break-keep font-sans text-[11px] font-semibold leading-tight text-navy">
                {label}
              </span>
            </div>
            {i < BUILD_STEPS.length - 1 && (
              <ArrowRight
                size={13}
                strokeWidth={2}
                aria-hidden="true"
                className="mt-[11px] shrink-0 text-blue/50"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Translucent tag with an outline icon, used around the environment hub. */
function EnvTag({
  label,
  icon: Icon,
  align = "left",
}: {
  label: string;
  icon: LucideIcon;
  align?: "left" | "right";
}) {
  return (
    <span
      className={cn(
        "inline-flex w-full items-center gap-2.5 whitespace-nowrap rounded-2xl border border-white/[0.18] bg-white/[0.09] px-3 py-2.5 font-sans text-[13px] font-medium leading-none tracking-[-0.01em] text-white sm:gap-3 sm:px-4 sm:py-3 sm:text-[14.5px]",
        align === "right" && "justify-start",
      )}
    >
      <Icon size={17} strokeWidth={1.7} aria-hidden="true" className="flex-none text-white/90" />
      {label}
    </span>
  );
}

/** Hairline connector with a node dot at the tag end. */
function Connector({ side }: { side: "left" | "right" }) {
  const dot = <span className="h-[5px] w-[5px] flex-none rounded-full bg-sky-light" />;
  return (
    <span aria-hidden="true" className="flex flex-none items-center">
      {side === "left" && dot}
      <span className="h-px w-4 bg-white/25 sm:w-7" />
      {side === "right" && dot}
    </span>
  );
}

/** Isometric cube inside concentric orbit rings (centre of the hub). */
function HubCore() {
  return (
    <svg
      viewBox="0 0 160 160"
      aria-hidden="true"
      className="h-[124px] w-[124px] flex-none sm:h-[150px] sm:w-[150px]"
    >
      <defs>
        <linearGradient id="cubeTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#BFDBFF" />
          <stop offset="100%" stopColor="#7DB4FF" />
        </linearGradient>
        <linearGradient id="cubeLeft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4EA0FF" />
          <stop offset="100%" stopColor="#1D6BE0" />
        </linearGradient>
        <linearGradient id="cubeRight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2B7BFF" />
          <stop offset="100%" stopColor="#0B47B4" />
        </linearGradient>
      </defs>

      {/* orbit rings */}
      <circle cx="80" cy="80" r="72" fill="none" stroke="rgba(255,255,255,0.16)" />
      <circle
        cx="80"
        cy="80"
        r="56"
        fill="none"
        stroke="rgba(255,255,255,0.28)"
        strokeDasharray="2 6"
        strokeLinecap="round"
      />

      {/* connection nodes on the outer ring */}
      {[
        [24.4, 44.6],
        [8, 80],
        [24.4, 115.4],
        [135.6, 44.6],
        [152, 80],
        [135.6, 115.4],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3" fill="#7DB4FF" />
      ))}

      {/* isometric cube */}
      <g>
        <path d="M80 40 L118 62 L80 84 L42 62 Z" fill="url(#cubeTop)" />
        <path d="M42 62 L80 84 L80 128 L42 106 Z" fill="url(#cubeLeft)" />
        <path d="M118 62 L118 106 L80 128 L80 84 Z" fill="url(#cubeRight)" />
      </g>
    </svg>
  );
}

/**
 * Environment hub — an isometric cube in orbit rings, linked to six hardware /
 * device / runtime environments YOnLab works across.
 */
function EnvironmentHub() {
  return (
    <div className="my-auto grid grid-cols-[1fr_auto_1fr] items-center gap-x-1 gap-y-3 pt-7 sm:gap-y-4">
      {/* Left column */}
      <div className="flex flex-col items-stretch gap-3 sm:gap-4">
        {ENV_LEFT.map(({ label, icon }) => (
          <span key={label} className="flex items-center">
            <EnvTag label={label} icon={icon} />
            <Connector side="left" />
          </span>
        ))}
      </div>

      <HubCore />

      {/* Right column */}
      <div className="flex flex-col items-stretch gap-3 sm:gap-4">
        {ENV_RIGHT.map(({ label, icon }) => (
          <span key={label} className="flex items-center">
            <Connector side="right" />
            <EnvTag label={label} icon={icon} align="right" />
          </span>
        ))}
      </div>
    </div>
  );
}

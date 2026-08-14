import { ImageSlot } from "@/components/ui/ImageSlot";

/**
 * Premium product mockup frames for the Solutions section. Each renders realistic
 * window chrome around an ImageSlot placeholder — the team drops real screenshots
 * in later (never a bare gray box). Soft blue→purple ambient glow sits behind.
 */

const GLOW_BLUE = "rgba(1,108,255,0.20)";
const GLOW_PURPLE = "rgba(120,96,232,0.16)";

function TrafficDots({ dark = false }: { dark?: boolean }) {
  const c = dark
    ? ["bg-white/[0.28]", "bg-white/20", "bg-white/[0.14]"]
    : ["bg-line", "bg-line", "bg-line"];
  return (
    <span className="flex gap-1.5">
      {c.map((cls, i) => (
        <span key={i} className={`h-[9px] w-[9px] rounded-full ${cls}`} />
      ))}
    </span>
  );
}

interface SlotProps {
  placeholder: string;
  ratio: string;
  /** Real screenshot in /public; omitted → labelled placeholder. */
  src?: string | null;
  /** Bare = drop the large offset panel so the frame fits inside a compact bento tile. */
  bare?: boolean;
}

/** 01 — Private AI Platform: browser window, offset panel to the right. */
export function BrowserMockup({ placeholder, ratio, src, address, bare }: SlotProps & { address: string }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-x-[6%] -bottom-[12%] -top-[8%] blur-[4px]"
        style={{
          background: `radial-gradient(60% 60% at 70% 20%, ${GLOW_BLUE} 0%, rgba(1,108,255,0) 62%), radial-gradient(50% 50% at 20% 90%, ${GLOW_PURPLE} 0%, rgba(120,96,232,0) 60%)`,
        }}
      />
      {!bare && (
        <div className="absolute -bottom-3.5 -right-3.5 left-6 top-[22px] rounded-2xl border border-line-soft bg-surface-alt" />
      )}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-mockup">
        <div className="flex h-10 items-center gap-2.5 border-b border-line-soft bg-surface px-3.5">
          <TrafficDots />
          <span className="flex h-6 min-w-0 flex-1 items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap rounded-md border border-line-soft bg-white px-3 font-sans text-xs font-medium leading-none text-faint">
            {address}
          </span>
        </div>
        <ImageSlot placeholder={placeholder} ratio={ratio} src={src} />
      </div>
    </div>
  );
}

/** 02 — Berrywatch: app window with navy title bar + Live pill, offset panel left. */
export function AppWindowMockup({ placeholder, ratio, src, title, live, bare }: SlotProps & { title: string; live?: boolean }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-x-[6%] -bottom-[12%] -top-[8%] blur-[4px]"
        style={{
          background: `radial-gradient(60% 60% at 30% 20%, ${GLOW_BLUE} 0%, rgba(1,108,255,0) 62%), radial-gradient(50% 50% at 85% 90%, ${GLOW_PURPLE} 0%, rgba(120,96,232,0) 60%)`,
        }}
      />
      {!bare && (
        <div className="absolute -left-3.5 -bottom-3.5 right-6 top-[22px] rounded-2xl border border-line-soft bg-surface-alt" />
      )}
      <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-mockup">
        <div className="flex h-[42px] items-center justify-between bg-navy px-4">
          <span className="font-sans text-xs font-bold leading-none tracking-[0.06em] text-white">
            {title}
          </span>
          {live && (
            <span className="inline-flex items-center gap-1.5 font-sans text-[10px] font-semibold uppercase leading-none tracking-[0.08em] text-sky-light">
              <span className="h-1.5 w-1.5 rounded-full bg-sky" />
              Live
            </span>
          )}
        </div>
        <ImageSlot placeholder={placeholder} ratio={ratio} src={src} />
      </div>
    </div>
  );
}

/** 03 — AI OCC: navy console centerpiece window. */
export function ConsoleMockup({ placeholder, ratio, src, label }: SlotProps & { label: string }) {
  return (
    <div className="relative mx-auto max-w-[900px] overflow-hidden rounded-2xl border border-white/[0.18] bg-[#0A2461] shadow-[0_26px_56px_rgba(0,0,0,0.32)]">
      <div className="flex h-10 items-center gap-2.5 border-b border-white/10 bg-white/5 px-3.5">
        <TrafficDots dark />
        <span className="font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.1em] text-white/[0.42]">
          {label}
        </span>
      </div>
      <ImageSlot placeholder={placeholder} ratio={ratio} src={src} dark />
    </div>
  );
}

/** 04 — Validation Automation: analytics window, header with title + bars. */
export function AnalyticsMockup({ placeholder, ratio, src, title }: SlotProps & { title: string }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-x-[6%] -bottom-[12%] -top-[8%] blur-[4px]"
        style={{
          background: `radial-gradient(60% 60% at 70% 20%, rgba(1,108,255,0.18) 0%, rgba(1,108,255,0) 62%), radial-gradient(50% 50% at 20% 90%, rgba(120,96,232,0.14) 0%, rgba(120,96,232,0) 60%)`,
        }}
      />
      <div className="relative overflow-hidden rounded-2xl border border-line bg-white shadow-mockup">
        <div className="flex h-[42px] items-center justify-between border-b border-line-soft bg-surface px-4">
          <span className="font-sans text-xs font-bold leading-none tracking-[0.04em] text-navy">
            {title}
          </span>
          <span className="flex gap-1.5">
            <span className="h-2 w-10 rounded bg-line-soft" />
            <span className="h-2 w-6 rounded bg-line" />
          </span>
        </div>
        <ImageSlot placeholder={placeholder} ratio={ratio} src={src} />
      </div>
    </div>
  );
}

/** 05 — Partner Products: navy phone device frame. */
export function PhoneMockup({ placeholder, ratio, src }: SlotProps) {
  return (
    <div className="relative flex justify-center">
      <div
        className="pointer-events-none absolute -inset-x-0 -bottom-[10%] -top-[6%] blur-[4px]"
        style={{
          background: `radial-gradient(50% 50% at 50% 30%, rgba(1,108,255,0.18) 0%, rgba(1,108,255,0) 62%), radial-gradient(40% 40% at 68% 88%, ${GLOW_PURPLE} 0%, rgba(120,96,232,0) 60%)`,
        }}
      />
      <div className="relative w-[264px] rounded-[32px] bg-navy p-3 shadow-[0_26px_56px_rgba(0,24,80,0.24)]">
        <div className="relative overflow-hidden rounded-[22px] bg-white">
          <ImageSlot placeholder={placeholder} ratio={ratio} src={src} />
        </div>
        <span className="absolute left-1/2 top-[22px] h-[5px] w-[52px] -translate-x-1/2 rounded-[3px] bg-white/40" />
      </div>
    </div>
  );
}

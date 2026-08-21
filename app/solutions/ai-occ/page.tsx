import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ImageIcon } from "lucide-react";
import { RevealProvider } from "@/components/RevealProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/content";
import { getSolutionDetail } from "@/lib/solutions";

const detail = getSolutionDetail("ai-occ")!;

export const metadata: Metadata = {
  title: "AI OCC (OnCare Circle) — YOnLab Solutions",
  description: detail.description,
};

/**
 * Hero visual showing the connected-care loop (device → guardian → briefing).
 * Image today; a video path works in the same frame via `HERO_IS_VIDEO`.
 */
const HERO_MEDIA: string | null = "/occ/occ-hero.png";
const HERO_IS_VIDEO = false;

/**
 * Featured scenario (Pet Guardian) capture. One wide shot already covers the
 * device, the guardian app and the AI briefing, so it renders as a single frame
 * rather than a carousel — same treatment as the Berrywatch page.
 */
const DEMO_IMAGE = "/occ/occ-demo.png";

/** Live demo platform (external — opens in a new tab). Set to activate the CTA. */
const DEMO_URL: string | null = "https://api.axsl.occ-kidswatch.com/public/pet.html";

const keywords = ["Connected Care", "AI Briefing", "Multi-Scenario"];

/** OnCare Circle is scenario-agnostic; these are the care contexts it covers. */
const scenarios = ["Senior Care", "Pet Care", "Family Care"];

const howItWorks = [
  {
    n: "01",
    title: "Connect",
    lead: "돌봄 관계를 연결합니다.",
    description: "보호 대상의 디바이스와 보호자 서비스를 연결합니다.",
  },
  {
    n: "02",
    title: "Observe",
    lead: "일상의 상태를 확인합니다.",
    description: "위치와 활동, 상태 등 주요 정보와 변화를 확인합니다.",
  },
  {
    n: "03",
    title: "Understand",
    lead: "AI가 상황을 함께 이해합니다.",
    description: "연결된 정보를 바탕으로 현재 상태와 주요 신호를 분석합니다.",
  },
  {
    n: "04",
    title: "Care",
    lead: "필요한 돌봄으로 이어갑니다.",
    description:
      "보호자가 상황을 확인하고 필요한 대응과 돌봄을 이어갈 수 있도록 지원합니다.",
  },
];

/** 16:9 media frame — same treatment/scale as the Private AI Platform hero. */
function MediaFrame({
  src,
  label,
  video = false,
  priority = false,
  sizes,
  tone = "dark",
  fit = "contain",
  className,
}: {
  src: string | null;
  label: string;
  /** Video source → autoplaying loop; otherwise the path renders as an image. */
  video?: boolean;
  priority?: boolean;
  sizes?: string;
  /**
   * Backdrop behind the media. "light" for light product UI, "ice" for artwork
   * that already sits on a white ground so the frame reads as one surface.
   */
  tone?: "dark" | "light" | "ice";
  /**
   * "cover" only where the source is letterboxed and the artwork keeps its
   * subject well inside the frame — everything else stays uncropped.
   */
  fit?: "contain" | "cover";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[20px] lg:rounded-[24px]",
        tone === "light" && "border border-line bg-white shadow-panel",
        tone === "ice" &&
          "border border-white/[0.14] bg-gradient-to-b from-white via-[#F7FAFF] to-[#EAF2FF] shadow-[0_28px_70px_-30px_rgba(1,60,160,0.65)]",
        tone === "dark" &&
          "border border-white/[0.14] bg-[#020B22] shadow-[0_28px_70px_-30px_rgba(1,60,160,0.65)]",
        className,
      )}
    >
      <div className="relative aspect-video w-full">
        {src && video ? (
          <video
            className={cn(
              "h-full w-full",
              fit === "cover" ? "object-cover" : "object-contain",
            )}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={label}
          />
        ) : src ? (
          <Image
            src={src}
            alt={label}
            fill
            priority={priority}
            sizes={sizes}
            className={fit === "cover" ? "object-cover" : "object-contain"}
          />
        ) : (
          <div
            role="img"
            aria-label={`${label} (준비 중인 영상 영역)`}
            className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[repeating-linear-gradient(135deg,#0A2461_0,#0A2461_11px,#0C2A70_11px,#0C2A70_22px)] text-center"
          >
            <ImageIcon
              size={34}
              strokeWidth={1.4}
              aria-hidden="true"
              className="text-white/35"
            />
            <span className="px-6 font-sans text-[13px] font-medium leading-snug text-white/45">
              {label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AiOccPage() {
  return (
    <>
      <RevealProvider />
      <Header />
      <main id="main">
        {/* ------------------------------------------------------ 01. Hero */}
        <section className="relative overflow-hidden bg-navy px-6 pb-20 pt-24 sm:px-14 lg:pb-28 lg:pt-32">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 75% at 78% 18%, rgba(1,108,255,0.30) 0%, rgba(1,108,255,0) 52%), linear-gradient(160deg,#051842 0%,#020B22 60%,#01060F 100%)",
            }}
          />
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />

          <div className="relative mx-auto grid max-w-wide grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16">
            <div>
              {/* Two lines so "(OnCare Circle)" never breaks mid-name. */}
              <h1 className="animate-yfade mb-6 break-keep font-sans text-[36px] font-extrabold leading-[1.06] tracking-[-0.035em] text-white sm:text-[48px] lg:text-[56px]">
                AI OCC
                <br />
                <span className="whitespace-nowrap">(OnCare Circle)</span>
              </h1>
              <p
                className="animate-yfade font-kr mb-6 max-w-[520px] whitespace-pre-line break-keep font-sans text-[20px] font-bold leading-[1.45] tracking-[-0.02em] text-white lg:text-[24px]"
                style={{ animationDelay: ".06s" }}
              >
                {"돌봄이 필요한 일상을 연결하고,\n필요한 순간을 함께 이해합니다."}
              </p>
              <p
                className="animate-yfade font-kr mb-10 max-w-[540px] whitespace-pre-line break-keep font-sans text-[16px] font-normal leading-[1.7] text-white/65 lg:text-[17px]"
                style={{ animationDelay: ".1s" }}
              >
                {
                  "위치와 활동, 상태 등 일상의 데이터를 보호자와 연결하고,\nAI 기반 브리핑을 통해 현재 상황을 이해하고 필요한 돌봄으로\n이어갈 수 있도록 지원하는 Connected Care 서비스입니다."
                }
              </p>
              <div
                className="animate-yfade flex flex-wrap gap-3"
                style={{ animationDelay: ".14s" }}
              >
                <Button href={routes.contact} withArrow>
                  프로젝트 상담
                </Button>
                <Button href="#experience" variant="ghost" withArrow>
                  View Demo
                </Button>
              </div>
            </div>

            <div
              className="animate-yfade w-full lg:ml-auto lg:max-w-[640px]"
              style={{ animationDelay: ".12s" }}
            >
              {/* The source is letterboxed (1024×768 canvas, 1024×600 of art):
                  cover eats the black bars and leaves the subject untouched. */}
              <MediaFrame
                src={HERO_MEDIA}
                video={HERO_IS_VIDEO}
                priority
                sizes="(max-width: 1024px) 100vw, 640px"
                tone="ice"
                fit="cover"
                label="OnCare Circle Connected Care 소개"
              />
            </div>
          </div>
        </section>

        {/* -------------------------------------------- 02. Solution Overview */}
        <section className="border-t border-line bg-white px-6 py-20 sm:px-14 lg:py-[120px]">
          <div className="mx-auto grid max-w-content grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-20">
            <div data-reveal>
              <h2 className="mb-7 break-keep font-sans text-[32px] font-extrabold leading-[1.04] tracking-[-0.03em] text-navy sm:text-[38px] lg:text-[44px]">
                Solution Overview
              </h2>
              <p className="font-kr max-w-[460px] whitespace-pre-line break-keep font-sans text-[20px] font-bold leading-[1.5] tracking-[-0.02em] text-navy lg:text-[24px]">
                {"사람부터 반려동물까지,\n다양한 돌봄 관계를 하나의 경험으로 연결합니다."}
              </p>
            </div>

            <div data-reveal style={{ transitionDelay: ".06s" }} className="lg:pt-2">
              <p className="font-kr max-w-[560px] break-keep font-sans text-[17px] leading-[1.78] text-muted lg:text-[18px]">
                OnCare Circle은 보호가 필요한 대상과 보호자를 연결해 위치, 활동, 상태 등
                일상의 주요 정보를 확인할 수 있도록 지원합니다.
              </p>
              <p className="font-kr mt-6 max-w-[560px] break-keep font-sans text-[17px] leading-[1.78] text-muted lg:text-[18px]">
                Senior Care, Pet Care 등 다양한 돌봄 시나리오에 적용할 수 있으며, AI가
                연결된 정보를 함께 분석해 보호자가 현재 상황을 이해하고 필요한 돌봄을
                판단할 수 있도록 지원합니다.
              </p>
              <div className="mt-9 flex flex-wrap gap-2.5">
                {keywords.map((k) => (
                  <Tag key={k}>{k}</Tag>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ 03. Experience */}
        <section
          id="experience"
          className="scroll-mt-20 border-t border-line bg-surface px-6 py-20 sm:px-14 lg:py-[120px]"
        >
          <div className="mx-auto max-w-wide">
            <div data-reveal className="mx-auto mb-14 max-w-[760px] text-center lg:mb-16">
              <h2 className="mb-7 break-keep font-sans text-[34px] font-extrabold leading-[1.04] tracking-[-0.03em] text-navy sm:text-[44px] lg:text-[54px]">
                Experience OnCare Circle
              </h2>
              <p className="font-kr mx-auto mb-5 max-w-[620px] whitespace-pre-line break-keep font-sans text-[19px] font-bold leading-[1.5] tracking-[-0.015em] text-navy lg:text-[21px]">
                {"다양한 Care Scenario로 확장되는\nOnCare Circle의 경험을 확인해보세요."}
              </p>
              <p className="font-kr mx-auto max-w-[620px] break-keep font-sans text-[16px] leading-[1.75] text-muted lg:text-[17px]">
                디바이스와 보호자 서비스, AI Care Briefing이 연결되어 일상의 상태를
                확인하고 필요한 돌봄으로 이어지는 흐름을 보여드립니다.
              </p>
            </div>

            {/* Featured scenario — one applied case, not the whole solution */}
            <div
              data-reveal
              style={{ transitionDelay: ".06s" }}
              className="mx-auto mb-10 max-w-[620px] text-center"
            >
              <span className="mb-3 inline-block font-sans text-[12px] font-bold uppercase tracking-[0.16em] text-blue">
                Featured Scenario
              </span>
              <h3 className="mb-3 break-keep font-sans text-[26px] font-extrabold leading-[1.2] tracking-[-0.02em] text-navy lg:text-[30px]">
                Pet Guardian
              </h3>
              <p className="font-kr break-keep font-sans text-[16px] leading-[1.75] text-muted">
                OnCare Circle의 Connected Care 경험을 반려동물 돌봄에 적용한 Scenario입니다.
              </p>
            </div>

            <div data-reveal style={{ transitionDelay: ".1s" }} className="mx-auto max-w-[1100px]">
              <MediaFrame
                src={DEMO_IMAGE}
                tone="light"
                sizes="(max-width: 1024px) 100vw, 1100px"
                label="Pet Guardian 데모 화면 — Smart Collar · Pet Guardian App · AI 돌봄 브리핑"
              />
            </div>

            {/* Scenario extensibility — labels only, no invented screens */}
            <div
              data-reveal
              style={{ transitionDelay: ".14s" }}
              className="mx-auto mt-14 flex max-w-[620px] flex-col items-center gap-5 text-center"
            >
              <p className="font-kr break-keep font-sans text-[16px] leading-[1.75] text-muted lg:text-[17px]">
                동일한 Connected Care 구조를 다양한 돌봄 관계로 확장할 수 있습니다.
              </p>
              <div className="flex flex-wrap justify-center gap-2.5">
                {scenarios.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </div>

            {/* Demo platform CTA — same placement/style as the AXSL page.
                Set DEMO_URL above to activate (external → new tab). */}
            <div
              data-reveal
              style={{ transitionDelay: ".1s" }}
              className="mx-auto mt-14 flex max-w-[620px] flex-col items-center gap-6 text-center"
            >
              {DEMO_URL ? (
                <Link
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[9px] rounded-full bg-blue px-[30px] py-[17px] font-sans text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-blue-hover"
                >
                  View Demo
                  <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                </Link>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex cursor-not-allowed items-center gap-[9px] rounded-full border border-line bg-white px-[30px] py-[17px] font-sans text-base font-semibold text-faint"
                >
                  View Demo
                  <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ----------------------------------------------- 04. How It Works */}
        <section className="border-t border-line bg-white px-6 py-20 sm:px-14 lg:py-[120px]">
          <div className="mx-auto max-w-wide">
            <div data-reveal className="mb-14 max-w-[720px] lg:mb-20">
              <h2 className="mb-6 break-keep font-sans text-[32px] font-extrabold leading-[1.04] tracking-[-0.03em] text-navy sm:text-[38px] lg:text-[44px]">
                How It Works
              </h2>
              <p className="font-kr whitespace-pre-line break-keep font-sans text-[18px] leading-[1.6] text-muted lg:text-[20px]">
                {"일상의 데이터를 연결하고 이해해,\n필요한 돌봄으로 이어갑니다."}
              </p>
            </div>

            {/* One markup, two layouts: vertical below lg → 4-step horizontal at lg+.
                The connector span flips from vertical to horizontal with the grid. */}
            <ol data-reveal className="relative flex flex-col gap-8 lg:grid lg:grid-cols-4 lg:gap-6">
              {howItWorks.map((step, i) => (
                <li key={step.n} className="relative flex gap-5 lg:flex-col lg:gap-0">
                  {i < howItWorks.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-[-32px] left-[26px] top-[52px] w-px bg-line lg:bottom-auto lg:left-[64px] lg:right-[-24px] lg:top-[26px] lg:h-px lg:w-auto"
                    />
                  )}
                  <span className="relative z-[1] inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-line bg-white font-sans text-[15px] font-extrabold tabular-nums text-blue lg:mb-6">
                    {step.n}
                  </span>
                  <span className="flex flex-col pt-2 lg:pt-0">
                    <span className="mb-2 break-keep font-sans text-[17px] font-bold tracking-[-0.01em] text-navy lg:mb-3 lg:leading-snug">
                      {step.title}
                    </span>
                    <span className="font-kr mb-1.5 break-keep font-sans text-[14.5px] font-semibold leading-[1.6] text-ink lg:mb-2 lg:max-w-[240px]">
                      {step.lead}
                    </span>
                    <span className="font-kr break-keep font-sans text-[14.5px] leading-[1.6] text-muted lg:max-w-[240px]">
                      {step.description}
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------- 05. Final CTA */}
        <section className="bg-white px-6 py-20 sm:px-14 lg:py-28">
          <div
            className="relative mx-auto max-w-wide overflow-hidden rounded-[24px] px-7 py-10 shadow-[0_26px_60px_-32px_rgba(1,60,160,0.55)] sm:px-10 sm:py-12 lg:rounded-[32px] lg:px-14 lg:py-14"
            style={{
              background:
                "linear-gradient(100deg, #2C7BFF 0%, #016CFF 34%, #013A9E 72%, #001A4D 100%)",
            }}
          >
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
              <h2 className="break-keep font-sans text-[26px] font-extrabold leading-[1.28] tracking-[-0.025em] text-white sm:text-[32px] lg:text-[38px]">
                Build connected
                <br />
                care experiences.
              </h2>

              <div className="relative flex flex-col items-start gap-6 lg:pl-14">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-1/2 hidden h-[70%] w-px -translate-y-1/2 bg-white/10 lg:block"
                />
                <p className="font-kr break-keep font-sans text-[15.5px] leading-[1.65] text-white/80">
                  사람과 디바이스, AI를 연결한 케어 서비스가 필요하다면,
                  <br />
                  YOnLab과 함께 실제 서비스로 만들어보세요.
                </p>
                <Link
                  href={routes.contact}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-sans text-[15px] font-semibold text-navy transition-colors duration-[220ms] hover:bg-[#F7FAFF] hover:text-blue"
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

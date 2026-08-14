import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { RevealProvider } from "@/components/RevealProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/content";
import { getSolutionDetail } from "@/lib/solutions";

const detail = getSolutionDetail("private-ai-platform")!;

export const metadata: Metadata = {
  title: "Private AI Platform — YOnLab Solutions",
  description: detail.description,
};

/**
 * Promo video in /public. Native 1280×720 (16:9) — rendered inside a 16:9 frame
 * at or below native width so it is never upscaled.
 */
const PROMO_VIDEO = "/private%20ai/private_ai_YOnLab.mp4";

/** Demo video in /public (folder name has a space → %20). */
const DEMO_VIDEO: string | null = "/private%20ai/private-ai-demo.mp4";

const keywords = ["On-Premise", "AI Assistant", "RAG"];

const howItWorks = [
  {
    n: "01",
    title: "Internal Knowledge",
    description: "기업 내부 문서와 업무 지식을 연결합니다.",
  },
  {
    n: "02",
    title: "Private AI",
    description: "업무 목적에 맞는 AI Assistant 환경을 구성합니다.",
  },
  {
    n: "03",
    title: "Secure Infrastructure",
    description: "폐쇄망·온프레미스 환경에 맞춰 구축합니다.",
  },
  {
    n: "04",
    title: "Ask & Analyze",
    description: "질문, 검색, 문서 분석 등 실제 업무에 활용합니다.",
  },
  {
    n: "05",
    title: "Operate",
    description: "조직 내부 환경에서 안정적으로 운영합니다.",
  },
];

/**
 * 16:9 media frame. Renders the video when `src` is set, otherwise a labelled
 * placeholder (never a gray box, never a fake UI mockup). The frame keeps a
 * solid backdrop so a failed/blocked video never leaves an empty hole.
 */
function VideoFrame({
  src,
  label,
  tone = "dark",
  className,
}: {
  src: string | null;
  label: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[20px] lg:rounded-[24px]",
        tone === "dark"
          ? "border border-white/[0.14] bg-[#020B22] shadow-[0_28px_70px_-30px_rgba(1,60,160,0.65)]"
          : "border border-line bg-navy shadow-panel",
        className,
      )}
    >
      <div className="aspect-video w-full">
        {src ? (
          <video
            /* contain, not cover: the promo is natively 16:9 (identical either
               way) while the demo capture is 16:10 and must not lose UI. */
            className="h-full w-full object-contain"
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={label}
          />
        ) : (
          <div
            role="img"
            aria-label={`${label} (준비 중인 영상 영역)`}
            className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[repeating-linear-gradient(135deg,#F7FAFF_0,#F7FAFF_11px,#F1F6FF_11px,#F1F6FF_22px)] text-center"
          >
            <PlayCircle
              size={34}
              strokeWidth={1.4}
              aria-hidden="true"
              className="text-line-deco"
            />
            <span className="px-6 font-sans text-[13px] font-medium leading-snug text-faint">
              {label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PrivateAiPlatformPage() {
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
              <h1 className="animate-yfade mb-6 break-keep font-sans text-[40px] font-extrabold leading-[1.04] tracking-[-0.035em] text-white sm:text-[52px] lg:text-[60px]">
                Private AI Platform
              </h1>
              <p
                className="animate-yfade font-kr mb-6 max-w-[520px] whitespace-pre-line break-keep font-sans text-[20px] font-bold leading-[1.45] tracking-[-0.02em] text-white lg:text-[24px]"
                style={{ animationDelay: ".06s" }}
              >
                {"보안이 중요한 환경에서도,\nAI를 실제 업무로 연결합니다."}
              </p>
              <p
                className="animate-yfade font-kr mb-10 max-w-[540px] whitespace-pre-line break-keep font-sans text-[16px] font-normal leading-[1.7] text-white/65 lg:text-[17px]"
                style={{ animationDelay: ".1s" }}
              >
                {
                  "폐쇄망·온프레미스 환경에서 내부 데이터와 업무 지식을 기반으로\nAI Assistant를 구축하고 운영할 수 있는 Private AI 플랫폼입니다."
                }
              </p>
              <div
                className="animate-yfade flex flex-wrap gap-3"
                style={{ animationDelay: ".14s" }}
              >
                <Button href={routes.contact} withArrow>
                  프로젝트 상담
                </Button>
                <Button href="#demo" variant="ghost" withArrow>
                  View Demo
                </Button>
              </div>
            </div>

            <div
              className="animate-yfade w-full lg:ml-auto lg:max-w-[640px]"
              style={{ animationDelay: ".12s" }}
            >
              <VideoFrame src={PROMO_VIDEO} label="Private AI Platform 소개 영상" />
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
                {"기업의 보안 환경과 인프라에 맞춰,\n내부 데이터와 업무 지식을 AI로 연결합니다."}
              </p>
            </div>

            <div data-reveal style={{ transitionDelay: ".06s" }} className="lg:pt-2">
              <p className="font-kr max-w-[560px] break-keep font-sans text-[17px] leading-[1.78] text-muted lg:text-[18px]">
                외부 AI 서비스 사용이 제한된 환경에서도 기업 내부의 문서와 업무 지식을
                활용해 질문, 검색, 분석 등 실제 업무에 필요한 AI 기능을 사용할 수 있습니다.
              </p>
              <p className="font-kr mt-6 max-w-[560px] break-keep font-sans text-[17px] leading-[1.78] text-muted lg:text-[18px]">
                폐쇄망·온프레미스 환경을 기반으로 조직의 보안 정책과 시스템 환경에 맞는
                Private AI를 구성하고, 내부 업무에 안정적으로 활용할 수 있도록 지원합니다.
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
          id="demo"
          className="scroll-mt-20 border-t border-line bg-surface px-6 py-20 sm:px-14 lg:py-[120px]"
        >
          <div className="mx-auto max-w-wide">
            <div data-reveal className="mx-auto mb-14 max-w-[760px] text-center lg:mb-16">
              <h2 className="mb-7 break-keep font-sans text-[34px] font-extrabold leading-[1.04] tracking-[-0.03em] text-navy sm:text-[44px] lg:text-[54px]">
                See Private AI in Action
              </h2>
              <p className="font-kr mx-auto mb-5 max-w-[620px] whitespace-pre-line break-keep font-sans text-[19px] font-bold leading-[1.5] tracking-[-0.015em] text-navy lg:text-[21px]">
                {"Private AI Platform이 실제 업무에서 활용되는\n흐름을 직접 확인해보세요."}
              </p>
              <p className="font-kr mx-auto max-w-[620px] break-keep font-sans text-[16px] leading-[1.75] text-muted lg:text-[17px]">
                내부 업무 환경에서 질문을 입력하고, 연결된 문서와 업무 지식을 기반으로
                필요한 정보를 탐색하고 답변을 생성하는 과정을 확인할 수 있습니다.
              </p>
            </div>

            <div data-reveal style={{ transitionDelay: ".06s" }} className="mx-auto max-w-[1100px]">
              <VideoFrame
                src={DEMO_VIDEO}
                tone="light"
                label="Private AI Platform Demo 영상"
              />
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
                {"내부 데이터와 업무 지식을 연결해,\n조직에 맞는 Private AI 환경을 구성합니다."}
              </p>
            </div>

            {/* One markup, two layouts: vertical below lg → 5-step horizontal at lg+.
                The connector span flips from vertical to horizontal with the grid. */}
            <ol data-reveal className="relative flex flex-col gap-8 lg:grid lg:grid-cols-5 lg:gap-6">
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
                    <span className="font-kr break-keep font-sans text-[14.5px] leading-[1.6] text-muted lg:max-w-[210px]">
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
                Bring AI into your
                <br />
                private environment.
              </h2>

              <div className="relative flex flex-col items-start gap-6 lg:pl-14">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-1/2 hidden h-[70%] w-px -translate-y-1/2 bg-white/10 lg:block"
                />
                <p className="font-kr break-keep font-sans text-[15.5px] leading-[1.65] text-white/80">
                  기업의 환경에 맞는 Private AI 도입과 구축이 필요하다면
                  <br />
                  YOnLab에 문의해주세요.
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

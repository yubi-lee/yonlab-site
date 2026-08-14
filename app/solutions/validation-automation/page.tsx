import type { Metadata } from "next";
import Image from "next/image";
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

const detail = getSolutionDetail("validation-automation")!;

export const metadata: Metadata = {
  title: "Validation Automation — YOnLab Solutions",
  description: detail.description,
};

/**
 * Hero media in /public — a still image today (5504×3072, ~16:9), so the frame
 * renders it with `next/image` instead of the player.
 */
const HERO_MEDIA: string | null = "/validation/validation-hero.png";
const HERO_IS_VIDEO = false;

/** Demo video in /public. */
const DEMO_VIDEO: string | null = "/validation/validation-demo.mp4";


const keywords = ["App Validation", "Model Validation", "Device Lab"];

const howItWorks = [
  {
    n: "01",
    title: "Upload / Configure",
    description: "검증할 앱·모델과 테스트 조건을 설정합니다.",
  },
  {
    n: "02",
    title: "Select Device",
    description: "대상 디바이스와 실행 환경을 선택합니다.",
  },
  {
    n: "03",
    title: "Run Validation",
    description: "설정된 조건에 따라 검증을 자동 실행합니다.",
  },
  {
    n: "04",
    title: "Analyze Results",
    description: "실행 결과와 주요 측정값을 수집하고 비교합니다.",
  },
  {
    n: "05",
    title: "Retry / Compare",
    description: "실패 항목을 재실행하거나 Baseline과 비교합니다.",
  },
  {
    n: "06",
    title: "Report",
    description: "검증 결과와 이력을 기록하고 리포트로 관리합니다.",
  },
];

/**
 * 16:9 media frame — same treatment/scale as the Private AI Platform hero.
 * Renders the video when `src` is set, otherwise a quiet navy media state
 * (never a gray box, never an invented dashboard).
 */
function MediaFrame({
  src,
  label,
  video = true,
  priority = false,
  sizes,
  className,
}: {
  src: string | null;
  label: string;
  /** Video source → autoplaying loop; set false for a still image. */
  video?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[20px] border border-white/[0.14] bg-[#020B22] shadow-[0_28px_70px_-30px_rgba(1,60,160,0.65)] lg:rounded-[24px]",
        className,
      )}
    >
      <div className="relative aspect-video w-full">
        {src && video ? (
          <video
            /* contain: the demo capture is 3:2, so cover would cut ~8% off the
               top and bottom of the console UI. */
            className="h-full w-full object-contain"
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
            className="object-cover"
          />
        ) : (
          <div
            role="img"
            aria-label={`${label} (준비 중인 영상 영역)`}
            className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[repeating-linear-gradient(135deg,#0A2461_0,#0A2461_11px,#0C2A70_11px,#0C2A70_22px)] text-center"
          >
            <PlayCircle
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

export default function ValidationAutomationPage() {
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
                Validation Automation
              </h1>
              <p
                className="animate-yfade font-kr mb-6 max-w-[520px] whitespace-pre-line break-keep font-sans text-[20px] font-bold leading-[1.45] tracking-[-0.02em] text-white lg:text-[24px]"
                style={{ animationDelay: ".06s" }}
              >
                {"반복되는 AI 검증을,\n하나의 자동화된 흐름으로."}
              </p>
              <p
                className="animate-yfade font-kr mb-10 max-w-[540px] whitespace-pre-line break-keep font-sans text-[16px] font-normal leading-[1.7] text-white/65 lg:text-[17px]"
                style={{ animationDelay: ".1s" }}
              >
                {
                  "실제 디바이스 환경에서 AI 모델과 SDK의 실행·검증을 자동화하고,\n테스트부터 결과 확인과 리포트까지 하나의 흐름으로 관리합니다."
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
              <MediaFrame
                src={HERO_MEDIA}
                video={HERO_IS_VIDEO}
                priority
                sizes="(max-width: 1024px) 100vw, 640px"
                label="Validation Preview"
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
                {"반복되는 검증 업무를 줄이고,\n실행부터 결과까지 하나의 과정으로 연결합니다."}
              </p>
            </div>

            <div data-reveal style={{ transitionDelay: ".06s" }} className="lg:pt-2">
              <p className="font-kr max-w-[560px] break-keep font-sans text-[17px] leading-[1.78] text-muted lg:text-[18px]">
                AI 모델과 SDK를 실제 디바이스에 적용하는 과정에서는 환경 설정, 실행, 결과
                확인, 리포트 작성과 같은 반복적인 검증 업무가 발생합니다.
              </p>
              <p className="font-kr mt-6 max-w-[560px] break-keep font-sans text-[17px] leading-[1.78] text-muted lg:text-[18px]">
                Validation Automation은 이러한 검증 과정을 자동화해 테스트 실행부터 결과
                수집·확인·관리까지 일관된 Workflow로 연결합니다.
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
                See Validation in Action
              </h2>
              <p className="font-kr mx-auto mb-5 max-w-[620px] whitespace-pre-line break-keep font-sans text-[19px] font-bold leading-[1.5] tracking-[-0.015em] text-navy lg:text-[21px]">
                {"앱과 AI 모델을 실제 디바이스에서 실행하고,\n결과를 비교·재검증하는 흐름을 확인해보세요."}
              </p>
              <p className="font-kr mx-auto max-w-[620px] whitespace-pre-line break-keep font-sans text-[16px] leading-[1.75] text-muted lg:text-[17px]">
                {"APK·모델 업로드부터 대상 디바이스 선택, 자동 실행,\n결과 확인, 실패 재실행과 리포트까지 하나의 검증 흐름으로 연결합니다."}
              </p>
            </div>

            {/* No external demo platform for this solution — the embedded video
                is the whole experience, so there is no CTA below it. */}
            <div data-reveal style={{ transitionDelay: ".06s" }} className="mx-auto max-w-[1100px]">
              <MediaFrame src={DEMO_VIDEO} label="Validation Automation Demo 영상" />
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
                {"검증 요청부터 결과 관리까지,\n반복되는 과정을 하나의 Workflow로 연결합니다."}
              </p>
            </div>

            {/* One markup, three layouts: vertical below lg → 3+3 at lg → 6-across at xl.
                The connector span flips from vertical to horizontal with the grid. */}
            <ol
              data-reveal
              className="relative flex flex-col gap-8 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:gap-y-14 xl:grid-cols-6"
            >
              {howItWorks.map((step, i) => (
                <li key={step.n} className="relative flex gap-5 lg:flex-col lg:gap-0">
                  {i < howItWorks.length - 1 && (
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute bottom-[-32px] left-[26px] top-[52px] w-px bg-line",
                        "lg:bottom-auto lg:left-[64px] lg:right-[-24px] lg:top-[26px] lg:h-px lg:w-auto",
                        // 3rd step ends the first row in the 3-col layout (lg only).
                        i === 2 && "lg:hidden xl:block",
                      )}
                    />
                  )}
                  <span className="relative z-[1] inline-flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full border border-line bg-white font-sans text-[15px] font-extrabold tabular-nums text-blue lg:mb-6">
                    {step.n}
                  </span>
                  <span className="flex flex-col pt-2 lg:pt-0">
                    <span className="mb-2 break-keep font-sans text-[17px] font-bold tracking-[-0.01em] text-navy lg:mb-3 lg:leading-snug">
                      {step.title}
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
                Make validation part
                <br />
                of your workflow.
              </h2>

              <div className="relative flex flex-col items-start gap-6 lg:pl-14">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-1/2 hidden h-[70%] w-px -translate-y-1/2 bg-white/10 lg:block"
                />
                <p className="font-kr break-keep font-sans text-[15.5px] leading-[1.65] text-white/80">
                  반복되는 AI 검증 업무를 자동화하고 싶다면,
                  <br />
                  YOnLab과 함께 검증 환경을 구축해보세요.
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

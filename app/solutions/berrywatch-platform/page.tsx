import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { RevealProvider } from "@/components/RevealProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import { routes } from "@/lib/content";
import { getSolutionDetail } from "@/lib/solutions";

const detail = getSolutionDetail("berrywatch-platform")!;

export const metadata: Metadata = {
  title: "Berrywatch Service — YOnLab Solutions",
  description: detail.description,
};

/** Real Berrywatch captures in /public/berrywatch. */
const HERO_VIDEO = "/berrywatch/berrywatch-hero.mp4";
const DEMO_IMAGE = "/berrywatch/berrywatch-demo.png";

/** Live demo platform (external — opens in a new tab). Set to activate the CTA. */
const DEMO_URL: string | null = "https://api.axsl.occ-kidswatch.com/public/wearables.html";

const keywords = ["Kids Care", "Smart Watch", "AI Safety"];

const howItWorks = [
  {
    n: "01",
    title: "Connect",
    lead: "아이와 보호자를 연결합니다.",
    description: "아이의 스마트워치와 보호자 앱을 연결합니다.",
  },
  {
    n: "02",
    title: "Sense",
    lead: "위치와 상태를 확인합니다.",
    description: "위치와 기기 상태, 주요 안전 이벤트를 확인합니다.",
  },
  {
    n: "03",
    title: "Understand",
    lead: "AI가 상황을 이해합니다.",
    description: "수집된 정보를 기반으로 현재 상황과 주요 안전 정보를 함께 분석합니다.",
  },
  {
    n: "04",
    title: "Respond",
    lead: "필요한 순간에 대응합니다.",
    description:
      "보호자가 필요한 정보를 확인하고 상황에 맞게 대응할 수 있도록 지원합니다.",
  },
];

/**
 * 16:9 media frame — same treatment/scale as the Private AI Platform hero.
 * Renders a muted looping video when `video` is set, otherwise an image.
 * `object-contain` either way, so the captured UI is never cropped.
 */
function MediaFrame({
  src,
  alt,
  sizes,
  priority,
  video,
  className,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  video?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[20px] border border-white/[0.14] bg-white shadow-[0_28px_70px_-30px_rgba(1,60,160,0.65)] lg:rounded-[24px]",
        className,
      )}
    >
      <div className="relative aspect-video w-full">
        {video ? (
          // muted + playsInline are what let iOS/Android autoplay inline.
          <video
            className="h-full w-full object-contain"
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={alt}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-contain"
          />
        )}
      </div>
    </div>
  );
}

export default function BerrywatchPage() {
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
                Berrywatch Service
              </h1>
              <p
                className="animate-yfade font-kr mb-6 max-w-[520px] whitespace-pre-line break-keep font-sans text-[20px] font-bold leading-[1.45] tracking-[-0.02em] text-white lg:text-[24px]"
                style={{ animationDelay: ".06s" }}
              >
                {"아이의 하루를 이해하고,\n필요한 순간의 안전을 함께합니다."}
              </p>
              <p
                className="animate-yfade font-kr mb-10 max-w-[540px] whitespace-pre-line break-keep font-sans text-[16px] font-normal leading-[1.7] text-white/65 lg:text-[17px]"
                style={{ animationDelay: ".1s" }}
              >
                {
                  "스마트워치와 보호자 앱을 연결해 아이의 위치와 안전 상태를 확인하고,\nAI 기반 안전 브리핑으로 일상 속 상황을 이해하고 대응할 수 있도록 지원하는\n키즈케어 서비스입니다."
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
              <MediaFrame src={HERO_VIDEO} alt="Berrywatch 서비스 소개 영상" video />
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
                {"아이와 보호자를 연결해,\n일상의 안전을 더 쉽게 확인합니다."}
              </p>
            </div>

            <div data-reveal style={{ transitionDelay: ".06s" }} className="lg:pt-2">
              <p className="font-kr max-w-[560px] break-keep font-sans text-[17px] leading-[1.78] text-muted lg:text-[18px]">
                Berrywatch는 스마트워치와 보호자 앱을 연결해 아이의 위치와 주요 안전
                이벤트를 확인하고, 필요한 순간에 보호자가 빠르게 상황을 파악할 수 있도록
                지원합니다.
              </p>
              <p className="font-kr mt-6 max-w-[560px] break-keep font-sans text-[17px] leading-[1.78] text-muted lg:text-[18px]">
                위치 정보와 기기 상태, 안전 시나리오를 AI가 함께 분석해 일상의 안전 상태를
                이해하고 대응할 수 있는 경험으로 연결합니다.
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
                Experience Berrywatch
              </h2>
              <p className="font-kr mx-auto mb-5 max-w-[620px] whitespace-pre-line break-keep font-sans text-[19px] font-bold leading-[1.5] tracking-[-0.015em] text-navy lg:text-[21px]">
                Berrywatch가 연결하는 키즈케어 경험을 확인해보세요.
              </p>
              <p className="font-kr mx-auto max-w-[620px] break-keep font-sans text-[16px] leading-[1.75] text-muted lg:text-[17px]">
                스마트워치와 보호자 앱, AI 안전 브리핑이 연결되어 아이의 일상과 주요 안전
                상황을 확인하는 흐름을 보여드립니다.
              </p>
            </div>

            <div data-reveal style={{ transitionDelay: ".06s" }} className="mx-auto max-w-[1100px]">
              <MediaFrame
                src={DEMO_IMAGE}
                alt="Berrywatch 서비스 데모 화면"
                sizes="(max-width: 1024px) 100vw, 1100px"
              />
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
                {"스마트워치와 보호자 앱, AI를 연결해\n필요한 안전 정보를 전달합니다."}
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
                Build safer everyday
                <br />
                experiences.
              </h2>

              <div className="relative flex flex-col items-start gap-6 lg:pl-14">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-1/2 hidden h-[70%] w-px -translate-y-1/2 bg-white/10 lg:block"
                />
                <p className="font-kr break-keep font-sans text-[15.5px] leading-[1.65] text-white/80">
                  스마트워치와 AI를 활용한 키즈케어 서비스가 필요하다면,
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

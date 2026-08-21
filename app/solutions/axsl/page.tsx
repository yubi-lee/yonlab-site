import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { RevealProvider } from "@/components/RevealProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  ExperienceCarousel,
  type ExperienceSlide,
} from "@/components/sections/solution-detail/ExperienceCarousel";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { routes } from "@/lib/content";
import { getSolutionDetail } from "@/lib/solutions";

const detail = getSolutionDetail("axsl")!;

export const metadata: Metadata = {
  title: "AXSL — YOnLab Solutions",
  description: detail.description,
};

/** Live AXSL demo platform (external — opens in a new tab). */
const AXSL_DEMO_URL = "https://api.axsl.occ-kidswatch.com/public/axsl.html";

const keywords = ["AI Service", "Extensible", "Co-Creation"];

/** Real AXSL captures in /public/axsl — library overview, then two applied services. */
const showcase: ExperienceSlide[] = [
  {
    n: "01",
    title: "Solution Zoo",
    description:
      "AI, 디바이스, 디지털 트윈, 운영 플랫폼이 하나의 확장형 라이브러리로 연결됩니다.",
    src: "/axsl/axsl-demo-01.png",
  },
  {
    n: "02",
    title: "Kids Watch",
    description: "키즈 케어 도메인에 적용된 AI 서비스 화면입니다.",
    src: "/axsl/axsl-demo-02.png",
  },
  {
    n: "03",
    title: "Pet App",
    description: "펫 케어 도메인에 적용된 AI 서비스 화면입니다.",
    src: "/axsl/axsl-demo-03.png",
  },
];

const howItWorks = [
  {
    n: "01",
    title: "Discover",
    lead: "필요한 AI 서비스를 정의합니다.",
    description:
      "고객의 아이디어와 해결하고 싶은 문제, 필요한 AI 기능을 함께 구체화합니다.",
  },
  {
    n: "02",
    title: "Design",
    lead: "서비스 형태를 설계합니다.",
    description:
      "기존 AXSL 사례와 기술을 기반으로 필요한 기능과 서비스 구조를 설계합니다.",
  },
  {
    n: "03",
    title: "Build",
    lead: "구현하고 검증합니다.",
    description:
      "YOnLab의 AI·플랫폼 엔지니어링 경험을 바탕으로 실제 사용할 수 있는 서비스로 구현합니다.",
  },
  {
    n: "04",
    title: "Launch",
    lead: "실제 서비스로 연결합니다.",
    description:
      "PoC에 그치지 않고 고객 환경에 적용해 실제 서비스로 연결하고 확장합니다.",
  },
];

export default function AxslPage() {
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
              <h1 className="animate-yfade mb-3 break-keep font-sans text-[40px] font-extrabold leading-[1.04] tracking-[-0.035em] text-white sm:text-[52px] lg:text-[60px]">
                AXSL
              </h1>
              <p
                className="animate-yfade mb-6 font-sans text-[13.5px] font-semibold leading-none tracking-[0.1em] text-white/55"
                style={{ animationDelay: ".04s" }}
              >
                AI eXtensible Service Library
              </p>
              <p
                className="animate-yfade font-kr mb-6 max-w-[520px] whitespace-pre-line break-keep font-sans text-[20px] font-bold leading-[1.45] tracking-[-0.02em] text-white lg:text-[24px]"
                style={{ animationDelay: ".06s" }}
              >
                {"필요한 AI를 정의하고,\n함께 실제 서비스로 만들어갑니다."}
              </p>
              <p
                className="animate-yfade font-kr mb-10 max-w-[540px] whitespace-pre-line break-keep font-sans text-[16px] font-normal leading-[1.7] text-white/65 lg:text-[17px]"
                style={{ animationDelay: ".1s" }}
              >
                {
                  "AXSL은 다양한 AI 서비스 사례와 구현 경험을 바탕으로,\n고객의 아이디어와 요구사항을 함께 구체화하고 실제 서비스로 연결하는\nAI eXtensible Service Library입니다."
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

            {/* Real AXSL platform capture inside a browser frame. Chrome is empty
                by design (no invented URL text); object-contain keeps the UI uncropped. */}
            <div
              className="animate-yfade relative w-full lg:ml-auto lg:max-w-[640px]"
              style={{ animationDelay: ".12s" }}
            >
              {/* soft blue ambient behind the frame */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-[5%] -bottom-[9%] -top-[7%] blur-[6px]"
                style={{
                  background:
                    "radial-gradient(58% 58% at 68% 18%, rgba(1,108,255,0.28) 0%, rgba(1,108,255,0) 64%)",
                }}
              />

              <div className="relative overflow-hidden rounded-[16px] border border-white/[0.16] bg-white shadow-[0_36px_88px_-34px_rgba(0,10,40,0.85)] lg:rounded-[20px]">
                {/* browser chrome */}
                <div className="flex h-11 items-center gap-3 border-b border-line-soft bg-surface px-4">
                  <span aria-hidden="true" className="flex shrink-0 gap-1.5">
                    <span className="h-[9px] w-[9px] rounded-full bg-line" />
                    <span className="h-[9px] w-[9px] rounded-full bg-line" />
                    <span className="h-[9px] w-[9px] rounded-full bg-line" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-6 min-w-0 flex-1 rounded-md border border-line-soft bg-white"
                  />
                  <span aria-hidden="true" className="h-[3px] w-7 shrink-0 rounded-full bg-blue/50" />
                </div>

                {/* viewport */}
                <div className="relative aspect-video w-full bg-white">
                  <Image
                    src="/axsl/axsl-hero.png"
                    alt="AXSL 플랫폼 Solution Zoo 화면"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 640px"
                    className="object-contain"
                  />
                </div>
              </div>
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
                {"다양한 AI 서비스에서 시작해,\n고객에게 필요한 새로운 서비스로 확장합니다."}
              </p>
            </div>

            <div data-reveal style={{ transitionDelay: ".06s" }} className="lg:pt-2">
              <p className="font-kr max-w-[560px] break-keep font-sans text-[17px] leading-[1.78] text-muted lg:text-[18px]">
                AXSL에는 일상과 산업의 다양한 문제를 해결하기 위해 구현된 AI 서비스가
                축적되어 있습니다. Kids Care, Pet Care, Healthcare, Sports Coaching, Smart
                Home 등 다양한 사례를 통해 필요한 AI 서비스의 가능성을 확인할 수 있습니다.
              </p>
              <p className="font-kr mt-6 max-w-[560px] break-keep font-sans text-[17px] leading-[1.78] text-muted lg:text-[18px]">
                기존 서비스를 그대로 활용하는 것에서 끝나지 않습니다. 고객의 환경과 목적에
                맞춰 기능을 확장하고, 새로운 아이디어를 실제 AI 서비스로 구현합니다.
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
                Explore AXSL
              </h2>
              <p className="font-kr mx-auto mb-5 max-w-[620px] break-keep font-sans text-[19px] font-bold leading-[1.5] tracking-[-0.015em] text-navy lg:text-[21px]">
                다양한 AI 서비스와 활용 사례를 직접 확인해보세요.
              </p>
              <p className="font-kr mx-auto max-w-[620px] break-keep font-sans text-[16px] leading-[1.75] text-muted lg:text-[17px]">
                AXSL에서 구현된 서비스를 살펴보고, 필요한 AI 서비스의 가능성을 직접 확인할
                수 있습니다.
              </p>
            </div>

            <div data-reveal style={{ transitionDelay: ".06s" }} className="mx-auto max-w-[1100px]">
              <ExperienceCarousel slides={showcase} frameTone="light" />
            </div>

            {/* Demo platform CTA + closing line */}
            <div
              data-reveal
              style={{ transitionDelay: ".1s" }}
              className="mx-auto mt-14 flex max-w-[620px] flex-col items-center gap-6 text-center"
            >
              <p className="font-kr whitespace-pre-line break-keep font-sans text-[16px] leading-[1.75] text-muted lg:text-[17px]">
                {"더 필요한 AI가 있다면,\nYOnLab과 함께 확장하고 새롭게 만들 수 있습니다."}
              </p>

              <Link
                href={AXSL_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-[9px] rounded-full bg-blue px-[30px] py-[17px] font-sans text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-blue-hover"
              >
                View AXSL Demo
                <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
              </Link>
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
                {"아이디어에서 실제 AI 서비스까지,\nYOnLab과 함께 만들어갑니다."}
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
                What AI service
                <br />
                do you need?
              </h2>

              <div className="relative flex flex-col items-start gap-6 lg:pl-14">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-1/2 hidden h-[70%] w-px -translate-y-1/2 bg-white/10 lg:block"
                />
                <p className="font-kr break-keep font-sans text-[15.5px] leading-[1.65] text-white/80">
                  필요한 AI 서비스가 있다면,
                  <br />
                  YOnLab과 함께 아이디어를 실제 서비스로 만들어보세요.
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

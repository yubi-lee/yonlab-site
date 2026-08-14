import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { RevealProvider } from "@/components/RevealProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/sections/ContactForm";
import { ContactHeroVisual } from "@/components/sections/ContactHeroVisual";
import { cn } from "@/lib/cn";
import { contactHeadline, contactSubcopy, contactEmail } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — YOnLab",
  description:
    "YOnLab에 솔루션 도입, 기술·검증, 파트너십을 문의하세요. AI를 실제 디바이스와 폐쇄망 환경에 적용하는 논의를 시작합니다.",
};

export default function ContactPage() {
  return (
    <>
      <RevealProvider />
      <Header />
      <main id="main">
        {/* ------------------------------------------------------ Hero */}
        {/* Same structure as the shared PageHero, with a contact-specific blue
            accent field so the page opens with the brand's energy. */}
        <section
          className="relative flex items-center overflow-hidden border-b border-line px-6 pb-16 pt-16 sm:px-14 lg:min-h-[620px] lg:pb-24 lg:pt-24"
          style={{ background: "linear-gradient(180deg,#F7FAFF 0%,#FFFFFF 100%)" }}
        >
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.035]" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(52% 62% at 82% 34%, rgba(1,108,255,0.12) 0%, rgba(1,108,255,0) 62%)",
            }}
          />

          <div className="relative mx-auto grid w-full max-w-wide grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-14">
            <div>
              {/* Headline is the hero's first element — no eyebrow label. */}
              <h1 className="animate-yfade mb-7 max-w-[720px] break-keep font-sans text-[38px] font-extrabold leading-[1.06] tracking-[-0.04em] text-navy sm:text-[50px] lg:text-[56px] xl:text-[66px]">
                {contactHeadline}
              </h1>
              <span
                aria-hidden="true"
                className="animate-yfade mb-7 block h-px w-16 bg-blue"
                style={{ animationDelay: ".05s" }}
              />
              <div className="animate-yfade mb-8" style={{ animationDelay: ".08s" }}>
                {contactSubcopy.map((para, i) => (
                  <p
                    key={i}
                    className={cn(
                      "font-kr max-w-[560px] whitespace-pre-line break-keep font-sans text-[17px] font-normal leading-[1.75] text-muted lg:text-[18px]",
                      i > 0 && "mt-4",
                    )}
                  >
                    {para}
                  </p>
                ))}
              </div>
              <Link
                href={`mailto:${contactEmail}`}
                className="animate-yfade group inline-flex items-center gap-2.5 font-sans text-[17px] font-bold tracking-[-0.01em] text-navy transition-colors duration-200 hover:text-blue lg:text-[19px]"
                style={{ animationDelay: ".12s" }}
              >
                <Mail size={19} strokeWidth={1.8} aria-hidden="true" className="text-blue" />
                {contactEmail}
              </Link>
            </div>

            <div className="animate-yfade" style={{ animationDelay: ".12s" }}>
              <ContactHeroVisual />
            </div>
          </div>
        </section>

        {/* --------------------------------------------- Info + form */}
        {/* Tinted section so the white form card reads as a raised surface. */}
        <section className="relative overflow-hidden bg-surface px-6 py-16 sm:px-14 lg:py-24">
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
          <div className="relative mx-auto grid max-w-content grid-cols-1 gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            {/* Left — contact info */}
            <div data-reveal className="lg:pt-2">
              <span
                aria-hidden="true"
                className="mb-6 block h-[3px] w-10 rounded-full bg-blue"
              />
              <h2 className="mb-5 font-sans text-[24px] font-extrabold tracking-[-0.025em] text-navy lg:text-[28px]">
                문의 안내
              </h2>
              <p className="font-kr mb-8 max-w-[400px] break-keep font-sans text-[16px] leading-[1.75] text-muted">
                솔루션 도입, 기술 · 검증, 파트너십 등 어떤 논의든 환영합니다. 아래 이메일로
                직접 연락하거나 문의 폼을 이용해주세요.
              </p>

              <Link
                href={`mailto:${contactEmail}`}
                className="group flex items-center gap-4 rounded-[18px] border border-line-soft bg-white px-5 py-5 shadow-[0_10px_28px_-18px_rgba(0,24,80,0.35)] transition-colors duration-200 hover:border-blue/40"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue text-white">
                  <Mail size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="mb-0.5 font-sans text-[11.5px] font-bold uppercase tracking-[0.14em] text-faint">
                    Email
                  </span>
                  <span className="font-sans text-[16px] font-bold tracking-[-0.01em] text-navy transition-colors duration-200 group-hover:text-blue">
                    {contactEmail}
                  </span>
                </span>
              </Link>
            </div>

            {/* Right — form */}
            <div data-reveal style={{ transitionDelay: ".06s" }}>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

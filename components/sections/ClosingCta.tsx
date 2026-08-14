import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { contactEmail, routes } from "@/lib/content";

/**
 * Closing CTA — a single inset gradient card on the white page background.
 * Deliberately not a second hero: shorter, action-oriented, and carried by
 * typography + gradient alone (no diagrams, patterns or decorative objects).
 */
export function ClosingCta() {
  return (
    // max-w-wide + the section's px-6/sm:px-14 gutter gives the card the same
    // content boundary Core Capabilities and Solutions use.
    <section className="bg-white px-6 pb-20 pt-8 sm:px-14 lg:pb-28 lg:pt-10">
      <div
        className="relative mx-auto max-w-wide overflow-hidden rounded-[24px] px-7 py-10 shadow-[0_26px_60px_-32px_rgba(1,60,160,0.55)] sm:px-10 sm:py-12 lg:rounded-[32px] lg:px-14 lg:py-14"
        style={{
          background:
            "linear-gradient(100deg, #2C7BFF 0%, #016CFF 34%, #013A9E 72%, #001A4D 100%)",
        }}
      >
        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-14">
          {/* Left — statement (vertically centred; no eyebrow label) */}
          <div>
            <h2 className="break-keep font-sans text-[26px] font-extrabold leading-[1.28] tracking-[-0.025em] text-white sm:text-[32px] lg:text-[38px]">
              Turn Your AI Challenge
              <br />
              into Reality.
            </h2>
          </div>

          {/* Right — one contact group: description → email → CTA, shared left edge */}
          <div className="relative flex flex-col items-start gap-4 lg:pl-14">
            {/* Subtle divider — shorter than the card, centred, low contrast */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-1/2 hidden h-[70%] w-px -translate-y-1/2 bg-white/10 lg:block"
            />

            <p className="break-keep font-sans text-[15.5px] leading-[1.65] text-white/80">
              AI를 실제 서비스와 디바이스 환경에 적용하고 싶다면,
              <br />
              YOnLab에 문의해주세요.
            </p>

            <Link
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-2.5 font-sans text-[19px] font-bold tracking-[-0.01em] text-white transition-colors duration-200 hover:text-sky-light lg:text-[21px]"
            >
              <Mail size={18} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
              {contactEmail}
            </Link>

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
  );
}

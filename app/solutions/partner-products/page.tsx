import type { Metadata } from "next";
import { Check, ExternalLink } from "lucide-react";
import { RevealProvider } from "@/components/RevealProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactCta } from "@/components/sections/ContactCta";
import { OtherSolutions } from "@/components/sections/solution-detail/OtherSolutions";
import { TodoNote } from "@/components/sections/solution-detail/TodoNote";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CardCta } from "@/components/ui/CardCta";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/icons";
import { routes } from "@/lib/content";
import {
  getSolutionDetail,
  resolveCapabilities,
  partnerCategories,
  partnerProducts,
} from "@/lib/solutions";

const detail = getSolutionDetail("partner-products")!;

export const metadata: Metadata = {
  title: "Partner Products — YOnLab Solutions",
  description: detail.description,
};

export default function PartnerProductsPage() {
  const caps = resolveCapabilities(detail.capabilityTitles);

  return (
    <>
      <RevealProvider />
      <Header />
      <main id="main">
        {/* Hero */}
        <section
          className="relative overflow-hidden border-b border-line px-6 pb-16 pt-20 sm:px-14 lg:pb-20 lg:pt-24"
          style={{ background: "linear-gradient(160deg,#EEF3FF 0%,#F7FAFF 55%,#FFFFFF 100%)" }}
        >
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.02]" />
          <div className="relative mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <div data-reveal className="mb-5 flex items-center gap-3">
                <Eyebrow>Solutions</Eyebrow>
                <Badge tone="light">{detail.category}</Badge>
              </div>
              <h1 data-reveal style={{ transitionDelay: ".06s" }} className="mb-5 break-keep font-sans text-[34px] font-extrabold leading-[1.12] tracking-[-0.03em] text-navy sm:text-[46px]">
                {detail.title}
              </h1>
              <p data-reveal style={{ transitionDelay: ".1s" }} className="mb-8 max-w-[520px] break-keep font-sans text-lg font-medium leading-[1.6] text-muted">
                {detail.oneLine}
              </p>
              <div data-reveal style={{ transitionDelay: ".14s" }}>
                <Button href={routes.contact} withArrow>
                  파트너 문의
                </Button>
              </div>
            </div>
            {/* Ecosystem visual */}
            <div data-reveal style={{ transitionDelay: ".1s" }} aria-hidden="true">
              <div className="mx-auto w-full max-w-[400px] rounded-panel border border-line-soft bg-white p-8 shadow-panel">
                <div className="mb-6 flex justify-center">
                  <span className="rounded-xl bg-navy px-5 py-3 font-sans text-[15px] font-bold text-white">
                    YOnLab
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="h-4 w-px bg-line-deco" />
                  <span className="h-px w-3/4 bg-line" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {partnerCategories.map((c) => (
                    <span key={c} className="rounded-xl border border-line bg-surface px-4 py-3 text-center font-sans text-[14px] font-semibold text-navy">
                      {c}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-center font-sans text-[12px] text-faint">Partner Ecosystem</p>
              </div>
            </div>
          </div>
        </section>

        {/* Overview + Challenge/Approach */}
        <section className="border-t border-line bg-white px-6 py-16 sm:px-14 lg:py-20">
          <div className="mx-auto max-w-content">
            <div data-reveal className="mb-10 max-w-[720px]">
              <Eyebrow className="mb-5">Overview</Eyebrow>
              <h2 className="mb-6 break-keep font-sans text-[26px] font-extrabold leading-[1.2] tracking-[-0.02em] text-navy sm:text-[34px]">
                파트너와 함께 제공하는 제품 · 솔루션
              </h2>
              <p className="break-keep font-sans text-[18px] leading-[1.75] text-muted">
                {detail.description}
              </p>
            </div>
            {detail.challenge && (
              <div data-reveal className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
                <div className="rounded-panel border border-line bg-surface p-7 sm:p-8">
                  <span className="mb-4 inline-block font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-faint">Customer Challenge</span>
                  <p className="break-keep font-sans text-[17px] font-medium leading-[1.6] text-ink">{detail.challenge.problem}</p>
                </div>
                <div className="rounded-panel border border-blue/20 bg-white p-7 sm:p-8">
                  <span className="mb-4 inline-flex items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-blue">
                    <Check size={15} strokeWidth={2.4} aria-hidden="true" /> YOnLab Approach
                  </span>
                  <p className="break-keep font-sans text-[17px] font-semibold leading-[1.6] text-navy">{detail.challenge.solution}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Product categories + products */}
        <section className="border-t border-line bg-surface px-6 py-16 sm:px-14 lg:py-24">
          <div className="mx-auto max-w-content">
            <div data-reveal className="mb-8 max-w-[720px]">
              <Eyebrow className="mb-5">Products</Eyebrow>
              <h2 className="break-keep font-sans text-[26px] font-extrabold leading-[1.2] tracking-[-0.02em] text-navy sm:text-[34px]">
                제품 카테고리
              </h2>
            </div>
            {/* Category labels (documented domains) */}
            <div data-reveal className="mb-10 flex flex-wrap gap-2.5">
              {partnerCategories.map((c) => (
                <span key={c} className="rounded-lg border border-line bg-white px-4 py-2.5 font-sans text-[15px] font-semibold text-navy">
                  {c}
                </span>
              ))}
            </div>

            {partnerProducts.length > 0 ? (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {partnerProducts.map((p) => (
                  <li key={p.name} className="flex flex-col rounded-panel border border-line bg-white p-6">
                    {/* Partner logo placeholder */}
                    <div className="mb-4 flex h-10 items-center text-[12px] font-bold uppercase tracking-[0.1em] text-faint">
                      {p.partner}
                    </div>
                    <span className="mb-1 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-blue">{p.category}</span>
                    <h3 className="mb-2 font-sans text-[18px] font-bold text-navy">{p.name}</h3>
                    <p className="mb-4 break-keep font-sans text-[14.5px] leading-[1.6] text-muted">{p.oneLine}</p>
                    <span className="mb-5 break-keep font-sans text-[13px] text-faint">적용 분야 · {p.application}</span>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-flex items-center gap-1.5 font-sans text-[14px] font-semibold text-blue"
                      >
                        View Details
                        <ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div data-reveal>
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-44 rounded-panel border border-dashed border-line bg-white/60" />
                  ))}
                </div>
                <TodoNote>
                  파트너사 · 제품명 · 로고 · 주요 기능 등 제품 정보가 현재 기획서에 없어 임의로
                  생성하지 않았습니다. 파트너/제품 데이터가 확보되면 `partnerProducts` 배열에 추가되어
                  카드가 자동 렌더링됩니다.
                </TodoNote>
              </div>
            )}
          </div>
        </section>

        {/* Provision & Support */}
        <section className="border-t border-line bg-white px-6 py-16 sm:px-14 lg:py-20">
          <div className="mx-auto max-w-content">
            <div data-reveal className="mb-8 max-w-[720px]">
              <Eyebrow className="mb-5">Provision & Support</Eyebrow>
              <h2 className="break-keep font-sans text-[26px] font-extrabold leading-[1.2] tracking-[-0.02em] text-navy sm:text-[34px]">
                제공 · 기술 지원 방식
              </h2>
            </div>
            <div data-reveal className="max-w-[720px]">
              <TodoNote>
                YOnLab-파트너 간 구체적인 제공·협력·기술 지원 방식은 현재 기획서에 상세가 없어 확보 후
                반영 예정입니다. (문서 기준: 로보틱스/Automotive 등 파트너 솔루션의 실행·검증·상용화 지원)
              </TodoNote>
            </div>
          </div>
        </section>

        {/* Related Capabilities */}
        <section className="border-t border-line bg-surface px-6 py-16 sm:px-14 lg:py-24">
          <div className="mx-auto max-w-content">
            <div data-reveal className="mb-10 max-w-[560px]">
              <Eyebrow className="mb-5">Related Capabilities</Eyebrow>
              <h2 className="mb-5 break-keep font-sans text-[26px] font-extrabold leading-[1.2] tracking-[-0.02em] text-navy sm:text-[34px]">
                이 솔루션을 뒷받침하는 역량
              </h2>
              <p className="break-keep font-sans text-[16px] leading-[1.7] text-muted">
                Solution은 고객에게 제공하는 해결 방식이며, Capability는 이를 가능하게 하는 기술과
                수행 역량입니다.
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {caps.map((cap) => (
                <li key={cap.n} data-reveal>
                  <Card href={cap.href}>
                    <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-sky-light">
                      <Icon name={cap.icon} size={22} />
                    </span>
                    <h3 className="mb-2 font-sans text-[18px] font-bold tracking-[-0.01em] text-white">{cap.title}</h3>
                    <p className="mb-7 break-keep font-sans text-[14.5px] leading-[1.6] text-white/60">{cap.description}</p>
                    <CardCta label="역량 보기" />
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <OtherSolutions currentSlug="partner-products" />
        <ContactCta showPipeline={false} />
      </main>
      <Footer />
    </>
  );
}

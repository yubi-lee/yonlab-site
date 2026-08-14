import type { Metadata } from "next";
import { RevealProvider } from "@/components/RevealProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactCta } from "@/components/sections/ContactCta";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { CardCta } from "@/components/ui/CardCta";
import { Tag } from "@/components/ui/Tag";
import { Icon } from "@/components/icons";
import { capabilities, capabilitiesSubline } from "@/lib/content";

export const metadata: Metadata = {
  title: "Capabilities — YOnLab",
  description: capabilitiesSubline,
};

export default function CapabilitiesPage() {
  return (
    <>
      <RevealProvider />
      <Header />
      <main id="main">
        <PageHero
          eyebrow="Capabilities"
          title="디바이스 위에서 AI를 구현·검증·운영하는 역량"
          description={capabilitiesSubline}
        />

        {/* Capability grid */}
        <section className="border-t border-line bg-surface px-6 py-16 sm:px-14 lg:py-24">
          <div className="mx-auto max-w-content">
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((cap, i) => (
                <li key={cap.slug} data-reveal style={{ transitionDelay: `${0.05 * i}s` }}>
                  <Card href={cap.href}>
                    <div className="mb-5 flex items-center justify-between">
                      <span className="font-sans text-[15px] font-extrabold tabular-nums text-white/30 transition-colors duration-300 group-hover:text-white/70">
                        {cap.n}
                      </span>
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-sky-light">
                        <Icon name={cap.icon} size={24} />
                      </span>
                    </div>
                    <h2 className="mb-2 font-sans text-[21px] font-bold tracking-[-0.01em] text-white">
                      {cap.title}
                    </h2>
                    <p className="mb-5 break-keep font-sans text-[15px] leading-[1.6] text-white/60">
                      {cap.description}
                    </p>
                    <div className="mb-7 flex flex-wrap gap-1.5">
                      {cap.tags.map((t) => (
                        <Tag key={t} dark>
                          {t}
                        </Tag>
                      ))}
                    </div>
                    <CardCta label="자세히 보기" />
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <ContactCta showPipeline={false} />
      </main>
      <Footer />
    </>
  );
}

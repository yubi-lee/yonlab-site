import type { Metadata } from "next";
import { RevealProvider } from "@/components/RevealProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactCta } from "@/components/sections/ContactCta";
import { SolutionsHero } from "@/components/sections/solutions/SolutionsHero";
import { SolutionOverview } from "@/components/sections/solutions/SolutionOverview";
import { SolutionsWorkflow } from "@/components/sections/solutions/SolutionsWorkflow";
import { RelatedCapabilities } from "@/components/sections/solutions/RelatedCapabilities";

export const metadata: Metadata = {
  title: "Solutions — YOnLab",
  description:
    "현장에 배포되는 실제 AI 엔지니어링 플랫폼 — Private AI Platform, Berrywatch, AI OCC, Validation Automation, Partner Products. YOnLab이 만드는 제품들.",
};

export default function SolutionsPage() {
  return (
    <>
      <RevealProvider />
      <Header />
      <main id="main">
        <SolutionsHero />
        <SolutionOverview />
        <SolutionsWorkflow />
        <RelatedCapabilities />
        <ContactCta showPipeline={false} />
      </main>
      <Footer />
    </>
  );
}

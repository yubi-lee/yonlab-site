import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RevealProvider } from "@/components/RevealProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactCta } from "@/components/sections/ContactCta";
import { CapabilityDetailTemplate } from "@/components/sections/capability-detail/CapabilityDetailTemplate";
import { OtherCapabilities } from "@/components/sections/capability-detail/OtherCapabilities";
import { getCapabilityDetail, capabilitySlugs } from "@/lib/capabilities";

export function generateStaticParams() {
  return capabilitySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const capability = getCapabilityDetail(slug);
  if (!capability) return { title: "Capabilities — YOnLab" };
  return {
    title: `${capability.title} — YOnLab Capabilities`,
    description: capability.description,
  };
}

export default async function CapabilityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const capability = getCapabilityDetail(slug);
  if (!capability) notFound();

  return (
    <>
      <RevealProvider />
      <Header />
      <main id="main">
        <CapabilityDetailTemplate capability={capability} />
        <OtherCapabilities currentSlug={slug} />
        <ContactCta showPipeline={false} />
      </main>
      <Footer />
    </>
  );
}

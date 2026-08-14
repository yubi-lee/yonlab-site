import { RevealProvider } from "@/components/RevealProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { HomeBento } from "@/components/sections/HomeBento";
import { WhyYonlab } from "@/components/sections/WhyYonlab";
import { CoreCapabilities } from "@/components/sections/CoreCapabilities";
import { Solutions } from "@/components/sections/Solutions";
import { ClosingCta } from "@/components/sections/ClosingCta";

/**
 * Home — navy hero → intro bento → problem/solution → capabilities → products
 * → dark close.
 */
export default function Home() {
  return (
    <>
      <RevealProvider />
      <Header />
      <main id="main">
        {/* Navy hero — signature verification-loop diagram */}
        <Hero />

        {/* Positioning statement + bento (integration + multi-chipset coverage) */}
        <HomeBento />

        {/* Editorial problem → solution */}
        <WhyYonlab />

        {/* Capabilities grid inside a floating container */}
        <CoreCapabilities />

        {/* Product solutions — selector + large preview */}
        <Solutions />

        {/* Full-bleed closing scene — statement + contact */}
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}

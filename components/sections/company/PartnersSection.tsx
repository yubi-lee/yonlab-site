import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { partnersIntro, partnerLogos, companySectionIds } from "@/lib/company";

/**
 * Partners — placeholder until official logos exist (no invented brands).
 * When `partnerLogos` is populated the same grid renders the real logos.
 */
export function PartnersSection() {
  const hasLogos = partnerLogos.length > 0;

  return (
    <section
      id={companySectionIds.partners}
      className="relative scroll-mt-24 border-t border-line bg-surface px-6 py-20 sm:px-14 lg:py-[120px]"
    >
      <div className="mx-auto max-w-content">
        <div data-reveal className="mb-12 max-w-[720px]">
          <Eyebrow className="mb-6">{partnersIntro.eyebrow}</Eyebrow>
          <h2 className="mb-5 font-sans text-[28px] font-extrabold leading-[1.2] tracking-[-0.02em] text-navy sm:text-[36px]">
            {partnersIntro.title}
          </h2>
          <p className="max-w-[560px] font-sans text-[17px] leading-[1.7] text-muted">
            {partnersIntro.description}
          </p>
        </div>

        {hasLogos ? (
          <ul
            data-reveal
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            {partnerLogos.map((logo) => (
              <li
                key={logo.name}
                className="flex h-24 items-center justify-center rounded-xl border border-line bg-white p-6"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={140}
                  height={40}
                  className="max-h-10 w-auto object-contain"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div data-reveal>
            <div
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
              aria-hidden="true"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 rounded-xl border border-dashed border-line bg-white/60"
                />
              ))}
            </div>
            <p className="mt-6 font-sans text-[14px] font-medium text-faint">
              Partners will be updated.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

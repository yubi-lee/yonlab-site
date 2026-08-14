import { Eyebrow } from "@/components/ui/Eyebrow";
import { companyMessage, companySectionIds } from "@/lib/company";

/**
 * Company message (not a personal CEO message — no name/photo invented).
 * Quote-style editorial; structured so a representative's name/role can be added later.
 */
export function CompanyMessage() {
  return (
    <section
      id={companySectionIds.message}
      className="relative scroll-mt-24 border-t border-line bg-white px-6 py-20 sm:px-14 lg:py-[120px]"
    >
      <div className="mx-auto max-w-content">
        <div data-reveal className="mb-8">
          <Eyebrow>{companyMessage.eyebrow}</Eyebrow>
        </div>

        <figure data-reveal style={{ transitionDelay: ".06s" }} className="relative">
          {/* decorative quote accent */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-2 -top-10 select-none font-sans text-[120px] font-extrabold leading-none text-line-deco/40 sm:-top-14 sm:text-[160px]"
          >
            &ldquo;
          </span>
          <blockquote className="relative">
            <h2 className="mb-8 max-w-[900px] whitespace-pre-line font-sans text-[28px] font-extrabold leading-[1.25] tracking-[-0.02em] text-navy sm:text-[38px]">
              {companyMessage.title}
            </h2>
            <div className="flex max-w-[720px] flex-col gap-4">
              {companyMessage.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="font-sans text-[17px] leading-[1.8] text-muted"
                >
                  {p}
                </p>
              ))}
            </div>
          </blockquote>
          <figcaption className="mt-8 flex items-center gap-3">
            <span className="h-px w-8 bg-line" />
            <span className="font-sans text-[15px] font-bold text-navy">
              {companyMessage.signature}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

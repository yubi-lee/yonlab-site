import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import type { LegalBlock, LegalDoc } from "@/lib/legal";

/**
 * Document shell for the legal pages (/privacy, /terms). Deliberately plain:
 * a quiet ice-blue masthead, then a single measured text column. No cards, no
 * illustration, no motion — the copy is the page.
 *
 * The shared `ui/PageHero` is used by five other routes, so this page keeps its
 * own inline masthead rather than changing it (same approach as /contact).
 */

function Blocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "ul") {
          return (
            <ul key={i} className="mt-4 flex flex-col gap-3 first:mt-0">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.62em] h-1 w-1 shrink-0 rounded-full bg-blue"
                  />
                  <span className="font-kr break-keep font-sans text-[15.5px] leading-[1.8] text-muted lg:text-[16px]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "mail") {
          return (
            <p
              key={i}
              className="font-kr mt-4 break-keep font-sans text-[15.5px] leading-[1.8] text-muted first:mt-0 lg:text-[16px]"
            >
              {block.label}:{" "}
              <Link
                href={`mailto:${block.email}`}
                className="font-semibold text-blue underline-offset-4 hover:underline"
              >
                {block.email}
              </Link>
            </p>
          );
        }
        return (
          <p
            key={i}
            className="font-kr mt-4 break-keep font-sans text-[15.5px] leading-[1.8] text-muted first:mt-0 lg:text-[16px]"
          >
            {block.text}
          </p>
        );
      })}
    </>
  );
}

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Header />
      <main id="main">
        {/* ------------------------------------------------- Masthead */}
        {/* Title, English title and effective date only. */}
        <section
          className="relative overflow-hidden border-b border-line px-6 pb-14 pt-16 sm:px-14 lg:pb-20 lg:pt-24"
          style={{ background: "linear-gradient(180deg,#F7FAFF 0%,#FFFFFF 100%)" }}
        >
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.035]" />
          <div className="relative mx-auto max-w-[820px]">
            <h1 className="mb-3 break-keep font-sans text-[34px] font-extrabold leading-[1.1] tracking-[-0.035em] text-navy sm:text-[42px] lg:text-[48px]">
              {doc.title}
            </h1>
            <p className="font-sans text-[15px] font-bold uppercase tracking-[0.14em] text-faint lg:text-[16px]">
              {doc.titleEn}
            </p>
            <span aria-hidden="true" className="mt-7 block h-px w-16 bg-blue" />
            {/* Real spaces around the separator, not just margins, so the line
                reads correctly when copied or announced by a screen reader. */}
            <p className="mt-6 font-sans text-[14px] font-semibold tracking-[-0.01em] text-muted lg:text-[15px]">
              <span className="uppercase tracking-[0.14em] text-faint">시행일</span>{" "}
              <span aria-hidden="true" className="mx-1.5 text-line-deco">
                |
              </span>{" "}
              <span className="text-navy">{doc.effectiveDate}</span>
            </p>
          </div>
        </section>

        {/* ----------------------------------------------------- Body */}
        <section className="bg-white px-6 py-16 sm:px-14 lg:py-24">
          <div className="mx-auto max-w-[820px]">
            <p className="font-kr break-keep font-sans text-[16.5px] leading-[1.85] text-ink lg:text-[17.5px]">
              {doc.intro}
            </p>

            <div className="mt-14 flex flex-col gap-12 lg:mt-16 lg:gap-14">
              {doc.sections.map((section) => (
                <section key={section.n} className="border-t border-line-soft pt-8 lg:pt-9">
                  {/* Inline flow (not flex) keeps a literal space between the
                      number and the title in the text itself. */}
                  <h2 className="mb-5 break-keep font-sans text-[19px] font-extrabold leading-[1.35] tracking-[-0.02em] text-navy lg:text-[21px]">
                    <span className="tabular-nums text-blue">{section.n}.</span>{" "}
                    {section.title}
                  </h2>
                  <Blocks blocks={section.blocks} />
                </section>
              ))}
            </div>

            <p className="mt-16 border-t border-line pt-8 font-sans text-[13.5px] font-semibold tracking-[-0.005em] text-faint lg:mt-20">
              {doc.imprint}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

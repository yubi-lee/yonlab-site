import Link from "next/link";
import { FileText } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { contactEmail } from "@/lib/content";

/**
 * Shared legal page shell. The actual legal text is not authored here (must not
 * be invented) — a clear "in preparation" notice + contact is shown instead.
 */
export function LegalPage({ title }: { title: string }) {
  return (
    <>
      <Header />
      <main id="main">
        <PageHero eyebrow="Legal" title={title} />
        <section className="border-t border-line bg-white px-6 py-20 sm:px-14 lg:py-28">
          <div className="mx-auto max-w-content">
            <div className="flex max-w-[640px] items-start gap-4 rounded-2xl border border-line bg-surface p-8">
              <FileText
                size={22}
                strokeWidth={1.7}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-blue"
              />
              <div>
                <p className="mb-3 break-keep font-sans text-[17px] font-semibold leading-[1.6] text-navy">
                  정식 문서를 준비 중입니다.
                </p>
                <p className="break-keep font-sans text-[15px] leading-[1.7] text-muted">
                  관련 문의는{" "}
                  <Link
                    href={`mailto:${contactEmail}`}
                    className="font-semibold text-blue"
                  >
                    {contactEmail}
                  </Link>{" "}
                  로 연락 주세요.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

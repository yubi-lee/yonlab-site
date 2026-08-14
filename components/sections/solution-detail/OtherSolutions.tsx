import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { getOtherSolutions } from "@/lib/solutions";

/** Compact navigation to the other solutions (current one excluded). */
export function OtherSolutions({ currentSlug }: { currentSlug: string }) {
  const others = getOtherSolutions(currentSlug);
  return (
    <section className="border-t border-line bg-surface px-6 py-16 sm:px-14 lg:py-20">
      <div className="mx-auto max-w-content">
        <Eyebrow className="mb-8">Other Solutions</Eyebrow>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {others.map((s) => (
            <li key={s.slug}>
              <Link
                href={s.href}
                className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-white px-5 py-4 transition-colors duration-200 hover:border-navy"
              >
                <span className="flex min-w-0 flex-col">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-faint">
                    {s.category}
                  </span>
                  <span className="truncate font-sans text-[16px] font-bold text-navy">
                    {s.title}
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="shrink-0 text-idle transition-[color,transform] duration-200 group-hover:translate-x-0.5 group-hover:text-blue"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/icons";
import { getOtherCapabilities } from "@/lib/capabilities";

/** Compact navigation to the other capabilities (current one excluded). */
export function OtherCapabilities({ currentSlug }: { currentSlug: string }) {
  const others = getOtherCapabilities(currentSlug);
  return (
    <section className="border-t border-line bg-surface px-6 py-16 sm:px-14 lg:py-20">
      <div className="mx-auto max-w-content">
        <Eyebrow className="mb-8">Other Capabilities</Eyebrow>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {others.map((c) => (
            <li key={c.slug}>
              <Link
                href={c.href}
                className="group flex items-center gap-4 rounded-xl border border-line bg-white px-5 py-4 transition-colors duration-200 hover:border-navy"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-navy transition-colors duration-200 group-hover:text-blue">
                  <Icon name={c.icon} size={20} />
                </span>
                <span className="min-w-0 flex-1 truncate font-sans text-[16px] font-bold text-navy">
                  {c.title}
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

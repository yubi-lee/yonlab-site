import { companyStats } from "@/lib/company";

/**
 * Capability highlights band — is-soft-style KPI strip on a navy field:
 * English category kicker, oversized value, Korean descriptor, divided columns.
 * Brief-sourced metrics only (no unverifiable numbers).
 */
export function CompanyStats() {
  return (
    <section className="relative overflow-hidden bg-navy px-6 py-16 sm:px-14 lg:py-24">
      <div className="blueprint-grid-light pointer-events-none absolute inset-0 opacity-[0.04]" />
      <div className="relative mx-auto max-w-content">
        <ul className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 md:gap-x-0">
          {companyStats.map((stat) => (
            <li
              key={stat.value}
              data-reveal
              className="flex flex-col md:border-l md:border-white/15 md:pl-8 md:first:border-l-0 md:first:pl-0"
            >
              <span className="mb-3 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-sky">
                {stat.kicker}
              </span>
              <span className="break-keep font-sans text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-white sm:text-[44px] lg:text-[52px]">
                {stat.value}
              </span>
              <span className="mt-3 break-keep font-sans text-[15px] leading-snug text-white/70">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import { contactTypes } from "@/lib/content";
import { typeIcons } from "@/components/sections/contactMeta";

/**
 * Inquiry-type reference list for the left info column.
 * Icon + Title + short description, editorial vertical list. Subtle hover only.
 */
export function ContactTypeList() {
  return (
    <div>
      <h3 className="mb-5 font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-faint">
        문의 유형
      </h3>
      <ul className="flex flex-col gap-3">
        {contactTypes.map((t) => {
          const IconComp = typeIcons[t.id];
          return (
            <li
              key={t.id}
              className="group flex items-center gap-3.5 rounded-xl border border-line p-4 transition-colors duration-200 hover:border-navy"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-navy transition-colors duration-200 group-hover:text-blue">
                <IconComp size={19} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="font-sans text-[15px] font-bold leading-tight text-navy">
                  {t.label}
                </span>
                <span className="font-sans text-[13.5px] leading-snug text-muted">
                  {t.desc}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

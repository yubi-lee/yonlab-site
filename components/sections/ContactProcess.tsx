import { Fragment } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { contactProcess } from "@/lib/content";
import { processIcons } from "@/components/sections/contactMeta";

/**
 * Simple inquiry flow: Inquiry → Review → Discussion → Response.
 * Horizontal on desktop, vertical on mobile. No heavy animation.
 */
function Node({ id, label, desc }: { id: string; label: string; desc: string }) {
  const IconComp = processIcons[id as keyof typeof processIcons];
  return (
    <div className="flex flex-1 items-center gap-4 md:flex-col md:items-center md:gap-3 md:text-center">
      <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-white text-navy">
        <IconComp size={24} strokeWidth={1.7} aria-hidden="true" />
      </span>
      <span className="flex flex-col gap-1 md:items-center">
        <span className="font-sans text-[15px] font-bold text-navy">{label}</span>
        <span className="font-sans text-[13.5px] text-muted">{desc}</span>
      </span>
    </div>
  );
}

export function ContactProcess() {
  return (
    <div className="rounded-panel border border-line-soft bg-surface/50 p-8 sm:p-10">
      <h2 className="mb-8 font-sans text-[12px] font-bold uppercase tracking-[0.12em] text-faint">
        문의 진행 절차
      </h2>
      <ol className="flex flex-col gap-4 md:flex-row md:items-start md:gap-2">
        {contactProcess.map((step, i) => (
          <Fragment key={step.id}>
            <li className="md:flex-1">
              <Node id={step.id} label={step.label} desc={step.desc} />
            </li>
            {i < contactProcess.length - 1 && (
              <li
                aria-hidden="true"
                className="flex justify-center text-idle md:mt-4 md:items-start md:pt-1"
              >
                <ArrowDown size={18} className="md:hidden" />
                <ArrowRight size={18} className="hidden md:block" />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </div>
  );
}

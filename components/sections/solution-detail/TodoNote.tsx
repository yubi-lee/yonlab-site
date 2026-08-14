import { Info } from "lucide-react";

/** Visible placeholder for content the project docs do not yet define. */
export function TodoNote({ children }: { children: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-dashed border-line bg-surface/60 p-5">
      <Info size={18} strokeWidth={1.7} aria-hidden="true" className="mt-0.5 shrink-0 text-faint" />
      <p className="break-keep font-sans text-[14px] leading-[1.6] text-muted">
        <span className="font-bold text-navy">TODO · 콘텐츠 확인 필요 </span>
        {children}
      </p>
    </div>
  );
}

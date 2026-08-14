import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Disciplined card footer (Qualcomm-enterprise style): a full-width top hairline
 * pinned to the bottom of the card, then the CTA label on the left and an arrow
 * on the right that nudges forward on group hover. Sits inside a dark `Card`.
 */
export function CardCta({ label, className }: { label: string; className?: string }) {
  return (
    <span
      className={cn(
        "mt-auto flex items-center border-t border-white/10 pt-5 font-sans text-[14px] font-semibold text-sky-light",
        className,
      )}
    >
      {label}
      <ArrowRight
        size={15}
        strokeWidth={1.8}
        aria-hidden="true"
        className="ml-auto transition-transform duration-200 group-hover:translate-x-1"
      />
    </span>
  );
}

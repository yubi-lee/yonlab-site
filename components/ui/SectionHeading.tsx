import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  /** Giant outlined index behind the title, e.g. "01". */
  index: string;
  title: string;
  className?: string;
  /** Slightly softer outline opacity variant used on the Capabilities/Solutions headers. */
  faint?: boolean;
}

/** Section title with the oversized outlined index number behind it. */
export function SectionHeading({
  index,
  title,
  className,
  faint = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("relative", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "outline-index pointer-events-none absolute -left-[10px] -top-[64px] font-sans text-[120px] font-extrabold leading-none sm:-top-[90px] sm:text-[170px] lg:-top-[112px] lg:text-[210px]",
          faint ? "opacity-[0.06]" : "opacity-[0.07]",
        )}
      >
        {index}
      </span>
      <h2 className="relative m-0 break-keep font-sans text-[42px] font-extrabold leading-[0.98] tracking-[-0.04em] text-navy sm:text-[52px] lg:text-[68px]">
        {title}
      </h2>
    </div>
  );
}

import { cn } from "@/lib/cn";

interface TagProps {
  children: string;
  /** Dark variant (.ytagd) for use on navy panels. */
  dark?: boolean;
  className?: string;
}

/** Small label / pill. Light variant for cards, dark for navy surfaces. */
export function Tag({ children, dark = false, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-md font-sans text-[13px] font-semibold leading-none",
        dark
          ? "border border-white/[0.18] bg-white/[0.08] px-[11px] py-[7px] text-white/80"
          : "border border-line-card bg-surface px-[9px] py-[6px] text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

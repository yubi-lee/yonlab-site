import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: string;
  className?: string;
  /** Light variant for dark backgrounds. */
  onDark?: boolean;
}

/** Blue dot + uppercase kicker label. Shared across Company sections. */
export function Eyebrow({ children, className, onDark = false }: EyebrowProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="h-[7px] w-[7px] rounded-full bg-blue" />
      <span
        className={cn(
          "font-sans text-[12.5px] font-semibold uppercase leading-none tracking-[0.16em]",
          onDark ? "text-white/70" : "text-faint",
        )}
      >
        {children}
      </span>
    </span>
  );
}

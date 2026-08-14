import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Qualcomm-style category badge — a small uppercase pill used at the top of
 * cards to label a category. `dark` = for the dark Card surface (sky accent);
 * `light` = for light surfaces (muted on surface).
 */
export function Badge({
  children,
  tone = "dark",
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 font-sans text-[10.5px] font-bold uppercase leading-none tracking-[0.12em]",
        tone === "dark"
          ? "border-sky/30 bg-sky/[0.08] text-sky-light"
          : "border-line bg-surface text-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface CtaLinkProps {
  href: string;
  children: string;
  className?: string;
  /** Blue is the default (matches "Learn More"); pass a color class to override. */
  colorClassName?: string;
}

/**
 * Text link with a trailing arrow whose gap grows on hover (.ymore / .ymore2).
 * Uses `group` so the arrow nudges right with the label.
 */
export function CtaLink({
  href,
  children,
  className,
  colorClassName = "text-blue",
}: CtaLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-[7px] font-sans text-sm font-semibold transition-[gap] duration-200 hover:gap-[11px]",
        colorClassName,
        className,
      )}
    >
      {children}
      <ArrowRight
        size={14}
        strokeWidth={1.7}
        aria-hidden="true"
        className="transition-transform"
      />
    </Link>
  );
}

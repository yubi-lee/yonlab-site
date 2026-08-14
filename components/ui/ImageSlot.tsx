import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/cn";

interface ImageSlotProps {
  /** Descriptive label of what screenshot belongs here (Korean, from design). */
  placeholder: string;
  /** CSS aspect-ratio value, e.g. "16 / 10". */
  ratio: string;
  /** Real screenshot in /public. Null / omitted → the labelled empty state. */
  src?: string | null;
  /** Responsive sizes hint for the real image. */
  sizes?: string;
  /** Dark variant for the navy console mockup. */
  dark?: boolean;
  className?: string;
}

/**
 * Image region inside a product mockup frame. Renders the real screenshot when
 * one exists, otherwise a labelled empty state so the team can drop screenshots
 * in later (never a bare gray box, never an invented UI).
 *
 * Screenshots are `object-contain`: the slot ratio is fixed so switching
 * solutions never resizes the card, and cropping a product UI would cut off
 * real interface. The letterbox sits on the frame's own surface, so it reads as
 * window padding rather than a gap.
 */
export function ImageSlot({
  placeholder,
  ratio,
  src,
  sizes = "(max-width: 768px) 90vw, (max-width: 1024px) 70vw, 620px",
  dark = false,
  className,
}: ImageSlotProps) {
  if (src) {
    return (
      <div
        style={{ aspectRatio: ratio }}
        className={cn(
          "relative w-full",
          dark ? "bg-[#0A2461]" : "bg-white",
          className,
        )}
      >
        <Image src={src} alt={placeholder} fill sizes={sizes} className="object-contain" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${placeholder} (준비 중인 이미지 영역)`}
      style={{ aspectRatio: ratio }}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2 text-center",
        dark
          ? "bg-[#0A2461] text-white/45"
          : "bg-[repeating-linear-gradient(135deg,#F7FAFF_0,#F7FAFF_11px,#F1F6FF_11px,#F1F6FF_22px)] text-faint",
        className,
      )}
    >
      <ImageIcon
        size={26}
        strokeWidth={1.5}
        aria-hidden="true"
        className={dark ? "text-white/40" : "text-line-deco"}
      />
      <span className="px-4 font-sans text-[12.5px] font-medium leading-snug">
        {placeholder}
      </span>
    </div>
  );
}

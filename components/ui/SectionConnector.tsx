interface SectionConnectorProps {
  /** Background color of the small node dot (match the section surface). */
  dotBg?: string;
}

/** Top-center dot + fading vertical line that visually stitches sections together. */
export function SectionConnector({ dotBg = "#fff" }: SectionConnectorProps) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-0 z-[1] flex -translate-x-1/2 flex-col items-center"
    >
      <span
        className="h-[7px] w-[7px] rounded-full border-[1.5px] border-line-deco"
        style={{ background: dotBg }}
      />
      <span className="h-[46px] w-px bg-gradient-to-b from-line-deco to-transparent" />
    </span>
  );
}

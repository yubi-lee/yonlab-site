import type { ReactNode, SVGProps } from "react";

/**
 * Brand icon set — stroke-based, reproduced 1:1 from the design-source prototype
 * (viewBox 0 0 32 32, stroke-width 1.6, round caps/joins). Color follows
 * `currentColor` so the same icon adapts to navy-on-light and white-on-navy.
 * Generic UI glyphs (arrows, chevrons, social, menu) use lucide-react instead.
 */

export type IconName =
  | "chip"
  | "layers"
  | "checkCircle"
  | "gauge"
  | "nodes"
  | "shieldCheck"
  | "mapPin"
  | "monitor"
  | "docCheck"
  | "factory"
  | "car"
  | "robot"
  | "government"
  | "optimize"
  | "runtime"
  | "check";

const paths: Record<IconName, ReactNode> = {
  chip: (
    <>
      <rect x="9" y="9" width="14" height="14" rx="2" />
      <rect x="13" y="13" width="6" height="6" rx="1" />
      <path d="M12 9V5M20 9V5M12 23v4M20 23v4M9 12H5M9 20H5M23 12h4M23 20h4" />
    </>
  ),
  layers: (
    <>
      <rect x="6" y="7" width="20" height="5" rx="2" />
      <rect x="6" y="14" width="20" height="5" rx="2" />
      <rect x="6" y="21" width="20" height="5" rx="2" />
    </>
  ),
  checkCircle: (
    <>
      <circle cx="16" cy="16" r="10" />
      <path d="M11.5 16.5 L15 20 L21 12" />
    </>
  ),
  gauge: (
    <>
      <path d="M7 22 A9 9 0 0 1 25 22" />
      <line x1="16" y1="22" x2="21.5" y2="14.5" />
      <circle cx="16" cy="22" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  nodes: (
    <>
      <circle cx="11" cy="12" r="4" />
      <circle cx="22" cy="20" r="4" />
      <line x1="14.2" y1="14.2" x2="18.8" y2="17.8" />
    </>
  ),
  shieldCheck: (
    <>
      <path d="M16 5l10 4v6c0 6-4 10-10 12C10 25 6 21 6 15V9z" />
      <path d="M12 15l3 3 6-6" />
    </>
  ),
  mapPin: (
    <>
      <path d="M16 4a8 8 0 0 0-8 8c0 6 8 16 8 16s8-10 8-16a8 8 0 0 0-8-8" />
      <path d="M16 9a3 3 0 1 0 0 6a3 3 0 0 0 0-6" />
    </>
  ),
  monitor: (
    <>
      <path d="M5 7h22v14H5z" />
      <path d="M5 25h22" />
      <path d="M11 11h10M11 16h6" />
    </>
  ),
  docCheck: (
    <>
      <path d="M8 6h12l4 4v16H8z" />
      <path d="M20 6v4h4" />
      <path d="M12 16l2.5 2.5L19 14" />
    </>
  ),
  factory: (
    <>
      <path d="M4 27h24" />
      <path d="M6 27V13l7-4v6l7-4v16" />
      <path d="M13 15v4M20 15v4M9 21v2" />
    </>
  ),
  car: (
    <>
      <path d="M5 20l2-6a3 3 0 0 1 3-2h12a3 3 0 0 1 3 2l2 6" />
      <path d="M4 20h24v4a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-1H9v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="M8 20.5h1M23 20.5h1" />
    </>
  ),
  robot: (
    <>
      <path d="M16 6v3" />
      <path d="M9 9h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1z" />
      <path d="M13 14h0.01M19 14h0.01" />
      <path d="M5 13v5M27 13v5" />
    </>
  ),
  government: (
    <>
      <path d="M4 27h24" />
      <path d="M6 27V14M12 27V14M20 27V14M26 27V14" />
      <path d="M4 14h24" />
      <path d="M16 4l12 6H4z" />
    </>
  ),
  optimize: (
    <>
      <line x1="7" y1="10" x2="25" y2="10" />
      <circle cx="19" cy="10" r="3" />
      <line x1="7" y1="22" x2="25" y2="22" />
      <circle cx="13" cy="22" r="3" />
    </>
  ),
  runtime: (
    <>
      <rect x="10" y="10" width="12" height="12" rx="2" />
      <path d="M13 10V6M19 10V6M13 22v4M19 22v4M10 13H6M10 19H6M22 13h4M22 19h4" />
    </>
  ),
  check: <path d="M8 16.5l5.5 5.5L24 10.5" />,
};

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

export function Icon({
  name,
  size = 30,
  strokeWidth = 1.6,
  ...rest
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

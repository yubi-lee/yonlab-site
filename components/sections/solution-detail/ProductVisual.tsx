/**
 * Signature product visual — a premium dark card with a glowing generative
 * line-art "orb" (concentric arcs + a slowly rotating light sweep). Built from
 * lines only (no stock/AI imagery). Each solution gets a distinct light source
 * so the five pages don't look identical.
 */

interface ProductVisualProps {
  title: string;
  category: string;
  index: number;
}

const CONFIGS = [
  { gx: "50%", gy: "38%", a: [0, 0, 1, 1] },
  { gx: "30%", gy: "40%", a: [1, 0, 0, 1] },
  { gx: "70%", gy: "42%", a: [0, 1, 1, 0] },
  { gx: "50%", gy: "56%", a: [0.5, 0, 0.5, 1] },
  { gx: "42%", gy: "34%", a: [0, 0.2, 1, 0.8] },
];

const RADII = Array.from({ length: 16 }, (_, k) => 20 + k * 12);

export function ProductVisual({ title, category, index }: ProductVisualProps) {
  const cfg = CONFIGS[index % CONFIGS.length];
  const uid = `pv${index}`;
  // top-half arc path for a given radius, centered at origin
  const arc = (r: number) => `M ${-r} 0 A ${r} ${r} 0 0 1 ${r} 0`;

  return (
    <div
      className="relative mx-auto aspect-[4/3] w-full max-w-[560px] overflow-hidden rounded-[20px] border border-white/10 shadow-[0_30px_70px_rgba(0,12,40,0.45)]"
      style={{
        background:
          "radial-gradient(120% 120% at 50% -10%, #0A2E63 0%, #04142E 45%, #01060F 100%)",
      }}
    >
      <svg
        viewBox="0 0 480 360"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id={`core-${uid}`} cx={cfg.gx} cy={cfg.gy} r="55%">
            <stop offset="0%" stopColor="#4EA0FF" stopOpacity="0.55" />
            <stop offset="45%" stopColor="#1E5FCC" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#01060F" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={`arc-${uid}`}
            x1={cfg.a[0]}
            y1={cfg.a[1]}
            x2={cfg.a[2]}
            y2={cfg.a[3]}
          >
            <stop offset="0%" stopColor="#9DC8FF" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#4EA0FF" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#4EA0FF" stopOpacity="0" />
          </linearGradient>
          <filter id={`blur-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
        </defs>

        {/* core glow */}
        <rect className="glow-pulse" x="0" y="0" width="480" height="360" fill={`url(#core-${uid})`} />

        {/* static concentric structure */}
        <g transform="translate(240 184)">
          {RADII.map((r, k) => (
            <circle
              key={r}
              r={r}
              fill="none"
              stroke="#3C74C8"
              strokeWidth="1"
              opacity={0.5 - k * 0.022}
            />
          ))}
        </g>

        {/* rotating bright sweep (top arcs) */}
        <g transform="translate(240 184)" className="slow-spin">
          <g filter={`url(#blur-${uid})`}>
            {RADII.map((r) => (
              <path key={r} d={arc(r)} fill="none" stroke={`url(#arc-${uid})`} strokeWidth="1.8" />
            ))}
          </g>
        </g>
      </svg>

      {/* product mark + name */}
      <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
        <span className="inline-flex items-center gap-2.5">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-sky-light/70">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-light" />
          </span>
          <span className="font-sans text-[20px] font-bold tracking-[-0.01em] text-white sm:text-[24px]">
            {title}
          </span>
        </span>
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
          {category}
        </span>
      </div>
    </div>
  );
}

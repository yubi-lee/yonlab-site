/**
 * Hero "Runtime Architecture / Verification Loop" diagram.
 * Reproduced from the design-source prototype (viewBox 580x570). This full
 * diagram appears ONLY in the Hero. The animated verification loop + moving
 * signal dot are disabled under prefers-reduced-motion (see globals.css).
 */
export function HeroDiagram() {
  return (
    <svg
      viewBox="0 0 580 570"
      width="100%"
      className="block font-sans"
      role="img"
      aria-label="AI Model에서 On-Device Runtime, AI Validation으로 이어지는 런타임 아키텍처와 검증 루프 다이어그램"
    >
      <defs>
        <pattern id="dg2" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="#FFFFFF" opacity="0.06" />
        </pattern>
      </defs>
      <circle cx="330" cy="250" r="232" fill="none" stroke="#FFFFFF" strokeWidth="1.1" opacity="0.12" />
      <circle cx="330" cy="250" r="180" fill="none" stroke="#FFFFFF" strokeWidth="1.1" strokeDasharray="3 7" opacity="0.12" />
      <rect x="8" y="8" width="564" height="554" rx="16" fill="url(#dg2)" />
      <g stroke="rgba(255,255,255,0.24)" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M22 52 L22 22 L52 22" />
        <path d="M528 22 L558 22 L558 52" />
        <path d="M558 518 L558 548 L528 548" />
        <path d="M52 548 L22 548 L22 518" />
      </g>
      <g stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" fill="none">
        <line x1="300" y1="112" x2="300" y2="150" />
        <line x1="300" y1="196" x2="300" y2="252" />
        <line x1="300" y1="330" x2="300" y2="374" />
      </g>
      <g fill="rgba(255,255,255,0.45)">
        <circle cx="300" cy="112" r="2.4" />
        <circle cx="300" cy="150" r="2.4" />
        <circle cx="300" cy="196" r="2.4" />
        <circle cx="300" cy="252" r="2.4" />
        <circle cx="300" cy="330" r="2.4" />
        <circle cx="300" cy="374" r="2.4" />
      </g>
      <path
        d="M377 400 C 486 392, 512 224, 422 108"
        className="animate-yflow"
        fill="none"
        stroke="#4EA0FF"
        strokeWidth="1.6"
        strokeDasharray="4 5"
      />
      <circle className="hero-signal" r="3.2" fill="#4EA0FF">
        <animateMotion dur="3.2s" repeatCount="indefinite" path="M377 400 C 486 392, 512 224, 422 108" />
      </circle>
      <text x="498" y="258" fontSize="11" fontWeight="600" letterSpacing="0.08em" fill="#7DB4FF" transform="rotate(90 498 258)">
        VERIFICATION LOOP
      </text>
      <g stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" fill="none">
        <line x1="128" y1="290" x2="196" y2="290" />
      </g>
      <g fontSize="11.5" fontWeight="500" fill="rgba(255,255,255,0.78)">
        <rect x="38" y="258" width="86" height="24" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
        <text x="81" y="274" textAnchor="middle">NPU</text>
        <rect x="38" y="286" width="86" height="24" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
        <text x="81" y="302" textAnchor="middle">Chipset</text>
        <rect x="38" y="314" width="86" height="24" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
        <text x="81" y="330" textAnchor="middle">SDK</text>
      </g>
      <g>
        <rect x="220" y="62" width="160" height="50" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
        <text x="300" y="92" textAnchor="middle" fontSize="15" fontWeight="600" fill="#FFFFFF">AI Model</text>
      </g>
      <g>
        <rect x="225" y="150" width="150" height="46" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
        <text x="300" y="178" textAnchor="middle" fontSize="14" fontWeight="600" fill="#FFFFFF">AI Optimization</text>
      </g>
      <g>
        <rect x="196" y="252" width="208" height="78" rx="12" fill="rgba(255,255,255,0.09)" stroke="rgba(255,255,255,0.55)" strokeWidth="1.6" />
        <text x="300" y="286" textAnchor="middle" fontSize="17" fontWeight="700" fill="#FFFFFF">On-Device Runtime</text>
        <text x="300" y="309" textAnchor="middle" fontSize="12" fontWeight="500" fill="rgba(255,255,255,0.62)">실디바이스 실행 환경</text>
      </g>
      <g>
        <rect x="225" y="374" width="150" height="54" rx="10" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
        <circle cx="249" cy="401" r="9" fill="#016CFF" />
        <path d="M245 401.3 L248 404 L253.5 397.6" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="322" y="406" textAnchor="middle" fontSize="14.5" fontWeight="600" fill="#FFFFFF">AI Validation</text>
      </g>
      <g stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" fill="none">
        <line x1="300" y1="428" x2="300" y2="456" />
        <line x1="216" y1="456" x2="384" y2="456" />
        <line x1="216" y1="456" x2="216" y2="470" />
        <line x1="258" y1="456" x2="258" y2="470" />
        <line x1="300" y1="456" x2="300" y2="470" />
        <line x1="342" y1="456" x2="342" y2="470" />
        <line x1="384" y1="456" x2="384" y2="470" />
      </g>
      <g fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2">
        <rect x="203" y="470" width="26" height="26" rx="6" />
        <rect x="245" y="470" width="26" height="26" rx="6" />
        <rect x="287" y="470" width="26" height="26" rx="6" />
        <rect x="329" y="470" width="26" height="26" rx="6" />
        <rect x="371" y="470" width="26" height="26" rx="6" />
      </g>
      <g fill="rgba(255,255,255,0.4)">
        <circle cx="216" cy="483" r="2" />
        <circle cx="258" cy="483" r="2" />
        <circle cx="300" cy="483" r="2" />
        <circle cx="342" cy="483" r="2" />
        <circle cx="384" cy="483" r="2" />
      </g>
    </svg>
  );
}

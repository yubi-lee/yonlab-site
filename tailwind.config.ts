import type { Config } from "tailwindcss";

/**
 * YOnLab design tokens — mirrored from design-source/README.md (Source of Truth).
 * Color rule: `blue` (#016CFF) is used ONLY for CTAs and active/selected states.
 * Everything else in the hierarchy is `navy` (#001850).
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ground: "#EEF2FA", // clean soft page ground (onramper-style light sections)
        navy: "#001850", // primary — headings, hierarchy, dark surfaces, icons
        ink: "#071B45", // body emphasis / solution text
        blue: {
          DEFAULT: "#016CFF", // CTA / active only
          legacy: "#0068F8", // earlier accent — treat as equal to DEFAULT
          hover: "#003090", // a:hover text color
        },
        sky: {
          DEFAULT: "#4EA0FF", // diagram strokes / labels on navy
          light: "#7DB4FF",
        },
        surface: {
          DEFAULT: "#F7FAFF", // light section bg, mega preview, tag bg
          alt: "#EEF3FF", // layered mockup panel / gradient stop
          2: "#DCE7FF", // gradient stop
          3: "#E9F0FF", // gradient stop
        },
        line: {
          DEFAULT: "#D8E4F5", // default borders / dividers
          soft: "#E6EDF7", // card outlines
          card: "#E1EAF6", // tag border
          deco: "#C6D6EE", // decorative strokes
        },
        muted: "#4B5E83", // body copy / descriptions
        faint: "#8496B5", // captions, footer legal, eyebrow
        idle: "#AEBFDD", // idle index number
      },
      fontFamily: {
        // onramper-style tight grotesque feel: lead with Helvetica Neue for Latin
        // (Korean falls through to Pretendard / Noto Sans KR).
        sans: [
          "Helvetica Neue",
          "Arimo",
          "Inter",
          "Pretendard",
          "Noto Sans KR",
          "Arial",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: {
        // 3-tier width system for a wider, enterprise layout.
        wide: "1360px", // product / grid sections (Solutions bento, Capabilities)
        content: "1280px", // default section width (Hero inner, Why, Trust, Action, Footer)
        prose: "1120px", // centered prose / forms (Contact CTA, Contact form)
        "content-lg": "1360px", // legacy alias → wide
        hero: "1280px",
      },
      borderRadius: {
        panel: "24px", // solution product panels
        hero: "20px",
      },
      boxShadow: {
        // Softer, flatter shadows for a clean nextlab-style feel.
        card: "0 10px 28px rgba(0,24,80,0.09)", // card hover
        panel: "0 12px 34px rgba(0,24,80,0.06)", // solution panel
        "panel-hover": "0 16px 40px rgba(0,24,80,0.09)",
        caps: "0 14px 38px rgba(0,24,80,0.06)", // capabilities container
        cta: "0 6px 16px rgba(1,108,255,0.20)", // (legacy) cta hover
        mega: "0 12px 30px rgba(0,24,80,0.08)", // dropdown
        mockup: "0 14px 36px rgba(0,24,80,0.12)",
      },
      transitionTimingFunction: {
        reveal: "cubic-bezier(.16,.84,.44,1)",
      },
      keyframes: {
        yfade: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "none" },
        },
        yscroll: {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translateY(22px)", opacity: "0" },
        },
        yflow: {
          to: { strokeDashoffset: "-90" },
        },
        ydropin: {
          from: { opacity: "0", transform: "translateY(-6px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        yfade: "yfade .7s cubic-bezier(.16,.84,.44,1) both",
        yscroll: "yscroll 1.8s ease-in-out infinite",
        yflow: "yflow 2.6s linear infinite",
        ydropin: "ydropin .16s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;

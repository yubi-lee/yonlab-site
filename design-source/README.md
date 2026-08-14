# Handoff: YOnLab Website — Home Page

## Overview
This package documents the **Home page** of the YOnLab marketing website. YOnLab is a *Private Physical AI Engineering Company* — it makes AI verifiable, optimizable, and operable on real devices and in closed-network (on-premise) environments.

The Home page consists of these sections, top to bottom:

1. **Header + Mega Menu** (sticky-style top bar with Capabilities / Solutions dropdowns)
2. **Hero** (dark navy panel, oversized headline, engineering pipeline diagram)
3. **Why YOnLab** (editorial "Customer Challenge → YOnLab Solution" comparison, 5 rows)
4. **Core Capabilities** (5-card premium grid inside a floating white container on a light-blue surface)
5. **Trust Band** (dark navy — "주요 고객 / industries served": 제조업, 자동차, 로보틱스, 공공기관)
6. **Solutions** (product-first editorial showcase — 5 large alternating product panels with mockup frames)
7. **Action Showcase** (index list + image slots + detail, on a soft blue gradient surface)
8. **Contact CTA** (closing "Let's Build Physical AI Together." — Physical AI Pipeline diagram)
9. **Footer** (brand + 4 link columns + legal row)

This is the approved **"2A" direction**: a dark-navy Hero transitioning into a light body, with blue reserved for CTAs and active states and navy carrying the rest of the hierarchy.

---

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing the intended look, layout, and behavior. **They are not production code to copy directly.** They were authored in a lightweight in-house template runtime (`support.js`, `<x-dc>`, `<sc-for>`, `{{ }}` bindings) that will **not** exist in your codebase.

Your task is to **recreate these designs in the target codebase's environment** (React, Vue, Next.js, etc.) using its established component patterns, styling system, and conventions. If no front-end environment exists yet, choose an appropriate modern framework (React + a utility or CSS-module styling approach works well here) and implement there.

Treat the HTML as the source of truth for **visual spec** (exact colors, type, spacing, copy) and **interaction intent** — not as importable code.

## Fidelity
**High-fidelity (hifi).** Colors, typography, spacing, radii, shadows, hover/active states, and copy are all final and specified exactly below. Recreate the UI pixel-accurately using your codebase's libraries. All Korean and English copy is final — **do not paraphrase or invent new copy.**

---

## Design Tokens

### Colors
| Token | Hex | Usage |
|---|---|---|
| Navy (primary) | `#001850` | Headings, primary hierarchy, dark section backgrounds, icons |
| Navy text | `#071B45` | Body emphasis / solution text |
| On Blue (CTA/active) | `#016CFF` | **CTAs and active states only** (buttons, active nav, checkmarks, active number) |
| On Blue (legacy accent) | `#0068F8` | Earlier accent; treat as equal to `#016CFF`. Prefer `#016CFF` for new work |
| Blue hover (link) | `#003090` | `a:hover` text color |
| Light blue (accent on dark) | `#4EA0FF`, `#7DB4FF` | Diagram strokes / labels on navy backgrounds |
| Surface | `#F7FAFF` | Light section backgrounds, mega-menu preview card, tag backgrounds |
| Surface alt | `#EEF3FF`, `#DCE7FF`, `#E9F0FF` | Gradient stops for CTA / showcase surfaces, layered mockup panels |
| Line | `#D8E4F5` | Default borders / dividers |
| Line alt | `#E6EDF7`, `#E1EAF6`, `#C6D6EE` | Softer borders, card outlines, decorative strokes |
| Muted text | `#4B5E83` | Body copy, descriptions |
| Faint text | `#8496B5` | Captions, footer legal, eyebrow labels |
| Idle number | `#AEBFDD` | Card/row index numbers before hover/active |
| White | `#FFFFFF` | Page background, cards, text on navy |

> **Color rule (important):** Blue (`#016CFF`) is used **only** for CTAs and active/selected states. Everything else in the hierarchy is Navy (`#001850`). Do not introduce new hues. The only "extra" color is a very low-opacity purple glow (`rgba(120,96,232,…)`) used **sparingly** behind product mockups in the Solutions section — it is a soft ambient accent, not a brand color.

### Typography
Two families, loaded from CDN:
- **Inter** — Latin text, headings, labels, numbers. Weights: 400/500/600/700/800. (`https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800`)
- **Pretendard** — Korean (and mixed KO/EN) body copy. (`https://cdn.jsdelivr.net/gh/orioncactus/pretendard@1.3.9/dist/web/static/pretendard.min.css`)

Font stack used everywhere: `'Inter','Pretendard','Noto Sans KR',system-ui,sans-serif`.

Type scale as actually used (font-weight / size / line-height):

| Role | Spec | Notes |
|---|---|---|
| Hero H1 | 800 / 90px / 1.0, letter-spacing −0.015em | White, `<br>` into 3 lines |
| Section H2 | 800 / 60px / 1.05, letter-spacing −0.03em | Navy. "Why YOnLab", "Core Capabilities", "Solutions" |
| CTA closing H2 | 800 / 86px / 1.0, letter-spacing −0.035em | Navy, centered, 2 lines |
| Detail H2 (Action) | 800 / 40px / 1.24, letter-spacing −0.02em | Navy |
| Solution panel H3 | 800 / 34px / 1.18 (38px on the AI OCC navy panel), −0.02em | Navy (white on navy panel) |
| Card H3 (Capabilities) | 700 / 30px / 1.18, −0.02em | Navy. `word-break:keep-all` |
| Mega-menu preview H4 | 700 / 20px / 1.25 | Navy |
| Footer col heading H4 | 700 / 12px / 1, letter-spacing .1em, uppercase | Navy |
| Body large | 400 / 18–20px / 1.6–1.75 | Muted `#4B5E83` |
| Body | 400 / 16.5px / 1.62 | Card descriptions |
| Eyebrow / kicker | 600–700 / 12–13px / 1, letter-spacing .12–.2em, uppercase | Faint/muted |
| Tag / label | 600 / 12–13px / 1 | See tag component |
| Index number | 700 / 15–22px / 1, tabular-nums | `#AEBFDD` idle → `#016CFF`/`#001850` active |

### Spacing
Section vertical padding ranges 72px–148px; horizontal gutter is **56px** on full-width sections. Content max-widths: **1160–1240px** centered. Common gaps: 8, 12, 14, 16, 18, 20, 44, 48, 52, 56, 72px. The Hero is inset from the page edge by 24–32px (rounded navy panel floats inside white).

### Radius
| Element | Radius |
|---|---|
| Buttons / CTAs | **8px** |
| Cards, mega-menu preview, tags container, mockup windows | **12px** |
| Solution product panels | **24px** |
| Hero navy panel | 20px |
| Icon chips | 10–14px |
| Tags / pills | 6px |
| Device (phone) mockup frame | 32px outer / 22px screen |

### Shadows
- Card hover: `0 22px 48px rgba(0,24,80,0.13)`
- Solution panel: `0 28px 64px rgba(0,24,80,0.08)`; hover `0 38px 80px rgba(0,24,80,0.13)`
- Capabilities container: `0 34px 80px rgba(0,24,80,0.08)`
- CTA button hover: `0 10px 24px rgba(1,108,255,0.28)`
- Mega-menu dropdown: `0 24px 48px rgba(0,24,80,0.1)`
- Mockup window: `0 24px 50px rgba(0,24,80,0.16)`

### Border radius / motion easing
Standard easing used throughout: `cubic-bezier(.16,.84,.44,1)` for reveals/lifts; `.2s ease` for hover color/transform.

---

## Screens / Views & Components

### 1. Header + Mega Menu
- **Layout:** flex row, `padding:22px 56px`, bottom border `#D8E4F5`, background `rgba(255,255,255,.96)`. Logo left; nav + Contact button pushed right. `z-index:60`.
- **Logo:** `assets/yonlab-logo-trim.png`, height 30px. Clicking the logo goes home (there is **no** "Home" menu item).
- **Nav items:** `Capabilities ▾`, `Solutions ▾`, `Company` (plain link, no chevron, no dropdown). Font 500/15px Inter. Idle color `#4B5E83`; when its dropdown is open, `#001850`.
- **Contact Us button:** background `#016CFF`, white, 600/14px, padding `12px 22px`, radius 8px.
- **Mega menu (Capabilities & Solutions only):**
  - Opens on hover **after a 120ms delay**; closes **160ms after** mouse leaves (staying on the panel keeps it open). Entry animation `ydropin` (opacity + translateY −6px, .16s).
  - Full-width panel below header, white, bottom border, dropdown shadow.
  - Inner grid: `1fr 380px`, max-width 1160px, padding `32px 56px`, gap 44px.
  - **Left:** uppercase section label + 5 rows. Each row = icon chip (38px, radius 10px, `#F7FAFF` bg, `#D8E4F5` border, navy icon) + title (700/15px navy) + one-line description (400/12.5px muted). **The whole row is a clickable link.** Hover state: `background:#F7FAFF; border:1px solid #016CFF`. Non-hovered rows keep `border:1px solid transparent` (so layout never shifts). Row padding `12px 14px`, radius 8px.
  - **Right:** preview card on `#F7FAFF`, border `#D8E4F5`, radius 12px, padding 26px. Shows the currently-hovered item: 44px icon chip, H4 title, description (400/14px), and 3 tag pills. **No "Learn more" button here** — the left row click handles navigation; the right panel is pure preview.
  - Company is a single (one-page) destination — plain link, no dropdown.
  - Resources menu is intentionally **excluded** (Phase 1).

Mega-menu item data (icon + title + one-line + full description + 3 tags):

**Capabilities**
1. Embedded Engineering — "하드웨어·OS·런타임 위에서 AI 구동" — 디바이스 환경에서 AI를 실제 구동하기 위한 하드웨어, OS, 런타임 이해를 기반으로 시스템을 구현합니다. — tags: Hardware, Runtime, OS
2. Platform Engineering — "RAG·자동화·운영을 플랫폼화" — RAG, 설치 자동화, 모델 발굴/적용, 운영 대시보드, 보안 환경 구성까지 플랫폼화합니다. — tags: Dashboard, RAG, Automation
3. AI Validation — "실디바이스 환경에서 검증" — 정확도, 성능, 지연시간, 안정성, 호환성을 실제 디바이스 환경에서 검증합니다. — tags: Accuracy, Latency, Memory
4. AI Optimization — "경량화·런타임·SDK 최적화" — 모델 경량화, 런타임 연동, 칩셋/SDK 환경에 맞춘 실행 최적화를 지원합니다. — tags: Quantization, Runtime, SDK
5. Technical Consulting — "진단부터 PoC 전환까지" — 고객의 현장 문제를 빠르게 진단하고 실행 가능한 솔루션과 PoC 방향으로 전환합니다. — tags: PoC, Deployment, Integration

**Solutions**
1. Private AI Platform — "폐쇄망·온프레미스 Private AI" — 폐쇄망, 온프레미스 업무 환경에서 동작하는 Private AI/RAG 기반 플랫폼입니다. — tags: On-Premise, RAG, Private
2. Berrywatch Platform — "위치 기반 AI 현장 관제" — 위치 기반 서비스, 운영 SOP, 디바이스 상태, 현장 매뉴얼을 연결하는 온프레미스 AI 관제 솔루션입니다. — tags: Monitoring, SOP, 24/7
3. AI OCC — "통합 Operation Control Center" — 운영 현장의 매뉴얼, 디바이스 상태, 고객지원 흐름을 연결하는 AI 기반 Operation Control Center입니다. — tags: Control, Live, Support
4. Validation Automation — "검증·리포트·이력 자동화" — 모델 검증, SDK 실증, 리포트, 이력 관리를 자동화하는 검증 운영 체계입니다. — tags: Metrics, Reporting, Trace
5. Partner Products — "파트너 솔루션 실행·상용화" — 로보틱스/Automotive 등 파트너 솔루션을 한국 시장에 맞게 실행/검증/상용화 지원합니다. — tags: Robotics, KR, E2E

### 2. Hero
- **Layout:** white section, `padding:24px 28px 32px`. Inside is a **navy rounded panel** (`#001850`, radius 20px, `min-height:602px`, padding `74px 64px 82px`) that floats inset from the page edges.
- **Panel backgrounds (layered, all pointer-events:none):**
  - radial glow top-left: `radial-gradient(118% 98% at 3% 32%, rgba(1,108,255,0.30) 0%, rgba(1,108,255,0.10) 25%, rgba(0,24,80,0) 56%)`
  - linear tint: `linear-gradient(116deg, rgba(126,178,255,0.20) 0%, rgba(126,178,255,0) 33%)`
  - dot grid: `radial-gradient(#FFFFFF 1px,transparent 1px)` size 34px, opacity .05
- **Content grid:** `1.05fr .95fr`, max-width 1160px, gap 52px, vertically centered.
- **Left column** (`yfu` fade-up on load):
  - Eyebrow: blue dot (7px, `#016CFF`) + "Private Physical AI Engineering Company" (600/12.5px, letter-spacing .16em, uppercase, `rgba(255,255,255,0.72)`).
  - H1: **"Trusted Intelligence.\nVerified in the\nReal World."** (800/90px, white).
  - Paragraph: "YOnLab은 AI를 실제 디바이스와 폐쇄망 업무 환경에서 검증, 최적화, 운영 가능한 솔루션으로 만듭니다." (400/18px, `rgba(255,255,255,0.74)`, max-width 496px).
  - Buttons: **Explore Solutions** (blue `#016CFF`, white, arrow icon, padding `17px 30px`, radius 8px, hover lifts −2px + blue glow) and **Contact Us** (transparent, white text, `1px solid rgba(255,255,255,0.34)`, hover brightens border + faint bg).
- **Right column** (`yfu`, delay .12s): a detailed SVG "Runtime Architecture / Verification Loop" diagram, 580×570 viewBox. Vertical pipeline: **AI Model → AI Optimization → On-Device Runtime (실디바이스 실행 환경, emphasized box) → AI Validation → device row**, with an **NPU / Chipset / SDK** pill stack feeding the runtime, and an animated dashed **VERIFICATION LOOP** curve with a moving signal dot (`animateMotion`). This is the **only** place this full diagram appears (do not repeat it elsewhere).
- **Scroll cue:** bottom-left — a 26px vertical line with an animated blue dot (`yscroll`, translateY 22px loop) + "SCROLL" label.

### 3. Why YOnLab
- **Layout:** white section, `padding:132px 56px`, faint navy blueprint grid overlay (opacity .022). Content grid `360px 1fr`, gap 72px, max-width 1200px.
- **Left:** giant outlined "01" (210px, transparent fill, `-webkit-text-stroke:1.5px #001850`, opacity .07) behind the H2 "Why YOnLab".
- **Right:** a 4-column row grid `52px 1fr 46px 1.05fr`.
  - Header row labels: "Customer Challenge" (muted) / "YOnLab Solution" (navy), 700/12px uppercase.
  - 5 data rows (`.ywrow`, hover bg `#F7FAFF`): index chip (40px icon box, number `#AEBFDD` → `#016CFF` on hover) · challenge text (400/19px muted) · dashed arrow connector · check icon (blue circle + white check) + solution text (500/19px `#071B45`).

Rows (number / challenge / solution):
1. `01` — "AI 모델은 있지만 실제 디바이스 적용이 어렵다" → "실디바이스 중심 검증과 온디바이스 실행 환경 이해"
2. `02` — "NPU/칩셋/SDK별 호환성 차이가 크다" → "멀티칩셋 호환성 분석과 SDK 연동 경험"
3. `03` — "폐쇄망/온프레미스 환경에서는 일반 AI 도구 적용이 어렵다" → "Private AI / On-premise AI 구현 역량"
4. `04` — "검증/배포/리포트 체계가 분절되어 있다" → "Validation Automation과 운영 대시보드 구성"
5. `05` — "PoC 이후 제품화까지 이어질 파트너가 부족하다" → "설치, 검증, 운영, 유지보수까지 맡는 Full-stack 파트너십"

### 4. Core Capabilities
- **Layout:** section on **surface `#F7FAFF`**, `padding:96px 56px`, blueprint grid overlay + a large faint concentric-circle SVG top-right (opacity .05). Inside: a **floating white container** (border `#E6EDF7`, radius 24px, padding `68px 44px`, big soft shadow), max-width 1240px.
- **Header:** giant outlined "02" behind H2 "Core Capabilities"; right-aligned subline "디바이스 위에서 AI를 구현·검증·운영하는 5가지 핵심 역량" (500/18px muted).
- **Grid:** `repeat(auto-fit,minmax(200px,1fr))`, gap 16px → 5 cards.
- **Card (`.ycard`):** white, border `#D8E4F5`, radius 12px, padding `28px 20px`, `min-height:392px`, flex column. Top row = index number (700/22px `#AEBFDD`) + 30px stroke icon (navy). Then H3 (700/30px navy, `word-break:keep-all`), description (400/16.5px muted), tag row, and a **"Learn More"** link (600/14px blue, arrow, gap grows on hover). Hover: lift −6px, border → navy, shadow, a 2px navy top-bar wipes in (`::before` scaleX), index → navy. Reveal-on-scroll with staggered delays (.06s steps).

Cards (index / title / description / tags):
1. `01` Embedded Engineering — "디바이스 환경에서 AI를 실제 구동하기 위한 하드웨어, OS, 런타임 이해를 기반으로 시스템을 구현합니다." — Hardware, Runtime, OS, BSP
2. `02` Platform Engineering — "RAG, 설치 자동화, 모델 발굴/적용, 운영 대시보드, 보안 환경 구성까지 플랫폼화합니다." — Dashboard, RAG, Automation, Deployment
3. `03` AI Validation — "정확도, 성능, 지연시간, 안정성, 호환성을 실제 디바이스 환경에서 검증합니다." — Accuracy, Latency, Memory, Compatibility
4. `04` AI Optimization — "모델 경량화, 런타임 연동, 칩셋/SDK 환경에 맞춘 실행 최적화를 지원합니다." — Quantization, Runtime, SDK, Performance
5. `05` Technical Consulting — "고객의 현장 문제를 빠르게 진단하고 실행 가능한 솔루션과 PoC 방향으로 전환합니다." — PoC, Deployment, Integration, Maintenance

**Tag component (`.ytag`):** 600/13px `#4B5E83`, bg `#F7FAFF`, border `#E1EAF6`, radius 6px, padding `6–7px 9px`, `white-space:nowrap`.

### 5. Trust Band (industries served)
- **Layout:** **dark navy `#001850`**, `padding:72px 56px`, white blueprint grid overlay (opacity .04). Flex row, max-width 1200px, gap 56px, wraps.
- **Left:** eyebrow "주요 고객" (700/12px, .18em, uppercase, `#4EA0FF`) + "현장에서 검증된\n산업 파트너" (700/24px white).
- **Right:** 4-column grid of industry cells (hairline dividers via `rgba(255,255,255,0.12)` gap technique), each = 34px white stroke icon + label (600/15px `rgba(255,255,255,0.86)`). Industries: **제조업, 자동차, 로보틱스, 공공기관.**

### 6. Solutions (product-first showcase)
- **Layout:** white section, `padding:132px 56px`, faint blueprint grid. Header: giant outlined "03" + H2 "Solutions" (left) and subline "현장에 배포되는 실제 AI 엔지니어링 플랫폼 — YOnLab이 만드는 제품들." (right).
- **5 large product panels** in a vertical stack (gap 40px), each with an **alternating composition** so the scroll has rhythm. Panels are `.ysolpanel`: border `#E6EDF7`, radius **24px**, padding `52px`, shadow `0 28px 64px rgba(0,24,80,0.08)`, hover lift −4px. Each panel has: number (800/15px blue) + hairline + category label; H3 (800/34px navy); description (400/17px muted); 3 tag pills; a **blue CTA button** (`.ysolcta2`, `#016CFF`, radius 8px); and a **premium product mockup frame**.
- **Mockup frames are placeholders for real product screenshots** — each contains an `<image-slot>` (drag-drop image target) inside a realistic frame. **Do not ship gray boxes**; recreate the frame chrome and leave an image region the team fills later. Behind each mockup is a soft **blue→purple glow** (`radial-gradient … rgba(1,108,255,0.20)` + `rgba(120,96,232,0.16)`, blurred) and a layered offset panel (`#EEF3FF`) for depth.
- **Compositions:**
  - **01 Private AI Platform** — text left / product right. Mockup: browser window (traffic-light dots + address bar "app.yonlab.ai / private-ai"), 16:10 image slot ("Desktop Dashboard 스크린샷"). CTA: **Learn More**.
  - **02 Berrywatch Platform** — product left / text right. Mockup: app window with **navy title bar** "Berrywatch · Monitoring" + a "Live" pill; 16:10 slot ("Monitoring Dashboard 스크린샷"). CTA: **View Solution**.
  - **03 AI OCC** — **large centered product on a NAVY panel** (`#001850`, the section centerpiece). Radial blue/purple glow + dot grid. Centered eyebrow/title/description/tags (white), CTA **View Demo**, then a wide console mockup (2.4:1 slot "Platform Console 스크린샷"). Tags use the dark variant `.ytagd`.
  - **04 Validation Automation** — split editorial, narrow text left / large product right (`0.7fr 1.3fr`). Mockup: "Validation Analytics" header bar, 16:9 slot ("Analytics Dashboard 스크린샷"). CTA: **Explore Platform**.
  - **05 Partner Products** — device (phone) mockup left / text right. Phone frame: navy body, radius 32px, 9:17.5 screen slot ("Device Interface 스크린샷"), speaker notch. CTA: **Contact Us**.
- **Responsive:** panels collapse to single column at ≤960px.

> Note: there is an older single-panel "tabbed" Solutions implementation in the logic (`solNav`, `cur`, metrics, `v0…v4` SVG previews). The **current, approved** Solutions UI is the 5-panel showcase above; the tab data is legacy and can be ignored.

### 7. Action Showcase
- **Layout:** section on a **soft blue gradient** `linear-gradient(158deg,#E9F0FF 0%,#F7FAFF 46%,#FFFFFF 100%)` + top-right radial blue glow. 3-column grid `230px minmax(300px,440px) minmax(300px,1fr)` (`.yactgrid`, stacks ≤1080px).
  - **Col 1 — index list:** 3 selectable rows (number + label + growing underline). Active row navy, idle `#AEBFDD`.
  - **Col 2 — image slots:** two 88px `<image-slot>` thumbnails ("현장 이미지", "다이어그램 이미지").
  - **Col 3 — detail:** H2 (800/40px navy) + paragraph (400/18px muted) for the active item.
- **Items (label / title / description):**
  1. On-Device Runtime — "실디바이스 위에서 검증된 AI 실행" — "디바이스 환경에서 AI를 실제 구동하기 위한 하드웨어, OS, 런타임 이해를 기반으로 시스템을 구현합니다. 실디바이스 중심으로 동작을 확인하며 온디바이스 실행 환경을 최적화합니다."
  2. AI Validation — "실제 환경에서의 성능·안정성 검증" — "정확도, 성능, 지연시간, 안정성, 호환성을 실제 디바이스 환경에서 검증합니다. NPU/칩셋/SDK별 호환성 차이를 분석해 배포 전 신뢰를 확보합니다."
  3. Private Operation — "폐쇄망·온프레미스 AI 운영" — "폐쇄망과 온프레미스 업무 환경에서 동작하는 Private AI/RAG 기반으로 설치, 검증, 운영, 유지보수까지 이어지는 운영 체계를 구성합니다."

### 8. Contact CTA (closing scene)
- **Layout:** centered, `padding:148px 56px 156px`, background `linear-gradient(160deg,#DCE7FF 0%,#EEF3FF 40%,#F7FAFF 72%,#FFFFFF 100%)` + strong top-center radial blue glow (`rgba(0,104,248,0.20)`) + faint navy grid. Max-width 1160px.
- **H2:** "Let's Build Physical\nAI Together." (800/86px navy, letter-spacing −0.035em).
- **Sub:** "AI를 실제 서비스와 디바이스 환경에 적용하고 싶다면 YOnLab과 논의해보세요." (400/20px muted).
- **Physical AI Pipeline** (horizontal, distinct from the Hero's vertical diagram): eyebrow "Physical AI Pipeline", then 5 nodes on a connecting rail — **AI Model · AI Optimization · On-Device Runtime · AI Validation** (white icon chips 58px, `#D8E4F5` border) → **terminal navy node** with a white check + label "Verified in the\nReal World". The rail gradient turns blue near the terminal node.
- **CTA:** **Contact Us** button (blue `#016CFF`, padding `18px 34px`, radius 8px, arrow, hover lift).

### 9. Footer
- **Layout:** white, top border, `padding:80px 56px 40px`, max-width 1200px. Top grid `1.5fr 1fr 1fr 1fr 1.1fr` (5 columns), gap 48px, with a bottom border, then a legal row.
- **Brand column:** logo (28px), tagline "Trusted Intelligence.\nVerified in the Real World." (700/15px navy), blurb "YOnLab은 AI를 실제 디바이스와 폐쇄망 업무 환경에서 검증·최적화·운영 가능한 솔루션으로 만듭니다.", and 3 social icons (LinkedIn, GitHub, Email — 40px `.ysocial` chips, hover navy border + `#F7FAFF`).
- **Link columns:**
  - **Company:** About, Company, Contact
  - **Capabilities:** Embedded Engineering, Platform Engineering, AI Validation, AI Optimization, Technical Consulting
  - **Solutions:** Private AI Platform, Berrywatch, AI OCC, Validation Automation, Partner Products
  - **Contact:** business@yonlab.ai (blue), Inquiry Form, Business Contact
- Links `.yfootlink` 400/14.5px muted → hover `#016CFF`.
- **Legal row:** "© 2026 YOnLab. All Rights Reserved." (left) + Privacy Policy / Terms of Use (right).

---

## Interactions & Behavior
- **Mega menu:** open on hover after **120ms**, close **160ms** after leave; hovering the panel cancels close. Hovering a left row updates the right preview and highlights that row (`#F7FAFF` bg + 1px `#016CFF` border; others keep transparent border to avoid layout shift). Entry animation ~.16s fade + slide.
- **Scroll reveal:** elements marked `data-reveal` start at `opacity:0; translateY(24px)` and animate to visible via `IntersectionObserver` (threshold .12, rootMargin bottom −8%), easing `cubic-bezier(.16,.84,.44,1)`, ~.7s, with staggered delays inside the Capabilities grid.
- **Card hover:** lift −6px, border→navy, shadow, 2px navy top-bar wipe, index color→navy.
- **Solution panel hover:** lift −4px + larger shadow.
- **CTA hover:** lift −2px + colored glow; "Learn More"/arrow links increase gap on hover.
- **Hero:** load fade-up (left content, then right diagram at .12s); animated verification-loop dash + moving signal dot; looping scroll cue.
- **Action Showcase / (legacy Solutions tabs):** clicking a list item sets the active index and swaps the detail/preview.
- **Reduced motion:** `@media (prefers-reduced-motion:reduce)` disables all animations/transitions, forces `data-reveal` visible, and hides the moving signal dot.

## State Management
Minimal, all local/UI state:
- **Header:** `open` (which mega menu: `'cap' | 'sol' | null`) with open/close timers (120ms / 160ms); `idx` (hovered item index for the preview). Company has no dropdown.
- **Body:** `activeAct` (0–2, Action Showcase selected item). (Legacy `activeSol` 0–4 for the old tabbed Solutions — not needed for the current showcase.)
- No data fetching; all content is static. CTAs/links currently point to `#` — wire to real routes (Capabilities/Solutions detail pages, Company one-pager, Contact form/mailto).

## Responsive behavior
Designed desktop-first at ~1160–1240px content width. Known breakpoints in the prototype: Action Showcase grid stacks at **≤1080px**; Solution panels stack to single column at **≤960px**. Header, Hero grid, capability grid (`auto-fit minmax`), and footer columns should collapse gracefully on tablet/mobile — define mobile layouts per your codebase conventions (the prototype is not fully mobile-tuned).

## Assets
- **`assets/yonlab-logo-trim.png`** — YOnLab wordmark logo, whitespace-trimmed (ratio ~4.52:1). Used in header (30px) and footer (28px). Included in this bundle.
- **Fonts:** Inter (Google Fonts) + Pretendard (jsDelivr CDN) — see Typography. Swap to your app's font loading (self-host if preferred).
- **Icons:** all inline SVG (stroke-based, 1.6 stroke width, round caps/joins), drawn in-file — no icon library. Reproduce as SVG components or map to your icon set at matching weight.
- **Product mockups / photos:** **not yet provided.** The Solutions panels and Action Showcase contain image placeholders (`<image-slot>`) sized for: Desktop Dashboard (16:10), Monitoring Dashboard (16:10), Platform Console (2.4:1), Analytics Dashboard (16:9), Device Interface (9:17.5), plus two 88px thumbs. Build framed placeholders and swap real screenshots in later.
- **Diagrams:** Hero runtime/verification diagram and CTA pipeline are hand-authored inline SVG (specs above) — recreate as SVG.

## Files (in this bundle)

### Screenshots (`screenshots/`)
Reference renders of the approved Home page, top to bottom:
- `01-hero.png` — Header + Hero (navy panel)
- `02-why-yonlab.png` — Why YOnLab editorial comparison
- `03-core-capabilities.png` — 5-card capabilities grid
- `04-trust-band.png` — Industries-served navy band
- `05-solutions.png` — Full 5-panel product showcase (long)
- `06-action-showcase.png` — Action showcase (index + detail)
- `07-contact-cta.png` — Closing "Let's Build Physical AI Together." + pipeline
- `08-footer.png` — Footer
Mega-menu dropdowns are documented in text (section 1) — they are hover-triggered overlays not captured in the static scroll.

### Source references
- `YONLAB Home 2A.dc.html` — top-level Home page: header + mega menu + Hero, then imports the body. (Approved "2A" direction.)
- `HomeBodyV2.dc.html` — the body sections: Why YOnLab, Core Capabilities, Trust Band, Solutions, Action Showcase, Contact CTA, Footer.
- `assets/yonlab-logo-trim.png` — logo asset.
- `YONLAB_DESIGN_BRIEF.md` — original design brief (tokens, copy, do/don'ts) for reference.

> The `.dc.html` files use a proprietary template runtime (`<x-dc>`, `<sc-for>`, `{{ }}`, `<dc-import>`, `<x-import>`, and a `Component extends DCLogic` script). **Read them for spec, not for direct reuse** — reimplement the markup as your framework's components and move the `renderVals()` data (the arrays quoted above) into props/constants. The `image-slot` / `support.js` runtime pieces are prototype-only.

# YOnLab Website — Version 1.0 Baseline

> 이 문서는 **현재 저장소에 구현되어 있는 코드를 직접 분석해 작성한 기준 문서**입니다.
> Version 2.0 개발의 출발점으로 사용합니다.
>
> - 기준 커밋: **`353a7db`** (tag `v1.0.0`)
> - 저장소: `yubi-lee/yonlab-site` · production branch `main`
> - 작성일: 2026-08-16
> - 작성 범위: `app/`, `components/`, `lib/`, `hooks/`, `public/`, 빌드·배포 설정
>
> **표기 규칙** — 계획이 아니라 코드에 존재하는 것만 "구현"으로 적었습니다.
> 미구현·임시 상태는 `Placeholder` / `Partial` / `Not Implemented`로 명시합니다.

---

## 1. Project Overview

### 1.1 Framework / 주요 Library

`package.json` 기준입니다.

| 구분 | 값 |
|---|---|
| Framework | **Next.js 15.5.x** (App Router) |
| UI | **React 19** |
| 언어 | **TypeScript 5.7** |
| 스타일 | **Tailwind CSS v3** (`tailwind.config.ts` 토큰 기반) |
| 아이콘 | **lucide-react** + 자체 SVG 세트(`components/icons/index.tsx`) |
| 배포 도구 | **wrangler** (devDependency) |
| Lint | `next lint` (`.eslintrc.json`) |

**상태관리 라이브러리 없음** — 클라이언트 상태는 `useState`만 사용합니다.
**애니메이션 라이브러리 없음** — CSS 애니메이션 + IntersectionObserver로 처리합니다.

### 1.2 Build 및 배포 구조

```
npm run build        →  next build (output: "export")  →  ./out
npx wrangler deploy  →  ./out 을 Cloudflare Worker "yonlab-site" 의 Static Assets 로 업로드
```

- `next.config.mjs`에 **`output: "export"`가 상시 적용**되어 있습니다. 모든 라우트가 프리렌더되고 서버 런타임이 없습니다. 이 때문에 `images: { unoptimized: true }`가 함께 설정되어 있습니다 (이미지 최적화는 서버가 필요하므로).
- `wrangler.jsonc`:

  | 키 | 값 |
  |---|---|
  | `name` | `yonlab-site` |
  | `compatibility_date` | `2026-08-07` |
  | `compatibility_flags` | `["nodejs_compat"]` |
  | `assets.directory` | `./out` |
  | `assets.not_found_handling` | `404-page` |

- Production 도메인: **`www.yonlab.ai`**, **`yonlab.ai`**
- 검수용 Preview: **Cloudflare Pages** 프로젝트 `yonlab-website-preview` (branch `review`) → `https://review.yonlab-website-preview.pages.dev`
  → Production(Worker)과 Preview(Pages)는 **서로 다른 Cloudflare 제품**을 사용합니다. Preview는 `wrangler pages deploy out` 으로 수동 배포합니다.

빌드 산출물 규모: **약 59MB / 94개 파일** (대부분 `public/`의 이미지·영상).

### 1.3 주요 디렉터리 역할

```
app/                 라우트(App Router). 각 page.tsx가 하나의 정적 페이지
  layout.tsx         루트 레이아웃 — metadata, skip-link, noscript reveal 폴백
  globals.css        Tailwind 레이어 + 폰트 @import + 커스텀 유틸(텍스처/애니메이션)
  favicon.ico        16/32/48 멀티사이즈 (App Router 아이콘 규약)
  icon.png           512×512
  apple-icon.png     180×180
components/
  layout/            Header, Footer (전 페이지 공용)
  sections/          페이지 섹션 단위 컴포넌트
  sections/solution-detail/   Solution 상세 전용 (ExperienceCarousel 등)
  sections/company/           About 구버전 섹션들 — 현재 전부 미사용
  sections/mockups/           제품 목업 프레임(browser/appWindow/console/analytics/phone)
  ui/                Button, Card, Tag, Eyebrow, ImageSlot 등 프리미티브
  icons/             자체 SVG 아이콘 세트
lib/
  content.ts         ★ 홈/네비/솔루션/푸터 카피·라우트의 단일 소스
  solutions.ts       솔루션 상세 데이터 + 전용 라우트 slug 목록
  capabilities.ts    역량 상세 데이터
  company.ts         About 구버전 데이터 (현재 페이지에서 미사용)
  legal.ts           개인정보처리방침·이용약관 전문(원문 전사)
  cn.ts              className 병합 유틸
hooks/useReveal.ts   IntersectionObserver 스크롤 리빌
public/              이미지·영상·법적 문서 원본 + 별도 앱 페이지(/apps/...)
docs/                본 문서
```

---

## 2. Site Architecture

### 2.1 구현된 전체 라우트

`app/` 디렉터리에 실제 존재하는 라우트입니다. **총 17개 페이지**가 정적 생성됩니다.

| # | 페이지 | Route | 네비 노출 | 상태 |
|---|---|---|---|---|
| 1 | Home | `/` | — (로고) | Implemented |
| 2 | About | `/company` | Header·Footer | Implemented |
| 3 | Contact | `/contact` | Header·Footer | Implemented |
| 4 | AXSL | `/solutions/axsl` | Header 드롭다운·Footer | Implemented |
| 5 | Private AI Platform | `/solutions/private-ai-platform` | Header 드롭다운·Footer | Implemented |
| 6 | Berrywatch Service | `/solutions/berrywatch-platform` | Header 드롭다운·Footer | Implemented |
| 7 | AI OCC (OnCare Circle) | `/solutions/ai-occ` | Header 드롭다운·Footer | Implemented |
| 8 | Validation Automation | `/solutions/validation-automation` | Header 드롭다운·Footer | Implemented |
| 9 | 개인정보처리방침 | `/privacy` | Footer 하단 | Implemented |
| 10 | 이용약관 | `/terms` | Footer 하단 | Implemented |
| 11 | Solutions 개요 | `/solutions` | **없음 (고아)** | Partial — 구버전 구조 |
| 12 | Partner Products | `/solutions/partner-products` | **없음 (고아)** | Placeholder 포함 |
| 13 | Capabilities 개요 | `/capabilities` | **없음 (고아)** | Partial — 구버전 구조 |
| 14–18 | Capability 상세 5종 | `/capabilities/[slug]` | **없음 (고아)** | Partial — 구버전 구조 |

`[slug]` 5종: `embedded-engineering`, `platform-engineering`, `ai-optimization`, `ai-validation`, `technical-consulting`

**추가 정적 페이지 (Next 라우트 아님)**
`public/apps/onpersona/privacy/index.html` → `/apps/onpersona/privacy/`
별도 앱(OnPersona)의 개인정보처리방침. Next와 무관한 단독 HTML이며 `public/`에서 그대로 서빙됩니다.

### 2.2 네비게이션에 노출되는 구조

```
YOnLab
├─ About                        → /company
├─ Solutions   (드롭다운 전용, 자체 페이지 링크 없음)
│   ├─ AXSL                     → /solutions/axsl
│   ├─ Private AI Platform      → /solutions/private-ai-platform
│   ├─ Berrywatch Service       → /solutions/berrywatch-platform
│   ├─ AI OCC (OnCare Circle)   → /solutions/ai-occ
│   └─ Validation Automation    → /solutions/validation-automation
└─ Contact                      → /contact

Footer 하단: Privacy Policy → /privacy · Terms of Use → /terms
```

Header 드롭다운(`megaSolutions`)과 Footer의 Solutions 컬럼은 모두 `lib/content.ts`의
`homeSolutionSlugs` + `solutionPanels`에서 **파생**됩니다 → 데이터 불일치가 구조적으로 발생하지 않습니다.

`solutionPanels`에는 6번째 항목 `partner-products`가 있으나 `homeSolutionSlugs`에 없어
홈 프리뷰·헤더·푸터 어디에도 노출되지 않습니다.

---

## 3. Page Structure

### 3.1 Home — `/`

**Section Order** (`app/page.tsx` 조립 순서)

1. `Hero`
2. `HomeBento`
3. `WhyYonlab`
4. `CoreCapabilities`
5. `Solutions`
6. `ClosingCta`

**주요 콘텐츠**

| 섹션 | 타이틀 | 핵심 UI |
|---|---|---|
| Hero | `Trusted / Intelligence. / Verified in the / Real World.` (H1 4줄) | 네이비 라운드 패널, 우측 `HeroDiagram` SVG (AI Model → AI Optimization → On-Device Runtime → AI Validation, Verification Loop) |
| HomeBento | `화면 속 AI를 넘어, / 현실에서 작동하는 AI로.` | 2카드 그룹 — 좌: AXSL 스크린샷 2장 + 4스텝 플로우 / 우: `EnvironmentHub` 아이소메트릭 큐브 + 오빗 링 + 6태그 |
| WhyYonlab | `Why YOnLab` (index 01) | 5행 대비표 — CUSTOMER CHALLENGE ↔ OUR SOLUTION |
| CoreCapabilities | `Core Capabilities` (index 02) | 다크 네이비 카드 5장 (링크 없음) |
| Solutions | `Solutions` (index 03) | 좌측 5개 셀렉터 + 우측 단일 프리뷰 카드 |
| ClosingCta | `Turn Your AI Challenge / into Reality.` | 흰 배경 위 블루 그라디언트 인셋 카드 |

**CTA / Link**

| 버튼명 | 이동 | 종류 |
|---|---|---|
| `Explore Solutions →` (Hero) | `#home-solutions` | 내부 앵커 |
| `Contact us →` (HomeBento) | `/contact` | 내부 |
| `Explore Solution →` (Solutions 카드) | `/solutions/{선택된 slug}` | 내부 |
| `contact@yonlab.ai` (ClosingCta) | `mailto:` | 외부 |
| `Contact Us →` (ClosingCta) | `/contact` | 내부 |

**Assets** — `/axsl/axsl-hero.png`, `/axsl/axsl-zoo.png` (HomeBento),
Solutions 카드 이미지 5종(§9), 로고 `/yonlab-logo-trim-removebg-preview.png`

**Interaction**

- Hero 헤드라인: `.reveal-lines` 줄 단위 등장 (로드 시)
- 섹션 등장: `[data-reveal]` + IntersectionObserver (`RevealProvider`)
- WhyYonlab 행 / CoreCapabilities 카드: `.scroll-rise` (`animation-timeline: view()`)
- Solutions: **클릭 셀렉터**. 데스크톱은 우측 프리뷰 교체, 모바일은 아코디언
- 배경 텍스처: `.streaks`, `.dot-grid`, `.grain`, `.blueprint-grid`
- WhyYonlab은 **hover 인터랙션 없음** (의도적 제거)

### 3.2 About — `/company`

**Section Order** (단일 파일 `app/company/page.tsx`, 약 580줄)

1. Hero — `AI를 실제 환경에 적용하는 일을 합니다.` + 실행 스택 SVG
2. What We Work On — 2×2 에디토리얼 그리드
3. How We Work — 대형 넘버럴 + 레일/노드 플로우
4. Industries — `다양한 산업 현장을 위한 AI Engineering`, 다크 네이비 2×2
5. Engineering Context — Application/AI · Software · Hardware 3층 카드
6. Final CTA — `AI를 서비스로 구현해야 한다면, 이야기해보세요.`

**CTA** — `Contact Us →` → `/contact` (내부)
**Assets** — 이미지 파일 없음. 모든 비주얼이 **인라인 SVG / CSS**
**Interaction** — `data-reveal` 스크롤 등장, Engineering Context 카드 hover 시 `-translate-y-[3px]` + 그림자

### 3.3 Contact — `/contact`

**Section Order**

1. Hero — `Let's Build What Works in the Real World.` + `ContactHeroVisual`
2. Inquiry — 좌: 이메일 카드 / 우: `ContactForm`

**주요 UI** — 문의유형 선택(라디오 4종), 이름·회사명·이메일·연락처·문의내용, 개인정보 동의 체크박스

**CTA / Link**

| 항목 | 이동 | 종류 |
|---|---|---|
| `contact@yonlab.ai` (2곳) | `mailto:` | 외부 |
| `개인정보처리방침` (동의 문구 내) | `/privacy` | 내부 |
| 제출 버튼 | `mailto:` 생성 후 완료 화면 | — |

**Interaction**

- 문의유형 선택 시 `border-blue` + 배경 틴트 + 아이콘 칩 채움
- input focus ring, 유효성 검사 실패 시 `aria-invalid` + `role="alert"` 오류 메시지
- 제출 성공 시 폼이 완료 카드로 교체(`submitted` 상태)
- 동의 문구 내 링크는 `stopPropagation`으로 체크박스 토글 방지

### 3.4 Solution 상세 5종

5개 페이지 모두 **공통 5섹션 구조**입니다. 각 페이지는 독립 파일이며 템플릿 컴포넌트를 공유하지 않습니다.

```
1. Hero          (bg-navy + radial + dot-grid, 좌 텍스트 / 우 16:9 미디어)
2. Solution Overview  (bg-white, 좌 제목+선언문 / 우 설명 2단락 + Tag)
3. Experience    (bg-surface, id="experience" 또는 "demo", 중앙 헤더 + 대형 16:9 미디어)
4. How It Works  (bg-white, 원형 번호 칩 + 커넥터)
5. Final CTA     (흰 배경 위 블루 그라디언트 인셋 카드)
```

| 페이지 | Route | Experience 앵커 | How It Works 스텝 | 외부 Demo URL |
|---|---|---|---|---|
| AXSL | `/solutions/axsl` | `#experience` | 4 | `http://118.217.226.238:10100/public/axsl.html` |
| Private AI Platform | `/solutions/private-ai-platform` | `#demo` | 5 | **없음** |
| Berrywatch Service | `/solutions/berrywatch-platform` | `#experience` | 4 | `.../public/wearables.html` |
| AI OCC (OnCare Circle) | `/solutions/ai-occ` | `#experience` | 4 | `.../public/pet.html` |
| Validation Automation | `/solutions/validation-automation` | `#experience` | 6 | **없음 (CTA 자체가 제거됨)** |

**공통 CTA**

| 버튼명 | 이동 | 종류 |
|---|---|---|
| `프로젝트 상담 →` (Hero primary) | `/contact` | 내부 |
| `View Demo →` (Hero ghost) | `#experience` / `#demo` | 내부 앵커 |
| `View Demo ↗` / `View AXSL Demo ↗` (Experience 하단) | 외부 데모 서버 | **외부** (`target="_blank"` + `rel="noopener noreferrer"`) |
| `Contact Us →` (Final CTA) | `/contact` | 내부 |

**H1 / Final CTA 헤드라인**

| 페이지 | H1 | Final CTA |
|---|---|---|
| AXSL | `AXSL` | `What AI service do you need?` |
| Private AI | `Private AI Platform` | `Bring AI into your private environment.` |
| Berrywatch | `Berrywatch Service` | `Build safer everyday experiences.` |
| AI OCC | `AI OCC (OnCare Circle)` | `Build connected care experiences.` |
| Validation | `Validation Automation` | `Make validation part of your workflow.` |

**Assets / Interaction** — §9, §3.7 참고. Experience 미디어는 AXSL만 `ExperienceCarousel`(3슬라이드, 4초 자동 전환, dots 수동 제어, `prefers-reduced-motion` 시 자동전환 정지)을 사용하고 나머지 4종은 단일 프레임입니다.

### 3.5 Privacy / Terms — `/privacy`, `/terms`

두 페이지 모두 `components/sections/LegalDocument.tsx` 하나를 공유하고, 데이터만 `lib/legal.ts`에서 주입됩니다.

**Section Order**

1. 마스트헤드 — 문서 제목(H1) / 영문 제목 / 블루 헤어라인 / `시행일 | 2026년 8월 14일`
2. 본문 — 인트로 문단 + 번호 섹션(각각 H2) + 하단 imprint

| 페이지 | H1 | 섹션 수 |
|---|---|---|
| `/privacy` | 개인정보처리방침 (Privacy Policy) | 10 |
| `/terms` | 이용약관 (Terms of Use) | 10 |

**CTA / Link** — `contact@yonlab.ai` (mailto). 그 외 CTA 없음
**Assets** — 없음
**Interaction** — **없음** (카드·그래픽·애니메이션 미사용, 의도된 문서 페이지)

### 3.6 고아 페이지 — `/solutions`, `/capabilities`, `/capabilities/[slug]`, `/solutions/partner-products`

네비게이션 어디에서도 링크되지 않지만 라우트는 살아 있고 200을 반환합니다.
Solution 상세 5종 재설계 **이전의 구버전 구조**를 그대로 유지하고 있어, 현재 사이트 톤과 다릅니다.
공용 `PageHero`, `ContactCta`, `SolutionDetailTemplate` 등 신규 5종이 쓰지 않는 컴포넌트를 사용합니다.

`/solutions/partner-products`에는 `TodoNote` 컴포넌트로 표기된 **명시적 Placeholder 2곳**이 있습니다
(파트너·제품 정보 미확보, 제공·협력 방식 미확보).

### 3.7 공통 Interaction 요약

| 동작 | 구현 | 사용처 수 |
|---|---|---|
| 스크롤 등장 | `[data-reveal]` + IntersectionObserver | 32 파일 |
| 로드 페이드업 | `animate-yfade` | 11 파일 |
| 스크롤 연동 등장 | `.scroll-rise` (`animation-timeline: view()`) | 3 파일 |
| 줄 단위 헤드라인 | `.reveal-lines` | 2 파일 |
| hover | `hover:` / `group-hover:` | 25 / 16 파일 |

**Modal 없음.** 사이트 전체에 모달·다이얼로그 구현이 없습니다.
`prefers-reduced-motion: reduce`는 `globals.css`에서 전역 존중합니다.

---

## 4. Shared Components

### 4.1 Layout

| 컴포넌트 | 파일 | 사용 | 역할 / 주요 동작 |
|---|---|---|---|
| `Header` | `components/layout/Header.tsx` | 14개 페이지 | `"use client"`. 가운데 정렬 GNB(About / Solutions / Contact). Solutions는 **드롭다운 전용**(자체 링크 없음). `useState`로 드롭다운·모바일 시트·모바일 섹션 3개 상태 관리. `aria-haspopup`/`aria-expanded`/`aria-current` 적용. `lg` 미만에서 햄버거 시트 |
| `Footer` | `components/layout/Footer.tsx` | 14개 페이지 | `footerColumns` 데이터 기반 3컬럼(About / Solutions / Contact) + 하단 Privacy·Terms. `headingHref`가 있는 컬럼만 제목이 링크 |

### 4.2 UI 프리미티브 (`components/ui/`)

| 컴포넌트 | 사용처 수 | 주요 Props | 역할 |
|---|---|---|---|
| `Eyebrow` | 17 | `children`, `onDark`, `className` | 섹션 상단 소형 라벨 |
| `Button` | 11 | `href`(필수), `variant`, `size`(sm/md/lg), `withArrow`, `className` | **링크 전용 버튼**. `<button>`이 아니라 `Link` 렌더 → onClick 핸들러 불가 |
| `Tag` | 9 | `children`(string), `dark`, `className` | 키워드 칩 |
| `Card` | 8 | `children`, `href`, `className` | `href` 유무로 링크/정적 전환 |
| `CardCta` | 6 | `label`, `className` | 카드 내부 텍스트 CTA |
| `SectionConnector` | 5 | `dotBg` | 섹션 간 세로 커넥터 장식 |
| `PageHero` | 4 | `eyebrow`, `category`, `title`, `description`, `cta`, `visual` | **고아 페이지 4곳 전용** 공용 히어로. 신규 5종·About·Contact는 사용하지 않음 |
| `Badge` | 4 | `children`, `tone` | 상태 뱃지 |
| `ImageSlot` | 3 | `placeholder`, `ratio`, `src`, `sizes`, `dark` | `src`가 있으면 `next/image`(`object-contain`), 없으면 **라벨 placeholder**. 회색 박스·가짜 UI를 만들지 않는다는 원칙의 구현체 |
| `SectionHeading` | 3 | `index`, `title`, `faint` | 번호 + 대형 섹션 제목 |
| `MetricBand`, `CtaLink` | 0 | — | **미사용** |

### 4.3 도메인 컴포넌트

| 컴포넌트 | 파일 | 사용 | 비고 |
|---|---|---|---|
| `RevealProvider` | `components/RevealProvider.tsx` | 12개 페이지 | `"use client"`. `useReveal()` 훅을 마운트만 하는 빈 컴포넌트 |
| `Mockups` | `components/sections/mockups/Mockups.tsx` | Solutions 홈 섹션 | browser / appWindow / console / analytics / phone 5종 프레임. 전부 `src` prop을 `ImageSlot`으로 전달 |
| `ExperienceCarousel` | `components/sections/solution-detail/ExperienceCarousel.tsx` | AXSL만 | `"use client"`. 4초 자동 전환, dots, `frameTone` |
| `LegalDocument` | `components/sections/LegalDocument.tsx` | `/privacy`, `/terms` | 문서 셸 |
| `ContactForm` | `components/sections/ContactForm.tsx` | `/contact` | `"use client"` |
| `ContactHeroVisual` | `components/sections/ContactHeroVisual.tsx` | `/contact` | 블루 필드 패널 |
| `ContactCta` | `components/sections/ContactCta.tsx` | 고아 4페이지 | 신규 페이지들은 각자 인라인 Final CTA 사용 |
| `TodoNote` | `components/sections/solution-detail/TodoNote.tsx` | partner-products, SolutionDetailTemplate | **미확보 정보 표기용 UI** |

### 4.4 미사용 컴포넌트 (import 0회)

```
components/sections/ActionShowcase.tsx
components/sections/ContactProcess.tsx
components/sections/ContactTypeList.tsx
components/sections/LegalPage.tsx            ← 구 "준비 중" 셸
components/sections/TrustBand.tsx
components/sections/company/  (8개 전부)
components/sections/solution-detail/SolutionDetailTemplate.tsx
components/ui/CtaLink.tsx
components/ui/MetricBand.tsx
```

빌드에는 포함되지 않지만(트리셰이킹) 저장소에는 남아 있습니다. **자동 삭제하지 않았습니다.**

---

## 5. Navigation / User Flow

실제 구현된 링크만으로 구성한 경로입니다.

```
[진입]
 │
 ├─ Home /
 │   ├─ Hero "Explore Solutions →"  ─── 앵커 ──→ #home-solutions (같은 페이지)
 │   ├─ HomeBento "Contact us →"    ──────────→ /contact
 │   ├─ Solutions 셀렉터 (5개 클릭)  → 프리뷰 교체 (페이지 이동 없음)
 │   │     └─ "Explore Solution →"  ──────────→ /solutions/{slug}
 │   └─ ClosingCta                  ──────────→ /contact · mailto:
 │
 ├─ Header (모든 페이지)
 │   ├─ About      ──→ /company
 │   ├─ Solutions  ──→ (드롭다운) ──→ /solutions/{5종}
 │   └─ Contact    ──→ /contact
 │
 ├─ Solution Detail /solutions/{slug}
 │   ├─ "프로젝트 상담 →"   ─────────→ /contact
 │   ├─ "View Demo →"      ─ 앵커 ─→ #experience / #demo
 │   ├─ "View Demo ↗"      ─────────→ 외부 데모 서버 (새 탭) ※ AXSL·Berrywatch·AI OCC만
 │   └─ "Contact Us →"     ─────────→ /contact
 │
 ├─ About /company  ──→ "Contact Us →" ──→ /contact
 │
 ├─ Contact /contact
 │   ├─ 폼 제출 ──→ mailto: 생성 + 완료 화면 (서버 전송 없음)
 │   └─ "개인정보처리방침" ──→ /privacy
 │
 └─ Footer (모든 페이지)
     ├─ About / Solutions 5종 / Contact / mailto
     └─ Privacy Policy → /privacy · Terms of Use → /terms
```

**대표 전환 경로**: `Home → Solutions 셀렉터 → Solution Detail → 프로젝트 상담 → Contact`
**막다른 길 없음** — 모든 페이지에서 Header·Footer로 복귀 가능합니다.
**고아 페이지 4종**(`/solutions`, `/capabilities`, `/capabilities/[slug]`, `/solutions/partner-products`)은 **어떤 링크로도 도달할 수 없습니다.** URL 직접 입력으로만 접근됩니다.

---

## 6. Design System

`tailwind.config.ts` + `app/globals.css`에 정의된 **실제 값**입니다.

### 6.1 Font

```
sans: "Helvetica Neue", "Arimo", "Inter", "Pretendard", "Noto Sans KR", Arial, system-ui, sans-serif
```

- 웹폰트는 `globals.css`의 `@import`로 로드: **Arimo**(400/500/600/700), **Inter**(400–800) — Google Fonts / **Pretendard** 1.3.9 — jsDelivr
- `.font-kr` 유틸: `Pretendard, Apple SD Gothic Neo, Noto Sans KR, Inter` — 한글이 섞인 문장에서 라틴이 과하게 굵어 보이지 않도록 사용
- `body { letter-spacing: -0.01em }`

### 6.2 Font Size / Weight (코드에서 실측)

| 역할 | 크기 (모바일 / 태블릿 / 데스크톱) | Weight | tracking |
|---|---|---|---|
| Hero H1 (Home) | 42 / 68 / **94px** | 800 | `-0.04em` |
| Page H1 (Solution 상세) | 36 / 48 / 56px | 800 | `-0.035em` |
| Page H1 (About) | 34 / 46 / 44 / **60px**(xl) | 800 | `-0.04em` |
| Page H1 (Contact) | 38 / 50 / 56 / **66px**(xl) | 800 | `-0.04em` |
| Page H1 (Legal) | 34 / 42 / 48px | 800 | `-0.035em` |
| Section H2 (`SectionHeading`) | 42 / 52 / **68px** | 800 | `-0.04em` |
| Solution H2 | 32 / 38 / 44px | 800 | `-0.03em` |
| Experience H2 | 34 / 44 / 54px | 800 | `-0.03em` |
| Legal H2 (번호 섹션) | 19 / 21px | 800 | `-0.02em` |
| 카드 H3 | 22 / 26–27px | 700–800 | `-0.02em` |
| 본문 | 14.5 / 15.5 / 16 / 17 / 18px | 400 | — |
| Eyebrow / 라벨 | 11–13px | 700 | `0.12–0.2em` uppercase |
| GNB | 19px | 400 | `-0.02em` |

### 6.3 Color

```
navy    #001850   ink     #071B45
blue    #016CFF   blue-legacy #0068F8   blue-hover #003090
sky     #4EA0FF   sky-light   #7DB4FF
surface #F7FAFF   surface-alt #EEF3FF   surface-2 #DCE7FF   surface-3 #E9F0FF
ground  #EEF2FA
line    #D8E4F5   line-soft   #E6EDF7   line-card #E1EAF6   line-deco #C6D6EE
muted   #4B5E83   faint       #8496B5   idle      #AEBFDD
```

**컬러 규칙(코드 주석에 명시)** — `blue(#016CFF)`는 **CTA·active/selected 전용**. 나머지 위계는 `navy`.

### 6.4 Background / Gradient

- Hero(Home): `bg-navy` + 블루 radial glow + linear tint + `.streaks` + `.dot-grid` + `.grain`
- Solution Hero: `radial-gradient(80% 75% at 78% 18%, rgba(1,108,255,0.30), transparent 52%), linear-gradient(160deg,#051842,#020B22 60%,#01060F)`
- HomeBento LEFT: `linear-gradient(to bottom, #FFF, #F7FAFF, #EAF2FF)`
- HomeBento RIGHT: `radial-gradient(120% 130% at 15% 0%, #2C7BFF, #016CFF 34%, #012C86 72%, #001236)`
- Closing / Final CTA: `linear-gradient(100deg, #2C7BFF, #016CFF 34%, #013A9E 72%, #001A4D)`
- Contact / Legal 마스트헤드: `linear-gradient(180deg,#F7FAFF,#FFFFFF)`

### 6.5 Border / Radius / Shadow

| 항목 | 값 |
|---|---|
| Border | `border-line` / `border-line-soft` / `border-line-card` / `border-line-deco`, 다크 위 `border-white/[0.14]` |
| Radius (버튼) | **`rounded-full`** — 전역 통일 |
| Radius (카드) | `rounded-[22px]` · `rounded-[24px]` · `rounded-panel`(24px) · `rounded-hero`(20px) |
| Radius (컨테이너) | `rounded-[32px]` (모바일 24px) |
| Shadow 토큰 | `card 0 10px 28px rgba(0,24,80,.09)` · `panel 0 12px 34px rgba(0,24,80,.06)` · `panel-hover 0 16px 40px rgba(0,24,80,.09)` · `caps` · `cta` · `mega` · `mockup` |
| 미디어 프레임 shadow | `0 28px 70px -30px rgba(1,60,160,0.65)` |

### 6.6 Spacing / Container

| 항목 | 값 |
|---|---|
| 섹션 거터 | `px-6` / `sm:px-14` (24 / 56px) — 전 섹션 공통 |
| 섹션 패딩 | `py-20` / `lg:py-28` 또는 `lg:py-[120px]` |
| `max-w-wide` | **1360px** — Core Capabilities · Solutions · Closing CTA · Solution 상세 |
| `max-w-content` | **1280px** — Hero 내부 · HomeBento · Why · Overview |
| `max-w-prose` | **1120px** — 폼 / 프로즈 |
| `max-w-hero` | 1280px |
| Legal 본문 폭 | `max-w-[820px]` (인라인) |
| Experience 미디어 폭 | `max-w-[1100px]` (인라인) |

### 6.7 Breakpoint

Tailwind 기본값을 그대로 사용합니다 (`tailwind.config.ts`에 재정의 없음).

| 토큰 | 값 | 코드 내 사용 횟수 |
|---|---|---|
| `sm` | 640px | 225 |
| `md` | 768px | 48 |
| `lg` | **1024px** | **525** ← 주 분기점 |
| `xl` | 1280px | 6 |

**`lg`(1024px)가 사실상 유일한 주요 분기점**입니다. `md`는 일부 그리드에서만, `xl`은 About/Contact 헤드라인 크기 등 6곳에서만 사용됩니다.

### 6.8 Motion

| 이름 | 정의 |
|---|---|
| `yfade` | `.7s cubic-bezier(.16,.84,.44,1)`, `translateY(18px)` → 0 |
| `yscroll` | `1.8s ease-in-out infinite` (스크롤 큐) |
| `yflow` | `2.6s linear infinite` (SVG `strokeDashoffset`) |
| `ydropin` | `.16s ease-out` (드롭다운) |
| easing 토큰 | `reveal: cubic-bezier(.16,.84,.44,1)` |

---

## 7. Responsive Behavior

`lg`(1024px) 기준으로 전환됩니다.

| 영역 | Desktop (≥1024px) | Tablet (768–1023px) | Mobile (<768px) |
|---|---|---|---|
| **Header** | 가운데 정렬 GNB 3개 + Solutions hover/click 드롭다운. 우측에 `w-[136px]` 균형용 스페이서 | 햄버거 버튼 | 햄버거 → 전체폭 시트, Solutions는 아코디언 |
| **Hero (Home)** | 좌 텍스트 / 우 `HeroDiagram` 2열, H1 94px `whitespace-nowrap` | 1열 스택, H1 68px | 1열, H1 42px |
| **HomeBento** | 2카드 가로, 높이 412px 고정 | 1열 스택 | 1열 스택 |
| **WhyYonlab** | 5행 대비표 2열 + 점선 화살표 | 축소 | 세로 스택 |
| **CoreCapabilities** | 카드 5장 그리드 | 축소 그리드 | 1열 |
| **Solution 카드 (Home)** | 좌 셀렉터 360px + 우 프리뷰 1fr, `lg:min-h-[504px]` | **아코디언** — 활성 행 아래 프리뷰 인라인 | 동일 아코디언 |
| **Solution 상세 Hero** | `lg:grid-cols-[0.92fr_1.08fr]`, 미디어 `lg:max-w-[640px]` | 1열 | 1열 |
| **How It Works** | 가로 4–6단 + 가로 커넥터 | 세로 | 세로 + 세로 커넥터 |
| **Legal 문서** | 820px 단일 컬럼 (전 구간 동일) | 동일 | 동일 |
| **Footer** | 3컬럼 가로 | 축소 | 세로 스택 |
| **Closing CTA** | 좌우 2열 + 가운데 divider | divider 숨김 | 1열 |

Validation Automation의 How It Works만 6스텝이라 `lg` 3+3 → `xl` 6단으로 한 번 더 분기하며, 줄바꿈 지점 커넥터는 `hidden xl:block`으로 숨깁니다.

---

## 8. Current Features

| 기능 | 상태 | 근거 |
|---|---|---|
| 정적 사이트 생성 (17개 라우트 프리렌더) | `Implemented` | `output: "export"` |
| Header 네비 + Solutions 드롭다운 | `Implemented` | `Header.tsx` |
| 모바일 햄버거 시트 + 아코디언 | `Implemented` | `Header.tsx` |
| Footer 3컬럼 + 법적 링크 | `Implemented` | `Footer.tsx` + `footerColumns` |
| Home Solutions 셀렉터 (5종 전환) | `Implemented` | `Solutions.tsx` `useState` |
| Solution 상세 5종 | `Implemented` | 전용 라우트 5개 |
| Experience 캐러셀 (자동 전환·dots) | `Implemented` | `ExperienceCarousel.tsx` — **AXSL만 사용** |
| 외부 Demo 링크 (새 탭) | `Implemented` | AXSL·Berrywatch·AI OCC 3종 |
| 스크롤 리빌 애니메이션 | `Implemented` | `useReveal` + `data-reveal` 32곳 |
| `prefers-reduced-motion` 대응 | `Implemented` | `globals.css` 전역 |
| Skip link (`본문으로 건너뛰기`) | `Implemented` | `layout.tsx` |
| noscript 리빌 폴백 | `Implemented` | `layout.tsx` |
| 개인정보처리방침 / 이용약관 | `Implemented` | `lib/legal.ts` 원문 전사 |
| favicon (16/32/48 + 512 + apple 180) | `Implemented` | `app/favicon.ico`, `icon.png`, `apple-icon.png` |
| SEO metadata (title/description/OG/metadataBase) | `Implemented` | `layout.tsx` |
| **Contact 폼 제출** | **`Partial`** | 클라이언트 검증은 완전. **백엔드 없음** — `mailto:` URL 생성 후 `window.location.href`. 서버 전송·저장 없음 |
| **OG 이미지** | **`Not Implemented`** | `openGraph`에 `images` 키 없음 |
| **Validation 외부 Demo** | **`Not Implemented`** | 사용자 결정으로 CTA·상수 제거 |
| **Private AI 외부 Demo** | **`Not Implemented`** | `DEMO_URL` 자체가 없음 |
| **고아 페이지 4종** | **`Partial`** | 라우트는 200이나 네비 진입 불가 + 구버전 구조 |
| **Partner Products 콘텐츠** | **`Placeholder`** | `TodoNote` 2곳 — 파트너·제품 정보 미확보 |
| Capability 상세 5종 | `Partial` | 구버전 템플릿, slug ↔ 표시명 불일치 |
| 다국어(i18n) | `Not Implemented` | `lang="ko"` 고정, 번역 구조 없음 |
| 검색 / 필터 | `Not Implemented` | 없음 |
| Modal / Dialog | `Not Implemented` | 사이트 전체에 구현 없음 |
| 애널리틱스 | `Not Implemented` | GA·GTM 등 스크립트 없음 |
| `sitemap.xml` / `robots.txt` | `Not Implemented` | 파일·라우트 없음 |

---

## 9. Assets Inventory

### 9.1 사용 중인 Asset

| 파일 | 사용 위치 | 용도 |
|---|---|---|
| `/yonlab-logo-trim-removebg-preview.png` | `Header.tsx`, `Footer.tsx` | 로고 (투명 PNG) |
| `/axsl/axsl-hero.png` | AXSL 상세 Hero, `HomeBento`, `content.ts`(Home 카드) | AXSL 플랫폼 화면 |
| `/axsl/axsl-zoo.png` | `HomeBento` | AXSL Solution Zoo |
| `/axsl/axsl-demo-01/02/03.png` | AXSL Experience 캐러셀 | Solution Zoo / Kids Watch / Pet App |
| `/private ai/private_ai_YOnLab.mp4` | Private AI Hero | 홍보 영상 (1280×720) |
| `/private ai/private-ai-demo.mp4` | Private AI Experience | 데모 영상 (2880×1800) |
| `/private ai/private-ai-poster.png` | `content.ts`(Home 카드) | 데모 영상 poster 프레임 |
| `/berrywatch/berrywatch-hero.mp4` | Berrywatch Hero | 영상 (1104×816) |
| `/berrywatch/berrywatch-demo.png` | Berrywatch Experience, `content.ts`(Home 카드) | 서비스 시뮬레이터 화면 |
| `/occ/occ-hero.png` | AI OCC Hero | 일러스트 (1024×768) |
| `/occ/occ-demo.png` | AI OCC Experience, `content.ts`(Home 카드) | Pet Guardian 3분할 화면 |
| `/validation/validation-hero.png` | Validation Hero, `content.ts`(Home 카드) | 일러스트 (5504×3072) |
| `/validation/validation-demo.mp4` | Validation Experience | 콘솔 데모 (1920×1280) |
| `/apps/onpersona/privacy/index.html` | 직접 URL 서빙 | **별도 앱**(OnPersona) 개인정보처리방침 — Next 라우트 아님, 코드 참조 없음이 정상 |

### 9.2 코드에서 참조되지 않는 Asset — **삭제하지 않았습니다**

| 파일 | 크기 | 비고 |
|---|---|---|
| `/____cfe65555-807b-4c61-863d-88c336149ee1.jpeg` | 373KB | 용도 불명. 어디서도 참조되지 않음 |
| `/berrywatch/berrywatch-hero.png` | 1.6MB | 구 Hero 이미지. 현재는 `.mp4`로 대체됨 |
| `/favicon.svg` | — | 이전 Vite 사이트 잔존물. 현재 `<link>`로 참조되지 않음 (`/favicon.ico`가 사용됨) |
| `/icons.svg` | — | 이전 Vite 사이트의 SVG 스프라이트 |
| `/legal/*.docx` (2개) | 77KB | 법적 문서 **원본**. 코드 참조는 없지만 `public/`에 있어 **공개 다운로드 가능** |
| `/legal/*.pdf` (2개) | 275KB | 동일 |

### 9.3 아이콘

- **lucide-react** — 전 페이지에서 개별 import
- **자체 SVG 세트** `components/icons/index.tsx` — `Icon` + `IconName` 타입. 고아 페이지 4종 + `CoreCapabilities` + `TrustBand`(미사용) 등 10개 파일에서 사용
- 다이어그램·비주얼은 대부분 **인라인 SVG** (About Hero 스택, `HeroDiagram`, `ContactHeroVisual`, `EnvironmentHub`)

---

## 10. Technical / Maintenance Notes

> 발견 사항만 기록했습니다. **코드는 수정하지 않았습니다.**

### 10.1 중복 DOM (responsive 이중 렌더)

두 곳에서 동일 콘텐츠가 DOM에 **2번** 존재합니다. 한 시점에 하나만 보이며(`display:none`), 화면·접근성 문제는 없습니다.

1. `components/sections/Solutions.tsx` — `<SolutionPreview>`가 모바일 아코디언(`lg:hidden`)과 데스크톱 컬럼(`hidden lg:block`) 양쪽에 렌더 (활성 패널 1개분 중복)
2. `components/sections/ContactHeroVisual.tsx` — 문의유형 칩 4개가 데스크톱 절대배치 패널과 모바일 2열 그리드 양쪽에 렌더

**통합하려면 컨테이너 구조 재설계가 필요합니다** — 모바일/데스크톱에서 요소가 서로 다른 부모 안에 있어야 하기 때문입니다.

### 10.2 미사용 코드

- 컴포넌트 **17개**가 import 0회 (§4.4)
- `lib/company.ts`(220줄)는 `components/sections/company/*`에서만 쓰였는데 그 컴포넌트들이 전부 미사용 → **데이터도 사실상 사용되지 않음**
- `lib/solutions.ts`의 `standardSolutionSlugs`는 현재 **빈 배열** (공용 `[slug]` 라우트가 삭제된 흔적)
- `solutionPanels`의 6번째 항목 `partner-products`는 홈·네비 어디에도 노출되지 않음

### 10.3 Hard-coded content

- **Main Page 카피 일부가 컴포넌트에 하드코딩**되어 있습니다 (`HomeBento`, `CoreCapabilities` 섹션 설명 등). `lib/content.ts` 단일 소스 원칙에서 벗어나며, 의도적(다른 페이지 영향 차단)이지만 인지가 필요합니다.
- Solution 상세 5종은 각 `page.tsx` 상단 상수(`HERO_MEDIA`, `DEMO_VIDEO`, `DEMO_URL` 등)와 본문 카피를 **파일 내부에 직접** 보유합니다. 5개 파일에 동일 구조가 반복됩니다.

### 10.4 반복되는 style / 구조

- Solution 상세 5종이 **템플릿을 공유하지 않고 각각 300–440줄**로 유사 구조를 복제합니다. 공통 섹션(Hero / Overview / Experience / How It Works / Final CTA) 수정 시 **5개 파일을 모두 손봐야 합니다.**
- `MediaFrame` 함수가 `ai-occ`, `validation-automation`, `berrywatch-platform`, `private-ai-platform` 각 파일에 **로컬로 중복 정의**되어 있고, 파일마다 `object-fit` 기본값과 지원 타입(video/image)이 다릅니다.
- Final CTA 그라디언트 카드 마크업이 5개 상세 + Home ClosingCta에 반복됩니다.

### 10.5 임시 링크 / Placeholder

- `TodoNote` 2곳 (`/solutions/partner-products`) — 파트너·제품 정보 미확보 안내
- 외부 Demo URL 3종이 **`http://` + 고정 IP:포트**(`118.217.226.238:10100`)입니다. 도메인·HTTPS가 아니며, 서버가 내려가면 CTA가 죽습니다
- `ImageSlot`의 placeholder 분기는 남아 있으나 **현재 `src: null`인 슬롯은 없습니다** (전부 실제 이미지 연결 완료)

### 10.6 성능 / 용량

- `public/validation/validation-hero.png`가 **15.3MB**(5504×3072)입니다. 카드/Hero 표시 폭은 최대 640–700px이라 과대합니다. `images.unoptimized: true`이므로 **원본이 그대로 전송**됩니다
- `public/private ai/private-ai-demo.mp4` **13.3MB**
- 빌드 산출물 총 **59MB**. Cloudflare Workers 파일당 25MiB 한도 이내이지만 여유가 크지 않습니다
- 폰트를 `globals.css`의 `@import`로 로드합니다(Google Fonts + jsDelivr) → **렌더 블로킹 + 외부 의존**. `next/font`를 쓰지 않습니다

### 10.7 접근성 / 기타

- `Button` 컴포넌트는 `href`가 **필수**이며 `<Link>`만 렌더합니다. 실제 `<button>` 동작이 필요하면 새 컴포넌트가 필요합니다
- 폴더명 `public/private ai/`에 **공백**이 있어 코드에서 `%20`으로 참조합니다 (`/private%20ai/...`). 실수하기 쉬운 지점입니다
- `capabilities` 데이터의 slug는 `technical-consulting`인데 표시명은 `Engineering Consulting`으로 불일치합니다
- 사이트 전역에 `console.log`·디버그 코드가 없고, 실측 QA에서 **console error 0 / hydration warning 0**을 확인했습니다

### 10.8 저장소 운영

- `main` 외에 `feat/next-site`, `chore/favicon`, `cloudflare/workers-autoconfig`, `feat/v2-site` 브랜치가 있습니다
- **`cloudflare/workers-autoconfig`는 병합하면 안 됩니다** — `b469d8d`에서 분기해 `/apps/onpersona/privacy/`가 삭제되고, `compatibility_date`도 현재 배포본(2026-08-07)과 다른 2026-05-06입니다
- `main`에 push하면 Cloudflare Workers Builds가 **자동으로 Production을 재배포**합니다

---

## 11. Version 1.0 Baseline Summary

### ✅ Completed

- Next.js 15 App Router 정적 export + Cloudflare Worker Static Assets 배포 파이프라인
- 핵심 10개 페이지: Home / About / Contact / Privacy / Terms / Solution 상세 5종
- Header·Footer 네비게이션 (데이터 파생 구조로 드리프트 방지)
- Home 6섹션 + Solutions 인터랙티브 셀렉터
- Solution 상세 공통 5섹션 구조 (5종)
- 미디어 전량 연결 — 이미지 12종 + 영상 4종
- 외부 Demo 링크 3종 (AXSL·Berrywatch·AI OCC)
- 법적 문서 2종 원문 반영 (시행일 2026-08-14)
- favicon 3종 (ICO 16/32/48 + PNG 512 + apple-touch 180)
- 반응형 (`lg` 단일 분기 중심), `prefers-reduced-motion` 대응, skip link, noscript 폴백
- 기존 `/apps/onpersona/privacy/` 보존

### ⚠️ Partial

| 항목 | 내용 |
|---|---|
| Contact 폼 | 검증·UI는 완성. **백엔드 없음** — `mailto:`만 생성, 서버 전송·저장 없음 |
| 고아 페이지 4종 | `/solutions`, `/capabilities`, `/capabilities/[slug]`, `/solutions/partner-products` — 라우트는 살아 있으나 진입 경로 없음 + 구버전 구조 |
| Capability 상세 5종 | 구버전 템플릿, slug ↔ 표시명 불일치 |
| Experience 캐러셀 | 구현은 완료되었으나 5종 중 AXSL 1곳에서만 사용 |

### 🟡 Placeholder

| 항목 | 위치 |
|---|---|
| 파트너·제품 정보 미확보 | `/solutions/partner-products` `TodoNote` 2곳 |
| 외부 Demo URL | `http://` + 고정 IP:포트 3종 (도메인·HTTPS 아님) |
| 용도 불명 asset | `____cfe65555-....jpeg` 등 §9.2의 6개 항목 |

### 🚀 Recommended for V2.0

**구조**
1. Solution 상세 5종을 **공통 템플릿 + 데이터**로 통합 (현재 5파일 1,800줄 중복, `MediaFrame`도 4중 중복)
2. 고아 페이지 4종 처리 결정 — 재설계·네비 연결 또는 삭제
3. 미사용 컴포넌트 17개 + `lib/company.ts` 정리
4. Main Page 하드코딩 카피를 `lib/content.ts`로 이전할지 결정

**성능**
5. `validation-hero.png` 15.3MB 등 대용량 이미지 리사이즈 (현재 export 59MB)
6. 폰트를 `@import` → `next/font`로 전환 (렌더 블로킹·외부 의존 제거)
7. `images.unoptimized` 상태에서의 이미지 전략 재검토

**기능**
8. Contact 폼 실제 백엔드 연결 (현재 `mailto:` 의존)
9. OG 이미지, `sitemap.xml`, `robots.txt` 추가
10. 애널리틱스 도입 여부 결정
11. 외부 Demo URL을 도메인 + HTTPS로 이전

**운영**
12. `public/private ai/` 폴더명 공백 제거 검토 (`%20` 참조 제거)
13. `public/legal/`의 docx·pdf 원본 공개 노출 여부 결정
14. `capabilities` slug ↔ 표시명 불일치 정리
15. 중복 DOM 2곳(§10.1)은 컨테이너 재설계를 수반하므로 V2 리디자인 시점에 함께 처리

---

*본 문서는 커밋 `353a7db` (tag `v1.0.0`) 시점의 코드를 분석해 작성했습니다.*

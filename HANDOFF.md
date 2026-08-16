# HANDOFF — YOnLab Website

> 이 문서 하나로 현재 프로젝트 상태를 파악할 수 있도록 작성했습니다.
> 새 세션은 **코드를 수정하기 전에 이 문서를 끝까지 읽으세요.**
> 최종 갱신: 2026-08-16 — **정식 v1.0.0 완료 · Production 배포 중**

**상태 표기**: ✅ 완료 · 🟡 검토중(사용자 확인 대기) · ⏸ Pending(에셋·정보 확보 대기)

관련 문서
- `README.md` — 실행 방법, 폴더 구조
- `design-source/README.md` — **원본 기획/디자인 Source of Truth** (카피·토큰의 최종 근거)
  ⚠️ 원본은 구버전 기준(AXSL 없음, Partner Products 포함, 이메일 `business@`). **현재 사이트와 다른 부분이 많습니다.**
- `CHANGELOG.md` — 0.1.0 ~ **0.19.0**. 0.19.0이 이번(V2 최종) 항목
- `CLAUDE.md`, `design.md` — **존재하지 않음** (이 문서가 그 역할을 겸합니다)

---

---

## 0. v1.0.0 완료 상태 (2026-08-16)

**정식 v1.0이 Production에 배포되어 서비스 중입니다.**

| 항목 | 값 |
|---|---|
| 기준 커밋 | `353a7db` (tag **`v1.0.0`**) |
| 저장소 | `yubi-lee/yonlab-site` · production branch `main` |
| 배포 | Cloudflare Worker **`yonlab-site`** (Workers Static Assets) |
| 빌드 | `npm run build` → `./out` (Next.js 정적 export) |
| 도메인 | **www.yonlab.ai** / **yonlab.ai** |
| Preview | https://review.yonlab-website-preview.pages.dev (Cloudflare Pages, 검수용) |

**완료 페이지** — Home `/` · About `/company` · Contact `/contact` ·
개인정보처리방침 `/privacy` · 이용약관 `/terms` · Solution 상세 5종 `/solutions/*`
(기존 별도 앱 페이지 `/apps/onpersona/privacy/` 유지)

**완료 기능** — Solution 5종 미디어 전량 연결 · 외부 Demo URL 3종(AXSL·Berrywatch·AI OCC) ·
Main Solutions 카드 이미지 5종 · 법적 문서 실문서 반영(시행일 2026-08-14) ·
Contact 폼(mailto 방식, 외부 전송 없음) · favicon(16/32/48 ICO + 512 PNG + apple-touch-icon) ·
반응형 375/768/1440

### ⚠️ 이후 작업 규칙

- **v1.0 코드와 Production은 수정하지 않습니다.** tag `v1.0.0`으로 고정되어 있습니다.
- 이후 모든 디자인·기능 수정은 **`feat/v2-site` 브랜치**에서 진행합니다.
- 아래 §1 이후 내용은 v1.0까지의 작업 이력이며, 그대로 참고용으로 남겨둡니다.

---

## 1. Project Overview

**YOnLab** (Private Physical AI Engineering Company) 마케팅 웹사이트.
"AI를 실제 디바이스와 폐쇄망 환경에서 검증·최적화·운영 가능한 서비스로 만든다"는 메시지를 전달하는
B2B 코퍼레이트 사이트입니다.

- 언어: 한국어 중심 (영문 헤드라인 혼용)
- 톤: Clean · Technical · Premium · Minimal · Engineering-oriented
- 배포 전 V1 준비 단계

---

## 2. Current Project Status

| 영역 | 상태 |
|---|---|
| **Main Page (`/`)** | ✅ **거의 완료** — 디자인·카피·이미지 확정. **명시적 요청 없이 수정 금지** |
| Header / Footer / Nav | ✅ 완료 (v1.0 메뉴 트리). 로고만 투명 버전으로 교체됨 |
| Design System | ✅ 확립됨 (토큰·타이포·버튼·카드) |
| **Solution 상세 5종** | ✅ 템플릿·구조 완료 (§8). **미디어 5/5 연결 완료** |
| **`/company` (About)** | ✅ 6섹션으로 재구성 + 비주얼 개선 완료 — 일부 카피 🟡 |
| **`/contact`** | ✅ 리디자인 완료 (Hero·폼·문구). 동의 문구 → `/privacy` 링크 연결 |
| **`/privacy`, `/terms`** | ✅ **실문서 반영 완료** (원문 `public/legal/*.docx`, 시행일 2026-08-14) |
| `/solutions` 개요 | ⏸ 존재하나 **네비에서 링크되지 않음** — 처리 방침 미정 (§17) |
| `/capabilities` 계열 | ⏸ 페이지는 살아있으나 **네비에서 제외됨** — 처리 방침 미정 (§17) |
| `/solutions/partner-products` | ⏸ 구버전 템플릿 그대로. 유일하게 미전환 (§17) |
| 이미지/영상 | ✅ **5개 솔루션 Hero/Demo 전부 실물 연결 완료** (§13) |
| 배포 | ✅ Cloudflare Pages **Preview**만 운영 (§14-A). Production 미배포 |

---

## 3. Tech Stack

- **Next.js 15.5.x** (App Router) · **React 19** · **TypeScript 5.7**
- **Tailwind CSS v3** (config 기반, `tailwind.config.ts`)
- **lucide-react** 아이콘
- ESLint (`next lint`), 상태관리 라이브러리 없음 (로컬 `useState`만)
- 애니메이션 라이브러리 없음 — **CSS + IntersectionObserver**로 처리

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

> 개발 환경 메모: macOS, Node는 Homebrew(`/opt/homebrew/bin`). PATH에 없으면
> `export PATH="/opt/homebrew/bin:$PATH"` 필요.
> 프로젝트가 **OneDrive 경로**에 있어 빌드가 느리고, 파일 rename 시 동기화 충돌 위험이 있습니다.

---

## 4. Project Structure

```
app/
  layout.tsx                 # 루트 레이아웃
  page.tsx                   # ★ Main Page (6개 섹션 조립)
  company/page.tsx           # ★ About (6섹션, 2026-08-14 재구성)
  contact/page.tsx           # ★ Contact (Hero + 폼, 2026-08-14 리디자인)
  solutions/page.tsx         # Solutions 개요 (네비 미연결)
  solutions/private-ai-platform/page.tsx    # ★ 레퍼런스 템플릿 (§8)
  solutions/berrywatch-platform/page.tsx
  solutions/axsl/page.tsx
  solutions/ai-occ/page.tsx
  solutions/validation-automation/page.tsx
  solutions/partner-products/page.tsx       # 구버전 템플릿 (미전환)
  capabilities/page.tsx      # (네비 미연결)
  capabilities/[slug]/page.tsx
  privacy/ · terms/          # placeholder 법적 페이지
  # solutions/[slug]/page.tsx → 삭제됨 (§8.3)
components/
  layout/Header.tsx · Footer.tsx
  sections/                  # 페이지 섹션들 (아래 §6 참고)
  sections/solution-detail/  # 상세 템플릿 (SolutionHero, SolutionDetailTemplate …)
  sections/company/          # About 섹션들
  sections/mockups/Mockups.tsx  # 브라우저/앱윈도우/콘솔/폰 목업 프레임
  ui/                        # Button, Card, Tag, SectionHeading, ImageSlot …
lib/
  content.ts                 # ★ 모든 카피·라우트·데이터의 단일 소스
  solutions.ts · capabilities.ts · company.ts · cn.ts
hooks/useReveal.ts
public/                      # 이미지 asset
design-source/               # 원본 기획서 (수정 금지)
```

**핵심 원칙: 카피는 `lib/content.ts`에서만 관리합니다.** 컴포넌트에 하드코딩된 카피는
Main Page 리디자인 과정에서 일부 발생했으니(§17) 수정 시 위치를 먼저 확인하세요.

---

## 5. Main Page Status

**완료에 가까운 상태입니다. 명시적 요청이 없으면 어떤 섹션도 수정하지 마세요.**

`app/page.tsx`는 6개 섹션만 조립합니다:

```
Hero → HomeBento → WhyYonlab → CoreCapabilities → Solutions → ClosingCta
```

이번 세션에서 **제거된 섹션** (컴포넌트 파일은 보존, 홈에서만 미사용):
- `ActionShowcase` — 내용 중복 + 빈 이미지 슬롯
- `MetricBand`(KPI 밴드, `variant="card"`) — 홈에서 제거 (About 페이지에서는 계속 사용)
- `TrustBand`(주요 고객 산업군) — 홈에서 제거
- `ContactCta` — `ClosingCta`로 대체

---

## 6. Main Page Section Structure

### 6.1 Hero — `components/sections/Hero.tsx`
- 흰 배경 위 **네이비 라운드 패널**(`bg-navy`, `rounded-hero`, `min-h-[602px]`, `py-[88px]`)
- 배경 레이어: 블루 radial glow + linear tint + **`.streaks`(세로 스트리크)** + `.dot-grid` + **`.grain`**
- **Eyebrow 삭제됨** — 헤드라인이 Hero의 첫 요소
- H1 4줄, `lg:text-[94px]`, `tracking-[-0.04em]`, `leading-[1.02]`, `lg:whitespace-nowrap`
  → `Trusted / Intelligence. / Verified in the / Real World.`
- 줄 단위 등장(`.reveal-lines`, 로드 시 재생)
- 리드문 → CTA **`Explore Solutions →` 1개만** (`#home-solutions`로 스크롤). Contact Us 버튼 삭제됨
- 우측: `HeroDiagram` (AI Model → AI Optimization → On-Device Runtime → AI Validation, Verification Loop)
- 좌하단 SCROLL 큐

### 6.2 HomeBento (Intro) — `components/sections/HomeBento.tsx`
- 상단: H2 `화면 속 AI를 넘어, / 현실에서 작동하는 AI로.` + 우측 설명 + **`Contact us →`** (→ `/contact`)
- 하단: **두 카드를 하나의 그룹 컨테이너로 묶음** (`rounded-[32px] border border-line-soft bg-surface p-3/4`)
  - **LEFT 카드** (AXSL): 배경 `bg-gradient-to-b from-white via-[#F7FAFF] to-[#EAF2FF]`(아이스 블루)
    - 타이틀 `복잡한 AI 도입을, / 더 빠른 실행으로.`
    - **AXSL 실제 스크린샷 2장 나란히** — `aspect-[2/1]` 프레임, **`object-contain`**(잘림 없음)
    - 하단 4스텝 플로우: `AI Service → Easy Access → Fast Build → Deployment`
      (앞 3개 아이콘칩 `bg-blue`, 마지막 `bg-navy` — 우측 카드와 컬러 밸런스)
  - **RIGHT 카드**: 블루→네이비 radial gradient, 타이틀 `다양한 환경에서도, / 안정적으로 작동하도록.`
    - **EnvironmentHub**: 중앙 아이소메트릭 큐브 + 오빗 링(실선/점선) + 6개 노드
    - 태그 6종: NPU · Chipset · SDK / Runtime · OS / BSP · Edge Device (헤어라인 커넥터 + sky 노드 점)
  - 두 카드 **높이 동일(412px)**, `items-stretch`

### 6.3 Why YOnLab — `components/sections/WhyYonlab.tsx`
- 배경 흰색, 좌측 `SectionHeading index="01"` + 대형 아웃라인 "01"
- 컬럼 헤더: `CUSTOMER CHALLENGE` (12px muted) / **`OUR SOLUTION`** (13.5px, **brand blue**, 하단 48px 블루 라인)
- 5행: 번호칩 → 고객 문제(muted 17/18px) → 점선 화살표 → 체크 + 해결(navy semibold 17/19px)
- 카피는 `\n`으로 줄바꿈 지정, `whitespace-pre-line`
- **hover 인터랙션 전부 제거됨** (번호칩·행·화살표 모두 정적)
- 혼합 KO/EN 균일 렌더를 위해 `.font-kr`(Pretendard 우선) 적용
- 행 등장은 `.scroll-rise`(scroll-driven)

### 6.4 Core Capabilities — `components/sections/CoreCapabilities.tsx`
- 배경 흰색 + blueprint grid + 우상단 동심원 SVG
- 5개 **다크 네이비 프리미엄 카드**(`ui/Card.tsx`), 카드 높이 동일
- **번호(01~05) 제거됨**, 아이콘만 우측 상단 유지, 카드 상단 패딩 `!pt-5`로 콘텐츠 무게중심 상향
- 제목은 **단어별 2줄 고정**, 본문 `min-h-[74px]`, 태그는 **2×2 그리드**(`grid-cols-[auto_auto]`, 11px)
- **카드는 링크가 아님** (Capability 상세 페이지 미노출 상태라 `href`·`Learn More` 제거)
- 순서: Embedded Engineering → Platform Engineering → **AI Optimization → AI Validation** → Engineering Consulting

### 6.5 Solutions (Preview) — `components/sections/Solutions.tsx`
- 좌측 네비(5개, 번호 유지 + active 블루 바/화살표) + 우측 단일 Detail 카드
- **모든 카드 동일 셸**: 흰 배경, `rounded-panel`, `lg:min-h-[504px]`, 프리뷰 프레임 **16:10 고정**
  → 전환 시 레이아웃 시프트 없음 (AI OCC 전용 다크 카드 제거됨)
- Detail 카드: **번호만 표시**(카테고리 라벨 삭제) → 타이틀 → 설명 → 태그 → **`Explore Solution →`**
- 괄호 제품명은 `DetailTitle`이 괄호 앞에서 줄바꿈 + 괄호 내부 `nowrap` (`AI OCC / (OnCare Circle)`)
- 프리뷰는 `ImageSlot` placeholder (실제 스크린샷 대기)

### 6.6 Closing CTA — `components/sections/ClosingCta.tsx`
- **흰 배경 위 인셋 그라디언트 카드** (풀블리드 네이비 아님)
- 그라디언트 `linear-gradient(100deg,#2C7BFF,#016CFF 34%,#013A9E 72%,#001A4D)`, `rounded-[32px]`
- 폭은 **`max-w-wide`** — Core Capabilities/Solutions와 좌우 정렬선 일치
- 좌: `Turn Your AI Challenge / into Reality.` (38px) — **CONTACT 라벨 삭제됨**
- 우: 설명 → **Mail 아이콘 + contact@yonlab.ai**(mailto) → **화이트 CTA 버튼**
  (default 흰 배경/navy 텍스트 → hover `#F7FAFF`/**blue 텍스트·화살표**, 220ms)
- 가운데 divider: 카드 높이의 70%, `white/10`, 세로 중앙, 모바일 숨김
- 높이 ~293px (Hero의 축소판이 되지 않도록 의도적으로 낮음)

---

## 7. Solutions Structure

**확정된 5개 Solution (순서 고정)** — `lib/content.ts`의 `solutionPanels` + `homeSolutionSlugs`

| # | 이름 | slug / route | 태그 |
|---|---|---|---|
| 01 | **AXSL** | `/solutions/axsl` | AI Service · Easy Access · Extensible |
| 02 | Private AI Platform | `/solutions/private-ai-platform` | On-Premise · RAG · Private AI |
| 03 | Berrywatch Service | `/solutions/berrywatch-platform` | Kids Care · Location Monitoring · Smart Watch |
| 04 | AI OCC (OnCare Circle) | `/solutions/ai-occ` | Location Sharing · Safe Zone · Emergency SOS · Activity History |
| 05 | Validation Automation | `/solutions/validation-automation` | Device Test · Validation · Automation · Reporting |

- **Partner Products**: 5개 목록에서 제외됨. 단 `/solutions/partner-products` 페이지와 데이터는
  **삭제하지 않고 유지**(페이지가 `getSolutionDetail("partner-products")`에 의존). 현재 어디서도 링크되지 않음.
- **네이밍 변경**: Berrywatch **Platform → Service**, AI OCC → **AI OCC (OnCare Circle)**
  - OCC는 Operation Control Center가 **아님**. **OnCare Circle**(가족·보호자 위치 기반 안전 케어)
  - Berrywatch는 현장 관제/SOP가 **아님**. **스마트워치 기반 키즈 위치·안전 케어 서비스**
- **CTA 통일**: 5개 모두 `Explore Solution →`, 내부 라우트만 사용(외부 URL 금지)
- 헤더 드롭다운(`megaSolutions`)은 **`solutionPanels`에서 파생** → 데이터 드리프트 불가
- 푸터 SOLUTIONS 컬럼도 동일 5개

---

## 8. Solution Detail Template ✅ (구현 완료)

**`Private AI Platform`이 레퍼런스 템플릿입니다.** 새 상세 페이지를 만들거나 고칠 때
`app/solutions/private-ai-platform/page.tsx`를 먼저 보세요.

### 8.1 공통 5섹션 구조 (이 5개만 사용)

```
01 Hero  →  02 Solution Overview  →  03 Experience  →  04 How It Works  →  05 Final CTA
```

**삭제 확정 섹션** (다시 넣지 마세요): 고객 문제/YOnLab 접근 · 주요 제공 범위 ·
Expected Outcomes(기대 효과) · 이 솔루션을 뒷받침하는 역량 · Other Solutions · 근거 없는 메트릭.

### 8.2 섹션별 공통 스펙 (5개 페이지 동일)

| 섹션 | 배경 | 컨테이너 | 핵심 |
|---|---|---|---|
| Hero | `bg-navy` + radial + `.dot-grid` | `max-w-wide`, `lg:grid-cols-[0.92fr_1.08fr]` | 좌 텍스트 / 우 16:9 미디어(`lg:max-w-[640px]`) |
| Overview | `bg-white`, `border-t border-line` | `max-w-content`, `lg:grid-cols-[0.9fr_1fr]` | 좌 제목+선언문 / 우 설명 2단락 + `Tag` 키워드 |
| Experience | `bg-surface` + `scroll-mt-20` | `max-w-wide`, 프레임 `max-w-[1100px]` | 중앙 헤더 + 대형 16:9 미디어 / 캐러셀 |
| How It Works | **`bg-white`** (다크 아님) | `max-w-wide` | 흰 원형 칩 + `text-blue` 번호 + `bg-line` 커넥터 |
| Final CTA | `bg-white` 위 인셋 그라디언트 카드 | `max-w-wide`, `rounded-[24px]/lg:[32px]` | 좌 헤드라인 / 우 설명 + 화이트 pill 버튼 |

- **Hero CTA 2개 고정**: `프로젝트 상담`(primary) + 섹션 이동용 ghost 버튼(`#demo` 또는 `#experience`).
  **`전체 솔루션` 버튼은 제거됨**
- 섹션 패딩 `py-20 / lg:py-[120px]`, 거터 `px-6 sm:px-14` 공통
- How It Works 스텝 수는 솔루션별로 다름: Private AI 5 · Berrywatch 4 · AXSL 4 · AI OCC 4 · Validation 6
  (Validation만 `lg` 3+3 → `xl` 6단, 줄바꿈 지점 커넥터 `hidden xl:block`)

### 8.3 라우팅 구조 (중요)

5개 솔루션 모두 **전용 라우트 파일**을 가집니다. 공용 `[slug]` 템플릿은 **삭제되었습니다**.

- `lib/solutions.ts`의 `dedicatedSolutionSlugs`에 slug가 있으면 `standardSolutionSlugs`에서 제외됨
- 현재 `standardSolutionSlugs`는 **빈 배열**
- 미사용으로 남은 파일: `SolutionDetailTemplate.tsx` · `SolutionHero.tsx` · `ProductVisual.tsx`
  (삭제하지 않고 보존 — `partner-products`가 일부 의존)

### 8.4 미디어 교체 방법 ⏸

각 페이지 상단 상수 한 줄만 바꾸면 됩니다. 자세한 목록은 §13.

```ts
const HERO_VIDEO: string | null = null;   // → "/파일명.mp4"
const DEMO_VIDEO: string | null = null;
const showcase = [{ …, src: null }];      // → src: "/파일명.png"
```

`ExperienceCarousel`은 `src`가 `null`이면 라벨이 붙은 placeholder를, 값이 있으면
`next/image`(`object-contain`)를 렌더합니다. **가짜 UI·스톡 이미지는 만들지 않습니다.**

---

## 9. AXSL Direction

**AXSL = AI eXtensible Service Library**

포지셔닝(중요):
- AI 전문가용 복잡한 개발 도구가 **아닙니다**.
- **특정 상황·문제·목적에 필요한 AI 기능/서비스를 쉽고 빠르게 활용하도록 제공하는 AI Service Library**입니다.
- 핵심 소구점: YOnLab의 기술력으로 **다양한 요구에 맞는 AI 서비스를 빠르게 구현·제공**할 수 있다.

현재 구현 상태:
- Solutions 01번으로 등재, 상세 라우트 `/solutions/axsl` 생성됨(200). 상세 콘텐츠는 아직 구버전 템플릿 + TODO
- 홈 Intro LEFT 카드가 AXSL 영역 — **실제 서비스 스크린샷 2장**(`/public/axsl-hero.png`, `/axsl-zoo.png`)
  + 4스텝 플로우(AI Service → Easy Access → Fast Build → Deployment)
- 스크린샷은 상단 계정 바(`giselle.shin / 로그아웃`)를 **크롭 완료**한 상태
- 실제 서비스 URL은 **연결하지 않음** (추후 상세 페이지 내부에서 연결 예정)

---

## 10. Design System (실측 기준)

### 폰트
```
sans: "Helvetica Neue", "Arimo", "Inter", "Pretendard", "Noto Sans KR", Arial, system-ui
```
- 라틴은 Helvetica Neue(macOS) → 없으면 **Arimo**(임베드, Apache 라이선스) → Inter
- 한글은 **Pretendard** (globals.css `@import`)
- `.font-kr` 유틸: 혼합 KO/EN 문장에서 라틴이 과하게 굵어 보이지 않도록 Pretendard 우선
- body `letter-spacing: -0.01em`

### 타이포 스케일 (실제 값)
| 역할 | 값 |
|---|---|
| Hero H1 | 42 / 68 / **94px**, weight 800, `-0.04em`, `leading 1.02` |
| Section H2 (`SectionHeading`) | 42 / 52 / **68px**, 800, `-0.04em`, `leading 0.98` |
| Intro H2 (HomeBento) | 32 / 44 / **52px**, 800, `-0.03em`, `leading 1.15` |
| Closing CTA H2 | 26 / 32 / **38px**, 800, `-0.025em` |
| 카드 H3 | 26~27px, 700~800, `-0.02em` |
| Solution Detail H3 | 28 / 34px, 800 |
| 본문 | 15 / 15.5 / 17 / 18px, `leading 1.55~1.65` |
| Eyebrow / 라벨 | 11~13px, 700, uppercase, `tracking .12~.16em` |
| GNB | **19px, weight 400**, `-0.02em`, 대문자 변환 없음 |

### 컬러 토큰 (`tailwind.config.ts`)
```
navy    #001850   ink   #071B45
blue    #016CFF (CTA/active 전용) · blue-hover #003090
sky     #4EA0FF · sky-light #7DB4FF
surface #F7FAFF · surface-alt #EEF3FF · surface-2 #DCE7FF · surface-3 #E9F0FF
ground  #EEF2FA (도입했으나 현재 홈은 흰 배경 사용)
line    #D8E4F5 · line-soft #E6EDF7 · line-card #E1EAF6 · line-deco #C6D6EE
muted   #4B5E83 · faint #8496B5 · idle #AEBFDD
```
**컬러 규칙: 블루(#016CFF)는 CTA·active·포인트에만.** 나머지 위계는 navy.

### 그라디언트
- Hero 패널: navy + 블루 radial glow + linear tint
- Intro RIGHT 카드: `radial-gradient(120% 130% at 15% 0%, #2C7BFF, #016CFF 34%, #012C86 72%, #001236)`
- Intro LEFT 카드: `linear-gradient(to bottom, #FFF, #F7FAFF, #EAF2FF)`
- Closing CTA: `linear-gradient(100deg, #2C7BFF, #016CFF 34%, #013A9E 72%, #001A4D)`

### 레이아웃
- `max-w-wide 1360` (Core Capabilities · Solutions · **Closing CTA**)
- `max-w-content 1280` (Hero 내부 · HomeBento · Why)
- `max-w-prose 1120` · `max-w-hero 1280`
- 섹션 거터: `px-6` / `sm:px-14`(56px) — **전 섹션 공통**
- 섹션 패딩: `py-20` / `lg:py-28` 또는 `lg:py-[120px]`

### Radius / Shadow / Border
- 버튼: **`rounded-full`(pill)** — 전역 통일
- 카드: `rounded-[22px]`(Card) · `rounded-[24px]`(Intro 카드) · `rounded-panel 24px`(Solution 프리뷰)
- 그룹 컨테이너 / Closing CTA: `rounded-[32px]` (모바일 24px)
- shadow: `card 0 10px 28px rgba(0,24,80,.09)` · `panel 0 12px 34px rgba(0,24,80,.06)` 등 얕고 부드럽게
- border: `border-line` / `border-line-soft`

### 이미지 처리
- 실제 스크린샷: `next/image` + **`object-contain`**(잘림 금지) + 고정 aspect 프레임
- 미준비 이미지: **`ui/ImageSlot.tsx`** — 사선 패턴 + 라벨 (회색 박스 금지)
- 제품 목업 프레임: `sections/mockups/Mockups.tsx` (browser / appWindow / console / analytics / phone)

### 버튼
- Primary: `bg-blue text-white rounded-full`, hover `bg-blue-hover`
- Ghost: 투명 + `border-white/34` (다크 배경용)
- White CTA (Closing): 흰 배경 + navy 텍스트 → hover off-white + **blue 텍스트/화살표**, 220ms
- 화살표는 hover 시 `translate-x-1` 정도만

### Animation / Motion
- `[data-reveal]` + `hooks/useReveal.ts` (IntersectionObserver) — 기본 스크롤 리빌
- **`.reveal-lines`** — 헤드라인 줄 단위 등장 (마스크 + 디센더 보호 패딩 필수)
- **`.scroll-rise`** — `animation-timeline: view()` 스크롤 연동 등장 (Why 행 · 역량 카드)
- `.streaks` / `.grain` / `.dot-grid` / `.blueprint-grid` — 배경 텍스처 유틸
- `prefers-reduced-motion` 전역 존중
- **과한 glow·scale·파티클 금지**

### Responsive
- Tailwind 기본 브레이크포인트(`sm 640 / md 768 / lg 1024`)
- `lg` 미만에서 GNB → 햄버거 시트, Intro/Solutions 2열 → 1열, Closing divider 숨김
- 모바일 가로 오버플로 0 확인 완료

---

## 11. Confirmed Design Decisions (사용자 확정 사항)

1. **배경은 흰색** — 한때 소프트 그레이(`ground`)를 적용했다가 **흰색으로 되돌림**
2. **라이트 방향 확정** — 다크 글로우 하이브리드 홈은 검토 후 **폐기**
3. GNB: **가운데 정렬**, About / Solutions / Contact 3개, 대문자 변환 없음, hover **파란색**, 굵기 변화 없음
4. Header의 파란 `Contact Us` 버튼 **삭제**
5. Hero: eyebrow 삭제, CTA는 `Explore Solutions` **1개만**
6. Solutions는 **부모 네비 역할만** — 자체 링크 없음. About/Contact는 단일 페이지 링크
7. 이메일 **`contact@yonlab.ai`로 전사 통일** (기존 business@ 폐기)
8. Core Capabilities 카드 **번호 제거**, 순서 03↔04 교체
9. Why YOnLab **hover 인터랙션 전면 제거**, `OUR SOLUTION` 헤더만 살짝 강조
10. Closing CTA는 **두 번째 Hero가 되면 안 됨** — 인셋 카드, 낮은 높이
11. Intro 두 카드는 **하나의 그룹**처럼, 좌우 시각 무게 균형
12. AXSL 썸네일은 **잘리지 않게**(`object-contain`), LEFT 카드는 **아이스 블루** 톤
13. 참고 사이트: onramper.com(레이아웃·타이포), stepai.kr(GNB·스크롤), sktch(GNB 크기)
    — **1:1 복제 금지, 감도만 흡수**

---

## 12. Protected / Do Not Modify Areas

**⚠️ 명시적 요청 없이 절대 수정하지 마세요.**

- **Main Page 전체 디자인** (`app/page.tsx` + 6개 섹션 컴포넌트)
- Hero 구성·다이어그램·배경 텍스처
- HomeBento 두 카드 (특히 RIGHT 카드 — 사용자가 만족 확정)
- Why YOnLab 구조·카피
- Core Capabilities 카드 디자인
- Solutions 프리뷰 셸(동일 크기 규칙)
- Closing CTA
- `components/layout/Header.tsx`, `Footer.tsx`
- Global Navigation 구조
- `tailwind.config.ts` 토큰 · `app/globals.css` 유틸
- 기존 반응형 구조
- 확정 카피 (`lib/content.ts`)
- `public/`의 실제 이미지 asset
- `design-source/` (원본 — 수정·삭제·이동 금지)
- **`components/ui/PageHero.tsx`** — `/capabilities`, 법적 페이지, Capability 상세,
  Solutions 개요 등 5곳이 공유. Contact처럼 페이지 전용 히어로가 필요하면 **해당 페이지에 인라인으로** 작성

**재설계 완료 영역** (2026-08-14) — 요청받은 범위 밖으로 임의 변경 금지
- Solution 상세 5종 + 공통 템플릿 (§8)
- `/company` (About) 6섹션
- `/contact` Hero·폼

**작업 원칙**
- 요청받은 영역만 수정하고 주변은 건드리지 않습니다.
- "더 좋아 보이게" 같은 이유로 **요청하지 않은 리디자인 금지**.
- 카피는 창작하지 않습니다 — `design-source/README.md` 또는 사용자 지시가 근거.
- 공용 데이터(`lib/content.ts`) 수정 시 **다른 페이지 영향**을 먼저 확인하세요.

---

## 13. Assets

### 13.1 현재 `public/` 구조

```
public/
├─ axsl/
│   ├─ axsl-hero.png      ← AXSL 상세 Hero (browser mockup 안)
│   ├─ axsl-demo-01.png   ← Experience 슬라이드 01 (Solution Zoo)
│   ├─ axsl-demo-02.png   ← 슬라이드 02 (Kids Watch)
│   ├─ axsl-demo-03.png   ← 슬라이드 03 (Pet App)
│   └─ axsl-zoo.png       ← **홈 Intro 카드 전용** (AXSL 상세에서는 미사용)
├─ berrywatch/
│   ├─ berrywatch-hero.mp4   ← Hero 영상 (1104×816, 4초)
│   ├─ berrywatch-demo.png   ← Experience 단일 이미지
│   └─ berrywatch-hero.png   ← 구 Hero 이미지, **현재 미사용**
├─ private ai/                ← ⚠️ 폴더명에 공백 → 코드에서 `%20`으로 참조
│   └─ private_ai_YOnLab.mp4  ← Private AI Hero 홍보 영상
├─ yonlab-logo-trim-removebg-preview.png  ← 헤더·푸터 공용 로고(투명)
└─ ____cfe65555-….jpeg        ← 용도 불명, 어디서도 참조 안 함 (정리 후보)
```

- 홈(HomeBento)은 `axsl-hero.png` + `axsl-zoo.png`를 씁니다. **경로 변경 시 홈도 함께 확인**.
- 구 로고·시안 HTML 5종·백업 PNG는 삭제 완료(git 복구 가능).

### 13.2 미디어 연결 현황 (코드 상수 기준)

| 페이지 | Hero | Experience/Demo | Demo URL |
|---|---|---|---|
| AXSL | ✅ `axsl/axsl-hero.png` | ✅ demo-01/02/03 | ✅ `…/public/axsl.html` |
| Private AI | ✅ `private ai/private_ai_YOnLab.mp4` | ✅ `private ai/private-ai-demo.mp4` | — (CTA 없음) |
| Berrywatch | ✅ `berrywatch/berrywatch-hero.mp4` | ✅ `berrywatch/berrywatch-demo.png` (1장) | ✅ `…/public/wearables.html` |
| AI OCC | ✅ `occ/occ-hero.png` | ✅ `occ/occ-demo.png` (1장, 캐러셀 미사용) | ✅ `…/public/pet.html` |
| Validation | ✅ `validation/validation-hero.png` | ✅ `validation/validation-demo.mp4` | — (**CTA 삭제됨**) |

**object-fit 규칙** — 프레임은 전부 16:9. 소스 비율이 다르면 다음 기준으로 적용합니다.
- `contain`(기본, 크롭 금지): Private AI Demo(16:10) · Validation Demo(3:2) · Berrywatch Hero(4:3)
- `cover`(예외): AI OCC Hero(4:3, 상하 검은 레터박스가 baked-in이라 cover로 제거) ·
  Validation Hero(1.79 ≈ 16:9, 크롭 0.4%) — **UI가 잘리지 않는 경우에만** 허용

**교체 방법**: 각 페이지 상단 상수에 경로만 넣으면 됩니다. placeholder → 실제 미디어로 자동 전환.
`DEMO_URL`이 null이면 Experience 하단 CTA가 비활성(회색) pill, 값이 있으면 blue pill + 새 탭.

- 프레임은 전부 16:9 + `object-contain` → **어떤 비율이 와도 크롭 없음**(대신 여백 발생)
- **가짜 대시보드·스톡 이미지·임의 URL 생성 금지**

## 14. Routing / Navigation

**Header (v1.0)** — 가운데 정렬
- `About` → `/company`
- `Solutions` → **링크 없음**(드롭다운만) → 하위 5개만 각 상세로
- `Contact` → `/contact`

**Footer** — 헤더와 동일 구조
- `About`(제목 링크 → `/company`) / `Solutions`(**제목 링크 없음** + 하위 5개) / `Contact`(제목 링크 → `/contact` + `contact@yonlab.ai`)
- 하단: Privacy Policy · Terms of Use

**전체 라우트**: `/` · `/company` · `/contact` · `/solutions` · `/solutions/[5 slugs]` ·
`/solutions/partner-products` · `/capabilities` · `/capabilities/[5 slugs]` · `/privacy` · `/terms`

> 솔루션 5개는 이제 **각자 전용 라우트 파일**로 서빙됩니다(§8.3). 동적 `[slug]` 라우트는 삭제됨.

---

## 14-A. Deployment — Cloudflare Pages Preview ✅

**리뷰용 Preview만 운영 중입니다. Production 배포 이력 없음, 도메인·DNS 미설정.**

| 항목 | 값 |
|---|---|
| Preview URL | **https://review.yonlab-website-preview.pages.dev** |
| 프로젝트 | `yonlab-website-preview` (Cloudflare 계정 `joykevin90@daum.net`) |
| 배포 브랜치 | `review` (Environment: **Preview**) |
| Production branch | `production` — **배포된 적 없음** |
| 접근 제어 | 없음. 링크만 있으면 누구나 열람 가능 (Access/Zero Trust 미설정) |

빌드·배포 2단계 (dev 서버는 반드시 먼저 종료):

```bash
STATIC_EXPORT=1 npm run build
npx wrangler pages deploy out --project-name=yonlab-website-preview --branch=review
```

- `next.config.mjs`는 `STATIC_EXPORT=1`일 때만 `output: "export"` + `images.unoptimized` 적용.
  기본 `npm run build` 동작은 불변
- ⚠️ **dev 서버 실행 중 `npm run build` 금지** — `.next`가 덮여 dev의 JS 청크가 404가 됩니다
  (이 세션에서 2회 발생). 겪었다면 `rm -rf .next && npm run dev`
- Preview는 **비공개가 아닙니다.** 사내 한정이 필요하면 Cloudflare Access 별도 설정 필요(현재 미적용)

---

## 15. Completed Work

### 15.5 최근 변경 (2026-08-14 · 4차) ✅ — V2 최종

- **Main Solutions 카드에 실제 제품 이미지 연결** (5장 중 4장).
  `ImageSlot`이 `src`를 받으면 `next/image`(`object-contain`)를 렌더하고, 없으면 기존 placeholder 유지.
  `slot.src`는 `lib/content.ts`에 데이터로 존재 → 목업 5종(browser/appWindow/console/analytics/phone) 공통 적용

  | 카드 | 연결한 asset | 슬롯 | 원본 비율 | letterbox(각 변) |
  |---|---|---|---|---|
  | 01 AXSL | `/axsl/axsl-hero.png` | 16/10 | 1.84 | 상하 6.5% |
  | 02 Private AI | **없음 → placeholder 유지** | 16/10 | — | — |
  | 03 Berrywatch | `/berrywatch/berrywatch-demo.png` | 16/10 | 1.85 | 상하 6.8% |
  | 04 AI OCC | `/occ/occ-demo.png` | 16/10 | 1.97 | 상하 9.4% |
  | 05 Validation | `/validation/validation-hero.png` | 16/9 | 1.79 | 상하 0.3% |

  - **Private AI는 정지 이미지 asset이 없습니다** — 확보된 것이 영상 2종뿐이라 임의 이미지를 만들지 않고
    placeholder를 유지했습니다(`slot.src: null`).
  - 제품 UI 스크린샷이라 `cover`로 좌우를 자르면 실제 인터페이스가 잘려 **전부 `contain`**.
    여백은 목업 프레임 본체(흰색) 위에 얹혀 창 패딩처럼 읽힙니다.
  - `berrywatch-hero.png`(검은 배경 디바이스 컷)와 `occ-hero.png`(레터박스 baked-in)는
    흰 목업 안에서 어색해 **선택하지 않았습니다.**
- **About Hero 텍스트 노드 정리** — `<br />` 앞에 공백을 넣어 텍스트로 읽을 때
  `적용하는일을`이 아니라 `적용하는 일을`이 되도록 수정. 줄 끝 공백은 렌더되지 않아 2줄 레이아웃 불변

### 15.4 최근 변경 (2026-08-14 · 3차) ✅ — 콘텐츠 확정 + 전체 QA

- **미디어 전량 연결**: AI OCC(Hero/Demo) · Validation(Hero/Demo) · Private AI Demo
- **Demo URL 연결**: Berrywatch `wearables.html` · AI OCC `pet.html`.
  Validation은 사용자 지시로 **Experience 하단 CTA 자체를 삭제**(`DEMO_URL` 상수도 제거)
- **`/privacy`, `/terms` 실문서 반영** — `public/legal/*.docx` 원문을 `lib/legal.ts`에 전사,
  `components/sections/LegalDocument.tsx` 신설. 구 `LegalPage.tsx`는 미사용으로 잔존
- **About Engineering Context 카드 리디자인** — 카드를 가로지르던 파란 arc 제거,
  공통 아이스블루 서피스 + blueprint 헤어라인 + LAYER 인덱스 강화 + 칩 정돈
- **최종 카피 수정**: Validation(키워드 3 · Experience 2문단 · How It Works 6스텝 전면 교체) ·
  AXSL Discover lead · Contact 동의 문구(→ `/privacy` 링크, 보유기간 표현은 방침 문서로 일원화)
- **Legal 문서 spacing**: `시행일 | 날짜`, `1. 제목`이 실제 공백을 갖도록 수정
  (기존에는 flex gap/margin뿐이라 텍스트 추출·복사 시 붙었음)

### 15.3 최근 변경 (2026-08-14 · 2차) ✅

- **에셋 재배치 대응** — 사용자가 `public/`을 폴더 구조로 정리 → 코드 참조만 갱신
  (`/axsl/*`, `/berrywatch/*`, `/private%20ai/*`). 파일 이동·리네임은 하지 않음
- **AXSL**: Hero를 **browser mockup**(신호등 dot + 빈 주소창 + blue accent) 안에 배치,
  Experience 슬라이드 3장을 `axsl-demo-01/02/03`로 연결, **Demo URL 실연결**(안내문구 삭제)
- **Berrywatch**: Hero를 `berrywatch-hero.mp4`(autoplay·muted·loop·playsInline)로 교체,
  Experience는 **캐러셀 제거 → 단일 이미지** `berrywatch-demo.png`
- **Solution 5종 Hero Secondary CTA 통일** → `View Demo →`(우측 화살표, ↓ 금지)
- **Experience 하단 Demo CTA 통일** → `View Demo ↗` (AXSL과 동일 위치·크기·스타일,
  Berrywatch·AI OCC·Validation은 `DEMO_URL` 미연결이라 현재 비활성 pill)
- **About**: Brand Blue 컬러 계층 강화, What We Work On 밀도 개선(2×2, 숫자 24px),
  Engineering Context를 3-card + **카드를 가로지르는 연속 arc** 배경으로 재구성,
  Hero 확대(`min-h-[620px]`, 헤드라인 xl 60px)
- **Contact**: Hero 확대(`min-h-[620px]`, 헤드라인 xl 66px), 노드 패널 확대
- **반응형 DOM 중복 제거** — About·Solution 5종의 스텝 플로우가 desktop/mobile 2벌로
  렌더되던 것을 **단일 markup + CSS 반응형**으로 통합
- 홈 Hero 상단 여백 `pt-6 → pt-2`(헤더 아래 흰 띠 균형)

### 15.2 이번 세션 (2026-08-14 · 1차) ✅

- **Solution 상세 5종 전면 재설계** — 공통 5섹션 템플릿 확립(§8). Private AI가 레퍼런스
- 신규 라우트 5개 + `ExperienceCarousel` 컴포넌트 1개. 구 `[slug]` 동적 라우트 삭제
- **About(`/company`) 6섹션 재구성** + 비주얼 완성도 개선(실행 스택 SVG, 2×2 에디토리얼,
  대형 넘버럴 플로우, 다크 Industries, 3층 스택)
- **Contact 리디자인** — Hero 블루 필드 비주얼, Inquiry 섹션 틴트 배경, 폼 선택 상태·focus·pill 버튼,
  Hero 문구 교체(`Let’s Build What Works in the Real World.`)
- About/Contact Hero **eyebrow 제거**
- 로고 에셋 1개로 통일(투명 PNG), `public/` 정리(시안 5 + 백업 2 + 구 로고 삭제)
- `next.config.mjs` opt-in 정적 export 추가
- **Cloudflare Pages Preview 배포 구축**(§14-A)

### 15.1 이전 세션 (~2026-08-13) ✅

- 메뉴 트리 v1.0 재편(3개), GNB 가운데 정렬·타이포·hover 색 수정
- Hero: eyebrow 삭제, 타이포 확대, 줄 단위 등장, 텍스처 추가, CTA 1개로 축소
- Intro(HomeBento) 신설: 포지셔닝 + 벤토 2카드 + EnvironmentHub + AXSL 스크린샷 + 4스텝 플로우
- Why YOnLab: 카피 10개 교체, hover 제거, `OUR SOLUTION` 강조, 정렬 정돈
- Core Capabilities: 카피·태그 정리, 번호 제거, 03↔04 순서 교체, 카드 높이/정렬 통일
- Solutions: **AXSL 신규 추가**, 순서·명칭·카피·태그 전면 개편, CTA 통일, 카드 크기 통일, 다크카드 제거
- Closing CTA 신설(인셋 그라디언트 카드) + 폭 정렬 + 화이트 버튼
- Contact 페이지: 문의유형 리스트·진행절차 섹션 삭제
- 이메일 전사 통일(`contact@yonlab.ai`)
- 홈에서 KPI 밴드·Trust 밴드·Action Showcase 제거
- 폰트 시스템 전환(Helvetica Neue/Arimo), pill 버튼, 카드 글로우 강화

## 16. Work In Progress

### 🟡 검토중 — 사용자 확인 대기

1. **제가 작성한 카피** (근거 문서 없음, 사실관계 검토 필요)
   - About Industries 4개 보조 문구 (예: 자동차 → "차량용 칩셋과 SDK 환경에 맞춘 실행 검증")
   - About What We Work On 4개 한 줄 설명
   - 각 Solution Experience 슬라이드 캡션 일부
2. **전체 사이트 톤·디테일 검토** — 페이지별로 순차 리디자인 중이며 아직 전수 검토 전

### ⏸ Pending — 외부 입력 대기

3. ✅ ~~미확보 미디어 5종~~ → 전량 연결 완료 (§13.2)
4. ✅ ~~AXSL Demo Platform URL~~ → 연결 완료
5. 고아 페이지 처리 방침 결정 (아래 §17-1)

## 16-A. QA 결과 (2026-08-14 · 3차 전수 점검)

**통과** — 문제 0건
- 라우트 13개 전부 200, 없는 경로는 404 정상
- 내부 링크 16개 전부 200 · 죽은 `#` 링크 0 · 페이지 내 앵커(`#experience`/`#demo`/`#home-solutions`/`#main`) 전부 대상 존재
- 이미지 10개 전부 로드(실측 naturalWidth > 0) · `next/image` 최적화 엔드포인트 200
- 영상 4개 전부 `readyState 4`, `error` 없음, `autoplay/muted/loop/playsInline` 정상
- 외부 Demo URL 3개(axsl·wearables·pet) 전부 200
- 반응형: 13페이지 × 375/768/1440 = **39조합 가로 오버플로 0**
- console error 0 · hydration warning 0 · production build 오류 0
- Contact 폼: 백엔드 없음(제출 시 `mailto:`만 생성). 빈 폼 제출 시 검증 5건이 차단하고 페이지 이동 없음 —
  **외부 시스템으로 전송되는 데이터 없음** 확인
- 조사 분리 오타 자동 스캔: 실제 오타 0건

**환경 한계로 미검증**
- 영상의 *연속 재생*. 자동화 브라우저 pane이 `document.hidden = true`라 Chrome이 미디어를 정지시킴.
  파일 로드·첫 프레임 렌더·속성은 확인됨

## 16-B. 중복 DOM 감사 결과

렌더된 DOM에서 동일 텍스트가 2회 이상 나오는지 전 페이지 자동 검사.

| 영역 | 결과 |
|---|---|
| About > How We Work / What We Work On / Engineering Context | ✅ 중복 없음 (2차 세션에서 단일 markup으로 통합 완료) |
| Solution Detail > How It Works · Hero CTA · Experience | ✅ 5개 페이지 전부 중복 없음 |
| Main > Solutions | ⚠️ **중복 있음 — 미수정** |
| Contact > Inquiry Type | ⚠️ **중복 있음 — 미수정** |

1. **`components/sections/Solutions.tsx`** — `<SolutionPreview>`가 모바일 아코디언(`lg:hidden`, 활성 행 아래)과
   데스크톱 컬럼(`hidden lg:block`) 두 곳에서 렌더됩니다. 동시에 존재하는 중복은 활성 패널 1개분.
2. **`components/sections/ContactHeroVisual.tsx`** — 문의유형 칩 4개가 데스크톱 블루 패널 내부(절대배치)와
   모바일 2열 그리드(`lg:hidden`) 두 곳에서 렌더됩니다.

**수정하지 않은 이유**: 두 경우 모두 모바일과 데스크톱에서 요소가 **서로 다른 부모** 안에 있어야 합니다
(리스트 항목 사이 ↔ 별도 그리드 컬럼 / 장식 패널 내부 ↔ 패널 외부). 단일 markup으로 통합하려면
컨테이너 구조 자체를 재설계해야 하고, 두 영역 모두 §12의 확정·보호 영역입니다.
표시상 문제는 없고(한 시점에 하나만 visible, 나머지는 `display:none`이라 스크린리더도 무시),
영향은 DOM 크기 소폭 증가뿐입니다.

## 17. Known Issues

1. ⏸ **`/solutions` 개요, `/capabilities` 계열이 네비에서 고아 상태** — 페이지는 200이지만 진입 경로 없음.
   삭제할지 다시 연결할지 **결정 필요**.
2. ⏸ **`/solutions/partner-products`** — 5종 중 **유일하게 구버전 템플릿**. 네비 미연결 상태로 유지 중.
   새 템플릿으로 전환할지 삭제할지 결정 필요.
3. ✅ ~~CHANGELOG 미반영~~ → 0.17.0에 이번 체크포인트 기재 완료.
4. Main Page 일부 카피가 **컴포넌트에 하드코딩**됨(HomeBento, CoreCapabilities 섹션 설명 등) —
   `lib/content.ts` 단일 소스 원칙에서 벗어남. 의도적(다른 페이지 영향 차단)이지만 인지 필요.
5. `capabilities` 데이터의 `slug`는 여전히 `technical-consulting`인데 표시명은 `Engineering Consulting`.
6. ✅ ~~Solution 상세가 구버전 템플릿~~ → §8로 전면 재설계 완료.
7. ✅ ~~`public/` 시안·백업 파일 잔존~~ → 정리 완료(§13.1).
8. **미사용 컴포넌트 다수 잔존** — `sections/company/*` 8개, `SolutionDetailTemplate`,
   `SolutionHero`, `ProductVisual`, `TrustBand`, `ContactProcess`, `ContactTypeList`,
   `ActionShowcase`, `MetricBand` 등. 빌드에는 영향 없으나 정리 시점 판단 필요.
9. `design-source/README.md`가 **구버전 기준**(AXSL 없음, Partner Products 포함, `business@` 이메일).
   카피 근거로 쓸 때 현재 사이트와 다른 점 주의.
10. OneDrive 경로 특성상 파일 rename 시 유실 위험 — **파일 이동보다 복사 권장**.
11. ⚠️ dev 서버 실행 중 `npm run build` 실행 시 dev 청크 404 (§14-A).
12. **`public/validation/validation-hero.png`가 16MB** (5504×3072). 프레임 표시 폭은 최대 640px이라
    과도합니다. 정적 export는 `images.unoptimized`라 원본이 그대로 전송됩니다 — 리사이즈 권장.
    export 총량 12MB → **58MB**의 주원인.
13. **`public/legal/`의 PDF·DOCX 원본 4개가 공개 배포**됩니다(`/legal/…`로 직접 다운로드 가능).
    법적 문서라 공개 자체는 무방하나, docx 원본 노출이 의도와 다르면 `public/` 밖으로 옮겨야 합니다.
14. Contact 폼 검증 메시지는 `개인정보 수집 · 이용에…`(가운뎃점 앞뒤 공백), 동의 문구는
    `개인정보 수집·이용에…`(공백 없음)로 **표기가 다릅니다.** 확정 카피라 임의 통일하지 않았습니다.
15. 중복 DOM 2건 (§16-B) — 미수정, 사유 기재. 4차 QA에서 재확인: 화면·접근성 문제 없음
    (숨은 쪽은 `display:none`이라 스크린리더도 무시) → 그대로 유지.
16. **Main Solutions 02(Private AI) 카드만 placeholder** — 정지 이미지 asset이 없어서입니다.
    `private ai/`에는 영상 2종뿐. 스틸컷 1장이 확보되면 `lib/content.ts`의
    `slot.src`에 경로만 넣으면 즉시 교체됩니다.

## 18. Remaining Tasks

**V1 배포 전 필수 (우선순위 순)**
- [x] ✅ AI OCC · Validation · Private AI 미디어 전량 연결
- [x] ✅ Berrywatch·AI OCC Demo URL 연결 (Validation은 CTA 삭제로 종결)
- [x] ✅ `/privacy`, `/terms` 실문서 반영
- [x] ✅ 전 페이지 최종 링크·반응형 전수 점검 (§16-A)
- [ ] **`validation-hero.png` 리사이즈** (16MB → 표시 크기 기준, §17-12)
- [ ] 🟡 신규 작성 카피 사실관계 검토 (§16-1)
- [ ] ⏸ 고아 페이지 처리 결정 (`/solutions`, `/capabilities`, `partner-products`)
- [ ] `app/layout.tsx` metadata에 실제 도메인 기준 `metadataBase` · OG 이미지 설정
- [ ] `public/legal/` 원본 문서 공개 여부 결정 (§17-13)

**V1 이후 / 선택**
- [ ] 미사용 컴포넌트 정리 (§17-8)
- [ ] Main Page 하드코딩 카피를 `lib/content.ts`로 이전할지 결정 (§17-4)
- [ ] `capabilities` slug ↔ 표시명 불일치 정리 (§17-5)
- [ ] Production 배포 (도메인·DNS 연결 — 현재 Preview만)

## 19. Recommended Next Task

**AI OCC · Validation 미디어 확보**가 V1 배포까지 남은 가장 큰 블로커입니다.
(AXSL·Private AI·Berrywatch는 연결 완료 — §13.2 표 참고)
파일만 `public/<solution>/`에 넣으면 각 페이지 상단 상수 한 줄 수정으로 끝납니다.

미디어 확보가 지연된다면, 코드로 끝낼 수 있는 다음 후보는:
1. `partner-products` 처리 결정 — 새 템플릿 전환 또는 삭제 (§17-2)
2. 고아 페이지(`/solutions`, `/capabilities`) 연결 또는 삭제 (§17-1)
3. `metadataBase` · OG 이미지 설정

## 20. Rules for Next Claude Session

1. **먼저 읽기**: 이 문서 → `design-source/README.md` → `README.md` → `git log`
2. **Main Page는 완료 상태** — 명시적 요청 없이 수정 금지 (§12)
3. **요청받은 영역만** 수정. 주변 리디자인 금지
4. **카피 창작 금지** — 근거는 `design-source/README.md` 또는 사용자 지시
5. `lib/content.ts` 수정 시 **다른 페이지 영향 확인** (헤더·푸터·상세 페이지가 공유)
6. 검증은 `npx tsc --noEmit` + `npm run lint` + 브라우저 실측
7. 파일 이동(`mv`) 대신 **복사(`cp`)** — OneDrive 동기화 유실 이력 있음
8. 새 라이브러리·애니메이션·그라디언트를 임의로 추가하지 않기
9. 이미지가 없으면 `ImageSlot` placeholder 사용 (회색 박스·가짜 UI 금지)
10. 작업 후 변경 파일과 내용을 간단히 보고

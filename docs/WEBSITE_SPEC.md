# YOnLab Website — 기획·기능 명세서

| 항목 | 내용 |
|---|---|
| **Project** | YOnLab Website |
| **Current Version** | **v1.0** (tag `v1.0.0`, commit `353a7db`) |
| **기준 URL** | https://www.yonlab.ai/ (apex `https://yonlab.ai/` 동일 서빙) |
| **저장소 / 브랜치** | `yubi-lee/yonlab-site` · production branch `main` |
| **문서 목적** | 현재 홈페이지를 **Version 1.0 Baseline**으로 정의하고, 향후 V2.0 / V2.1 / V3.0 업데이트 시 무엇이 바뀌었는지 추적할 수 있는 기준을 만든다 |
| **최종 업데이트** | 2026-08-16 |

### 이 문서를 읽는 방법

- 모든 내용은 **현재 코드와 배포본을 직접 분석해** 작성했습니다. 계획·의도는 포함하지 않습니다.
- 코드에서 확인할 수 없는 항목은 **`Not Defined`**로 표시했습니다.
- CTA 상태는 `Working` / `Placeholder` / `Disabled` / `Unknown` 중 하나입니다.
- 기능 ID(`NAV-001` 등)는 버전 간 추적용 식별자입니다. **한 번 부여한 ID는 바꾸지 않습니다.**

### 기술 스택 요약

Next.js 15 (App Router) · React 19 · TypeScript 5.7 · Tailwind CSS v3 · lucide-react
빌드: `npm run build` → `output: "export"` → `./out` (전 라우트 정적 프리렌더, 서버 런타임 없음)
배포: Cloudflare Worker `yonlab-site` (Static Assets, `not_found_handling: 404-page`)
상태관리 라이브러리 없음 · 애니메이션 라이브러리 없음 (CSS + IntersectionObserver)

---

## 1. Site Architecture

### 1.1 사용자에게 노출되는 IA

```
YOnLab
├── Home                              /
├── About                             /company
├── Solutions            (드롭다운 전용 — 자체 페이지 없음)
│   ├── AXSL                          /solutions/axsl
│   ├── Private AI Platform           /solutions/private-ai-platform
│   ├── Berrywatch Service            /solutions/berrywatch-platform
│   ├── AI OCC (OnCare Circle)        /solutions/ai-occ
│   └── Validation Automation         /solutions/validation-automation
├── Contact                           /contact
├── Privacy Policy                    /privacy        (Footer 하단)
└── Terms of Use                      /terms          (Footer 하단)
```

Header 드롭다운과 Footer의 Solutions 목록은 모두 `lib/content.ts`의 `homeSolutionSlugs` + `solutionPanels`에서 **파생**됩니다 → 데이터 불일치가 구조적으로 발생하지 않습니다.

### 1.2 라우트는 살아 있으나 네비게이션에 없는 페이지 (고아 라우트)

| Route | 상태 |
|---|---|
| `/solutions` | 구버전 Solutions 개요. 진입 경로 없음 |
| `/solutions/partner-products` | 구버전 템플릿 + Placeholder 2곳 |
| `/capabilities` | 구버전 역량 개요 |
| `/capabilities/embedded-engineering` | 구버전 역량 상세 |
| `/capabilities/platform-engineering` | 〃 |
| `/capabilities/ai-optimization` | 〃 |
| `/capabilities/ai-validation` | 〃 |
| `/capabilities/technical-consulting` | 〃 (표시명은 `Engineering Consulting`) |

**총 8개 라우트**가 URL 직접 입력으로만 접근 가능하며 모두 200을 반환합니다.

### 1.3 Next 라우트가 아닌 정적 페이지

| URL | 파일 | 비고 |
|---|---|---|
| `/apps/onpersona/privacy/` | `public/apps/onpersona/privacy/index.html` | **별도 앱(OnPersona)의 개인정보처리방침.** 홈페이지와 무관한 단독 HTML이며 `public/`에서 그대로 서빙됩니다. 사이트 내 링크는 없습니다 |

### 1.4 정적 생성 라우트 총계

**17개** (Home 1 + About 1 + Contact 1 + 법적 2 + Solution 상세 5 + Solutions 개요 1 + Partner 1 + Capabilities 1 + Capability 상세 5) + `404.html`

---

## 2. Page Specification

### 2.1 Home

**Route** `/`

**페이지 목적**
YOnLab의 포지셔닝("AI를 실제 환경에서 작동하게 만든다")을 제시하고, 5개 Solution으로 유입시키며, Contact로 전환시킨다.

**Section Structure**

1. Hero
2. HomeBento (포지셔닝 + 2카드)
3. Why YOnLab
4. Core Capabilities
5. Solutions
6. Closing CTA

**Content**

| # | Section | Headline | Description / 주요 콘텐츠 |
|---|---|---|---|
| 1 | Hero | `Trusted` / `Intelligence.` / `Verified in the` / `Real World.` (4줄) | 우측 `HeroDiagram` — AI Model → AI Optimization → On-Device Runtime → AI Validation + Verification Loop |
| 2 | HomeBento | `화면 속 AI를 넘어,` / `현실에서 작동하는 AI로.` | **좌 카드**: `복잡한 AI 도입을, 더 빠른 실행으로.` + AXSL 스크린샷 2장 + 4스텝(AI Service → Easy Access → Fast Build → Deployment)<br>**우 카드**: `다양한 환경에서도, 안정적으로 작동하도록.` + EnvironmentHub + 6태그(NPU · Chipset · SDK · Runtime · OS/BSP · Edge Device) |
| 3 | Why YOnLab | `Why YOnLab` (index 01) | 5행 대비표. 컬럼 라벨 `CUSTOMER CHALLENGE` ↔ `OUR SOLUTION`<br>01 AI 모델은 있지만, 실제 디바이스에 적용하기가 쉽지 않아요 → 디바이스 환경에 맞춰 직접 검증하고, 안정적으로 실행되도록 최적화합니다<br>02 칩셋과 SDK가 달라질수록 호환성 대응이 복잡해져요 → 다양한 실행 환경에 맞춰 호환성을 검증하고 안정화합니다<br>03 폐쇄망이나 온프레미스 환경에서는 AI 도입에 제약이 많아요 → 보안 환경에 맞는 Private AI를 설계하고 구현합니다<br>04 검증부터 배포, 리포트까지 과정이 나뉘어 있어 관리가 번거로워요 → 검증부터 결과 관리까지 하나의 흐름으로 자동화합니다<br>05 PoC까지는 했지만, 실제 제품과 서비스로 잘 이어지지 않아요 → 구축부터 검증·운영·유지보수까지 함께합니다 |
| 4 | Core Capabilities | `Core Capabilities` (index 02) | 다크 네이비 카드 5장 — Embedded Engineering / Platform Engineering / AI Optimization / AI Validation / Engineering Consulting. **카드는 링크가 아님** |
| 5 | Solutions | `Solutions` (index 03) | 서브라인 `아이디어를 실제 서비스로 연결하는 YOnLab의 AI Solutions.` + 좌 셀렉터 5개 / 우 상세 프리뷰 |
| 6 | Closing CTA | `Turn Your AI Challenge` / `into Reality.` | 이메일 노출 + Contact 버튼 |

**Solutions 섹션의 5개 카드 데이터**

| # | 제목 | 한 줄 | 태그 |
|---|---|---|---|
| 01 | AXSL | AI eXtensible Service Library | AI Service · Easy Access · Extensible |
| 02 | Private AI Platform | 폐쇄망·온프레미스 환경을 위한 Private AI | On-Premise · RAG · Private AI |
| 03 | Berrywatch Service | 스마트워치 기반 위치 관제·안전 케어 | Kids Care · Location Monitoring · Smart Watch |
| 04 | AI OCC (OnCare Circle) | 가족과 보호자를 연결하는 위치 기반 안전 케어 | Location Sharing · Safe Zone · Emergency SOS · Activity History |
| 05 | Validation Automation | 실제 디바이스 기반 AI 검증 자동화 | Device Test · Validation · Automation · Reporting |

**CTA / Navigation**

| CTA | Action | Destination | Status |
|---|---|---|---|
| `Explore Solutions →` (Hero) | 같은 페이지 스크롤 | `#home-solutions` | Working |
| `Contact us →` (HomeBento) | 페이지 이동 | `/contact` | Working |
| 좌측 솔루션 셀렉터 5개 | 우측 프리뷰 교체 (이동 없음) | — | Working |
| `Explore Solution →` | 페이지 이동 | `/solutions/{선택 slug}` | Working |
| `contact@yonlab.ai` (Closing) | 메일 클라이언트 | `mailto:` | Working |
| `Contact Us →` (Closing) | 페이지 이동 | `/contact` | Working |

**Assets**

| 종류 | 경로 | 사용 위치 |
|---|---|---|
| Image | `/axsl/axsl-hero.png` | HomeBento 좌 카드 + Solutions 01 카드 |
| Image | `/axsl/axsl-zoo.png` | HomeBento 좌 카드 |
| Image | `/private ai/private-ai-poster.png` | Solutions 02 카드 |
| Image | `/berrywatch/berrywatch-demo.png` | Solutions 03 카드 |
| Image | `/occ/occ-demo.png` | Solutions 04 카드 |
| Image | `/validation/validation-hero.png` | Solutions 05 카드 |
| Image | `/yonlab-logo-trim-removebg-preview.png` | Header · Footer |
| Background | `.streaks` `.dot-grid` `.grain` `.blueprint-grid` (CSS 유틸) | Hero · 각 섹션 |
| Icon | lucide-react + 자체 SVG 세트 | 전 섹션 |
| SVG | 인라인 `HeroDiagram`, `EnvironmentHub` | Hero, HomeBento |

**Interaction**

- Hero 헤드라인 줄 단위 등장 (`.reveal-lines`, 로드 시)
- 섹션 스크롤 등장 (`[data-reveal]` + IntersectionObserver)
- Why 행 / Capabilities 카드: `.scroll-rise` (`animation-timeline: view()`)
- Solutions: **클릭 셀렉터** — 데스크톱은 우측 프리뷰 교체, 모바일은 아코디언 펼침
- Why YOnLab은 **hover 인터랙션 없음** (의도적)
- Modal 없음

**Responsive Behavior**

| 영역 | Desktop ≥1024 | Tablet 768–1023 | Mobile <768 |
|---|---|---|---|
| Hero | 좌 텍스트 / 우 다이어그램 2열, H1 94px | 1열, H1 68px | 1열, H1 42px |
| HomeBento | 2카드 가로, 높이 412px 고정 | 1열 | 1열 |
| Why | 2열 대비표 + 점선 화살표 | 축소 | 세로 스택 |
| Solutions | 셀렉터 360px + 프리뷰 1fr | 아코디언 | 아코디언 |
| Closing | 좌우 2열 + 가운데 divider | divider 숨김 | 1열 |

---

### 2.2 About

**Route** `/company`

**페이지 목적**
회사가 무엇을 하는지(작업 영역), 어떻게 일하는지(프로세스), 어떤 산업을 다루는지, 어떤 기술 계층을 다루는지를 설명한다.

**Section Structure**

1. Hero
2. What We Work On
3. How We Work
4. Industries
5. Engineering Context
6. Final CTA

**Content**

| # | Section | Headline | 주요 콘텐츠 |
|---|---|---|---|
| 1 | Hero | `AI를 실제 환경에 적용하는 일을 합니다.` (`실제 환경`만 blue) | 실행 스택 SVG — AI Model → SDK·Runtime → OS·BSP → NPU·Chipset → Edge Device + BUILD / VALIDATE / OPERATE 브래킷 |
| 2 | What We Work On | `What We Work On` | 2×2 에디토리얼 그리드 |
| 3 | How We Work | `How We Work` | 대형 넘버럴 + 레일/노드 프로세스 플로우 |
| 4 | Industries | `다양한 산업 현장을 위한 AI Engineering` | 다크 네이비 2×2 — 제조업 / 자동차 / 로보틱스 / 공공기관 |
| 5 | Engineering Context | `Engineering Context` | LAYER 01 Application·AI / 02 Software / 03 Hardware 3카드 + 키워드 칩 |
| 6 | Final CTA | `AI를 서비스로 구현해야 한다면,` / `이야기해보세요.` | 블루 그라디언트 인셋 카드 |

**CTA / Navigation**

| CTA | Action | Destination | Status |
|---|---|---|---|
| `Contact Us →` | 페이지 이동 | `/contact` | Working |

**Assets** — **이미지 파일 없음.** 모든 비주얼이 인라인 SVG / CSS로 구현되어 있습니다.

**Interaction** — `data-reveal` 스크롤 등장. Engineering Context 카드 hover 시 `-translate-y-[3px]` + 그림자 강화. 그 외 hover는 미세한 색 변화 수준.

**Responsive Behavior** — Hero 2열 → 1열, H1 34/46/44/60px(xl). 2×2 그리드 → 1열. Industries 2×2 → 1열. Engineering Context 3카드 가로 → 세로 스택.

---

### 2.3 Contact

**Route** `/contact`

**페이지 목적**
문의 유형을 선택해 프로젝트 상담을 요청하게 한다.

**Section Structure**

1. Hero
2. Inquiry (좌 이메일 카드 / 우 문의 폼)

**Content**

| # | Section | Headline | 주요 콘텐츠 |
|---|---|---|---|
| 1 | Hero | `Let's Build What Works in the Real World.` | 2단락 설명 + `contact@yonlab.ai` 직접 노출 + `ContactHeroVisual`(블루 필드 패널, 문의유형 4칩) |
| 2 | Inquiry | `문의 안내` | 좌: 이메일 카드 / 우: 화이트 폼 카드 |

**Form 필드**

| 필드 | 타입 | 필수 |
|---|---|---|
| 문의 유형 | radio 4종 (Business Inquiry / Partnership / Technical Consultation / Recruitment) | 기본값 `business` |
| 이름 / 담당자 | text | ✅ |
| 회사명 | text | ✅ |
| 이메일 | email | ✅ |
| 연락처 | text | — |
| 문의 내용 | textarea (6행) | ✅ |
| 개인정보 수집·이용 동의 | checkbox | ✅ |

동의 문구: `개인정보 수집·이용에 동의합니다. 자세한 내용은 개인정보처리방침을 확인해주세요.`

**CTA / Navigation**

| CTA | Action | Destination | Status |
|---|---|---|---|
| `contact@yonlab.ai` (Hero) | 메일 클라이언트 | `mailto:` | Working |
| `contact@yonlab.ai` (Inquiry 카드) | 메일 클라이언트 | `mailto:` | Working |
| `개인정보처리방침` (동의 문구) | 페이지 이동 | `/privacy` | Working |
| 문의 제출 버튼 | 검증 → `mailto:` URL 생성 → 완료 화면 | 사용자 메일 클라이언트 | **Placeholder** — 서버로 전송되지 않음 |

> ⚠️ **폼은 백엔드가 없습니다.** 검증 통과 시 `window.location.href = mailto:...`로 메일 클라이언트를 열고 완료 화면을 보여줍니다. 사용자가 메일을 직접 보내지 않으면 문의가 YOnLab에 도달하지 않습니다.

**Assets** — 이미지 없음. `ContactHeroVisual`은 인라인 SVG + CSS.

**Interaction**

- 문의유형 선택 시 `border-blue` + 배경 틴트 + 아이콘 칩 채움
- input focus ring (`focus:ring-4 focus:ring-blue/10`)
- 검증 실패 시 `aria-invalid` + `role="alert"` 오류 메시지 (필드별)
- 제출 성공 시 폼 → 완료 카드로 교체
- 동의 문구 내 링크는 `stopPropagation`으로 체크박스 토글 방지

**Responsive Behavior** — Hero 2열 → 1열(H1 38/50/56/66px). Inquiry `lg:grid-cols-[0.82fr_1.18fr]` → 1열. Hero 비주얼은 데스크톱 절대배치 패널 / 모바일 2열 그리드로 **마크업이 분기**됩니다.

---

### 2.4 Solution 상세 (5종 공통 구조)

**Route** `/solutions/{axsl | private-ai-platform | berrywatch-platform | ai-occ | validation-automation}`

**페이지 목적** 개별 솔루션의 정의·경험·동작 방식을 설명하고 상담으로 전환시킨다.

**Section Structure** (5종 동일)

1. Hero
2. Solution Overview
3. Experience (`id="experience"`, Private AI만 `id="demo"`)
4. How It Works
5. Final CTA

**공통 CTA / Navigation**

| CTA | Action | Destination | Status |
|---|---|---|---|
| `프로젝트 상담 →` (Hero primary) | 페이지 이동 | `/contact` | Working |
| `View Demo →` (Hero ghost) | 같은 페이지 스크롤 | `#experience` / `#demo` | Working |
| `View Demo ↗` / `View AXSL Demo ↗` (Experience 하단) | 새 탭 (`target="_blank"` + `rel="noopener noreferrer"`) | 외부 데모 서버 | Working (3종만 존재) |
| `Contact Us →` (Final CTA) | 페이지 이동 | `/contact` | Working |

**공통 Interaction** — `data-reveal` 스크롤 등장, Hero `animate-yfade`, 영상은 `autoPlay muted loop playsInline`. AXSL만 Experience 캐러셀(4초 자동 전환, dots 수동 제어, `prefers-reduced-motion` 시 자동전환 정지).

**공통 Responsive** — Hero `lg:grid-cols-[0.92fr_1.08fr]` → 1열, 미디어 `lg:max-w-[640px]`. How It Works 가로 단 → 세로 스택. 미디어 프레임은 전 구간 16:9 고정.

개별 콘텐츠는 **3장 Solution Specification** 참고.

---

### 2.5 Privacy Policy / Terms of Use

**Route** `/privacy`, `/terms`

**페이지 목적** 법적 고지 문서를 게시한다.

두 페이지는 `LegalDocument` 컴포넌트 하나를 공유하고 데이터만 `lib/legal.ts`에서 주입됩니다.

**Section Structure**

1. 마스트헤드 — 문서 제목(H1) / 영문 제목 / 블루 헤어라인 / `시행일 | 2026년 8월 14일`
2. 본문 — 인트로 문단 + 번호 섹션(H2) + 하단 imprint `YOnLab Co., Ltd. | contact@yonlab.ai`

**Content**

| 페이지 | H1 / 영문 | 섹션 |
|---|---|---|
| `/privacy` | 개인정보처리방침 / PRIVACY POLICY | 1 처리 목적 · 2 처리 항목 · 3 보유 및 이용기간 · 4 제3자 제공 · 5 처리의 위탁 · 6 파기 · 7 정보주체의 권리 · 8 안전성 확보조치 · 9 관련 문의 · 10 방침의 변경 |
| `/terms` | 이용약관 / TERMS OF USE | 1 목적 · 2 웹사이트의 이용 · 3 제공되는 정보 · 4 Demo 서비스 · 5 지식재산권 · 6 외부 링크 · 7 금지 행위 · 8 책임의 범위 · 9 약관의 변경 · 10 문의 |

본문은 `public/legal/`의 원본 문서(docx/pdf)를 **전사한 것**이며, 창작된 문장은 없습니다.

**CTA / Navigation**

| CTA | Action | Destination | Status |
|---|---|---|---|
| `contact@yonlab.ai` | 메일 클라이언트 | `mailto:` | Working |

**Assets** — 없음
**Interaction** — **없음** (카드·그래픽·애니메이션 미사용, 의도된 문서 페이지)
**Responsive** — 본문 `max-w-[820px]` 단일 컬럼. 전 구간 동일 구조, 폰트 크기만 조정.

---

### 2.6 고아 페이지 (네비게이션 미노출)

| 페이지 | Route | 상태 | 비고 |
|---|---|---|---|
| Solutions 개요 | `/solutions` | Partial | H1 `현장에 배포되는 실제 AI 엔지니어링 플랫폼`. 구버전 구조(`PageHero`, `ContactCta` 사용) |
| Partner Products | `/solutions/partner-products` | **Placeholder 포함** | `TodoNote` 2곳 — 파트너·제품 정보 미확보, 제공·협력 방식 미확보 |
| Capabilities 개요 | `/capabilities` | Partial | 역량 5종 나열 |
| Capability 상세 5종 | `/capabilities/[slug]` | Partial | slug `technical-consulting` ↔ 표시명 `Engineering Consulting` 불일치 |

이 페이지들은 Solution 상세 재설계 **이전 구조**를 유지하고 있어 현재 사이트 톤과 다릅니다.

---

## 3. Solution Specification

### 3.1 AXSL

| 항목 | 내용 |
|---|---|
| **Route** | `/solutions/axsl` |
| **Positioning** | `AI eXtensible Service Library`. 다양한 AI 서비스가 축적된 라이브러리에서 시작해, 고객에게 필요한 새 서비스로 확장하는 Solution. **App Store / API Catalog가 아니며**, 함께 정의하고 구현하는 방식으로 설명됩니다 |
| **Key Message** | `필요한 AI를 정의하고, 함께 실제 서비스로 만들어갑니다.` |
| **User Problem** | 필요한 AI 서비스를 어떻게 정의하고 빠르게 실행할지 (Overview: "다양한 AI 서비스에서 시작해, 고객에게 필요한 새로운 서비스로 확장합니다") |
| **Solution** | Kids Care, Pet Care, Healthcare, Sports Coaching, Smart Home 등 축적된 사례로 필요한 AI 서비스의 방향을 잡고, 고객 환경·목적에 맞춰 기능을 확장하거나 새 아이디어를 실제 서비스로 구현 |
| **How It Works** | 01 Discover — 필요한 AI 서비스를 정의합니다<br>02 Design — 서비스 형태를 설계합니다<br>03 Build — 구현하고 검증합니다<br>04 Launch — 실제 서비스로 연결합니다 |
| **Demo** | `View AXSL Demo ↗` → `http://118.217.226.238:10100/public/axsl.html` (새 탭) — **Working** |
| **Assets** | Hero `/axsl/axsl-hero.png` (browser mockup 내부) · Experience 캐러셀 3장 `/axsl/axsl-demo-01~03.png` (Solution Zoo / Kids Watch / Pet App) · Home 카드 `/axsl/axsl-hero.png` · HomeBento `/axsl/axsl-zoo.png` |
| **Keywords** | AI Service · Extensible · Co-Creation |
| **Final CTA** | `What AI service do you need?` |
| **Implementation Status** | **Implemented** — 5종 중 유일하게 Experience 캐러셀(3슬라이드) 사용 |

### 3.2 Private AI Platform

| 항목 | 내용 |
|---|---|
| **Route** | `/solutions/private-ai-platform` |
| **Positioning** | 폐쇄망·온프레미스 환경에서 내부 데이터·업무 지식 기반으로 AI Assistant를 구축·운영하는 Private AI 플랫폼 |
| **Key Message** | `보안이 중요한 환경에서도, AI를 실제 업무로 연결합니다.` |
| **User Problem** | 외부 AI 서비스 사용이 제한된 환경에서 내부 문서·업무 지식을 AI로 활용하기 어려움 |
| **Solution** | 기업 보안 정책·시스템 환경에 맞춰 Private AI를 구성하고, 질문·검색·문서 분석 등 실제 업무에 활용하도록 지원 |
| **How It Works** | 01 Internal Knowledge — 기업 내부 문서와 업무 지식을 연결합니다<br>02 Private AI — 업무 목적에 맞는 AI Assistant 환경을 구성합니다<br>03 Secure Infrastructure — 폐쇄망·온프레미스 환경에 맞춰 구축합니다<br>04 Ask & Analyze — 질문, 검색, 문서 분석 등 실제 업무에 활용합니다<br>05 Operate — 조직 내부 환경에서 안정적으로 운영합니다 |
| **Demo** | 외부 Demo URL **없음**. Experience 섹션(`#demo`)에 데모 **영상**만 임베드 — 외부 CTA 자체가 존재하지 않음 |
| **Assets** | Hero 영상 `/private ai/private_ai_YOnLab.mp4` (1280×720) · Demo 영상 `/private ai/private-ai-demo.mp4` (2880×1800, 16:10 → `object-contain`) · Home 카드 `/private ai/private-ai-poster.png` (데모 영상의 poster 프레임, 2880×1800) |
| **Keywords** | On-Premise · AI Assistant · RAG |
| **Final CTA** | `Bring AI into your private environment.` |
| **Implementation Status** | **Implemented** (외부 Demo 링크는 `Not Defined`) |

### 3.3 Berrywatch Service

| 항목 | 내용 |
|---|---|
| **Route** | `/solutions/berrywatch-platform` |
| **Positioning** | 스마트워치 + 보호자 앱 기반 **키즈케어 서비스**. 현장 관제·SOP가 아닙니다 |
| **Key Message** | `아이의 하루를 이해하고, 필요한 순간의 안전을 함께합니다.` |
| **User Problem** | 아이의 위치와 안전 상태를 보호자가 일상에서 확인하기 어려움 |
| **Solution** | 스마트워치와 보호자 앱을 연결해 위치·주요 안전 이벤트를 확인하고, AI가 상황을 분석해 대응 가능한 경험으로 연결 |
| **How It Works** | 01 Connect — 아이와 보호자를 연결합니다<br>02 Sense — 위치와 상태를 확인합니다<br>03 Understand — AI가 상황을 이해합니다<br>04 Respond — 필요한 순간에 대응합니다 |
| **Demo** | `View Demo ↗` → `http://118.217.226.238:10100/public/wearables.html` (새 탭) — **Working** |
| **Assets** | Hero 영상 `/berrywatch/berrywatch-hero.mp4` (1104×816, 4:3 → `object-contain`) · Experience 이미지 `/berrywatch/berrywatch-demo.png` (단일 프레임, 캐러셀 미사용) · Home 카드 동일 이미지 |
| **Keywords** | Kids Care · Smart Watch · AI Safety |
| **Final CTA** | `Build safer everyday experiences.` |
| **Implementation Status** | **Implemented** |

### 3.4 AI OCC (OnCare Circle)

| 항목 | 내용 |
|---|---|
| **Route** | `/solutions/ai-occ` |
| **Positioning** | **OnCare Circle** — 보호 대상과 보호자를 연결하는 Connected Care 서비스. **Operation Control Center가 아닙니다.** Senior Care·Pet Care 등 다양한 돌봄 시나리오로 확장되며, Pet Guardian이 Featured Scenario로 제시됩니다 |
| **Key Message** | `돌봄이 필요한 일상을 연결하고, 필요한 순간을 함께 이해합니다.` |
| **User Problem** | 돌봄이 필요한 대상의 위치·활동·상태를 보호자가 파악하고 판단하기 어려움 |
| **Solution** | 위치·활동·상태 데이터를 보호자와 연결하고, AI 브리핑으로 현재 상황을 이해해 필요한 돌봄으로 이어지게 지원 |
| **How It Works** | 01 Connect — 돌봄 관계를 연결합니다<br>02 Observe — 일상의 상태를 확인합니다<br>03 Understand — AI가 상황을 함께 이해합니다<br>04 Care — 필요한 돌봄으로 이어갑니다 |
| **Care Scenario** | Senior Care · Pet Care · Family Care (태그로 노출) |
| **Demo** | `View Demo ↗` → `http://118.217.226.238:10100/public/pet.html` (새 탭) — **Working** |
| **Assets** | Hero `/occ/occ-hero.png` (1024×768, 원본에 검은 레터박스가 포함되어 `object-cover`로 제거) · Experience `/occ/occ-demo.png` (3366×1710 통합 캡처, 단일 프레임) · Home 카드 동일 이미지 |
| **Keywords** | Connected Care · AI Briefing · Multi-Scenario |
| **Final CTA** | `Build connected care experiences.` |
| **Implementation Status** | **Implemented** — Experience는 3화면 통합 캡처 1장이라 캐러셀 대신 단일 프레임 사용 |

### 3.5 Validation Automation

| 항목 | 내용 |
|---|---|
| **Route** | `/solutions/validation-automation` |
| **Positioning** | 반복되는 AI 검증 업무를 하나의 자동화된 Workflow로 연결. **Benchmark / Profiling / CI-CD는 표기하지 않습니다** |
| **Key Message** | `반복되는 AI 검증을, 하나의 자동화된 흐름으로.` |
| **User Problem** | AI 모델·SDK를 디바이스에 적용할 때 환경 설정·실행·결과 확인·리포트 작성이 반복 발생 |
| **Solution** | 검증 과정을 자동화해 테스트 실행부터 결과 수집·확인·관리까지 일관된 Workflow로 연결 |
| **How It Works** | 01 Upload / Configure — 검증할 앱·모델과 테스트 조건을 설정합니다<br>02 Select Device — 대상 디바이스와 실행 환경을 선택합니다<br>03 Run Validation — 설정된 조건에 따라 검증을 자동 실행합니다<br>04 Analyze Results — 실행 결과와 주요 측정값을 수집하고 비교합니다<br>05 Retry / Compare — 실패 항목을 재실행하거나 Baseline과 비교합니다<br>06 Report — 검증 결과와 이력을 기록하고 리포트로 관리합니다 |
| **Demo** | 외부 Demo URL **없음**. Experience 하단 CTA는 **사용자 결정으로 제거**되었습니다 (`DEMO_URL` 상수 자체가 코드에 없음) |
| **Assets** | Hero `/validation/validation-hero.png` (5504×3072, **15.3MB**) · Demo 영상 `/validation/validation-demo.mp4` (1920×1280, 3:2 → `object-contain`) · Home 카드 Hero 이미지 재사용 |
| **Keywords** | App Validation · Model Validation · Device Lab |
| **Final CTA** | `Make validation part of your workflow.` |
| **Implementation Status** | **Implemented** — 5종 중 유일하게 Experience 하단 외부 CTA가 없음. How It Works 6스텝으로 최다 |

### 3.6 Solution 비교표

| | AXSL | Private AI | Berrywatch | AI OCC | Validation |
|---|---|---|---|---|---|
| Hero 미디어 | 이미지 | **영상** | **영상** | 이미지 | 이미지 |
| Experience 미디어 | 캐러셀 3장 | **영상** | 이미지 | 이미지 | **영상** |
| 외부 Demo CTA | ✅ | ✗ | ✅ | ✅ | ✗ (제거됨) |
| How It Works 스텝 | 4 | 5 | 4 | 4 | **6** |
| Experience 앵커 | `#experience` | **`#demo`** | `#experience` | `#experience` | `#experience` |

---

## 4. Shared Components

### 4.1 Layout

| Component | 파일 | 역할 | 사용 페이지 | 주요 Props | Interaction |
|---|---|---|---|---|---|
| **Header** | `components/layout/Header.tsx` | 전역 상단 네비게이션 | 14개 | 없음 (내부 `useState` 3개) | `"use client"`. 가운데 정렬 GNB. Solutions는 드롭다운 전용. 데스크톱 hover/click 드롭다운, `lg` 미만 햄버거 시트 + 아코디언. `aria-haspopup`/`aria-expanded`/`aria-current` |
| **Footer** | `components/layout/Footer.tsx` | 전역 하단 네비게이션 | 14개 | 없음 (`footerColumns` 데이터 기반) | 3컬럼(About / Solutions 5종 / Contact) + 하단 Privacy·Terms. `headingHref`가 있는 컬럼만 제목이 링크 |

### 4.2 UI 프리미티브

| Component | 파일 | 역할 | 사용 수 | 주요 Props | Interaction |
|---|---|---|---|---|---|
| **Button** | `ui/Button.tsx` | 사이트 표준 CTA | 11 | `href`(필수) · `variant` · `size`(sm/md/lg) · `withArrow` | pill(`rounded-full`). hover 시 배경 변화 + 화살표 `translate-x`. **`<Link>`만 렌더** — onClick 불가 |
| **Card** | `ui/Card.tsx` | 카드 셸 | 8 | `children` · `href` · `className` | `href` 유무로 링크/정적 전환 |
| **Tag** | `ui/Tag.tsx` | 키워드 칩 | 9 | `children`(string) · `dark` | 정적 |
| **Eyebrow** | `ui/Eyebrow.tsx` | 섹션 상단 소형 라벨 | 17 | `children` · `onDark` | 정적 |
| **SectionHeading** | `ui/SectionHeading.tsx` | 번호 + 대형 섹션 제목 | 3 | `index` · `title` · `faint` | 대형 아웃라인 숫자 배경 |
| **ImageSlot** | `ui/ImageSlot.tsx` | 이미지 영역 | 3 | `placeholder` · `ratio` · `src` · `sizes` · `dark` | `src` 있으면 `next/image`(`object-contain`), 없으면 **라벨 placeholder**. 회색 박스·가짜 UI를 만들지 않는 원칙의 구현체 |
| **CardCta** | `ui/CardCta.tsx` | 카드 내부 텍스트 CTA | 6 | `label` | hover 시 화살표 이동 |
| **SectionConnector** | `ui/SectionConnector.tsx` | 섹션 간 커넥터 장식 | 5 | `dotBg` | 정적 |
| **Badge** | `ui/Badge.tsx` | 상태 뱃지 | 4 | `children` · `tone` | 정적 |
| **PageHero** | `ui/PageHero.tsx` | 공용 페이지 히어로 | 4 | `eyebrow` · `category` · `title` · `description` · `cta` · `visual` | **고아 페이지 4곳 전용.** 신규 5종·About·Contact는 각자 인라인 히어로 사용 |
| MetricBand / CtaLink | `ui/` | — | **0** | — | **미사용** |

### 4.3 도메인 컴포넌트

| Component | 파일 | 역할 | 사용 | Interaction |
|---|---|---|---|---|
| **RevealProvider** | `components/RevealProvider.tsx` | `useReveal()` 훅 마운트 (렌더 없음) | 12 | `"use client"`. IntersectionObserver로 `[data-reveal]`에 `.in` 부여 |
| **Solution Card / Preview** | `sections/Solutions.tsx` 내부 `SolutionPreview` | 홈 솔루션 프리뷰 카드 | Home | `"use client"`. `useState`로 활성 인덱스 관리. 모든 솔루션이 동일 셸(`rounded-panel`, `lg:min-h-[504px]`, 프리뷰 16:10 고정) → 전환 시 레이아웃 시프트 없음 |
| **Mockups** | `sections/mockups/Mockups.tsx` | 제품 목업 프레임 5종 (browser / appWindow / console / analytics / phone) | Home Solutions | 창 크롬(신호등 dot, 주소창, 타이틀바) + `ImageSlot` |
| **ExperienceCarousel** | `sections/solution-detail/ExperienceCarousel.tsx` | Experience 슬라이드 | **AXSL만** | `"use client"`. 4초 자동 전환, fade+12px 슬라이드, dots 수동 제어, `prefers-reduced-motion` 시 자동전환 정지 |
| **LegalDocument** | `sections/LegalDocument.tsx` | 법적 문서 셸 | `/privacy`, `/terms` | 없음 (의도적) |
| **ContactForm** | `sections/ContactForm.tsx` | 문의 폼 | `/contact` | `"use client"`. 검증 · 오류 표시 · 완료 화면 전환 |
| **ContactHeroVisual** | `sections/ContactHeroVisual.tsx` | Contact Hero 비주얼 | `/contact` | 데스크톱 절대배치 패널 / 모바일 2열 그리드 |
| **ContactCta** | `sections/ContactCta.tsx` | 공용 하단 CTA | 고아 4페이지 | 신규 페이지는 각자 인라인 Final CTA 사용 |
| **TodoNote** | `sections/solution-detail/TodoNote.tsx` | **미확보 정보 표기 UI** | partner-products | 정적 안내 박스 |

### 4.4 미사용 컴포넌트 (import 0회) — 17개

```
sections/ActionShowcase · ContactProcess · ContactTypeList · LegalPage · TrustBand
sections/company/ (CompanyHero, CompanyMessage, CompanyStats, CoreValues,
                   EditorialStatement, EngineeringWorkflow, PartnersSection, StatementBand)
sections/solution-detail/SolutionDetailTemplate
ui/CtaLink · ui/MetricBand
```

빌드 산출물에는 포함되지 않지만 저장소에는 남아 있습니다.

---

## 5. Functional Specification

### 5.1 Navigation

| ID | Function | Description | Page | Status |
|---|---|---|---|---|
| NAV-001 | 전역 헤더 네비게이션 | About / Solutions / Contact 3개 메뉴, 가운데 정렬 | 전 페이지 | Working |
| NAV-002 | Solutions 드롭다운 | 5개 솔루션 목록. Solutions 자체는 링크 없음 | 전 페이지 | Working |
| NAV-003 | 모바일 햄버거 네비게이션 | `lg` 미만에서 전체폭 시트 + Solutions 아코디언 | 전 페이지 | Working |
| NAV-004 | 현재 페이지 표시 | 활성 경로에 `text-blue` + `aria-current="page"` | 전 페이지 | Working |
| NAV-005 | 전역 푸터 네비게이션 | 3컬럼 + 하단 법적 링크 | 전 페이지 | Working |
| NAV-006 | 로고 → 홈 이동 | Header 로고 클릭 | 전 페이지 | Working |
| NAV-007 | Skip to content | `본문으로 건너뛰기` (키보드 포커스 시 노출) | 전 페이지 | Working |
| NAV-008 | 404 처리 | 없는 경로 → `404.html` (SPA fallback 아님) | 전역 | Working |

### 5.2 Solution

| ID | Function | Description | Page | Status |
|---|---|---|---|---|
| SOL-001 | 홈 솔루션 셀렉터 | 좌측 5개 항목 클릭 → 우측 프리뷰 교체 (페이지 이동 없음) | `/` | Working |
| SOL-002 | 홈 솔루션 아코디언 | `lg` 미만에서 활성 행 아래 프리뷰 인라인 표시 | `/` | Working |
| SOL-003 | 솔루션 상세 진입 | `Explore Solution →` → `/solutions/{slug}` | `/` | Working |
| SOL-004 | 솔루션 상세 5종 | Hero / Overview / Experience / How It Works / Final CTA | `/solutions/*` | Working |
| SOL-005 | Experience 캐러셀 | 3슬라이드 자동 전환 + dots | `/solutions/axsl` | Working |
| SOL-006 | Experience 단일 프레임 | 16:9 프레임, 이미지 또는 영상 | 나머지 4종 | Working |
| SOL-007 | 홈 카드 이미지 | 5개 카드 전부 실제 제품 이미지 연결 | `/` | Working |

### 5.3 CTA / Link

| ID | Function | Description | Page | Status |
|---|---|---|---|---|
| CTA-001 | Hero 앵커 스크롤 | `Explore Solutions →` → `#home-solutions` | `/` | Working |
| CTA-002 | 프로젝트 상담 | `프로젝트 상담 →` → `/contact` | 솔루션 5종 | Working |
| CTA-003 | Experience 앵커 | `View Demo →` → `#experience` / `#demo` | 솔루션 5종 | Working |
| CTA-004 | 외부 Demo (AXSL) | 새 탭 → `.../public/axsl.html` | `/solutions/axsl` | Working |
| CTA-005 | 외부 Demo (Berrywatch) | 새 탭 → `.../public/wearables.html` | `/solutions/berrywatch-platform` | Working |
| CTA-006 | 외부 Demo (AI OCC) | 새 탭 → `.../public/pet.html` | `/solutions/ai-occ` | Working |
| CTA-007 | 외부 Demo (Private AI) | — | — | **Not Implemented** (CTA 없음) |
| CTA-008 | 외부 Demo (Validation) | — | — | **Not Implemented** (CTA 제거됨) |
| CTA-009 | Final CTA → Contact | `Contact Us →` | 솔루션 5종 · About · 홈 | Working |
| CTA-010 | 이메일 링크 | `mailto:contact@yonlab.ai` | 홈 · Contact · Footer · 법적 2종 | Working |
| CTA-011 | 개인정보처리방침 링크 | 동의 문구 내 → `/privacy` | `/contact` | Working |
| CTA-012 | Footer 법적 링크 | Privacy Policy / Terms of Use | 전 페이지 | Working |

### 5.4 Form

| ID | Function | Description | Page | Status |
|---|---|---|---|---|
| FORM-001 | 문의 유형 선택 | 라디오 4종, 기본값 Business Inquiry | `/contact` | Working |
| FORM-002 | 입력 검증 | 필수 5항목 미입력 시 필드별 오류 + `role="alert"` | `/contact` | Working |
| FORM-003 | 문의 제출 | 검증 통과 시 `mailto:` URL 생성 후 메일 클라이언트 실행 | `/contact` | **Placeholder** — 서버 전송·저장 없음 |
| FORM-004 | 제출 완료 화면 | 폼 → 완료 카드로 교체 | `/contact` | Working |

### 5.5 Animation / Interaction

| ID | Function | Description | Page | Status |
|---|---|---|---|---|
| ANIM-001 | 스크롤 리빌 | `[data-reveal]` + IntersectionObserver (32개 파일) | 전 페이지 | Working |
| ANIM-002 | 헤드라인 줄 등장 | `.reveal-lines` | `/` Hero | Working |
| ANIM-003 | 스크롤 연동 등장 | `.scroll-rise` (`animation-timeline: view()`) | `/` Why · Capabilities | Working |
| ANIM-004 | 로드 페이드업 | `animate-yfade` (11개 파일) | 솔루션 Hero 등 | Working |
| ANIM-005 | 영상 자동재생 | `autoPlay muted loop playsInline` | 솔루션 4종 | Working |
| ANIM-006 | 모션 감소 대응 | `prefers-reduced-motion: reduce` 전역 존중 | 전 페이지 | Working |
| ANIM-007 | noscript 폴백 | JS 미실행 시 `[data-reveal]` 강제 노출 | 전 페이지 | Working |
| ANIM-008 | Modal / Dialog | — | — | **Not Implemented** (사이트 전체에 없음) |

### 5.6 Platform / SEO

| ID | Function | Description | Page | Status |
|---|---|---|---|---|
| SEO-001 | 페이지별 metadata | title / description | 전 페이지 | Working |
| SEO-002 | Open Graph | title / description / type / locale | 전역 | **Partial** — `images` 없음 |
| SEO-003 | metadataBase | `https://www.yonlab.ai` | 전역 | Working |
| SEO-004 | favicon | ICO 16/32/48 + PNG 512 + apple-touch 180 | 전 페이지 | Working |
| SEO-005 | sitemap.xml | — | — | **Not Implemented** |
| SEO-006 | robots.txt | — | — | **Not Implemented** |
| SEO-007 | 애널리틱스 | — | — | **Not Implemented** |
| SEO-008 | 다국어(i18n) | `lang="ko"` 고정 | 전역 | **Not Implemented** |

**기능 총계** — 정의된 기능 **43개** / `Working` 34 · `Partial` 2 · `Placeholder` 1 · `Not Implemented` 6

---

## 6. Known Issues / Incomplete

> 이 섹션은 **발견 사항 기록 전용**입니다. 이번 작업에서 아무것도 수정하지 않았습니다.

### 6.1 Placeholder / 미연결

| 항목 | 위치 | 내용 |
|---|---|---|
| Contact 폼 백엔드 | `sections/ContactForm.tsx` | 서버 없음. `mailto:`만 생성 → 사용자가 메일을 보내지 않으면 문의가 도달하지 않음 |
| Partner Products 콘텐츠 | `/solutions/partner-products` | `TodoNote` 2곳 — ① 파트너사·제품명·로고·주요 기능 미확보 ② 제공·협력·기술 지원 방식 미확보 |
| 외부 Demo URL | 솔루션 3종 | `http://` + **고정 IP:포트**(`118.217.226.238:10100`). 도메인·HTTPS 아님. 서버 중단 시 CTA 실패 |
| OG 이미지 | `app/layout.tsx` | `openGraph`에 `images` 키 없음 → SNS 공유 시 썸네일 없음 |

### 6.2 Dead code / 미사용

| 항목 | 규모 |
|---|---|
| 미사용 컴포넌트 | **17개** (§4.4) |
| `lib/company.ts` | 220줄. 사용처인 `sections/company/*` 8개가 전부 미사용이라 데이터도 사실상 미사용 |
| `standardSolutionSlugs` | `lib/solutions.ts`에서 **빈 배열** (공용 `[slug]` 라우트 삭제 흔적) |
| `solutionPanels[5]` (partner-products) | 홈·헤더·푸터 어디에도 노출되지 않음 |
| 고아 라우트 8개 | 진입 경로 없이 200 반환 |

### 6.3 중복 코드

| 항목 | 내용 |
|---|---|
| Solution 상세 5종 | 템플릿을 공유하지 않고 각 300–440줄로 유사 구조 복제. **공통 섹션 수정 시 5개 파일을 모두 수정해야 함** |
| `MediaFrame` 함수 | `ai-occ`, `validation-automation`, `berrywatch-platform`, `private-ai-platform` **4개 파일에 로컬 중복 정의**. 파일마다 `object-fit` 기본값과 지원 타입(video/image)이 다름 |
| Final CTA 그라디언트 카드 | 솔루션 5종 + 홈 ClosingCta에 마크업 반복 |

### 6.4 중복 DOM (responsive 이중 렌더)

한 시점에 하나만 보이며(`display:none`) 화면·접근성 문제는 없으나, DOM에 콘텐츠가 2번 존재합니다.

| 위치 | 내용 |
|---|---|
| `sections/Solutions.tsx` | `SolutionPreview`가 모바일 아코디언(`lg:hidden`) + 데스크톱 컬럼(`hidden lg:block`) 양쪽에 렌더 (활성 1개분) |
| `sections/ContactHeroVisual.tsx` | 문의유형 칩 4개가 데스크톱 절대배치 패널 + 모바일 2열 그리드 양쪽에 렌더 |

통합하려면 **컨테이너 구조 재설계**가 필요합니다 (모바일/데스크톱에서 요소의 부모가 달라야 함).

### 6.5 Hard-coded content

- Main Page 카피 일부가 컴포넌트에 하드코딩 (`HomeBento`, `CoreCapabilities` 섹션 설명 등) → `lib/content.ts` 단일 소스 원칙에서 벗어남
- Solution 상세 5종은 미디어 경로 상수와 본문 카피를 각 `page.tsx` 내부에 직접 보유

### 6.6 사용되지 않는 Asset — **삭제하지 않았습니다**

| 파일 | 크기 | 비고 |
|---|---|---|
| `/____cfe65555-807b-4c61-863d-88c336149ee1.jpeg` | 373KB | 용도 불명, 참조 없음 |
| `/berrywatch/berrywatch-hero.png` | 1.6MB | 구 Hero 이미지 (현재 `.mp4`로 대체) |
| `/favicon.svg` | — | 이전 Vite 사이트 잔존물 |
| `/icons.svg` | — | 이전 Vite 사이트 SVG 스프라이트 |
| `/legal/*.docx` · `*.pdf` (4개) | 352KB | 법적 문서 원본. **공개 다운로드 가능** — 의도 확인 필요 |

### 6.7 성능 위험

| 항목 | 수치 |
|---|---|
| `validation-hero.png` | **15.3MB** (5504×3072). 표시 폭은 최대 640–700px. `images.unoptimized: true`라 원본이 그대로 전송됨 |
| `private-ai-demo.mp4` | 13.3MB |
| 빌드 산출물 총량 | **59MB / 94파일**. Workers 파일당 25MiB 한도 이내이나 여유가 크지 않음 |
| 웹폰트 | `globals.css`의 `@import`로 Google Fonts + jsDelivr 로드 → **렌더 블로킹 + 외부 의존**. `next/font` 미사용 |

### 6.8 Accessibility — 확인된 사항

**양호**
- `aria-haspopup` / `aria-expanded` / `aria-current` / `aria-controls` 적용 (Header)
- 폼 오류에 `aria-invalid` + `role="alert"`
- Skip link, `prefers-reduced-motion` 전역 존중, noscript 폴백
- placeholder 영역에 `role="img"` + `aria-label`

**확인 필요 (V2 검토 대상)**
- `Button`이 `<Link>`만 렌더 → 실제 버튼 시맨틱이 필요한 곳에 사용 시 부적절할 수 있음
- 색 대비: `faint(#8496B5)`·`idle(#AEBFDD)`를 흰 배경 소형 텍스트에 사용하는 구간의 WCAG AA 대비 미검증
- 자동재생 영상 4종에 재생/정지 컨트롤 없음 (`muted`+`loop`라 접근성 위반은 아니나 제어 불가)
- 캐러셀(AXSL)에 일시정지 버튼 없음 (`prefers-reduced-motion`에서는 자동 정지)

### 6.9 Responsive — 확인된 사항

- 실측 결과 13페이지 × 375 / 768 / 1440px = **39개 조합에서 가로 오버플로 0**
- `lg`(1024px)가 사실상 유일한 주요 분기점 (`lg:` 525회 vs `md:` 48회) → **768–1023px 태블릿 구간이 모바일 레이아웃을 그대로 사용**하는 곳이 많음. V2에서 태블릿 전용 최적화 검토 여지

### 6.10 Production ↔ 코드 차이

**현재 차이 없음.** Production(`www.yonlab.ai`)은 `main` HEAD(`353a7db`)에서 자동 빌드된 결과이며, 문서 작성 시점에 검증했습니다.

**주의** — `main`에 push하면 Cloudflare Workers Builds가 **즉시 Production을 재배포**합니다.
또한 `cloudflare/workers-autoconfig` 브랜치는 **병합하면 안 됩니다** (`/apps/onpersona/privacy/` 삭제 + `compatibility_date`가 배포본과 다른 2026-05-06으로 되돌아감).

---

## 7. 버전 관리 규칙

- **기능 ID는 영구적입니다.** `NAV-001` 등은 한 번 부여하면 변경하지 않습니다. 기능이 삭제되면 ID는 유지하고 Status를 `Removed`로 표시합니다.
- 새 기능은 해당 카테고리의 다음 번호를 사용합니다 (`NAV-009`, `CTA-013` …).
- 버전별 스냅샷은 `docs/versions/vX.Y.md`에 기록하며, **한 번 작성한 스냅샷은 수정하지 않습니다.**
- 변경 이력은 `docs/CHANGELOG.md`에 누적합니다.
- 이 문서(`WEBSITE_SPEC.md`)는 **항상 최신 배포 상태**를 반영하도록 갱신합니다.

---

*본 문서는 커밋 `353a7db` (tag `v1.0.0`)의 코드와 `https://www.yonlab.ai/` 배포본을 분석해 작성했습니다.*

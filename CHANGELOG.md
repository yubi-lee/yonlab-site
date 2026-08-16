# CHANGELOG

> **상태 표기**: ✅ 완료 · 🟡 검토중(사용자 확인 대기) · ⏸ Pending(에셋·정보 확보 대기)

## [1.0.0] — 2026-08-16 · **정식 v1.0 완료 — Production 배포**

YOnLab 홈페이지 정식 1.0 완료 버전입니다. `www.yonlab.ai` / `yonlab.ai`에 배포되어 서비스 중입니다.

- **기준 커밋**: `353a7db` (tag `v1.0.0`)
- **배포**: Cloudflare Worker `yonlab-site`, 저장소 `yubi-lee/yonlab-site` main 자동 빌드
- **빌드**: `npm run build` → `./out` (Next.js 정적 export) → Workers Static Assets

### 완료된 페이지

| 페이지 | 경로 |
|---|---|
| Home | `/` |
| About | `/company` |
| Contact | `/contact` |
| 개인정보처리방침 | `/privacy` |
| 이용약관 | `/terms` |
| Solution 상세 5종 | `/solutions/{axsl, private-ai-platform, berrywatch-platform, ai-occ, validation-automation}` |

기존 별도 앱 페이지 `/apps/onpersona/privacy/` 는 그대로 유지됩니다.

### 완료된 기능·콘텐츠

- Solution 5종 Hero/Experience 미디어 전량 연결 (이미지·영상)
- 외부 Demo URL 연결: AXSL · Berrywatch · AI OCC
- Main Solutions 카드 대표 이미지 5종 연결
- 법적 문서 실문서 반영 (시행일 2026-08-14)
- Contact 폼 (백엔드 없이 `mailto:` 생성, 외부 전송 없음)
- favicon 적용 (16/32/48 ICO + 512 PNG + apple-touch-icon 180)
- 반응형 375 / 768 / 1440 대응

### 배포 상태

- Production: **배포 완료** — 두 도메인 200, 주요 라우트 전부 200
- Preview: `https://review.yonlab-website-preview.pages.dev` (Cloudflare Pages, 검수용)
- Production branch `main` → Cloudflare 자동 빌드·배포

### v1.0 이후

추가 디자인·기능 수정은 **`feat/v2-site` 브랜치**에서 진행합니다. v1.0 코드는 tag `v1.0.0`으로 고정되어 있습니다.

---

## [0.19.0] — 2026-08-14 · **V2 최종** — Main Solutions 이미지 연결 + 최종 QA

### ✅ Main Solutions 카드에 실제 제품 이미지 연결

홈 Solutions 섹션의 5개 카드가 전부 placeholder였던 것을, 각 솔루션 상세 페이지에서 이미 쓰고 있는
asset을 재사용해 연결했습니다. **새 이미지는 만들지 않았습니다.**

| 카드 | asset | 슬롯 비율 | 원본 비율 | letterbox |
|---|---|---|---|---|
| 01 AXSL | `/axsl/axsl-hero.png` | 16/10 | 1.84 | 상하 6.5% |
| 02 Private AI Platform | **없음 (placeholder 유지)** | 16/10 | — | — |
| 03 Berrywatch Service | `/berrywatch/berrywatch-demo.png` | 16/10 | 1.85 | 상하 6.8% |
| 04 AI OCC | `/occ/occ-demo.png` | 16/10 | 1.97 | 상하 9.4% |
| 05 Validation Automation | `/validation/validation-hero.png` | 16/9 | 1.79 | 상하 0.3% |

- `components/ui/ImageSlot.tsx`: `src`가 있으면 `next/image`(`fill` + `object-contain`), 없으면 기존
  라벨 placeholder. 회색 박스·가짜 UI 없음
- `Mockups.tsx` 5종(browser/appWindow/console/analytics/phone) 전부 `src` 통과
- `lib/content.ts`의 `slot`에 `src?: string | null` 추가 — 카드 이미지가 데이터로 관리됨
- **`contain` 선택 이유**: 제품 UI 스크린샷이라 `cover`로 좌우를 자르면 실제 인터페이스가 잘립니다.
  여백은 목업 프레임 본체(흰색) 위라 창 패딩처럼 읽힙니다
- **Private AI만 placeholder**: `public/private ai/`에 영상 2종만 있고 정지 이미지가 없습니다.
  임의 이미지를 만들지 않았습니다
- 후보였지만 쓰지 않은 것: `berrywatch-hero.png`(검은 배경 디바이스 컷 — 흰 목업과 충돌),
  `occ-hero.png`(검은 레터박스 baked-in)
- 카드 텍스트·순서·레이아웃·CTA 전부 무변경

### ✅ About Hero 텍스트 노드 정리

`AI를 실제 환경에 적용하는<br/>일을 합니다.` 에서 `<br />` 앞에 공백을 추가.
화면 렌더는 동일(줄 끝 공백은 표시되지 않음)하고, **텍스트로 읽을 때** `적용하는일을`이
`적용하는 일을`로 정상화됩니다. 복사·붙여넣기와 스크린리더에 영향.

> 참고: 보고된 `실제 환경 에`는 소스·HTML·브라우저 렌더 모두 이미 `실제 환경에`였습니다
> (`실제 환경</span>에 적용하는`, 375/1024/1440px에서 같은 줄·간격 0px, `word-break: keep-all`).
> 태그를 공백으로 치환하는 추출 방식에서만 벌어져 보입니다.

### ✅ 이미 반영되어 있던 항목 (재확인)

- AXSL How It Works 01 `필요한 AI 서비스를 정의합니다.` — 0.18.0에서 반영됨
- Privacy/Terms `시행일 | 2026년 8월 14일`, `1. 개인정보의 처리 목적`, `1. 목적` 실제 공백 — 0.18.0
- Validation 키워드 3종 / How It Works 6스텝 / Experience 2문단 — 0.18.0, Preview 반영 확인

### 검증

- production `npm run build` 성공(경고 0) · `tsc --noEmit` · `lint` 통과
- 내부 링크 16개 200 · 앵커 19개 전부 유효 · 죽은 `#` 0 · 404 정상
- 외부 View Demo URL 3개 200, 각 상세 페이지 href 실재 확인
- 이미지·`next/image` 엔드포인트 200, Solutions 카드 4장 실측 로드 확인
- 반응형 10페이지 × 375/768/1440 = 30조합 가로 오버플로 0
- console error 0 · hydration warning 0

---

## [0.18.0] — 2026-08-14 · **콘텐츠 확정 + 전체 QA** — 미디어 전량 연결 · 법적 문서 · 최종 카피

0.17.0 이후의 모든 작업을 합친 항목입니다. 남아 있던 에셋·URL·법적 문서를 모두 채우고,
전 페이지를 실측 QA한 뒤 Preview에 배포했습니다.

### ✅ 미디어 전량 연결 (5/5 솔루션)

| 솔루션 | 추가된 것 |
|---|---|
| Private AI | Demo 영상 `private ai/private-ai-demo.mp4` (2880×1800) |
| AI OCC | Hero `occ/occ-hero.png` · Experience `occ/occ-demo.png` · Demo URL `pet.html` |
| Validation | Hero `validation/validation-hero.png` · Demo `validation/validation-demo.mp4` (1920×1280) |
| Berrywatch | Demo URL `wearables.html` |

- **object-fit 기준 확립**: 프레임은 전부 16:9. 소스 비율이 다를 때 UI가 잘리면 `contain`,
  잘릴 것이 없으면 `cover`.
  - Private AI Demo(16:10) `cover → contain` — cover 시 상하 각 5%(원본 90px씩) 손실.
    같은 프레임을 쓰는 Hero 홍보영상은 정확히 16:9라 결과 동일(무변경)
  - Validation Demo(3:2) video 분기만 `cover → contain` — cover 시 상하 각 7.8%(원본 100px씩) 손실.
    Hero 이미지 분기는 `cover` 유지(1.79 ≈ 16:9, 크롭 0.4%)
  - AI OCC Hero는 원본에 검은 레터박스가 baked-in(1024×768 중 실제 아트 1024×600)이라
    `cover`로 띠를 제거. 아트 손실은 상단 19px·하단 5px
- `MediaFrame`이 video 전용이던 AI OCC·Validation 페이지에 **이미지 분기 추가**(`next/image`)
- AI OCC Experience는 단일 통합 캡처 1장이라 **캐러셀 → 단일 프레임**(Berrywatch 선례)
- Validation은 외부 Demo 플랫폼이 없어 **Experience 하단 `View Demo ↗` CTA와 `DEMO_URL` 상수 삭제**.
  Hero의 `View Demo →`(`#experience` 스크롤)는 5종 공통 규칙이라 유지

### ✅ `/privacy`, `/terms` 실문서 반영

- 원본 `public/legal/YOnLab_{Privacy_Policy,Terms_of_Use}_2026-08-14.docx`를 전사 →
  **신규 `lib/legal.ts`** (섹션 번호·순서·문장 원문 그대로). 카피 창작 없음
- **신규 `components/sections/LegalDocument.tsx`** — 마스트헤드(제목/영문 제목/시행일) + 본문 820px 컬럼.
  공용 `PageHero`는 5곳이 공유하므로 Contact와 같이 페이지 전용 인라인 히어로 사용
- 카드·그래픽·애니메이션 없음. 구 `LegalPage.tsx`("준비 중" 셸)는 미사용으로 잔존
- 정합성 자동 검증: 원문 줄(29 / 31) 전부 렌더 결과에 존재, 누락 0
- Footer는 이미 `routes.legal`을 가리키고 있어 **미변경**

### ✅ About — Engineering Context 카드 리디자인

- 카드 3개를 가로지르던 **파란 arc 제거**(`ARC_GEO`/`SCOPE_ARC`/`SCOPE_SLICE` 삭제)
- 3장 공통 서피스(`SCOPE_SURFACE`): 상단 블루 글로우 + 화이트→아이스블루 웨이시
- 우상단에서 페이드아웃되는 blueprint 헤어라인(기존 유틸 재사용), 카드 최상단 공통 블루 헤어라인
- `LAYER` 라벨 + 연결 rule + 26px 블루 numeral로 계층 강화, 칩은 4px sky 도트 + 축소
- hover는 `-translate-y-[3px]` + 그림자만. neon/glassmorphism/3D 없음

### ✅ 최종 카피 수정

- **Validation Automation** — 실제 구현 예정 User Flow 기준으로 교체
  - Overview 키워드: `App Validation` · `Model Validation` · `Device Lab`
  - Experience 2문단 교체
  - How It Works 6스텝 전면 교체 (Upload / Configure → Select Device → Run Validation →
    Analyze Results → Retry / Compare → Report)
- **AXSL** How It Works 01: `필요한 AX를 정의합니다.` → `필요한 AI 서비스를 정의합니다.`
- **Contact** 동의 문구 → `개인정보 수집·이용에 동의합니다. 자세한 내용은 개인정보처리방침을 확인해주세요.`
  `개인정보처리방침`은 `/privacy` 링크(`stopPropagation`으로 체크박스 토글 방지).
  보유기간 표현을 문구에서 빼 **방침 문서로 일원화** → Privacy Policy §3(1년)과 충돌 해소
- **Legal 문서 spacing** — `시행일 | 2026년 8월 14일`, `1. 개인정보의 처리 목적`이
  실제 공백을 갖도록 수정(기존에는 flex gap/margin뿐이라 텍스트 복사·추출 시 붙음)

### ℹ️ About Hero 오타 — 확인 결과 수정 불필요

`AI를 실제 환경 에 적용하는`로 보고되었으나, 소스·빌드 HTML·브라우저 렌더 모두
**이미 `실제 환경에`로 붙어 있습니다**(`실제 환경</span>에 적용하는`).
375/1024/1440px에서 Range 실측 결과 항상 같은 줄·간격 0px, `word-break: keep-all` 적용.
naive한 태그 제거 방식으로 텍스트를 추출하면 태그 경계가 공백이 되어 `환경 에`로 보입니다.

### ⚠️ 중복 DOM — 2건 발견, 미수정

- `Solutions.tsx`: `<SolutionPreview>`가 모바일 아코디언 + 데스크톱 컬럼 두 곳에 렌더
- `ContactHeroVisual.tsx`: 문의유형 칩 4개가 데스크톱 절대배치 패널 + 모바일 그리드 두 곳에 렌더

두 경우 모두 모바일/데스크톱에서 요소가 **다른 부모** 안에 있어야 해 통합하려면 컨테이너 재설계가 필요하고,
해당 영역이 확정·보호 영역이라 수정하지 않았습니다. 표시·접근성 문제는 없습니다(§16-B).

### 검증

- `npx tsc --noEmit` / `npm run lint` / **production `npm run build`** 전부 통과
- 라우트 13개 200 · 404 정상 · 내부 링크 16개 200 · 죽은 앵커 0
- 이미지 10개 · 영상 4개 · 외부 Demo URL 3개 전부 정상
- 반응형 13페이지 × 375/768/1440 = 39조합 가로 오버플로 0
- console error 0 · hydration warning 0
- Contact 폼은 백엔드 없이 `mailto:`만 생성 — 검증 차단 확인, 외부 전송 데이터 없음

---

## [0.17.0] — 2026-08-14 · **중간 체크포인트** — Solution 상세 5종 재설계 + About/Contact 리디자인 + Preview 배포

전체 사이트는 **여전히 검토·수정 중**입니다. 이 항목은 완료된 작업과 남은 작업을 구분해 기록한
중간 스냅샷입니다. (0.16.2 이후 ~2026-08-13 세션 변경분은 CHANGELOG에 미기재 상태였고,
해당 내용은 `HANDOFF.md` §15.1에 정리되어 있습니다.)

### ✅ Solution Detail Template 신설 + 5종 전면 재설계

`Private AI Platform`을 레퍼런스로 **공통 5섹션 템플릿** 확립 →
`Hero / Solution Overview / Experience / How It Works / Final CTA`.
구버전 템플릿의 Challenge&Approach · Service Scope · Expected Outcomes ·
Related Capabilities · Other Solutions · 근거 없는 메트릭(`5+`/`Auto`/`Full`)은 전부 제거.

- 신규 전용 라우트 5개: `app/solutions/{private-ai-platform,berrywatch-platform,axsl,ai-occ,validation-automation}/page.tsx`
- `lib/solutions.ts`: `dedicatedSolutionSlugs` 도입 → 5개 slug를 공용 `[slug]` 템플릿에서 제외
- **삭제**: `app/solutions/[slug]/page.tsx` — 생성 경로 0개인 죽은 라우트가 되었고
  `output: export`를 차단해 제거. (git 복구 가능. `SolutionDetailTemplate`·`SolutionHero`·
  `ProductVisual`은 미사용 상태로 파일만 잔존)
- 신규 컴포넌트 1개: `components/sections/solution-detail/ExperienceCarousel.tsx`
  (client, 4초 자동 전환, fade+12px 슬라이드, dots 수동 제어, `prefers-reduced-motion` 시 자동전환 정지,
  `frameTone` / optional `subtitle` prop)
- How It Works 스텝 수: Private AI 5 · Berrywatch 4 · AXSL 4 · AI OCC 4 · Validation 6
  (Validation은 `lg` 3+3 → `xl` 6단 가로, 줄바꿈 지점 커넥터 숨김 처리)
- 포지셔닝 확정: **AXSL**은 App Store/API Catalog가 아닌 *함께 정의하고 구현하는* Solution ·
  **AI OCC = OnCare Circle**(Operation Control Center 아님), Pet Guardian은 Featured Scenario ·
  **Validation**은 V1 확인 범위만 표기(Benchmark/Profiling/CI-CD 미표기)

### ✅ About(`/company`) 재구성 + 비주얼 완성도 개선

12개 섹션 조립을 걷어내고 **6섹션**으로 재구성:
`Hero / What We Work On / How We Work / Industries / Engineering Context / Final CTA`.
Vision·Mission·Values 3카드 클리셰, 로고월, 팀·CEO 프로필, 타임라인, 근거 없는 숫자 전부 미사용.

- Hero: 실행 스택 SVG(`AI Model → SDK·Runtime → OS·BSP → NPU·Chipset → Edge Device` +
  BUILD/VALIDATE/OPERATE 브래킷). 헤드라인 2줄 유지를 375~1440px 전 구간 실측 검증
  (`lg:50px / xl:56px`로 분리)
- What We Work On: 2×2 에디토리얼 그리드(헤어라인 divider, hover 시 블루 라인 확장)
- How We Work: 64px 대형 넘버럴 + 레일 + 노드, 전 스텝 가독성 확보 후 hover에만 블루 강조
- Industries: 다크 네이비 2×2 블록(제조업·자동차·로보틱스·공공기관), 46px 라인 아이콘
- Engineering Context: Application/AI → Software → Hardware **3층 스택**(progressive blue accent)
- 기존 `components/sections/company/*` 8개 컴포넌트는 미사용 상태로 파일만 잔존

### ✅ Contact 리디자인

- Hero: 공용 `PageHero` 대신 Contact 전용 인라인 히어로(공용 컴포넌트 5곳 공유라 미변경).
  blueprint grid + 블루 radial + 이메일 직접 노출
- Hero 비주얼: 떠 있던 칩 → **하나의 라운드 블루 필드 패널**로 통합, 그라디언트 커넥터.
  "Technical Consultation" 칩이 좌측 12px 잘리던 문제 → 노드 좌표 24%/76% 대칭 조정으로 해소
- Inquiry 섹션: `bg-surface` 틴트 배경 + 화이트 폼 카드 대비 강화, 좌측 이메일 카드화
- Form: 선택 상태 강화(`border-blue` + `bg-blue/6%` + inset 링 + 아이콘 칩 채움),
  input `rounded-xl`·focus ring, **제출 버튼 pill로 교체**(전역 버튼 규칙과 어긋나 있던 `rounded-lg` 수정)
- Hero 문구 교체: `Let’s Build What Works in the Real World.` + 2단락 설명 (`lib/content.ts`)

### ✅ 공통 정리

- About/Contact Hero의 **eyebrow 제거**(`ABOUT YONLAB` / `CONTACT` + 블루 도트 + 전용 여백),
  헤드라인이 히어로 첫 콘텐츠. 다른 섹션 eyebrow는 미변경
- 로고 에셋 **1개로 통일** → `yonlab-logo-trim-removebg-preview.png`(투명, 152KB).
  Header·Footer 동일 파일 참조, 종횡비 4.52:1로 동일해 렌더 크기 변화 없음.
  구 `yonlab-logo-trim.png`(422KB) 삭제
- `public/` 정리: 시안 HTML 5종 + 스크린샷 원본 백업 2개 + 구 로고 삭제 (export 18MB → 12MB)
- `next.config.mjs`: **opt-in 정적 export** 추가 — `STATIC_EXPORT=1 npm run build` → `./out`.
  기본 `npm run build` 동작은 불변

### ✅ Cloudflare Pages Preview 배포

- 프로젝트 `yonlab-website-preview` 신설(계정에 기존 Pages 프로젝트 0개 → 운영 영향 없음)
- **Preview 전용**: branch `review` (production branch `production`은 배포 이력 없음)
- URL: https://review.yonlab-website-preview.pages.dev — 로그인 불필요, Access/Zero Trust 미설정
- 운영 도메인·DNS 변경 없음

### 🟡 검토 필요 (제가 작성한 카피 — 근거 문서 없음)

- About Industries 4개 보조 문구 (예: 자동차 → "차량용 칩셋과 SDK 환경에 맞춘 실행 검증")
- About What We Work On 4개 한 줄 설명
- 각 Solution 상세의 Experience 슬라이드 캡션 일부

### ⏸ Pending — 에셋·정보 확보 대기

| 대상 | 필요한 것 | 교체 지점 |
|---|---|---|
| Private AI | Demo 영상 | `DEMO_VIDEO` |
| Berrywatch | Hero 영상 + 3화면(KidsWatch/Parent App/AI Briefing) | `HERO_VIDEO`, `experiences[].src` |
| AI OCC | Hero 미디어 + Pet Guardian 3화면 | `HERO_MEDIA`, `featuredScreens[].src` |
| Validation | Hero + Demo 영상 | `HERO_VIDEO`, `DEMO_VIDEO` |
| AXSL | 3번째 서비스 화면 + **Demo Platform URL** | `showcase[2].src`, `AXSL_DEMO_URL` |

- 검증: 전 작업 `npx tsc --noEmit` / `npm run lint` / `npm run build` 통과.
  모바일 375px 가로 오버플로 0(각 페이지 실측). Header/Footer/Global CSS/Main Page 미변경.

---

## [0.16.2] — 2026-07-28 · Company 페이지 중복 섹션 제거

Company 페이지에서 **CompanyWhy** 섹션 삭제. 사유: 이 섹션의 헤드라인이 **CompanyMessage와 완전히
동일**("우리는 AI를 설명하는 데 그치지 않고, 실제로 작동하도록 만듭니다.")했고, 3개 항목
(Stack Engineering / Real Validation / Project→Platform)이 이미 CoreValues·Mission·Vision이
말한 내용을 재진술해 중복이었음. 서명이 있는 마무리 메시지 CompanyMessage는 유지.

- 삭제: `<CompanyWhy/>` 섹션 + `CompanyWhy.tsx` 컴포넌트 파일 + 미사용 데이터
  (`whyIntro`, `companyWhy`, `CompanyWhyItem`, `companySectionIds.why`).
- Company 페이지 흐름: Hero → Positioning → Stats → Mission → Vision → CoreValues →
  Workflow → Tagline → Partners → **Message** → CTA (중복 헤드라인 1회로 정리).
- 검증: `lint` 무경고 / `build` 성공 / /company 200, 중복 헤드라인 단일화 확인.

---

## [0.16.1] — 2026-07-28 · 최종 링크 검토 + 고아 페이지 연결

전 페이지 링크 무결성 최종 크롤 검토. 발견: **/capabilities(역량 개요)** 개요 페이지가 전역
내비/푸터 어디에서도 링크되지 않는 고아 상태(/solutions도 상세 페이지 버튼으로만 우연히 도달).

- `FooterColumn.headingHref` 추가 → 푸터 **Capabilities/Solutions 컬럼 heading을 개요 페이지 링크**로.
  (헤더 메뉴는 "지금 그대로 유지" 요청에 따라 미변경, 전역 연결은 푸터로 해결.)
- 최종 크롤 결과: 17개 페이지 전부 200, 발견된 내부 링크 17개 전부 200, 죽은 링크(`#`) 0개,
  메일 링크 `business@yonlab.ai` 정상. `lint` 무경고 / `build` 성공.

---

## [0.16.0] — 2026-07-28 · 하이브리드 폴리시 — Qualcomm AI Hub 정돈감 흡수

방향 확정: **하이브리드**. 다크 글로우 카드/히어로는 유지하고, aihub.qualcomm.com의 "깔끔함"을
만드는 요소(정돈된 카드 anatomy·카테고리 배지·넉넉한 여백)만 흡수 (1:1 복제 아님).

- 신규 `Badge` — Qualcomm식 **카테고리 배지**(uppercase pill). dark(스카이 액센트)/light 톤.
- 신규 `CardCta` — 카드 하단 **풀폭 헤어라인 + 라벨/우측 화살표** 푸터(엔터프라이즈 카드 anatomy).
  화살표는 group-hover 시 앞으로 nudge.
- 전 카드 그리드 통일 적용: 홈 Core Capabilities, Solutions Overview, /capabilities 그리드,
  Solutions/Capabilities 상세의 Related 그리드, partner-products Related. 중복 CTA 마크업 제거.
- Solution 카드 헤더를 배지(좌) + 인덱스(우) 2열로 정돈. 히어로 카테고리 칩도 `Badge`로 통일
  (Solution 상세 Hero, partner-products Hero).
- 카드 내부 여백 소폭 확대(태그/설명 mb-7)로 "각 잡힌 시원함".
- 검증: `lint` 무경고 / `build` 성공 / /solutions 200, 배지·푸터 헤어라인 DOM 렌더 확인.

> 참고: 퀄컴은 라이트/미니멀이라 최근 다크 방향과 상충 → 색은 유지, **레이아웃 규율만** 흡수하는
> 하이브리드로 두 요구를 모두 반영. 화면 캡처 주시면 배지 크기·여백을 픽셀 조정.

---

## [0.15.0] — 2026-07-28 · Solution 상세 Hero 대형·다크·글로우 리디자인

"Solution의 hero를 조금 더 화려하게, 크게크게 속시원하게"(ref. upstage.ai/solutions/insurance) 피드백 →
공용 `PageHero`(밝은 배경, 56px 타이틀)를 쓰던 Solution 상세 히어로를 **전용 대형 다크 히어로**로 교체.

- 신규 `SolutionHero` 컴포넌트: **딥네이비 그라디언트 + 블루 글로우 + dot grid** 풀블리드 배경.
- 타이포 대형화: H1 `44 → 64 → 80px`(extrabold, tight tracking), 리드문 `text-xl/white-70`.
- 우측에 **큰 글로우 ProductVisual** 유지, 우상단 **240px 초대형 인덱스 넘버**로 스케일감 부여.
- CTA 2개: `프로젝트 상담`(primary) + `전체 솔루션`(ghost). `animate-yfade` 순차 등장.
- 다크 히어로 → 라이트 Overview로 이어지는 강한 진입 대비. 나머지 상세 섹션 리듬은 [0.14.0] 유지.
- 검증: `lint` 무경고 / `build` 성공(5개 상세 SSG) / 상세 페이지 200, 히어로 DOM 렌더 확인.

---

## [0.14.0] — 2026-07-28 · Solution/Capability 상세 명암 대비 강화 (다크 밴드)

"모든 상세 페이지가 밝은 배경에 텍스트만 쌓여 밋밋/획일적"이라는 피드백 → 각 상세 페이지에
극적인 **다크 네이비 밴드**를 넣어 대비·리듬·시그니처 비주얼을 강화.

- **Solution 상세**: Workflow/Architecture 섹션을 밝은 → **다크 네이비 "엔지니어링 코어"**로 전환
  (블루 글로우 배경 + dot grid + **글로우 노드 다이어그램**). 이어지는 Expected Outcomes(navy)와 합쳐
  페이지 중앙에 강한 다크 코어 형성. FlowDiagram에 `dark` 변형(글로우 노드/레일/흰 라벨) 추가.
- **Capability 상세**: Scope(핵심 범위) 섹션을 **다크 네이비 밴드**(글로우 칩)로 전환해 대비 부여.
- 리듬: 라이트 인트로 → 다크 엔지니어링 코어 → 라이트 클로즈 (Mondrian식).
- 검증: `lint` 무경고 / `build` 성공 / 전 상세 페이지 200.

> 환경 제약: 프리뷰 스크린샷이 불가해 화면을 직접 못 봄 → 구조적(배경 명암·레이아웃) 변경 위주로 진행.
> 실제 화면 캡처를 주시면 타이포·여백·디테일까지 정밀 조정 예정.

---

## [0.13.1] — 2026-07-28 · 전체 링크 연결 (버튼·푸터·메뉴)

사이트 전 페이지 링크 전수 점검 후 남은 `#` 4개를 정리 → **dead link 0개**.

- **Privacy / Terms**: `/privacy`, `/terms` 실제 라우트 생성([LegalPage](components/sections/LegalPage.tsx)
  공용 셸, "정식 문서 준비 중 + 문의 이메일" 안내 — 법적 문구는 임의 생성 안 함). 푸터 법적 링크 연결.
- **Footer 소셜**: 실제 URL이 없는 **LinkedIn·GitHub 아이콘 제거**, **Email(mailto)만 유지**.
  `routes.social`에서 linkedin/github 제거.
- 검증: 18개 페이지에 `href="#"` 0개, 모든 내부 링크 200, `lint` 무경고 / `build` 성공.

---

## [0.13.0] — 2026-07-28 · 카드 시스템 전면 교체 (다크 프리미엄 카드)

흰 배경 위 흰 카드로 밋밋하던 카드를 **kornic식 다크 프리미엄 카드**로 사이트 전체 통일.

- **Card** 프리미티브 ([Card.tsx](components/ui/Card.tsx)): 딥네이비 그라디언트(#0B2A5E→#03102A) +
  상단 하이라이트 라인 + 코너 글로우(hover 강해짐) + hover 리프트·블루 글로우 섀도우·보더 밝아짐.
  라이트 섹션 위에 다크 카드가 떠서 대비/깊이가 살아남.
- **적용(전 카드)**: 홈 Core Capabilities · /capabilities 그리드 · Solutions 개요 · Company Core Values ·
  Solution 상세 Related Capabilities · Capability 상세 Related Solutions · /solutions Related Capabilities ·
  Partner Products Related Capabilities. 내부 텍스트를 white/white-muted/sky-light 액센트로 전환,
  아이콘 칩·태그도 다크 variant로.
- 전체 카드가 클릭 가능한 링크(카드=Link)로 통일, CtaLink 중첩 제거.
- 검증: `lint` 무경고 / `build` 성공 / 다크 그라디언트 카드·white 텍스트·가로 스크롤 없음 DOM 확인.

---

## [0.12.1] — 2026-07-28 · Solution 페이지 시그니처 비주얼 + 스크롤 효과

kornic/mondrian 감도로 Solution 상세 페이지를 "깔끔 + 화려"하게 강화.

- **ProductVisual** ([ProductVisual.tsx](components/sections/solution-detail/ProductVisual.tsx)):
  다크 프로덕트 카드(navy→black 그라디언트) 안에 **글로우 생성형 라인 오브**(동심 아크 16 +
  천천히 회전하는 라이트 스윕 + 코어 글로우 펄스) + 제품명 오버레이. **라인/노드만으로 구성**(스톡/AI
  이미지 없음). 솔루션마다 라이트 소스(코어 위치·스윕 각도)를 다르게 해 5개 페이지가 서로 다르게 보임.
- Solution 상세 Hero의 밋밋한 라이트 카드 → **ProductVisual(다크 글로우 카드)** 로 교체.
- **스크롤 라인-드로우 효과**: 전역 `.draw-line`(뷰 진입 시 가로로 그려짐, mondrian식) 추가,
  Workflow 레일에 적용. 글로우 `glow-pulse`·회전 `slow-spin` 유틸리티 추가(reduced-motion 존중).
- 검증: `lint` 무경고 / `build` 성공 / 다크 카드·아크·제품명·가로 스크롤 없음 DOM 확인.

> 다음: 이 프리미엄 톤을 Solutions 개요·Capabilities·Company로 확장, 페이지별 시그니처 다이어그램 다양화.

---

## [0.12.0] — 2026-07-28 · 프리미엄 리디자인 Phase 1 (디자인 시스템 + 홈 플래그십)

mondrian.ai 분석을 바탕으로 "엔지니어링 스토리" 감도의 리디자인 시스템을 정립하고 홈에 적용.
브랜드(로고·컬러·타이포 스케일·버튼·네비)는 유지, **콘텐츠 표현 방식만** 재설계.

### 새 프리미티브 (재사용 가능)
- [MetricBand](components/ui/MetricBand.tsx): 대형 숫자 증명 밴드(light/surface/navy variant).
- [ContactCta](components/sections/ContactCta.tsx)에 **`variant="dark"`** 추가 → 딥네이비 authority close.
- (기존 StatementBand·PageHero 재사용)

### 홈 리컴포지션 — 배경 리듬 + 타이포 스테이트먼트
반복되던 Hero→cards→CTA 구조 대신 **배경 리듬(white ↔ light ↔ navy)**과 대형 선언으로 스토리화:
Hero(navy 패널) → **포지셔닝 선언(light)** → **대형 지표 밴드(navy)** → Why(white) → Capabilities(light) →
Trust(navy) → Solutions(white) → Action(tech-blue) → **다크 CTA(navy)**. 다크 모먼트 4회로 "시스템 pulse" 연출.

### 검증
- `npm run lint` 무경고 / `npm run build` 성공 / 배경 리듬·다크 CTA·가로 스크롤 없음 DOM 확인.

> Phase 2(예정): Company·Contact 리듬 강화, **Solutions/Capabilities 페이지별 고유 아이덴티티**
> (현재 공용 템플릿 → 솔루션마다 다른 시그니처 다이어그램/레이아웃), 전역 여백 확대.

---

## [0.11.0] — 2026-07-27 · 서브페이지 Hero 통일 (공용 PageHero, nextlab 감도)

홈 Hero(네이비)는 그대로 두고, **나머지 페이지 Hero를 공용 `PageHero` 하나로 통일**.
nextlab.ai 감도(클린 라이트 배경 · 넉넉한 여백 · 자신감 있는 헤드라인 · 명확한 CTA · 절제된 visual) 반영.

- 신규 [components/ui/PageHero.tsx](components/ui/PageHero.tsx): eyebrow(+category) · title · description ·
  cta · visual 슬롯. 배경을 기존 대각선 그라디언트+blueprint grid+glow에서 **깔끔한 세로 그라디언트
  (`#F7FAFF→#FFFFFF`)**로 단순화, 상단 패딩 `lg:pt-32`로 여백 확대, 헤드라인 `lg:text-[56px]`.
- 적용: Solutions 개요 · Solution 상세(template) · Capability 상세(template) · Capabilities 개요 ·
  Contact 페이지 (5곳). 각 페이지 고유 visual(StackVisual/HeroFlowVisual/Capability 아이콘 카드/
  ContactHeroVisual)은 유지.
- Hero는 스크롤 리빌(IntersectionObserver) 대신 **`animate-yfade`(로드 시 항상 재생)**로 전환 →
  뷰포트 최상단 Hero가 관찰자 의존 없이 항상 표시(reduced-motion 안전). Contact 페이지에 RevealProvider 추가.
- 중복되던 6개 hero 블록 제거 → 유지보수성↑. **Company Hero는 기존(대형 아웃라인) 유지**(별도 승인 디자인).

### 검증
- `npm run lint` 무경고 통과 / `npm run build` 성공(전 라우트) / 전 페이지 200 · 단일 h1 · 가로 스크롤 없음.

---

## [0.10.0] — 2026-07-27 · 전체 연결 점검 + nextlab.ai식 플랫 폴리시

### 연결 점검
- 홈의 모든 내부 링크(Header 드롭다운·Footer 4컬럼·CTA·상호링크) **전부 200 확인**:
  `/`, `/company`, `/contact`, `/solutions`(+5 상세), `/capabilities`(+5 상세).
- 남은 `#`는 Privacy/Terms·소셜(LinkedIn/GitHub)뿐(해당 페이지 없음 → placeholder).

### nextlab.ai 참고 UI 폴리시 (브랜드·콘텐츠 유지, 느낌만 정돈)
nextlab.ai의 라이트·미니멀·플랫·여백 중심 감도를 반영. **사진 히어로로 교체하지 않고**
시그니처 네이비 Hero는 유지(원본 지시 "Hero 재디자인 금지" + 스톡 이미지 금지 준수).
- **버튼 플랫화**: 파란 glow(`shadow-cta`)+lift 제거 → **hover 시 색만 진해지는(`blue-hover`) 플랫 버튼**.
  공용 `Button`(전 페이지) + Header Contact + Contact 폼 제출 버튼 일괄 적용.
- **그림자 은은하게**: card/panel/panel-hover/caps/mega/mockup 그림자를 더 얕고 부드럽게 조정
  (예: card hover 0 22px 48px → 0 10px 28px) → 전 페이지 카드·패널이 더 플랫·클린.
- 토큰(`tailwind.config.ts`) + 공용 컴포넌트 수정이라 홈·Company·Contact·Solutions·Capabilities
  전체에 일관 적용.

### 검증
- `npm run lint` 무경고 통과 / `npm run build` 성공(전 라우트 정적).

---

## [0.9.0] — 2026-07-27 · Capabilities 상세 페이지 5종 + 상호 연결

Capabilities 드롭다운의 5개 역량을 각각 독립 상세 페이지로 구현(Solutions와 동일 패턴).
콘텐츠는 기획서(README mega + Core Capabilities)의 title/oneLine/description/tags만 사용, 지어내지 않음.

### 페이지 · 라우팅
- `/capabilities/[slug]` (SSG) — embedded-engineering, platform-engineering, ai-validation,
  ai-optimization, technical-consulting. + `/capabilities`(개요 인덱스).
- `routes.capabilities.*` 를 `/capabilities/<slug>`로 변경, `Capability`에 `slug`·`oneLine` 추가.
- Header Capabilities 드롭다운이 상세 페이지로 연결 + `basePath:"/capabilities"` **active state**.

### 상호 연결 (요청의 "연결")
- **Solution → Capability**: 솔루션 상세의 Related Capabilities 링크가 이제 `#` 대신 실제
  `/capabilities/<slug>`로 연결(TODO 해소). Footer의 Capabilities 컬럼도 상세로 연결.
- **Capability → Solution**: 각 역량 페이지에 **Related Solutions**(역매핑) 섹션 — 예: Platform
  Engineering → Private AI Platform · Berrywatch · AI OCC. `getSolutionsByCapability()`로 자동 생성.

### 구조 (역량별 표현 조정)
Hero(아이콘+태그 visual) → Overview → Scope(핵심 범위) → Related Solutions → Other Capabilities → Contact CTA.
역량에는 문서상 metrics/challenge/workflow가 없어 임의 생성하지 않음(솔루션보다 간결).

### 컴포넌트 / 데이터
- 신규: [lib/capabilities.ts](lib/capabilities.ts)(details/helpers),
  [CapabilityDetailTemplate](components/sections/capability-detail/CapabilityDetailTemplate.tsx),
  [OtherCapabilities](components/sections/capability-detail/OtherCapabilities.tsx).
- [lib/solutions.ts](lib/solutions.ts)에 `getSolutionsByCapability()` 추가.
- 재사용: Header/Footer/ContactCta/Button/Eyebrow/Icon/RevealProvider/토큰.

### 검증
- `npm run lint` 통과(무경고) / `npm run build` 성공(`/capabilities/[slug]` 5종 SSG + index).
- 단일 h1·h2 위계, Capabilities nav active, 가로 스크롤 없음(DOM 확인).

---

## [0.8.0] — 2026-07-27 · Solutions 하위 상세 페이지 5종

Solutions 드롭다운의 5개 메뉴를 각각 독립 상세 페이지로 구현. 콘텐츠는 기획서(design-source)·
프로토타입 데이터만 사용, 문서에 없는 내용은 TODO/placeholder로 표시(임의 생성 없음).

### 페이지 · 라우팅
- `/solutions/[slug]` (SSG, `generateStaticParams`) — private-ai-platform, berrywatch-platform,
  ai-occ, validation-automation. + `/solutions/partner-products`(전용 explorer 페이지).
- `routes.solutions.*` 를 `/solutions/<slug>`로 변경 → Header Solutions 드롭다운·홈 Solutions CTA·
  /solutions 개요 카드가 모두 상세 페이지로 연결. `SolutionPanel`에 `slug` 추가.
- Header에 `usePathname` 기반 **active state**(Solutions 상위 + 현재 하위 항목).

### 공통 구조 (섹션 표현은 솔루션별로 조정)
Hero → Overview → Challenge&Approach → Service Scope → Workflow/Architecture →
Expected Outcomes(navy) → Related Capabilities → Other Solutions → Contact CTA.

### 신규 컴포넌트 / 데이터
- [lib/solutions.ts](lib/solutions.ts): `solutionDetails`(slug별, 문서 패널 + challenge/workflow/
  capabilities/notes 증강), `getOtherSolutions`, `resolveCapabilities`, `partnerProducts`(빈 배열).
- [SolutionDetailTemplate](components/sections/solution-detail/SolutionDetailTemplate.tsx),
  [OtherSolutions](components/sections/solution-detail/OtherSolutions.tsx),
  [TodoNote](components/sections/solution-detail/TodoNote.tsx).
- 재사용: Header/Footer/ContactCta/Button/Tag/Eyebrow/Icon/mockups/RevealProvider/토큰.
- `/solutions` 개요에서 in-page 상세 섹션 제거(상세는 개별 페이지로 이동), 구 `SolutionDetail.tsx` 삭제.

### 문서 반영 / TODO
- 반영: 5개 솔루션 title·category·oneLine·description·tags·metrics(문서), Related Capabilities는
  문서 역량명(Embedded/Platform Engineering·AI Validation·AI Optimization·Technical Consulting) 매핑.
- Customer Challenge: 문서화된 "Why YOnLab" 고객 문제를 연관 매핑(verbatim). AI OCC는 고유 문제
  정의가 없어 **TODO**.
- **Berrywatch**: **위치기반 관제**로 확정(사용자 확인 2026-07-27). 기획서 정의(위치 기반 · 운영 SOP ·
  디바이스 상태 · 현장 매뉴얼을 연결하는 온프레미스 AI 관제)로 구성, Workflow = Location & Device Data →
  Edge/On-Premise → AI Analysis → Operation(SOP·Manual) → Alert·Dashboard. (스마트팜/농업 프레이밍은 해당 없음 → TODO 제거)
- **Partner Products**: 파트너사·제품·로고가 문서에 없어 생성하지 않고 **placeholder + TODO**(데이터 확보 시
  `partnerProducts` 배열로 자동 렌더링). 외부 링크는 `target=_blank` + `rel=noopener noreferrer` 구조 준비.
- Capability 상세 페이지 미구현 → Related Capabilities 링크는 `#`(TODO).

### 검증
- `npm run lint` 통과 / `npm run build` 성공(정적 라우트: `/solutions/[slug]` 4종 SSG + partner-products).
- 단일 h1·h2 위계, Solutions nav active, Outcomes 네이비, 가로 스크롤 없음(DOM 확인).

---

## [0.7.0] — 2026-07-27 · Solutions 페이지 신설 (`/solutions`)

기존 기획서(design-source)·프로젝트 콘텐츠에 있는 Solution 내용만 사용(신규 창작·과장 없음),
nextlab.ai/smart-factory의 정보 위계·스크롤 흐름만 참고. 기존 디자인 시스템·컴포넌트 재사용.

### 페이지 구성
Hero → Solution Overview → Solution Detail ×5 → How We Deliver(Workflow) →
Related Capabilities → Contact CTA

- **SolutionsHero**: eyebrow + 짧은 제목(문서 카피) + 소개(기존 blurb) + Contact CTA +
  간결한 기술형 스택 그래픽(AI Model / On-Device Runtime / Device + NPU·Chipset·SDK, 문서화된 라벨).
- **SolutionOverview**: 5개 솔루션 한눈에 — 대표(Private AI) 전폭 + 나머지 컴팩트 카드, 각 detail 앵커로 이동.
- **SolutionDetail ×5**: 접근 방식(description) · 주요 제공 범위(tags) · 기대 효과(metrics 3종) · 제품 목업.
  교차 레이아웃, AI OCC는 네이비. 목업/Tag/CtaLink 재사용. 각 섹션 안정 id + `scroll-mt`.
- **SolutionsWorkflow**: 문서화된 Build → Optimize → Validate → Deploy → Operate 흐름(가로/세로 timeline).
- **RelatedCapabilities**: Solution vs Capability 구분 설명 + 5개 Capability 링크(현재 라우트 `#` placeholder).
- **Contact CTA**: 기존 ContactCta 재사용(문서 카피, Pipeline off) → `/contact`.

### 데이터/라우팅
- `routes.solutions` 를 `/solutions` + 앵커로 연결(Header Solutions 드롭다운·홈 Solutions CTA가 이 페이지로 이동).
- `solutionPanels`에 `anchor` + `metrics`(프로토타입 문서의 solution 지표) 추가.

### 반영한 기획서 내용
- 5개 솔루션의 title·category·oneLine·description·tags·metrics(모두 design-source/프로토타입 문서),
  Physical AI 스택 라벨, Build/Optimize/Validate/Deploy/Operate 워크플로우.

### Placeholder / 미확인
- 제품 스크린샷: `ImageSlot` placeholder 유지(미제공).
- Capability 상세 페이지 미구현 → Related Capabilities 링크는 `#`.
- 문서에 **per-solution 고객문제 서술·개별 워크플로우·상세 기능목록**이 없어 임의 작성하지 않음
  (문서의 description·tags·metrics + 공통 Workflow로 대체).

### 검증
- `npm run lint` 통과 / `npm run build` 성공(정적 5 라우트, `/solutions` 116kB) / 가로 스크롤 없음 / 단일 h1·h2 위계.

---

## [0.6.3] — 2026-07-24 · Company is-soft 톤 강화 2차

- **KPI 밴드 → 네이비 배경**: 라이트 → `bg-navy`(화이트 그리드 오버레이), 키커 sky·값 화이트·설명 white/70,
  컬럼 구분선 white/15. is-soft KPI 블록의 강한 대비 재현.
- **스테이트먼트 밴드 추가(네이비)**: `StatementBand`에 `navy` variant 추가. Why와 Partners 사이에
  공식 Supporting 태그라인 **"Trusted Intelligence, Verified On-Device"**(README 승인, Hero 외 사용 허용) 배치.
- **넘버링 확대**: Core Values 번호 40 → **64/76px 아웃라인(text-stroke)** 대형화(is-soft 넘버 카테고리 감도),
  Engineering Workflow 단계 번호 13 → **20~22px** 확대.
- `npm run lint` 통과 / `npm run build` 성공(정적 6 라우트).

---

## [0.6.2] — 2026-07-24 · Company 페이지 is-soft 톤 강화

is-soft.co.kr/about/corporate.php의 코퍼레이트 감도(대형 선언문·초대형 KPI·풀폭 스테이트먼트)를
YOnLab 디자인 시스템·승인 카피로 반영(수치 조작·stock 이미지 없음).

- **Company Hero 강화**: 타이틀 68→**76px**, 배경에 초대형 아웃라인 워드 **COMPANY**(opacity .05),
  Scroll 큐 추가 — is-soft식 대형 선언 히어로.
- **StatementBand 신설**([StatementBand.tsx](components/sections/company/StatementBand.tsx)):
  풀폭 대형 타이포 선언문(중앙, ~60px)으로 스크롤을 끊는 is-soft 시그니처. Hero 직후에
  포지셔닝 문구 **"AI를 실제 디바이스 위에서 증명하는 실행형 파트너"**(브리프 승인 카피) 배치.
- **CompanyStats → 초대형 KPI 스타일**: English 카테고리 키커(Experience/Compatibility/Validation/
  Delivery) + **대형 값(~52px)** + KR 설명 + 컬럼 구분선. (기존 작은 밴드 대체)
- 반응형(2→4열)·`word-break: keep-all`·가로 스크롤 없음·`prefers-reduced-motion` 유지.
- `npm run lint` 통과 / `npm run build` 성공(정적 6 라우트).

---

## [0.6.1] — 2026-07-24 · Company 메뉴 단순화 + Company Stats 밴드

- **헤더 Company 드롭다운 제거** → 단일 페이지이므로 다시 **단일 링크(`/company`)**로 복귀.
  Capabilities/Solutions 드롭다운은 그대로 유지. (`companyMenu` 데이터 제거)
- **Company 페이지에 Capability Highlights 밴드 추가**(is-soft 제안 A):
  [CompanyStats](components/sections/company/CompanyStats.tsx) — **20+ Years · Multi-chipset ·
  Real Device · End-to-End**(브리프 근거 지표만, 매출/자산 등 미검증 수치 없음) + 블루 액센트.
  Hero 바로 아래(Mission 앞)에 배치, `bg-surface` 밴드, `word-break: keep-all`, 반응형 2→4열.
- 데이터: `lib/company.ts`에 `companyStats` 추가.
- `npm run lint` 통과 / `npm run build` 성공(정적 6 라우트).

---

## [0.6.0] — 2026-07-24 · 헤더 메뉴 스타일 개편 + Why YOnLab 강조

### 헤더 메뉴 (nextlab.ai 스타일 — 간결 hover 드롭다운)
- 기존 풀폭 **메가메뉴(프리뷰 카드 + 아이콘/설명)** → **컴팩트 세로 리스트 드롭다운**으로 교체.
  각 상위 메뉴 hover/포커스 시 하위 항목이 작은 카드 리스트로 표시(hover-intent 120/160ms 유지).
- **Company를 드롭다운화**: 라벨은 `/company`로 이동 + hover 시 **Mission · Vision · Values ·
  How We Work · Partners** 앵커(`/company#company-…`) 노출. (이전에 요청된 Company 앵커 연동 완료)
- Company 드롭다운은 우측 정렬(`right-0`)로 뷰포트 넘침 방지. 모바일 시트도 3개 메뉴 모두
  아코디언 + Company엔 "Company Overview"(→ /company) 추가.
- 데이터: [lib/company.ts](lib/company.ts)에 `companyMenu` 추가. 접근성: `aria-haspopup`/`aria-expanded`,
  포커스 오픈·Escape 닫기·헤더 밖 포커스 시 닫힘, 키보드 탭 이동.
- 결과: Home First Load JS 122→**120kB**(메가메뉴 제거로 경량화).

### Why YOnLab — 오른쪽(Solution) 강조 (시안 A)
- Solution 셀을 **카드화**(surface 배경 + line-soft 보더 + radius 12px) + 텍스트 **네이비/세미볼드**,
  체크 22px, hover 시 blue 보더·그림자·미세 이동. Challenge는 연하게 유지해 대비 확보.
- 한글 줄바꿈 깨짐 방지: 양쪽 텍스트 `word-break: keep-all`, 그리드 `minmax(0,…)`.
- "YOnLab Solution" 헤더에 블루 언더라인 액센트. (브랜드 규칙 유지 — 블루는 포인트에만)

### 검증
- `npm run lint` → **통과**. `npm run build` → **성공**(정적 6 라우트).

---

## [0.5.0] — 2026-07-21 · Company 페이지 신설 (`/company`)

브랜드 페이지 성격의 Company 페이지를 추가. 기존 Home Design System을 그대로 확장(신규 브랜드 컬러·폰트 없음),
Corporate/Editorial 톤 강화. 섹션 순서·카피는 브리프 그대로.

### 페이지 구조 (9섹션)
Company Hero → Mission → Vision → Core Values → Engineering Workflow →
Why YOnLab → Partners → Company Message → Contact CTA

### 새 컴포넌트
- [CompanyHero](components/sections/company/CompanyHero.tsx): Typography 중심 히어로(제품 화면 배제, 철학 우선).
- [EditorialStatement](components/sections/company/EditorialStatement.tsx): **Mission/Vision 공용**
  (variant `light`/`surface`) — 중복 컴포넌트 없이 배경·라인 그래픽으로 변주.
- [CoreValues](components/sections/company/CoreValues.tsx): 번호·키워드·설명 Typography 위계의 3열 에디토리얼.
- [EngineeringWorkflow](components/sections/company/EngineeringWorkflow.tsx): Build→Optimize→Validate→
  Deploy→Operate. Desktop 가로 Flow / Mobile·Tablet 세로 Timeline(`<ol>`), rail로 연결 표현.
- [CompanyWhy](components/sections/company/CompanyWhy.tsx): 레이어(스택) 암시 에디토리얼 밴드(Home Why와 구분).
- [PartnersSection](components/sections/company/PartnersSection.tsx): 로고 미제공 → 중립 Placeholder
  그리드 + "Partners will be updated". `partnerLogos` 배열 채우면 자동 로고 그리드.
- [CompanyMessage](components/sections/company/CompanyMessage.tsx): Quote 스타일(대표자 사진/이름 미생성,
  서명 자리 `signature`로 확장 대비).
- [Eyebrow](components/ui/Eyebrow.tsx): 공용 kicker 컴포넌트.

### 재사용 / 리팩터
- **ContactCta**를 props화(`title`/`description`/`showPipeline`/`href`/`id`) — Home은 기존 동작 유지,
  Company는 전용 카피 + Pipeline 숨김 + `/contact` 연결로 재사용.
- Header/Footer·Button·RevealProvider·토큰 그대로 재사용. 데이터는 [lib/company.ts](lib/company.ts)로 분리.

### 폰트 로딩 개선 (빌드 견고성)
- Inter를 `next/font/google`(빌드 시 원격 fetch) → **CSS `@import`** 로 전환(Pretendard와 동일).
  오프라인/네트워크 불가 상황에서도 `next build` 성공. 폰트 스택은 그대로.

### 내비게이션
- `routes.company = "/company"` → Header "Company" 링크와 Footer Company 컬럼이 자동 연결.
  (Company는 기존 Design System대로 단일 링크 유지 — 별도 Mega Menu 미생성.)
- 각 섹션에 안정 id(`company-mission` 등) + `scroll-mt: 96px`(고정 헤더 높이 보정) 부여.

### 접근성
- 단일 `<h1>` + 섹션 `<h2>`/`<h3>` 위계, `<main>`/`<nav>` 랜드마크, Workflow `<ol>` 순서,
  장식 그래픽 `aria-hidden`, 포커스 링, `prefers-reduced-motion`(전역), 가로 스크롤 없음.

### 검증
- `npm run lint` → **통과**. `npm run build` → **성공**(정적 6 라우트: `/`, `/company`, `/contact` 등).

---

## [0.4.0] — 2026-07-21 · Contact 페이지 문의·상담 비주얼 강화

Contact 페이지에 문의/상담/협업 성격의 시각 요소를 추가(기술 아키텍처 톤 배제).
레이아웃 폭·섹션 순서·기존 카피·기존 폼 필드·Header/Footer는 유지, 라이브러리 추가 없음.

### 추가 요소
- **Hero Contact Visual** ([ContactHeroVisual.tsx](components/sections/ContactHeroVisual.tsx)):
  중앙 **Contact YOnLab**(Mail) 노드 + 4개 문의유형 노드(Business Inquiry·Partnership·
  Technical Consultation·Recruitment)를 얇은 라인으로 연결. Desktop 우측 노드 그래프 /
  Tablet·Mobile 텍스트 아래 2열 칩 그리드로 간소화. 옅은 블루 dot-grid·글로우(low opacity).
- **문의 유형 리스트** ([ContactTypeList.tsx](components/sections/ContactTypeList.tsx)):
  좌측 정보 영역에 Icon+Title+설명 세로형 에디토리얼 리스트(기존 3-step 절차 대체). hover 시 보더/아이콘만 약하게.
- **문의 유형 선택 UI** (폼 상단, [ContactForm.tsx](components/sections/ContactForm.tsx)):
  기존 `<select>`를 **접근성 라디오 그룹**으로 교체. Icon+Label, 선택 시 안내 문구(`aria-live`)와
  제출 값(mailto 제목/본문)이 변경. `<fieldset>/<legend>`, 네이티브 라디오(방향키 이동),
  포커스 링, 최소 56px 터치 타깃.
- **문의 프로세스** ([ContactProcess.tsx](components/sections/ContactProcess.tsx)):
  Inquiry → Review → Discussion → Response. Desktop 가로 / Mobile 세로. 과한 애니메이션 없음.
- **배경 디테일**: Hero 비주얼에 옅은 블루 dot-grid + 소프트 글로우(폼 뒤에는 강한 패턴 없음).

### 사용 아이콘 (lucide-react)
- 문의 유형: BriefcaseBusiness · Handshake · Headset · Users
- 중앙 노드: Mail
- 프로세스: MailOpen · ClipboardCheck · MessagesSquare · Send / 방향 표시 ArrowRight·ArrowDown
- 아이콘 매핑: [contactMeta.ts](components/sections/contactMeta.ts)

### 데이터
- `lib/content.ts`: `contactTypes`(4종: label·desc·hint) + `contactProcess`(4단계) 추가,
  기존 `inquiryTypes`/`contactSteps` 제거.

### 검증
- `npm run lint` → **통과**. `npm run build` → **성공**(정적 5 라우트, Contact ~121kB).

---

## [0.3.0] — 2026-07-21 · Solutions Selector(탭) 레이아웃 재구성

Bento Grid가 5개 목업을 한 화면에 몰아 조잡하게 보인다는 피드백을 반영해,
mondrian.ai 메인의 "Key Points 탭 셀렉터" 패턴을 참고하여 **Selector 레이아웃**으로 교체.

### Solutions → Selector + 모바일 아코디언
- **Desktop/Tablet**: 좌측 인덱스(5개 솔루션 이름·한줄설명 **항상 노출**) + 우측 **대형 프리뷰 1개**.
  인덱스 클릭 시 우측 프리뷰가 해당 솔루션으로 전환(제품 목업 1개만 크게 = 여백↑, 밀도↓).
- **Mobile**: 동일 인덱스가 **아코디언**으로 동작 — 활성 항목 아래로 대형 프리뷰가 인라인 확장(숨김 아님).
- **AI OCC** 선택 시 프리뷰 패널이 **네이비**로 전환되어 기존 센터피스 아이덴티티 유지.
- 활성 항목: 좌측 블루 액센트 바 + 번호(blue) + 제목(navy), 데스크톱 화살표 / 모바일 셰브론 회전.
- **재사용**: 목업 5종·Tag·Button·`lib/content.ts` 데이터 그대로. `SolutionPanel`에 `oneLine`(인덱스용 한줄) 추가.
- **접근성**: `aria-expanded`/`aria-controls`, 프리뷰 `role="region"` + `aria-live="polite"`, 키보드 조작.
- 이전 Bento(0.2.0) 레이아웃은 이 Selector로 대체됨(카피/목업/컴포넌트는 동일 재사용).

### 검증
- `npm run lint` → **통과**. `npm run build` → **성공**(정적 5 라우트, Home ~122kB).

---

## [0.2.0] — 2026-07-21 · 레이아웃 확장 · Solutions Bento · Contact 페이지

디자인 시스템은 유지하면서 Enterprise/Information-first 방향으로 완성도를 높였습니다.

### 1. 전체 레이아웃 Width 확장
- `tailwind.config.ts`에 **3-tier 폭 체계** 도입: `wide 1360px` / `content 1280px`(1200→) /
  `prose 1120px`. (`hero`도 1160→1280)
- 섹션별 적용: Solutions·Core Capabilities → **wide(1360)**, Hero 내부·Why·Trust·Action·Footer
  → **content(1280)**, Contact CTA(중앙 정렬) → **prose(1120)**. 거터는 유지.
- 결과: 대형 화면에서 좌우 여백이 줄고 시원한 Enterprise 레이아웃.

### 2. Solutions → Bento Grid (동일 카드 나열 → 크기 차등)
- 기존 5개 동일 풀-폭 패널을 **크기가 다른 5개 타일의 Bento Grid**로 재구성.
  선택 전에도 5개가 한눈에 보이며 중요도가 크기로 구분됨.
  - **01 Private AI Platform** — 대형 피처 타일(col-span-4, 텍스트+Browser 대시보드)
  - **03 AI OCC** — 네이비 세로 타일(col-span-2 · 2행, 섹션 액센트, Console 목업)
  - **02 Berrywatch / 04 Validation** — 중형 타일(각 col-span-2, AppWindow/Analytics 목업)
  - **05 Partner Products** — 와이드 밴드(col-span-6, Phone 목업 + 텍스트)
- 반응형: Desktop 6-col 벤토 / Tablet 2-col / Mobile 1-col.
- 목업 5종·Tag·Button·CtaLink·토큰 **전부 재사용**. 목업에 `bare` 옵션 추가(타일용 오프셋 패널 제거).
- 카피/이미지 placeholder/컴포넌트 구조는 원본 유지(정보 손실 없음).

### 3. Contact Us 페이지 신설 (`/contact`)
- Edge AI식 Enterprise 문의 페이지 구조를 YOnLab 디자인 시스템으로 재구성(복제 아님).
- **Page Hero**(기존 승인 카피 재사용) + **2-Column**: 좌측 문의 안내·이메일·3-step 문의 절차 /
  우측 문의 폼.
- **문의 폼**: 이름·회사명·이메일·연락처·문의 유형(select)·문의 내용·개인정보 동의(checkbox) +
  클라이언트 검증 + 성공 상태. **프런트엔드 전용**(백엔드 미연동, 제출 시 `mailto` 폴백 —
  사이트가 데이터를 전송/저장하지 않음).
- `routes.contact = "/contact"`로 변경 → Header·Hero·Footer·Closing CTA 등 **6개 Contact 링크 배선**.
- 접근성: label 연결, `aria-invalid`/`aria-describedby`, `role="alert"` 에러, 포커스 링, 키보드 제출.

### 4. 전체 방향 (Clean · Technical · Information-first)
- 폭 정리 + 여백 강화로 정보 우선의 차분한 Enterprise 톤 강화. 새 스타일 없이 기존 시스템 확장.

### 검증
- `npm run lint` → **통과(경고/오류 없음)**.
- `npm run build` → **성공** — 정적 라우트 5개(`/`, `/contact` 등), Home ~118kB / Contact ~119kB.

---

## [0.1.0] — 2026-07-21 · YOnLab 홈페이지 초기 구현

`design-source/`의 디자인 산출물(최우선 기준: `design-source/README.md`)을 바탕으로
YOnLab 홈페이지(Home)를 Next.js App Router로 구현했습니다.

### 프로젝트 초기화
- 디자인 원본을 루트에서 **`design-source/`** 폴더로 정리(내용 변경 없음): README, 디자인 브리프,
  `.dc.html` 시안 2종, `screenshots/`(8장), `assets/`(로고).
- 개발 환경: 로컬에 Node.js가 없어 **Node.js LTS(v24.18.0)** 를 winget으로 설치.
- 기술 스택: **Next.js 15 (App Router) · TypeScript · Tailwind CSS v3 · ESLint · lucide-react**.
  (Framer Motion 미사용 — CSS + IntersectionObserver로 모션 처리.)
- 로고를 `public/yonlab-logo-trim.png`로 복사.

### 디자인 시스템 (design-source/README.md 토큰 반영)
- `tailwind.config.ts`에 색상(navy `#001850`, blue `#016CFF`(CTA/활성 전용), surface, line,
  muted, faint, idle 등), radius, shadow, 폰트 스택, keyframes(yfade/yscroll/yflow/ydropin) 매핑.
- `app/globals.css`: 리셋, 포커스 링, `[data-reveal]` 스크롤 리빌, blueprint/도트 그리드,
  outline-index 유틸리티, `prefers-reduced-motion` 대응.
- 폰트: Inter(next/font) + Pretendard(CDN `@import`).

### 구현한 섹션 (순서 유지)
Header → Hero → Why YOnLab → Core Capabilities → Trust Band → Solutions →
Action Showcase → Contact CTA → Footer

- **Header + Mega Menu**: sticky, Capabilities/Solutions 호버 메가메뉴(120ms 오픈 / 160ms 클로즈,
  프리뷰 카드 연동), 키보드 포커스 오픈·Escape 닫기, 모바일 햄버거 + 아코디언 내비.
- **Hero**: 네이비 라운드 패널 + 레이어드 배경, 좌 카피/CTA 2개, 우 Runtime/Verification Loop SVG
  다이어그램(원본 좌표 재현), Scroll 큐. `prefers-reduced-motion`에서 이동 시그널 점 숨김.
- **Why YOnLab**: 5행 "Customer Challenge → YOnLab Solution" 에디토리얼 비교.
- **Core Capabilities**: 부유 화이트 컨테이너 + 5카드 그리드(호버 리프트·상단바 wipe·인덱스 색 전환·스태거 리빌).
- **Trust Band**: 다크 네이비, 산업 4셀(제조업·자동차·로보틱스·공공기관).
- **Solutions**: 5개 제품 패널(교차 레이아웃) + 목업 프레임 4종(Browser/AppWindow/Console(navy)/
  Analytics/Phone) + `ImageSlot` placeholder. AI OCC는 네이비 센터피스.
- **Action Showcase**: 인덱스 탭(클릭 전환) + 이미지 슬롯 + 상세(tablist/tab/tabpanel).
- **Contact CTA**: 수평 Physical AI Pipeline(5노드 + 레일 + 터미널 네이비 노드) + Contact 버튼.
- **Footer**: 브랜드 + 4개 링크 컬럼 + 소셜 + 법적 고지.

### 재사용 컴포넌트 / 데이터
- UI: `Button`(primary/outline/ghost · sm/md/lg), `Tag`(light/dark), `CtaLink`, `SectionHeading`,
  `SectionConnector`, `ImageSlot`, `Icon`(브랜드 SVG 세트 재현).
- 데이터: `lib/content.ts`에 모든 반복 콘텐츠(카피/태그/아이콘)와 `routes` 상수화
  (Capabilities/Solutions/Company/Contact 페이지 확장 대비).
- 훅: `hooks/useReveal.ts`(IntersectionObserver, reduced-motion 대응) + `RevealProvider`.

### 반응형 / 접근성
- Desktop 기준 구현 후 Tablet/Mobile 대응(그리드 축소·컬럼 전환, 대형 타이포 스케일 다운,
  Solutions/Action 스택). 콘텐츠 삭제 없음.
- Semantic HTML, 키보드 내비게이션·포커스 링, alt/aria, skip-link, 메가메뉴·모바일 메뉴 상태 관리,
  `prefers-reduced-motion` 존중, no-JS 시 `[data-reveal]` 강제 표시(noscript fallback).

### Placeholder로 남긴 요소 (원본 근거 유지)
- 제품 스크린샷 6종(Desktop/Monitoring/Console/Analytics Dashboard, Device Interface) +
  Action 이미지 3종 → `ImageSlot`로 프레임만 구현, 실제 이미지는 추후 교체.
- 모든 링크/CTA는 원본과 동일하게 `#`(또는 mailto) → `lib/content.ts`의 `routes`로 일괄 관리.

### 검증
- `npm run lint` → **통과(경고/오류 없음)**.
- `npm run build` → **성공**(Home 정적 프리렌더, First Load JS ~118kB).
- 참고: 내장 프리뷰 브라우저는 렌더러 스로틀로 스크롤/트랜지션 실행이 제한되어 시각적
  스크린샷 검증은 실제 브라우저(`npm run dev`)에서 수행 권장. DOM/CSSOM/빌드/린트는 정상 확인.

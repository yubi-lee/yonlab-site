# YOnLab Website Changelog

> 홈페이지 **버전 관리용** 변경 이력입니다.
> 현재 명세는 `docs/WEBSITE_SPEC.md`, 버전별 스냅샷은 `docs/versions/`를 보세요.
>
> ⚠️ 저장소 루트에도 `CHANGELOG.md`가 있습니다. 그쪽은 v1.0 이전의 **개발 과정 상세 기록**(0.1.0 ~ 1.0.0)이며,
> 이 문서는 v1.0 이후의 **홈페이지 버전 관리**를 위한 것입니다. 두 문서는 목적이 다릅니다.

### 기록 규칙

- 버전은 `MAJOR.MINOR.PATCH`를 따릅니다.
- 각 릴리스는 `Added` / `Changed` / `Fixed` / `Removed`로 분류합니다.
- 기능 변경 시 `docs/WEBSITE_SPEC.md` 5장의 **기능 ID**(`NAV-001`, `CTA-004` 등)를 함께 적습니다.
- 릴리스 시점에 `docs/versions/vX.Y.md` 스냅샷을 만들고, 이후 그 스냅샷은 수정하지 않습니다.

---

## [Unreleased]

아직 배포되지 않은 변경사항을 여기에 기록합니다.

### Added

### Changed

### Fixed

### Removed

---

## [1.0.0] — 2026-08-16

### Initial Website Release

기존 Vite + React 단일 랜딩 페이지를 **Next.js 15 기반 멀티페이지 사이트**로 전면 교체해 Production(`www.yonlab.ai` / `yonlab.ai`)에 배포했습니다.

- Git tag `v1.0.0` · commit `353a7db`
- 스냅샷: `docs/versions/v1.0.md`

### Added

**페이지 (네비게이션 노출 10개)**
- Main page — `/`
- About — `/company`
- Contact — `/contact`
- Solution 상세 5종 — `/solutions/{axsl, private-ai-platform, berrywatch-platform, ai-occ, validation-automation}`
- Privacy Policy — `/privacy`
- Terms of Use — `/terms`

**네비게이션** (`NAV-001` ~ `NAV-008`)
- 전역 Header (About / Solutions 드롭다운 / Contact), Footer 3컬럼
- 모바일 햄버거 시트 + Solutions 아코디언
- 현재 페이지 표시, Skip to content, 404 페이지

**Solution 기능** (`SOL-001` ~ `SOL-007`)
- 홈 솔루션 셀렉터 5종 (클릭 시 프리뷰 교체, 모바일은 아코디언)
- Solution 상세 공통 5섹션 구조 (Hero / Overview / Experience / How It Works / Final CTA)
- Experience 캐러셀 (AXSL, 4초 자동 전환 + dots)
- 홈 Solutions 카드 이미지 5종 연결

**CTA / 링크** (`CTA-001` ~ `CTA-012`)
- 외부 Demo 링크 3종 — AXSL · Berrywatch · AI OCC (새 탭, `rel="noopener noreferrer"`)
- 프로젝트 상담 · Final CTA → `/contact`
- `mailto:contact@yonlab.ai` 전사 통일

**폼** (`FORM-001` ~ `FORM-004`)
- 문의 유형 4종 선택, 필수 5항목 검증, 필드별 오류 표시, 완료 화면

**애니메이션 / 인터랙션** (`ANIM-001` ~ `ANIM-007`)
- 스크롤 리빌, 헤드라인 줄 등장, 스크롤 연동 등장, 로드 페이드업
- 영상 자동재생 (`autoPlay muted loop playsInline`)
- `prefers-reduced-motion` 전역 대응, noscript 폴백

**미디어**
- Solution 5종 Hero / Experience 미디어 전량 연결 (이미지 12종 + 영상 4종)
- 16:9 프레임 + `object-fit` 규칙 확립 (UI가 잘리면 `contain`, 잘릴 것이 없으면 `cover`)

**법적 문서**
- 개인정보처리방침 · 이용약관 원문 반영 (시행일 2026-08-14)
- 원본 문서를 `lib/legal.ts`에 전사, `LegalDocument` 컴포넌트로 렌더

**SEO / 플랫폼** (`SEO-001` ~ `SEO-004`)
- 페이지별 metadata, Open Graph(텍스트), `metadataBase`
- favicon — ICO 16/32/48 멀티사이즈 + PNG 512 + apple-touch-icon 180

**배포 구조**
- `next.config.mjs`에 `output: "export"` 상시 적용 → `npm run build`가 `./out` 생성
- `wrangler.jsonc` 신규 — Worker `yonlab-site`, `compatibility_date 2026-08-07`, `nodejs_compat`, `assets.directory ./out`, `not_found_handling 404-page`
- `main` push → Cloudflare Workers Builds 자동 배포

### Changed

- **프레임워크 전환** — Vite 8 + React SPA → Next.js 15 App Router (정적 export). 라우트 1개 → **17개**
- 스타일 — 순수 CSS 564줄 → Tailwind v3 토큰 시스템
- 언어 — JavaScript → TypeScript
- 404 동작 — SPA fallback(모든 경로 200) → `404-page`(없는 경로는 404)
- Contact 동의 문구 — 보유기간 표현을 문구에서 제거하고 개인정보처리방침으로 일원화, `개인정보처리방침`을 `/privacy` 링크로 연결
- Validation Automation 카피 — 실제 구현 예정 User Flow 기준으로 교체 (키워드 3종, Experience 2문단, How It Works 6스텝)
- AXSL How It Works 01 — `필요한 AX를 정의합니다.` → `필요한 AI 서비스를 정의합니다.`
- About Engineering Context — 카드를 가로지르던 파란 arc 제거, 공통 서피스 + LAYER 인덱스 강화

### Fixed

- 법적 문서의 번호·시행일 표기가 텍스트로 복사·추출될 때 붙던 문제 (`1.개인정보의…` → `1. 개인정보의…`, `시행일|날짜` → `시행일 | 날짜`)
- About Hero 헤드라인이 텍스트로 읽힐 때 `적용하는일을`로 붙던 문제 (`<br />` 앞 공백 추가, 렌더 결과 불변)
- Private AI · Validation Demo 영상이 16:9 프레임에서 상하가 잘리던 문제 (`object-cover` → `object-contain`)

### Removed

- 기존 Vite 소스 (`src/`, `index.html`, `vite.config.js`, `eslint.config.js`)
- Validation Automation의 Experience 하단 외부 Demo CTA 및 `DEMO_URL` 상수 (외부 데모 플랫폼 없음)

### Preserved

- `/apps/onpersona/privacy/` — 별도 앱(OnPersona) 개인정보처리방침. 프레임워크 교체 과정에서 그대로 유지
- 기존 Cloudflare Worker · Custom Domain · DNS 설정 무변경

### Known Limitations

v1.0 시점의 제약은 `docs/versions/v1.0.md`의 **Known Limitations** 22개 항목을 보세요. 주요 항목:

- Contact 폼에 백엔드 없음 (`mailto:` 방식)
- 고아 라우트 8개 (진입 경로 없음)
- Partner Products에 Placeholder 2곳
- Solution 상세 5종 템플릿 미분리 (파일당 300–440줄 복제)
- `validation-hero.png` 15.3MB 등 대용량 에셋
- 외부 Demo URL이 `http://` + 고정 IP
- OG 이미지 · sitemap.xml · robots.txt · 애널리틱스 없음

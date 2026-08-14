# YOnLab Website

YOnLab — *Private Physical AI Engineering Company* — 마케팅 홈페이지.
Next.js(App Router) · TypeScript · Tailwind CSS로 구현했습니다.

> 디자인 원본과 핸드오프 문서는 **[`design-source/`](./design-source)** 에 있습니다.
> 구현의 최우선 기준(Source of Truth)은 **`design-source/README.md`** 입니다.
> `design-source/`는 원본 자료이므로 수정·삭제·이동하지 마세요.

## 실행 방법

```bash
npm install       # 의존성 설치
npm run dev       # 개발 서버 (http://localhost:3000)
npm run build     # 프로덕션 빌드
npm run start     # 빌드 결과 실행
npm run lint      # ESLint
```

Node.js 18.18+ (권장 LTS) 필요.

## 프로젝트 구조

```
app/
  layout.tsx        # 루트 레이아웃 · 폰트 · 메타데이터 · skip-link
  page.tsx          # Home — 9개 섹션 조립
  globals.css       # 토큰 · 리빌 · 유틸리티 · reduced-motion
components/
  layout/           # Header(+Mega Menu), Footer
  sections/         # Hero, WhyYonlab, CoreCapabilities, TrustBand,
                    # Solutions(+mockups/), ActionShowcase, ContactCta
  ui/               # Button, Tag, CtaLink, SectionHeading, ImageSlot ...
  icons/            # 브랜드 인라인 SVG 아이콘 세트
  RevealProvider.tsx
hooks/useReveal.ts  # IntersectionObserver 스크롤 리빌
lib/
  content.ts        # 모든 콘텐츠 데이터 + routes 상수
  cn.ts
public/             # 로고 등 정적 에셋
design-source/      # 디자인 원본 (수정 금지)
```

## 설계 원칙

- **디자인 토큰 우선**: 색상/타이포/여백/radius/shadow는 `tailwind.config.ts`에 매핑된 토큰 사용.
  블루(`#016CFF`)는 **CTA/활성 상태 전용**, 나머지 위계는 네이비(`#001850`).
- **콘텐츠 데이터화**: 반복 콘텐츠는 `lib/content.ts` 배열로 분리. 카피는 원본 그대로(수정 금지).
- **확장 대비**: 모든 링크는 `routes` 상수를 경유 — Capabilities/Solutions/Company/Contact
  상세 페이지로 확장 가능. Home이 Master Template 역할.
- **이미지 Placeholder**: 미제공 제품 스크린샷은 `ImageSlot`으로 프레임만 유지(회색 박스 금지).

자세한 작업 내역은 [`CHANGELOG.md`](./CHANGELOG.md) 참고.

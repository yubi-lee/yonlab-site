# YONLAB Website — Design Brief (for Claude Design)

> 이 문서 하나로 디자인 작업을 시작할 수 있도록 작성된 브리프입니다.
> 기준 문서: YONLAB Website Master Planning Document v1.0 + YOnLab DESIGN.md

---

## 1. 프로젝트 개요

- **회사**: YONLAB — On-device AI Solution 회사
- **브랜드 정의**: Private Physical AI Engineering Company
- **핵심 메시지**: Trusted Intelligence. Verified in the Real World.
- **목표**: 브랜드 중심의 Premium B2B 기술 기업 홈페이지 (기존 회사소개형 → 브랜드/기술 신뢰형)
- **첫인상 목표**: "AI 기술 회사"가 아니라 **"실제 환경에 AI를 적용하는 엔지니어링 회사"**로 인식되어야 함
- **타깃**: 기업 고객, 정부과제/공공기관, 제조·로봇·자동차 기업, AI 파트너사, 투자자
- **UX 원칙**: 5초 안에 브랜드 메시지, 30초 안에 핵심 사업과 차별점, 3분 안에 솔루션/역량/신뢰 요소 이해

---

## 2. 이번 요청 범위

**Home(메인) 페이지 1장, 데스크톱 기준 풀 스크롤 디자인.**

먼저 **Hero + Why YONLAB + Core Capabilities 3개 섹션까지만** 톤이 다른 시안 2가지로 제안해줘.
(예: A안 — 라이트 배경 + 큰 타이포 중심 / B안 — 네이비 Hero + 라이트 본문 전환)
방향이 확정되면 그 톤으로 나머지 섹션을 이어서 완성한다.

---

## 3. 디자인 방향 (Tone & Manner)

- **전체 톤**: Premium Enterprise SaaS. 신뢰감, 기술 전문성, 실행력, 차분한 정밀함(calm technical precision)
- **레퍼런스 감도**: Mondrian.ai 스타일의 여백, 큰 타이포그래피, 섹션 간 정돈감 (복제 금지, 감도만 참고)
- **콘텐츠 전달 방식**: ZETIC.ai처럼 기술을 쉽게, 간결한 메시지로 (문구 복제 금지)
- **레이아웃/구조 참고**: Onramper.com — 다음 구조적 패턴만 참고 (텍스트·컬러·로고월 디자인은 복제 금지)
  - 상단 sticky 네비게이션 + 드롭다운형 메가메뉴 구조
  - Hero 하단에 파트너/협력사 로고를 가로 밴드로 배치하는 방식 → YONLAB Partners 섹션에 적용 가능
  - 기능/솔루션을 섹션마다 "카피 + 비주얼 1개"로 번갈아 배치하는 리듬 (한 섹션 = 한 메시지 원칙과 부합)
  - 마지막 Full-width CTA 배너 + 로고월 반복 구조 → YONLAB Contact CTA 섹션 레이아웃에 참고 가능
  - ⚠️ **가져오지 말 것**: 배경에 지속 재생되는 비디오/모션 그래픽(YOnLab DESIGN.md는 지속적인 장식성 애니메이션 금지), 크립토 특유의 화려한 그라디언트·글로우, 다크 배경 위주 구성. YONLAB은 White/Light 배경 + 절제된 모션(fade-up, hover 정도) 원칙 유지
- **언어**: 한국어 우선(KR-first), 영문 카피는 브랜드 메시지/헤드라인에 병기

### 금지 사항 (Don't)
- 네온, 사이버펑크, 글로우 이펙트
- 3D AI 로봇, 빛나는 뇌 그래픽, 랜덤 회로기판, stock AI 이미지
- 어두운 tech 배경 + 과한 그라디언트
- 로고 생성/변형/재채색/왜곡 (제공된 로고 에셋만 사용)
- 블루를 배경 장식으로 남용 — **블루는 액션(CTA, 활성 상태)에만 사용**
- 타사 브랜드 디자인 시스템 복제

### 허용 모티프 (Do)
- subtle network nodes, light wave lines, verification loop
- device-grid 패턴, dotted technical accent, thin frame corners
- calm data-flow / architecture 다이어그램
- 모티프 투명도: 배경 network/wave 4–12%, dotted accent 12–20%

---

## 4. 디자인 토큰 (반드시 이 값 사용 — YOnLab DESIGN.md 기준)

```css
:root {
  /* Brand */
  --yon-navy: #001850;      /* 신뢰, 헤딩, 위계 — 주력 컬러 */
  --on-blue: #0068F8;       /* 액션/CTA/활성 상태 전용 */
  --trust-blue: #003090;

  /* Text */
  --ink: #071B45;
  --muted-ink: #4B5E83;
  --inverse-ink: #FFFFFF;

  /* Surface */
  --background: #FFFFFF;
  --surface: #F7FAFF;
  --surface-raised: #FFFFFF;
  --line: #D8E4F5;

  /* Spacing (4px 기준 리듬 · 섹션 간 96~120px, 카드 내부 24~32px) */
  --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;

  /* Radius & Shadow */
  --radius-md: 8px;   /* 버튼, 컴팩트 컨트롤 */
  --radius-lg: 12px;  /* 카드, 패널 — 카드는 반드시 12px, 20px 아님 */
  --radius-xl: 20px;  /* 프로필 사각형, 대형 브랜드 표면 전용 (카드에 쓰지 말 것) */
  --shadow-card: 0 12px 32px rgba(0, 24, 80, 0.08);
}
```

### 타입 스케일 (DESIGN.md 기준, 임의 크기 금지)

| 토큰 | 크기 | 굵기 | 용도 |
|---|---:|---:|---|
| `--type-display` | 48–64px | 700–800 | Hero 메인 카피 |
| `--type-h1` | 34–44px | 700–800 | 페이지 타이틀 |
| `--type-h2` | 26–32px | 700 | 섹션 타이틀 |
| `--type-h3` | 20–24px | 700 | 카드/패널 그룹 타이틀 |
| `--type-body` | 15–17px | 400–500 | 본문 (line-height 1.55) |
| `--type-caption` | 12–13px | 400–500 | 캡션/메타 정보 |

- **Font**: 국문 Pretendard(1순위), 영문 Inter. 데코레이티브 폰트·음수 letter-spacing 금지
- **Grid**: max-width 1200px, 12-column
- **Button**: Primary Filled(배경 On Blue **또는** YOnLab Navy, 텍스트 White, radius 8px) / Secondary Outline(배경 White, 보더 Line, 텍스트 Navy) 두 종류만. 뷰/섹션당 Primary 액션은 1개만
- **Card**: 흰 배경 또는 --surface, 보더 --line, shadow 없거나 subtle, **radius 12px 고정**(20px 아님). 카드 안에 카드 중첩 금지
- **Icon**: 라인 아이콘 또는 minimal geometric. AI 브레인/로봇 얼굴/홀로그램/랜덤 회로 이미지 금지
- **Motion**: fade-up, subtle hover/focus, 섹션 진입 애니메이션 정도만. 통통 튀는 모션·과한 패럴랙스·회전 AI 그래픽 금지. reduced-motion 존중

---

## 5. Home 페이지 구조 & 카피 (이 카피 그대로 사용)

### Header
Logo(좌) / Home · Capabilities · Solutions · Company · Contact / CTA 버튼(우)

### 5-1. Hero
- **레이아웃**: 좌측 카피 & CTA / 우측 추상적 Platform Architecture · Device + AI Flow 비주얼
- **Eyebrow**: `Private Physical AI Engineering Company`
- **Main Copy (Hero 전용, Core Message)**: `Trusted Intelligence. Verified in the Real World.`
- **Description(KR)**: `YONLAB은 AI를 실제 디바이스와 폐쇄망 업무 환경에서 검증, 최적화, 운영 가능한 솔루션으로 만듭니다.`
- **Primary CTA**: `Explore Solutions` / **Secondary CTA**: `Contact Us`
- 규칙: 긴 회사 설명 금지, CTA는 2개만

> ⚠️ **태그라인 2종 주의**: YOnLab 공식 태그라인은 두 가지입니다. Hero 메인 카피는 위의 `Trusted Intelligence. Verified in the Real World.`(Core Message)를 그대로 쓰고, **다른 섹션(예: Capabilities 인트로, Footer)에서 태그라인이 필요하면** `Trusted Intelligence, Verified On-Device`(Supporting Message / DESIGN.md 공식 태그라인)를 사용하세요. 두 문구를 섞어 쓰지 말 것.

**로고 사용**: 웹 헤더에는 `yonlabmainlogo.png`(English Primary Logo)를 사용하고, 폭은 120px 이상으로 유지. 로고 주변 여백은 최소 O 심볼 높이만큼 확보. 로고를 늘리거나 재채색·그림자·그라디언트 추가 금지.

### 5-2. Why YONLAB — 고객 문제 → 해결 방식 (5개 카드 또는 Before/After 비교)

| Customer Challenge | YONLAB Solution |
|---|---|
| AI 모델은 있지만 실제 디바이스 적용이 어렵다 | 실디바이스 중심 검증과 온디바이스 실행 환경 이해 |
| NPU/칩셋/SDK별 호환성 차이가 크다 | 멀티칩셋 호환성 분석과 SDK 연동 경험 |
| 폐쇄망/온프레미스 환경에서는 일반 AI 도구 적용이 어렵다 | Private AI / On-premise AI 구현 역량 |
| 검증/배포/리포트 체계가 분절되어 있다 | Validation Automation과 운영 대시보드 구성 |
| PoC 이후 제품화까지 이어질 파트너가 부족하다 | 설치, 검증, 운영, 유지보수까지 맡는 Full-stack 파트너십 |

### 5-3. Core Capabilities — 5개 카드 그리드

| Capability | 설명 |
|---|---|
| Embedded Engineering | 디바이스 환경에서 AI를 실제 구동하기 위한 하드웨어, OS, 런타임 이해를 기반으로 시스템을 구현합니다. |
| Platform Engineering | RAG, 설치 자동화, 모델 발굴/적용, 운영 대시보드, 보안 환경 구성까지 플랫폼화합니다. |
| AI Validation | 정확도, 성능, 지연시간, 안정성, 호환성을 실제 디바이스 환경에서 검증합니다. |
| AI Optimization | 모델 경량화, 런타임 연동, 칩셋/SDK 환경에 맞춘 실행 최적화를 지원합니다. |
| Technical Consulting | 고객의 현장 문제를 빠르게 진단하고 실행 가능한 솔루션과 PoC 방향으로 전환합니다. |

### 5-4. Solutions — 5개 대표 솔루션 카드 + Learn More 링크

| Solution | 설명 | CTA |
|---|---|---|
| Private AI Platform | 폐쇄망, 온프레미스 업무 환경에서 동작하는 Private AI/RAG 기반 플랫폼 | Learn More |
| Berrywatch Platform | 위치 기반 서비스, 운영 SOP, 디바이스 상태, 현장 매뉴얼을 연결하는 온프레미스 AI 관제 솔루션 | View Solution |
| AI OCC | 운영 현장의 매뉴얼, 디바이스 상태, 고객지원 흐름을 연결하는 AI 기반 Operation Control Center | View Demo |
| Validation Automation | 모델 검증, SDK 실증, 리포트, 이력 관리를 자동화하는 검증 운영 체계 | Explore Platform |
| Partner Products | 로보틱스/Automotive 등 파트너 솔루션을 한국 시장에 맞게 실행/검증/상용화 지원 | Contact Us |

메인에서는 기능 나열이 아니라 "무엇을 해결하는 솔루션인지"만 전달.

### 5-5. Industries — 산업별 아이콘 카드 5개

| Industry | 메시지 |
|---|---|
| Manufacturing | 현장 매뉴얼, 장비 상태, 작업 SOP를 Private AI와 연결 |
| Automotive | SDV, Cockpit, ADAS, 차량 SW 검증 및 온디바이스 AI 실행 |
| Robotics | Vision, Planning, Control, Runtime 기반 Physical AI 검증과 적용 |
| Wearables / Smart Devices | 스마트워치, 태그, GPS 등 멀티디바이스 케어 플랫폼 |
| Public Sector / Security-sensitive Enterprise | 폐쇄망 및 보안 민감 환경의 Private AI 구축 |

### 5-6. Why Choose YONLAB — 차별점 + 숫자 지표

숫자 지표 조합: `20+ Years` · `Multi-chipset` · `Real Device` · `End-to-End`

| 차별점 | 설명 |
|---|---|
| Private AI in Secure Environments | 폐쇄망/온프레미스에서 작동하는 Private AI 구현 역량 |
| Physical AI Execution | 온디바이스 최적화와 검증 자동화까지 이어지는 실행력 |
| Engineering Workflow + RAG | 문서 RAG와 코드/엔지니어링 작업을 결합하는 실무형 AI 워크플로우 |
| Full-stack Partnership | PoC에서 끝나지 않고 설치, 검증, 운영, 유지보수까지 맡는 파트너십 |
| 20+ Years Industry Experience | 모바일, IoT, Automotive, AI Platform 영역에서 축적된 경험 |

### 5-7. Partners
로고 월 또는 텍스트 기반 파트너 블록 (플레이스홀더로 6~8개 슬롯 구성)

### 5-8. Contact CTA — Full-width 배너
- **Headline**: `Let's Build Physical AI Together.`
- **Sub Copy**: `AI를 실제 서비스와 디바이스 환경에 적용하고 싶다면 YONLAB과 논의해보세요.`
- **CTA 버튼**: `Contact Us`

### 5-9. Footer
회사 정보 / 메뉴 / 연락처 / Copyright

---

## 6. 품질 체크 (완료 전 확인)

- [ ] 한 섹션당 하나의 메시지만 전달 (텍스트 과밀 금지)
- [ ] 블루는 CTA/활성 상태에만, 위계는 네이비가 이끈다
- [ ] 로고는 제공 에셋 그대로, 웹 헤더 폭 120px 이상 (변형·재채색·그림자 금지)
- [ ] Hero 태그라인은 `Trusted Intelligence. Verified in the Real World.`만 사용 (다른 섹션과 혼용 금지)
- [ ] 카드 radius는 12px, 버튼 radius는 8px로 통일 (20px는 카드에 쓰지 않음)
- [ ] Hero 헤드라인은 타입 스케일 `--type-display`(48–64px) 범위 내
- [ ] 한글 타이포 가독성 (얇고 대비 낮은 텍스트 금지)
- [ ] Primary 액션이 시각적으로 명확 (섹션당 1개)
- [ ] WCAG AA 수준 대비, 컬러에만 의존하는 상태 표시 금지
- [ ] 모바일 1컬럼에서 레이아웃 깨지지 않는 구조로 설계
- [ ] stock AI 이미지·네온·과한 그라디언트·홀로그램·로봇 얼굴 없음

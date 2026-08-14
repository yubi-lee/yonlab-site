/**
 * Company page content — brand narrative (not a history timeline).
 * All copy is final (from the brief) — do not paraphrase. Repeated blocks are
 * arrays so the page stays declarative and future sections (History, Careers,
 * Locations) can extend the same patterns.
 */

/* Stable section ids for anchor navigation (respect fixed-header offset). */
export const companySectionIds = {
  hero: "company-hero",
  mission: "company-mission",
  vision: "company-vision",
  values: "company-values",
  workflow: "company-workflow",
  partners: "company-partners",
  message: "company-message",
  contact: "company-contact",
} as const;

export const companyHero = {
  eyebrow: "COMPANY",
  title: "Intelligence, Proven in the Real World",
  paragraphs: [
    "YOnLab는 AI가 실제 디바이스와 산업 환경에서 안정적으로 작동할 수 있도록 검증하고 연결합니다.",
    "모델 개발부터 최적화, 검증, 배포와 운영까지 AI Engineering의 전 과정을 함께하는 실행형 기술 파트너입니다.",
  ],
};

/**
 * Capability highlights band — the 4 credibility metrics from the brief
 * ("20+ Years · Multi-chipset · Real Device · End-to-End"). Labels are summarized
 * from existing brief phrases; no unverifiable numbers (revenue/assets) invented.
 */
export interface CompanyStat {
  kicker: string;
  value: string;
  label: string;
}

export const companyStats: CompanyStat[] = [
  { kicker: "Experience", value: "20+ Years", label: "축적된 산업 경험" },
  { kicker: "Compatibility", value: "Multi-chipset", label: "멀티칩셋 호환성 분석" },
  { kicker: "Validation", value: "Real Device", label: "실디바이스 중심 검증" },
  { kicker: "Delivery", value: "End-to-End", label: "설치 · 검증 · 운영 · 유지보수" },
];

/** Full-width positioning statement (is-soft-style interlude). Approved brief copy. */
export const companyPositioning = {
  eyebrow: "OUR POSITIONING",
  statement: "AI를 실제 디바이스 위에서 증명하는\n실행형 파트너",
};

/**
 * Mid-page statement interlude. Uses the official Supporting tagline
 * "Trusted Intelligence, Verified On-Device" (README: allowed outside the Hero).
 */
export const companyTagline = {
  statement: "Trusted Intelligence,\nVerified On-Device",
};

export interface StatementContent {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  summaryTitle: string;
  summaryDesc: string;
}

export const companyMission: StatementContent = {
  eyebrow: "OUR MISSION",
  title: "AI를 실제 환경에서\n작동하는 기술로 완성합니다.",
  paragraphs: [
    "좋은 AI 모델을 만드는 것만으로는 충분하지 않습니다.",
    "AI가 다양한 디바이스와 하드웨어 환경에서 예측 가능하고 안정적으로 동작하기 위해서는 최적화, 검증, 배포와 운영까지 연결되어야 합니다.",
    "YOnLab는 AI 모델과 디바이스 사이의 기술적 간극을 해소하고, 고객의 AI가 실제 제품과 서비스로 구현될 수 있도록 지원합니다.",
  ],
  summaryTitle: "From AI Model to Real-World Intelligence",
  summaryDesc:
    "AI 모델을 실제 디바이스에서 검증 가능한 제품과 서비스로 전환합니다.",
};

export const companyVision: StatementContent = {
  eyebrow: "OUR VISION",
  title: "Physical AI Engineering을 위한\n신뢰할 수 있는 기술 기반을 만듭니다.",
  paragraphs: [
    "YOnLab는 AI 개발, 디바이스 검증과 플랫폼 운영이 하나의 흐름으로 연결되는 미래를 지향합니다.",
    "기업과 개발자가 다양한 AI 모델과 하드웨어 환경을 더 빠르고 효율적으로 검증하고 배포할 수 있도록, Device Farm, Validation Platform과 Developer Portal을 연결하는 Physical AI Engineering Platform으로 성장하겠습니다.",
  ],
  summaryTitle: "The Trusted Engineering Platform for Physical AI",
  summaryDesc:
    "Physical AI 개발과 운영 전 과정을 연결하는 신뢰할 수 있는 Engineering Platform이 되겠습니다.",
};

export const coreValuesIntro = {
  eyebrow: "CORE VALUES",
  title: "실행과 연결, 신뢰를 통해\n작동하는 AI를 만듭니다.",
};

export type ValueIconId = "execution" | "connection" | "trust";

export interface CoreValue {
  n: string;
  en: string;
  ko: string;
  desc: string;
  message: string;
  icon: ValueIconId;
}

export const coreValues: CoreValue[] = [
  {
    n: "01",
    en: "Execution",
    ko: "실행 중심",
    desc: "기술은 실제 환경에서 작동할 때 가치가 있습니다. YOnLab는 개념과 제안에 머무르지 않고, 직접 구현하고 검증하며 운영 가능한 결과를 만듭니다.",
    message: "We turn technology into working results.",
    icon: "execution",
  },
  {
    n: "02",
    en: "Connection",
    ko: "연결",
    desc: "AI 모델, 소프트웨어, 하드웨어와 디바이스는 서로 분리되어서는 완전한 제품이 될 수 없습니다. YOnLab는 개발부터 배포까지 흩어진 기술과 프로세스를 연결하여 하나의 일관된 Engineering Workflow를 제공합니다.",
    message: "We connect models, platforms and devices.",
    icon: "connection",
  },
  {
    n: "03",
    en: "Trust",
    ko: "신뢰",
    desc: "실제 제품에 적용되는 AI에는 성능뿐 아니라 안정성과 재현 가능성이 필요합니다. YOnLab는 체계적인 검증과 데이터 기반의 결과를 통해 고객이 신뢰할 수 있는 AI 환경을 구축합니다.",
    message: "We build confidence through verification.",
    icon: "trust",
  },
];

export const workflowIntro = {
  eyebrow: "HOW WE WORK",
  title: "Build. Optimize. Validate.\nDeploy. Operate.",
  description: "YOnLab는 AI Engineering의 전 과정을 하나의 흐름으로 연결합니다.",
};

export type WorkflowIconId =
  | "build"
  | "optimize"
  | "validate"
  | "deploy"
  | "operate";

export interface WorkflowStep {
  n: string;
  title: string;
  desc: string;
  icon: WorkflowIconId;
}

export const workflowSteps: WorkflowStep[] = [
  {
    n: "01",
    title: "Build",
    desc: "고객의 목적과 디바이스 환경에 맞는 AI 기술과 시스템 구조를 설계합니다.",
    icon: "build",
  },
  {
    n: "02",
    title: "Optimize",
    desc: "모델과 소프트웨어가 제한된 하드웨어 환경에서도 효율적으로 동작하도록 최적화합니다.",
    icon: "optimize",
  },
  {
    n: "03",
    title: "Validate",
    desc: "다양한 디바이스와 실행 환경에서 성능, 호환성과 안정성을 체계적으로 검증합니다.",
    icon: "validate",
  },
  {
    n: "04",
    title: "Deploy",
    desc: "검증된 AI를 실제 제품과 서비스 환경에 빠르고 안정적으로 적용합니다.",
    icon: "deploy",
  },
  {
    n: "05",
    title: "Operate",
    desc: "배포 이후에도 상태와 성능을 지속적으로 확인하고 운영 가능한 구조로 관리합니다.",
    icon: "operate",
  },
];

export const partnersIntro = {
  eyebrow: "PARTNERS",
  title: "함께 만드는 신뢰할 수 있는 AI Ecosystem",
  description:
    "YOnLab는 다양한 기술 기업과 파트너십을 통해 AI Model, Platform과 Device가 연결되는 생태계를 만들어갑니다.",
};

export interface PartnerLogo {
  name: string;
  src: string;
}

// Empty until official partner logos are available (no placeholder brands).
export const partnerLogos: PartnerLogo[] = [];

export const companyMessage = {
  eyebrow: "OUR COMMITMENT",
  title: "우리는 AI를 설명하는 데 그치지 않고,\n실제로 작동하도록 만듭니다.",
  paragraphs: [
    "YOnLab는 AI 모델과 실제 디바이스 사이에서 발생하는 복잡한 기술 문제를 해결해온 Engineering 경험을 기반으로, 고객이 더 빠르고 안정적으로 AI를 제품화할 수 있도록 지원합니다.",
    "단기적인 개발 지원이 아니라, 기획부터 검증과 운영까지 함께 책임지는 신뢰할 수 있는 기술 파트너가 되겠습니다.",
  ],
  // Signature placeholder — no individual name/photo invented.
  signature: "YOnLab",
};

export const companyCta = {
  title: "Let's Build AI That Works in the Real World",
  description:
    "실제 디바이스에서 작동하는 AI를 준비하고 계신가요? YOnLab와 함께 모델 최적화부터 디바이스 검증, 배포와 운영까지 연결해보세요.",
};

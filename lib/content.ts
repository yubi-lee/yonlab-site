/**
 * Single source of content for the YOnLab homepage.
 * All copy is FINAL (design-source/README.md) — do not paraphrase or invent.
 * Repeated content lives here as typed arrays so sections stay declarative and
 * the site can later expand into Capabilities / Solutions / Company / Contact pages.
 */

import type { IconName } from "@/components/icons";

/* Routes are centralized now so links are ready to wire to real pages later.
   Everything currently resolves to "#" per the prototype. */
export const routes = {
  home: "/",
  company: "/company",
  contact: "/contact",
  inquiry: "/contact",
  capabilities: {
    index: "/capabilities",
    embedded: "/capabilities/embedded-engineering",
    platform: "/capabilities/platform-engineering",
    validation: "/capabilities/ai-validation",
    optimization: "/capabilities/ai-optimization",
    consulting: "/capabilities/technical-consulting",
  },
  solutions: {
    index: "/solutions",
    axsl: "/solutions/axsl",
    privateAi: "/solutions/private-ai-platform",
    berrywatch: "/solutions/berrywatch-platform",
    aiOcc: "/solutions/ai-occ",
    validationAutomation: "/solutions/validation-automation",
    partners: "/solutions/partner-products",
  },
  legal: { privacy: "/privacy", terms: "/terms" },
  social: {
    email: "mailto:contact@yonlab.ai",
  },
} as const;

export const contactEmail = "contact@yonlab.ai";

/* ---------------------------------------------------------------- Header nav */
export interface MegaItem {
  key: string;
  oneLine: string;
  description: string;
  tags: string[];
  icon: IconName;
  href: string;
}

export const megaCapabilities: MegaItem[] = [
  {
    key: "Embedded Engineering",
    oneLine: "하드웨어·OS·런타임 위에서 AI 구동",
    description:
      "디바이스 환경에서 AI를 실제 구동하기 위한 하드웨어, OS, 런타임 이해를 기반으로 시스템을 구현합니다.",
    tags: ["Hardware", "Runtime", "OS"],
    icon: "chip",
    href: routes.capabilities.embedded,
  },
  {
    key: "Platform Engineering",
    oneLine: "RAG·자동화·운영을 플랫폼화",
    description:
      "RAG, 설치 자동화, 모델 발굴/적용, 운영 대시보드, 보안 환경 구성까지 플랫폼화합니다.",
    tags: ["Dashboard", "RAG", "Automation"],
    icon: "layers",
    href: routes.capabilities.platform,
  },
  {
    key: "AI Validation",
    oneLine: "실디바이스 환경에서 검증",
    description:
      "정확도, 성능, 지연시간, 안정성, 호환성을 실제 디바이스 환경에서 검증합니다.",
    tags: ["Accuracy", "Latency", "Memory"],
    icon: "checkCircle",
    href: routes.capabilities.validation,
  },
  {
    key: "AI Optimization",
    oneLine: "경량화·런타임·SDK 최적화",
    description:
      "모델 경량화, 런타임 연동, 칩셋/SDK 환경에 맞춘 실행 최적화를 지원합니다.",
    tags: ["Quantization", "Runtime", "SDK"],
    icon: "gauge",
    href: routes.capabilities.optimization,
  },
  {
    key: "Technical Consulting",
    oneLine: "진단부터 PoC 전환까지",
    description:
      "고객의 현장 문제를 빠르게 진단하고 실행 가능한 솔루션과 PoC 방향으로 전환합니다.",
    tags: ["PoC", "Deployment", "Integration"],
    icon: "nodes",
    href: routes.capabilities.consulting,
  },
];

// `megaSolutions` (header dropdown) is derived from `solutionPanels` further
// down this file, so the nav can never drift from the solution data.

/* --------------------------------------------------------------- Why YOnLab */
export interface WhyRow {
  n: string;
  challenge: string;
  solution: string;
}

// Challenge = the customer's own voice; solution = YOnLab's answer.
// `\n` marks the intended line break in each sentence.
export const whyRows: WhyRow[] = [
  {
    n: "01",
    challenge: "AI 모델은 있지만,\n실제 디바이스에 적용하기가 쉽지 않아요.",
    solution: "디바이스 환경에 맞춰 직접 검증하고,\n안정적으로 실행되도록 최적화합니다.",
  },
  {
    n: "02",
    challenge: "칩셋과 SDK가 달라질수록\n호환성 대응이 복잡해져요.",
    solution: "다양한 실행 환경에 맞춰\n호환성을 검증하고 안정화합니다.",
  },
  {
    n: "03",
    challenge: "폐쇄망이나 온프레미스 환경에서는\nAI 도입에 제약이 많아요.",
    solution: "보안 환경에 맞는 Private AI를\n설계하고 구현합니다.",
  },
  {
    n: "04",
    challenge: "검증부터 배포, 리포트까지 과정이 나뉘어 있어\n관리가 번거로워요.",
    solution: "검증부터 결과 관리까지\n하나의 흐름으로 자동화합니다.",
  },
  {
    n: "05",
    challenge: "PoC까지는 했지만,\n실제 제품과 서비스로 잘 이어지지 않아요.",
    solution: "구축부터 검증·운영·유지보수까지\n함께합니다.",
  },
];

/* -------------------------------------------------------- Core Capabilities */
export interface Capability {
  n: string;
  /** URL slug for the dedicated detail page (/capabilities/<slug>). */
  slug: string;
  title: string;
  /** Short one-line (from README mega-menu copy). */
  oneLine: string;
  description: string;
  tags: string[];
  icon: IconName;
  href: string;
}

export const capabilities: Capability[] = [
  {
    n: "01",
    slug: "embedded-engineering",
    title: "Embedded Engineering",
    oneLine: "하드웨어·OS·런타임 위에서 AI 구동",
    description:
      "하드웨어, OS, 런타임까지 — AI가 실제로 동작하는 디바이스를 구현합니다.",
    tags: ["Hardware", "Runtime", "OS", "BSP"],
    icon: "chip",
    href: routes.capabilities.embedded,
  },
  {
    n: "02",
    slug: "platform-engineering",
    title: "Platform Engineering",
    oneLine: "RAG·자동화·운영을 플랫폼화",
    description:
      "RAG, 자동화, 대시보드까지 — AI가 실제로 운영되는 플랫폼을 완성합니다.",
    tags: ["Dashboard", "RAG", "Automation", "Security"],
    icon: "layers",
    href: routes.capabilities.platform,
  },
  {
    n: "03",
    slug: "ai-optimization",
    title: "AI Optimization",
    oneLine: "경량화·런타임·SDK 최적화",
    description:
      "칩셋·SDK 환경에 맞춰 모델을 경량화하고 실행 속도를 끌어올립니다.",
    tags: ["Quantization", "Chipset", "SDK", "Performance"],
    icon: "gauge",
    href: routes.capabilities.optimization,
  },
  {
    n: "04",
    slug: "ai-validation",
    title: "AI Validation",
    oneLine: "실디바이스 환경에서 검증",
    description:
      "정확도부터 호환성까지, 실제 디바이스에서 철저히 검증합니다.",
    tags: ["Accuracy", "Latency", "Stability", "Compatibility"],
    icon: "checkCircle",
    href: routes.capabilities.validation,
  },
  {
    n: "05",
    slug: "technical-consulting",
    title: "Engineering Consulting",
    oneLine: "진단부터 PoC 전환까지",
    description:
      "고객의 환경과 문제를 분석해, 실행 가능한 해결책을 설계하고 구현합니다.",
    tags: ["Diagnosis", "Solution Design", "PoC", "Implementation"],
    icon: "nodes",
    href: routes.capabilities.consulting,
  },
];

export const capabilitiesSubline =
  "디바이스 위에서 AI를 구현·검증·운영하는 5가지 핵심 역량";

/* --------------------------------------------------------------- Trust Band */
export interface Industry {
  key: string;
  icon: IconName;
}

export const industries: Industry[] = [
  { key: "제조업", icon: "factory" },
  { key: "자동차", icon: "car" },
  { key: "로보틱스", icon: "robot" },
  { key: "공공기관", icon: "government" },
];

/* ---------------------------------------------------------------- Solutions */
export type SolutionLayout =
  | "text-left"
  | "text-right"
  | "center-navy"
  | "text-left-narrow"
  | "device-left";

export type MockupKind = "browser" | "appWindow" | "console" | "analytics" | "phone";

export interface SolutionMetric {
  v: string;
  k: string;
}

export interface SolutionPanel {
  n: string;
  /** Stable anchor id for the Solutions overview / detail section. */
  anchor: string;
  /** URL slug for the dedicated detail page (/solutions/<slug>). */
  slug: string;
  category: string;
  title: string;
  /** Short one-line shown under the title in the selector index. */
  oneLine: string;
  description: string;
  tags: string[];
  /** Highlight metrics (documented in the prototype's solution data). */
  metrics: SolutionMetric[];
  cta: string;
  href: string;
  layout: SolutionLayout;
  mockup: MockupKind;
  /**
   * Framed mockup slot: placeholder label + aspect ratio, plus the real
   * screenshot once one exists. `src` null → the labelled placeholder stays.
   * Screenshots are reused from each solution's detail page assets; nothing is
   * generated for the home card.
   */
  slot: { placeholder: string; ratio: string; src?: string | null };
  /** Extra chrome copy per mockup kind. */
  chrome?: { address?: string; title?: string; live?: boolean };
}

export const solutionsSubline =
  "아이디어를 실제 서비스로 연결하는\nYOnLab의 AI Solutions.";

/** Solutions shown in the home preview, in order. Partner Products is excluded. */
export const homeSolutionSlugs = [
  "axsl",
  "private-ai-platform",
  "berrywatch-platform",
  "ai-occ",
  "validation-automation",
] as const;

export const solutionPanels: SolutionPanel[] = [
  {
    n: "01",
    anchor: "solution-axsl",
    slug: "axsl",
    category: "Service Library",
    title: "AXSL",
    oneLine: "AI eXtensible Service Library",
    description:
      "필요한 AI 기능을 쉽고 빠르게 활용할 수 있도록, 다양한 AI 서비스를 제공하는 AI eXtensible Service Library입니다.",
    tags: ["AI Service", "Easy Access", "Extensible"],
    metrics: [],
    cta: "Explore Solution",
    href: routes.solutions.axsl,
    layout: "text-left",
    mockup: "browser",
    slot: {
      placeholder: "AXSL 서비스 화면",
      ratio: "16 / 10",
      src: "/axsl/axsl-hero.png",
    },
    chrome: { address: "app.yonlab.ai / axsl" },
  },
  {
    n: "02",
    anchor: "solution-private-ai",
    slug: "private-ai-platform",
    category: "Platform",
    title: "Private AI Platform",
    oneLine: "폐쇄망·온프레미스 환경을 위한 Private AI",
    description:
      "폐쇄망·온프레미스 환경에서도 안전하게 AI를 활용할 수 있는 Private AI/RAG 기반 플랫폼입니다.",
    tags: ["On-Premise", "RAG", "Private AI"],
    metrics: [
      { v: "100%", k: "On-Premise" },
      { v: "RAG", k: "Grounded" },
      { v: "Zero", k: "Data Egress" },
    ],
    cta: "Explore Solution",
    href: routes.solutions.privateAi,
    layout: "text-left",
    mockup: "browser",
    slot: {
      placeholder: "Private AI Platform 화면",
      ratio: "16 / 10",
      // Demo 영상의 poster 프레임을 그대로 사용. 2880×1800이라 16/10 슬롯과
      // 비율이 정확히 일치 → crop·여백 없음.
      src: "/private%20ai/private-ai-poster.png",
    },
    chrome: { address: "app.yonlab.ai / private-ai" },
  },
  {
    n: "03",
    anchor: "solution-berrywatch",
    slug: "berrywatch-platform",
    category: "Service",
    title: "Berrywatch Service",
    oneLine: "스마트워치 기반 위치 관제·안전 케어",
    description:
      "스마트워치와 위치 데이터를 기반으로 아이의 위치를 확인하고, 일상의 안전 관제와 케어를 지원하는 키즈워치 서비스입니다.",
    tags: ["Kids Care", "Location Monitoring", "Smart Watch"],
    metrics: [],
    cta: "Explore Solution",
    href: routes.solutions.berrywatch,
    layout: "text-right",
    mockup: "appWindow",
    slot: {
      placeholder: "Berrywatch 서비스 화면",
      ratio: "16 / 10",
      src: "/berrywatch/berrywatch-demo.png",
    },
    chrome: { title: "Berrywatch", live: true },
  },
  {
    n: "04",
    anchor: "solution-ai-occ",
    slug: "ai-occ",
    category: "Service",
    title: "AI OCC (OnCare Circle)",
    oneLine: "가족과 보호자를 연결하는 위치 기반 안전 케어",
    description:
      "위치 데이터를 기반으로 가족과 보호자를 연결하고, 일상의 안전 확인과 긴급 상황 대응을 지원합니다.",
    tags: ["Location Sharing", "Safe Zone", "Emergency SOS", "Activity History"],
    metrics: [],
    cta: "Explore Solution",
    href: routes.solutions.aiOcc,
    layout: "text-left",
    mockup: "appWindow",
    slot: {
      placeholder: "AI OCC 서비스 화면",
      ratio: "16 / 10",
      src: "/occ/occ-demo.png",
    },
    chrome: { title: "OnCare Circle" },
  },
  {
    n: "05",
    anchor: "solution-validation",
    slug: "validation-automation",
    category: "Validation",
    title: "Validation Automation",
    oneLine: "실제 디바이스 기반 AI 검증 자동화",
    description:
      "실제 디바이스 환경에서 AI 모델과 SDK를 실행·검증하고, 테스트부터 결과 관리까지 하나의 흐름으로 자동화합니다.",
    tags: ["Device Test", "Validation", "Automation", "Reporting"],
    metrics: [
      { v: "5+", k: "Metrics" },
      { v: "Auto", k: "Reporting" },
      { v: "Full", k: "Traceability" },
    ],
    cta: "Explore Solution",
    href: routes.solutions.validationAutomation,
    layout: "text-left-narrow",
    mockup: "analytics",
    slot: {
      placeholder: "Validation Automation 화면",
      ratio: "16 / 9",
      src: "/validation/validation-hero.png",
    },
    chrome: { title: "Validation Automation" },
  },
  // Not shown in the home preview (see homeSolutionSlugs) — kept because
  // /solutions/partner-products and the footer still reference it.
  {
    n: "06",
    anchor: "solution-partners",
    slug: "partner-products",
    category: "Partners",
    title: "Partner Products",
    oneLine: "파트너 솔루션 실행·상용화",
    description:
      "로보틱스/Automotive 등 파트너 솔루션을 한국 시장에 맞게 실행/검증/상용화 지원합니다.",
    tags: ["Robotics", "KR", "E2E"],
    metrics: [
      { v: "Robotics", k: "Domain" },
      { v: "KR", k: "Localized" },
      { v: "E2E", k: "Commercialize" },
    ],
    cta: "Contact Us",
    href: routes.solutions.partners,
    layout: "device-left",
    mockup: "phone",
    slot: { placeholder: "Device Interface 스크린샷", ratio: "9 / 17.5" },
  },
];

/** Icon per solution slug, used by the header dropdown preview. */
const solutionIcons: Record<string, IconName> = {
  axsl: "nodes",
  "private-ai-platform": "shieldCheck",
  "berrywatch-platform": "mapPin",
  "ai-occ": "monitor",
  "validation-automation": "docCheck",
};

/**
 * Header dropdown items — derived from the same panels the home preview shows,
 * in the same order, so nav naming and copy can never drift from the data.
 */
export const megaSolutions: MegaItem[] = homeSolutionSlugs.map((slug) => {
  const panel = solutionPanels.find((p) => p.slug === slug)!;
  return {
    key: panel.title,
    oneLine: panel.oneLine,
    description: panel.description,
    tags: panel.tags.slice(0, 3),
    icon: solutionIcons[slug],
    href: panel.href,
  };
});

/* ----------------------------------------------------------- Action Showcase */
export interface ActionItem {
  label: string;
  title: string;
  description: string;
}

export const actionItems: ActionItem[] = [
  {
    label: "On-Device Runtime",
    title: "실디바이스 위에서 검증된 AI 실행",
    description:
      "디바이스 환경에서 AI를 실제 구동하기 위한 하드웨어, OS, 런타임 이해를 기반으로 시스템을 구현합니다. 실디바이스 중심으로 동작을 확인하며 온디바이스 실행 환경을 최적화합니다.",
  },
  {
    label: "AI Validation",
    title: "실제 환경에서의 성능·안정성 검증",
    description:
      "정확도, 성능, 지연시간, 안정성, 호환성을 실제 디바이스 환경에서 검증합니다. NPU/칩셋/SDK별 호환성 차이를 분석해 배포 전 신뢰를 확보합니다.",
  },
  {
    label: "Private Operation",
    title: "폐쇄망·온프레미스 AI 운영",
    description:
      "폐쇄망과 온프레미스 업무 환경에서 동작하는 Private AI/RAG 기반으로 설치, 검증, 운영, 유지보수까지 이어지는 운영 체계를 구성합니다.",
  },
];

export const actionThumbs = ["현장 이미지", "다이어그램 이미지"];

/* -------------------------------------------------------- Contact pipeline */
export interface PipelineNode {
  label: string;
  icon: IconName;
  terminal?: boolean;
}

export const pipelineNodes: PipelineNode[] = [
  { label: "AI Model", icon: "chip" },
  { label: "AI Optimization", icon: "optimize" },
  { label: "On-Device Runtime", icon: "runtime" },
  { label: "AI Validation", icon: "checkCircle" },
  { label: "Verified in the\nReal World", icon: "check", terminal: true },
];

/* ------------------------------------------------------------------ Footer */
export interface FooterColumn {
  heading: string;
  /** When set, the column heading links to its overview/index page. */
  headingHref?: string;
  links: { label: string; href: string; accent?: boolean }[];
}

// Footer mirrors the v1.0 nav tree: About · Solutions · Contact.
export const footerColumns: FooterColumn[] = [
  {
    heading: "About",
    headingHref: routes.company,
    links: [],
  },
  {
    // Parent label only — Solutions has no page of its own; the five children
    // below carry the links (same set/order as the header dropdown).
    heading: "Solutions",
    links: [
      { label: "AXSL", href: routes.solutions.axsl },
      { label: "Private AI Platform", href: routes.solutions.privateAi },
      { label: "Berrywatch Service", href: routes.solutions.berrywatch },
      { label: "AI OCC (OnCare Circle)", href: routes.solutions.aiOcc },
      { label: "Validation Automation", href: routes.solutions.validationAutomation },
    ],
  },
  {
    heading: "Contact",
    headingHref: routes.contact,
    links: [
      { label: contactEmail, href: routes.social.email, accent: true },
    ],
  },
];

/* ------------------------------------------------------------- Contact page */
// Contact hero copy (do not paraphrase). `\n` marks the intended line break;
// each array entry is its own paragraph.
export const contactHeadline = "Let’s Build What Works in the Real World.";
export const contactSubcopy = [
  "AI를 실제 서비스와 디바이스 환경에 적용하고 싶다면,\nYOnLab과 이야기해보세요.",
  "Private AI부터 실디바이스 검증,\nAI 서비스 구현까지 필요한 방향을 함께 검토합니다.",
];

// Inquiry types — drive the left info list, the hero visual, and the form radio group.
// (Neutral functional UI text, not brand copy.) `icon` maps to a lucide-react icon
// in components/sections/contactMeta.ts.
export type ContactTypeId =
  | "business"
  | "partnership"
  | "consultation"
  | "recruitment";

export interface ContactType {
  id: ContactTypeId;
  label: string; // English label
  desc: string; // short Korean description
  hint: string; // guidance shown above the form fields when selected
}

export const contactTypes: ContactType[] = [
  {
    id: "business",
    label: "Business Inquiry",
    desc: "솔루션 도입 및 사업 문의",
    hint: "솔루션 도입 · 사업 관련 내용을 남겨주세요.",
  },
  {
    id: "partnership",
    label: "Partnership",
    desc: "기술 및 사업 협력 제안",
    hint: "기술 · 사업 협력 제안 내용을 남겨주세요.",
  },
  {
    id: "consultation",
    label: "Technical Consultation",
    desc: "AI 검증, 최적화 및 디바이스 상담",
    hint: "AI 검증 · 최적화 · 디바이스 상담 내용을 남겨주세요.",
  },
  {
    id: "recruitment",
    label: "Recruitment",
    desc: "채용 및 인재 관련 문의",
    hint: "채용 · 인재 관련 문의 내용을 남겨주세요.",
  },
];

// Inquiry process flow: Inquiry → Review → Discussion → Response.
export type ProcessId = "inquiry" | "review" | "discussion" | "response";

export interface ProcessStep {
  id: ProcessId;
  label: string;
  desc: string;
}

export const contactProcess: ProcessStep[] = [
  { id: "inquiry", label: "Inquiry", desc: "문의 접수" },
  { id: "review", label: "Review", desc: "내용 검토" },
  { id: "discussion", label: "Discussion", desc: "상담 · 논의" },
  { id: "response", label: "Response", desc: "회신" },
];

export const footerTagline = "Trusted Intelligence.\nVerified in the Real World.";
export const footerBlurb =
  "YOnLab은 AI를 실제 디바이스와 폐쇄망 업무 환경에서 검증·최적화·운영 가능한 솔루션으로 만듭니다.";

/**
 * Per-solution detail content for /solutions/<slug> pages.
 *
 * SOURCE DISCIPLINE: title/category/oneLine/description/tags/metrics come from the
 * project docs (design-source + prototype data in lib/content.ts). `challenge` reuses
 * the documented "Why YOnLab" customer challenges (verbatim), associated to the most
 * relevant solution. `workflow` labels are high-level architecture/flow stages
 * (documented-consistent). Where the docs do not define something, `notes` carries a
 * TODO instead of invented content. No fabricated features / customers / metrics.
 */

import {
  solutionPanels,
  whyRows,
  capabilities,
  type SolutionPanel,
  type Capability,
} from "@/lib/content";

export interface SolutionDetailContent extends SolutionPanel {
  /** Documented customer challenge (verbatim from Why YOnLab), or null → TODO. */
  challenge: { problem: string; solution: string } | null;
  /** Architecture / delivery flow node labels (documented-consistent). */
  workflow: string[];
  /** Related capability titles (must match lib/content.ts capabilities). */
  capabilityTitles: string[];
  /** Visible TODO notes where the docs are insufficient (shown on the page). */
  notes: string[];
}

const why = (i: number) => ({
  problem: whyRows[i].challenge,
  solution: whyRows[i].solution,
});

/** Per-slug augmentation layered on top of the documented SolutionPanel. */
const augment: Record<
  string,
  Omit<SolutionDetailContent, keyof SolutionPanel>
> = {
  axsl: {
    challenge: null, // 문서에 AXSL 고유의 고객 문제 정의 없음 → TODO
    workflow: [],
    capabilityTitles: ["Platform Engineering", "Technical Consulting"],
    notes: [
      "AXSL 상세 기능·서비스 목록은 기획 데이터 확보 후 채웁니다.",
    ],
  },
  "private-ai-platform": {
    challenge: why(2), // 폐쇄망/온프레미스 환경에서는 일반 AI 도구 적용이 어렵다
    workflow: ["Data", "AI Model", "Private Infrastructure", "Application", "Operation"],
    capabilityTitles: ["Platform Engineering", "AI Validation", "Technical Consulting"],
    notes: [],
  },
  "berrywatch-platform": {
    challenge: why(0), // AI 모델은 있지만 실제 디바이스 적용이 어렵다
    workflow: [
      "Location & Device Data",
      "Edge / On-Premise",
      "AI Analysis",
      "Operation (SOP · Manual)",
      "Alert · Dashboard",
    ],
    capabilityTitles: ["Embedded Engineering", "Platform Engineering"],
    notes: [],
  },
  "ai-occ": {
    challenge: null, // 문서에 AI OCC 고유의 고객 문제 정의 없음 → TODO
    workflow: [
      "Devices · Systems · AI Models",
      "Data Collection",
      "AI OCC",
      "Monitoring",
      "Alert · Response",
    ],
    capabilityTitles: ["Platform Engineering", "AI Validation"],
    notes: [],
  },
  "validation-automation": {
    challenge: why(3), // 검증/배포/리포트 체계가 분절되어 있다
    workflow: [
      "Test Request",
      "Environment Setup",
      "Automated Execution",
      "Result Analysis",
      "Pass / Fail",
      "Report",
    ],
    capabilityTitles: ["AI Validation", "AI Optimization"],
    notes: [],
  },
  "partner-products": {
    challenge: why(4), // PoC 이후 제품화까지 이어질 파트너가 부족하다
    workflow: [],
    capabilityTitles: ["Technical Consulting", "Embedded Engineering"],
    notes: [],
  },
};

/** All solution detail records, keyed by slug (documented panel + augmentation). */
export const solutionDetails: Record<string, SolutionDetailContent> =
  Object.fromEntries(
    solutionPanels.map((panel) => [
      panel.slug,
      { ...panel, ...augment[panel.slug] },
    ]),
  );

/** Slugs served by the shared [slug] template (some solutions have their own page). */
const dedicatedSolutionSlugs = [
  "partner-products",
  "private-ai-platform",
  "berrywatch-platform",
  "axsl",
  "ai-occ",
  "validation-automation",
];
export const standardSolutionSlugs = solutionPanels
  .map((p) => p.slug)
  .filter((s) => !dedicatedSolutionSlugs.includes(s));

export function getSolutionDetail(
  slug: string,
): SolutionDetailContent | undefined {
  return solutionDetails[slug];
}

/** Compact list of the other solutions (for the "Other Solutions" footer nav). */
export function getOtherSolutions(currentSlug: string): SolutionPanel[] {
  return solutionPanels.filter((p) => p.slug !== currentSlug);
}

/** Solutions powered by a given capability (reverse of capabilityTitles mapping). */
export function getSolutionsByCapability(capabilityTitle: string): SolutionPanel[] {
  return solutionPanels.filter((p) =>
    solutionDetails[p.slug]?.capabilityTitles.includes(capabilityTitle),
  );
}

/** Resolve capability titles to the documented capability objects (with href/icon). */
export function resolveCapabilities(titles: string[]): Capability[] {
  return titles
    .map((t) => capabilities.find((c) => c.title === t))
    .filter((c): c is Capability => Boolean(c));
}

/* --------------------------------------------------------- Partner Products */
/**
 * No partner companies / product names / logos are present in the project docs,
 * so none are invented. The page renders the explorer structure with documented
 * domain categories and a placeholder state until real data is provided.
 */
export const partnerCategories = ["Robotics", "Automotive"]; // documented domains
export interface PartnerProduct {
  name: string;
  partner: string;
  category: string;
  oneLine: string;
  application: string;
  url?: string;
}
export const partnerProducts: PartnerProduct[] = []; // TODO: populate from partner data

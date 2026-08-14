/**
 * Capability detail helpers for /capabilities/<slug> pages.
 * Content is the documented `capabilities` data (title/oneLine/description/tags/icon).
 * Capabilities have no documented metrics/challenge/workflow, so none are invented.
 */
import { capabilities, type Capability } from "@/lib/content";

export const capabilityDetails: Record<string, Capability> = Object.fromEntries(
  capabilities.map((c) => [c.slug, c]),
);

export const capabilitySlugs = capabilities.map((c) => c.slug);

export function getCapabilityDetail(slug: string): Capability | undefined {
  return capabilityDetails[slug];
}

export function getOtherCapabilities(slug: string): Capability[] {
  return capabilities.filter((c) => c.slug !== slug);
}

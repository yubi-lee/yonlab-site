"use client";

import { useReveal } from "@/hooks/useReveal";

/**
 * Mounts the site-wide IntersectionObserver once. Rendered near the root of the
 * page so any [data-reveal] element (server-rendered) gets observed on load.
 */
export function RevealProvider() {
  useReveal();
  return null;
}

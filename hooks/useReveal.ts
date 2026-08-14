"use client";

import { useEffect } from "react";

/**
 * Mirrors the prototype's IntersectionObserver reveal:
 * elements marked [data-reveal] animate to visible once, threshold 0.12,
 * rootMargin bottom -8%. Reduced-motion users get everything shown immediately
 * (handled in CSS, but we also short-circuit here).
 */
export function useReveal() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (nodes.length === 0) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") {
      nodes.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    const id = window.setTimeout(() => nodes.forEach((el) => io.observe(el)), 60);
    return () => {
      window.clearTimeout(id);
      io.disconnect();
    };
  }, []);
}

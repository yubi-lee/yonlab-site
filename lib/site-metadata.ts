import type { Metadata } from "next";

export function createPageMetadata(title: string, description: string, path: string): Metadata {
  const url = `https://www.yonlab.ai${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "와이온랩 YOnLab",
      locale: "ko_KR",
      type: "website",
      images: [{ url: "/og-yonlab.png", width: 1200, height: 630, alt: "와이온랩 YOnLab" }],
    },
  };
}

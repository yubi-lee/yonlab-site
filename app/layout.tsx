import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "와이온랩 YOnLab | AI 솔루션·앱 개발·디바이스 검증",
  description:
    "와이온랩(YOnLab)은 사내 AI, 온디바이스 AI, 앱 개발과 디바이스 검증을 연결합니다. 실제 제품 환경에서 AI를 검증·최적화하고 서비스 출시와 운영을 돕습니다.",
  metadataBase: new URL("https://www.yonlab.ai"),
  openGraph: {
    title: "와이온랩 YOnLab | AI 솔루션·앱 개발·디바이스 검증",
    description:
      "사내 AI, 온디바이스 AI, 앱 개발과 디바이스 검증. 와이온랩의 솔루션과 개발 경험을 확인하세요.",
    siteName: "와이온랩 YOnLab",
    images: [{ url: "/og-yonlab.png", width: 1200, height: 630, alt: "와이온랩 YOnLab · AI 솔루션·앱 개발·디바이스 검증" }],
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <head>
        <meta name="naver-site-verification" content="eb8e7203332ee5bc98e79582f062a1f48c9076d7" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "와이온랩",
            alternateName: "YOnLab",
            url: "https://www.yonlab.ai",
            logo: "https://www.yonlab.ai/yonlab-logo-trim-removebg-preview.png",
            email: "contact@yonlab.ai",
            sameAs: ["https://blog.naver.com/yonlabai"],
          }) }}
        />
        {/* Progressive enhancement: if JS never runs (crawlers / JS disabled),
            the scroll-reveal observer can't fire — force all content visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          본문으로 건너뛰기
        </a>
        {children}
      </body>
    </html>
  );
}

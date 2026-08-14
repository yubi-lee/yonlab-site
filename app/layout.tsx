import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YOnLab — Trusted Intelligence. Verified in the Real World.",
  description:
    "YOnLab은 AI를 실제 디바이스와 폐쇄망 업무 환경에서 검증, 최적화, 운영 가능한 솔루션으로 만듭니다. Private Physical AI Engineering Company.",
  metadataBase: new URL("https://www.yonlab.ai"),
  openGraph: {
    title: "YOnLab — Trusted Intelligence. Verified in the Real World.",
    description:
      "Private Physical AI Engineering Company. AI를 실제 디바이스와 폐쇄망 환경에서 검증·최적화·운영합니다.",
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

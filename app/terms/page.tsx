import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { termsOfUse } from "@/lib/legal";

export const metadata: Metadata = {
  title: "이용약관 — YOnLab",
  description:
    "YOnLab 웹사이트와 웹사이트를 통해 제공되는 정보 및 Demo 서비스 이용에 적용되는 약관입니다.",
};

export default function TermsPage() {
  return <LegalDocument doc={termsOfUse} />;
}

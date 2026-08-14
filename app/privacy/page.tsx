import type { Metadata } from "next";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { privacyPolicy } from "@/lib/legal";

export const metadata: Metadata = {
  title: "개인정보처리방침 — YOnLab",
  description:
    "YOnLab 웹사이트 이용 및 Contact Us 문의 과정에서 처리되는 개인정보에 관한 사항을 안내합니다.",
};

export default function PrivacyPage() {
  return <LegalDocument doc={privacyPolicy} />;
}

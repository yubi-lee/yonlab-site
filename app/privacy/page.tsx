import { createPageMetadata } from "@/lib/site-metadata";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { privacyPolicy } from "@/lib/legal";

export const metadata = createPageMetadata(
  "개인정보처리방침 | 와이온랩 YOnLab",
  "와이온랩(YOnLab) 웹사이트 이용과 상담 문의 과정에서 처리되는 개인정보의 수집 목적, 보관 및 보호에 관한 사항을 안내합니다.",
  "/privacy",
);

export default function PrivacyPage() {
  return <LegalDocument doc={privacyPolicy} />;
}

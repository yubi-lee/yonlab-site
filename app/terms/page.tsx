import { createPageMetadata } from "@/lib/site-metadata";
import { LegalDocument } from "@/components/sections/LegalDocument";
import { termsOfUse } from "@/lib/legal";

export const metadata = createPageMetadata(
  "이용약관 | 와이온랩 YOnLab",
  "와이온랩(YOnLab) 웹사이트와 정보, 데모 서비스 이용에 적용되는 약관을 안내합니다.",
  "/terms",
);

export default function TermsPage() {
  return <LegalDocument doc={termsOfUse} />;
}

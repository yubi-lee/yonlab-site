import { contactEmail } from "@/lib/content";

/**
 * Legal document copy — transcribed verbatim from the source documents in
 * `public/legal/` (YOnLab_Privacy_Policy / YOnLab_Terms_of_Use, 2026-08-14).
 * Nothing here is authored: section order and wording follow the originals.
 */

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "mail"; label: string; email: string };

export interface LegalSection {
  /** Section number as printed in the source document. */
  n: string;
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  title: string;
  titleEn: string;
  effectiveDate: string;
  intro: string;
  sections: LegalSection[];
  imprint: string;
}

const imprint = `YOnLab Co., Ltd.  |  ${contactEmail}`;

export const privacyPolicy: LegalDoc = {
  title: "개인정보처리방침",
  titleEn: "Privacy Policy",
  effectiveDate: "2026년 8월 14일",
  intro:
    "와이온랩 주식회사(이하 “YOnLab”)는 이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 등 관련 법령을 준수하여 개인정보를 처리합니다. 본 개인정보처리방침은 YOnLab 웹사이트 이용 및 Contact Us 문의 과정에서 처리되는 개인정보에 관한 사항을 안내합니다.",
  sections: [
    {
      n: "1",
      title: "개인정보의 처리 목적",
      blocks: [
        {
          type: "ul",
          items: [
            "사업, 서비스, 기술 상담 및 제휴 문의의 접수와 답변",
            "문의자 확인 및 업무상 연락",
            "문의 및 상담 이력 관리",
          ],
        },
      ],
    },
    {
      n: "2",
      title: "처리하는 개인정보 항목",
      blocks: [
        {
          type: "p",
          text: "Contact Us 문의 시: 이름, 회사명 또는 소속, 이메일 주소, 문의 유형, 문의 내용",
        },
        {
          type: "p",
          text: "웹사이트 이용 과정에서 생성될 수 있는 정보: 접속기록, IP 주소, 브라우저 및 기기 정보 등",
        },
      ],
    },
    {
      n: "3",
      title: "개인정보의 보유 및 이용기간",
      blocks: [
        {
          type: "p",
          text: "문의 과정에서 수집한 개인정보는 문의 처리 및 후속 대응을 위해 보관하며, 문의 처리 및 후속 대응이 완료된 날부터 1년간 보유한 후 지체 없이 파기합니다. 다만, 관련 법령에 따라 보존할 필요가 있는 경우에는 해당 법령에서 정한 기간 동안 보관할 수 있습니다.",
        },
      ],
    },
    {
      n: "4",
      title: "개인정보의 제3자 제공",
      blocks: [
        {
          type: "p",
          text: "YOnLab은 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 이용자가 사전에 동의한 경우 또는 법령에 따라 제공이 요구되는 경우에는 예외로 합니다.",
        },
      ],
    },
    {
      n: "5",
      title: "개인정보 처리의 위탁",
      blocks: [
        {
          type: "p",
          text: "YOnLab은 웹사이트 운영, 호스팅 또는 문의 처리를 위해 필요한 범위에서 외부 서비스 또는 인프라를 이용할 수 있습니다. 개인정보 처리 위탁이 발생하는 경우 관련 법령에 따라 수탁자와 위탁 업무의 내용을 관리하고, 필요한 사항을 개인정보처리방침에 반영합니다.",
        },
      ],
    },
    {
      n: "6",
      title: "개인정보의 파기",
      blocks: [
        {
          type: "p",
          text: "개인정보의 보유기간이 경과하거나 처리 목적이 달성되는 등 개인정보가 불필요하게 된 경우에는 지체 없이 파기합니다. 전자적 파일 형태의 개인정보는 복구 또는 재생이 어렵도록 안전한 방법으로 삭제합니다.",
        },
      ],
    },
    {
      n: "7",
      title: "정보주체의 권리와 행사 방법",
      blocks: [
        {
          type: "p",
          text: "이용자는 본인의 개인정보에 대해 열람, 정정·삭제, 처리정지 등을 요청할 수 있습니다. 관련 요청은 아래 문의처를 통해 접수할 수 있으며, YOnLab은 관련 법령이 정한 절차에 따라 처리합니다.",
        },
      ],
    },
    {
      n: "8",
      title: "개인정보의 안전성 확보조치",
      blocks: [
        {
          type: "p",
          text: "YOnLab은 개인정보를 안전하게 관리하기 위해 접근 권한 관리, 인증 및 접근 통제, 보안 업데이트 등 합리적인 기술적·관리적 보호조치를 적용합니다.",
        },
      ],
    },
    {
      n: "9",
      title: "개인정보 관련 문의",
      blocks: [
        { type: "p", text: "담당: YOnLab 개인정보 관련 문의" },
        { type: "mail", label: "이메일", email: contactEmail },
      ],
    },
    {
      n: "10",
      title: "개인정보처리방침의 변경",
      blocks: [
        {
          type: "p",
          text: "본 개인정보처리방침은 관련 법령, 서비스 또는 운영 정책의 변경에 따라 수정될 수 있습니다. 변경되는 경우 웹사이트를 통해 안내합니다.",
        },
      ],
    },
  ],
  imprint,
};

export const termsOfUse: LegalDoc = {
  title: "이용약관",
  titleEn: "Terms of Use",
  effectiveDate: "2026년 8월 14일",
  intro:
    "본 이용약관은 YOnLab 웹사이트와 웹사이트를 통해 제공되는 정보 및 Demo 서비스 이용에 적용됩니다. 웹사이트를 이용하는 경우 이용자는 본 약관의 적용을 받을 수 있습니다.",
  sections: [
    {
      n: "1",
      title: "목적",
      blocks: [
        {
          type: "p",
          text: "본 이용약관은 와이온랩 주식회사(이하 “YOnLab”)가 운영하는 웹사이트의 이용과 관련된 기본적인 사항을 정하는 것을 목적으로 합니다.",
        },
      ],
    },
    {
      n: "2",
      title: "웹사이트의 이용",
      blocks: [
        {
          type: "p",
          text: "본 웹사이트는 YOnLab의 회사, 기술, 솔루션 및 서비스에 대한 정보를 제공하기 위해 운영됩니다. 이용자는 관련 법령과 본 약관을 준수하여 웹사이트를 이용해야 합니다.",
        },
      ],
    },
    {
      n: "3",
      title: "제공되는 정보",
      blocks: [
        {
          type: "p",
          text: "YOnLab은 웹사이트에 제공되는 정보를 정확하고 최신 상태로 유지하기 위해 노력합니다. 다만, 솔루션의 기능, 구성, 제공 범위 및 일정 등은 개발 및 운영 상황에 따라 변경될 수 있습니다.",
        },
      ],
    },
    {
      n: "4",
      title: "Demo 서비스",
      blocks: [
        {
          type: "p",
          text: "YOnLab 웹사이트에서는 일부 솔루션 또는 서비스의 Demo 환경으로 연결되는 기능을 제공할 수 있습니다. Demo 서비스는 제품 또는 기술에 대한 이해와 체험을 위한 목적으로 제공되며, 실제 상용 서비스와 기능 또는 운영 환경에 차이가 있을 수 있습니다. YOnLab은 필요에 따라 Demo 서비스의 제공 범위 또는 운영 방식을 변경하거나 종료할 수 있습니다.",
        },
      ],
    },
    {
      n: "5",
      title: "지식재산권",
      blocks: [
        {
          type: "ul",
          items: [
            "웹사이트의 상호, 로고 및 브랜드 요소",
            "이미지, 그래픽, 문서 및 설명 자료",
            "소프트웨어, 서비스 화면, 디자인 및 기타 콘텐츠",
          ],
        },
        {
          type: "p",
          text: "위 콘텐츠에 관한 권리는 YOnLab 또는 정당한 권리자에게 있으며, 사전 허가 없이 무단으로 복제, 배포, 수정 또는 상업적으로 이용할 수 없습니다.",
        },
      ],
    },
    {
      n: "6",
      title: "외부 링크",
      blocks: [
        {
          type: "p",
          text: "웹사이트에는 Demo 서비스 또는 기타 외부 웹사이트로 연결되는 링크가 포함될 수 있습니다. 외부 사이트의 콘텐츠, 개인정보 처리 및 운영 정책은 해당 사이트 또는 서비스 제공자의 정책에 따릅니다.",
        },
      ],
    },
    {
      n: "7",
      title: "금지 행위",
      blocks: [
        {
          type: "ul",
          items: [
            "웹사이트 또는 서비스의 정상적인 운영을 방해하는 행위",
            "승인되지 않은 방법으로 시스템, 계정 또는 데이터에 접근하려는 행위",
            "웹사이트의 콘텐츠 또는 서비스를 무단으로 복제하거나 악용하는 행위",
            "관련 법령 또는 공공질서에 위반되는 행위",
          ],
        },
      ],
    },
    {
      n: "8",
      title: "책임의 범위",
      blocks: [
        {
          type: "p",
          text: "YOnLab은 웹사이트와 Demo 서비스를 안정적으로 제공하기 위해 노력합니다. 다만, 시스템 점검, 네트워크 장애, 외부 서비스 문제, 천재지변 또는 기타 합리적으로 통제하기 어려운 사유로 인해 서비스 이용이 일시적으로 제한될 수 있습니다.",
        },
      ],
    },
    {
      n: "9",
      title: "약관의 변경",
      blocks: [
        {
          type: "p",
          text: "본 약관은 서비스 내용 또는 관련 정책의 변경에 따라 수정될 수 있으며, 변경되는 경우 웹사이트를 통해 안내합니다.",
        },
      ],
    },
    {
      n: "10",
      title: "문의",
      blocks: [{ type: "mail", label: "이메일", email: contactEmail }],
    },
  ],
  imprint,
};

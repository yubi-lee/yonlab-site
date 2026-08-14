import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { CardCta } from "@/components/ui/CardCta";
import { Icon } from "@/components/icons";
import { capabilities } from "@/lib/content";

/**
 * Links solutions to the underlying capabilities and states the distinction:
 * Solution = the delivered answer; Capability = the engineering ability behind it.
 */
export function RelatedCapabilities() {
  return (
    <section className="relative border-t border-line bg-white px-6 py-20 sm:px-14 lg:py-28">
      <div className="mx-auto max-w-content">
        <div data-reveal className="mb-12 max-w-[640px]">
          <Eyebrow className="mb-6">Related Capabilities</Eyebrow>
          <h2 className="mb-5 font-sans text-[28px] font-extrabold leading-[1.2] tracking-[-0.02em] text-navy sm:text-[36px]">
            솔루션을 뒷받침하는 핵심 역량
          </h2>
          <p className="max-w-[560px] break-keep font-sans text-[17px] leading-[1.7] text-muted">
            Solution은 고객에게 제공하는 해결 방식이며, Capability는 이를 가능하게 하는
            기술과 수행 역량입니다.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, i) => (
            <li key={cap.n} data-reveal style={{ transitionDelay: `${0.05 * i}s` }}>
              <Card href={cap.href}>
                <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-sky-light">
                  <Icon name={cap.icon} size={22} />
                </span>
                <h3 className="mb-2 break-keep font-sans text-[19px] font-bold tracking-[-0.01em] text-white">
                  {cap.title}
                </h3>
                <p className="mb-7 break-keep font-sans text-[15px] leading-[1.6] text-white/60">
                  {cap.description}
                </p>
                <CardCta label="역량 보기" />
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

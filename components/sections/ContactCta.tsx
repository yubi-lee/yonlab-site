import type { ReactNode } from "react";
import { Icon } from "@/components/icons";
import { SectionConnector } from "@/components/ui/SectionConnector";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { pipelineNodes, routes } from "@/lib/content";

interface ContactCtaProps {
  /** Defaults to the home closing copy. Pass a string or nodes (e.g. with <br>). */
  title?: ReactNode;
  description?: string;
  /** The Physical AI Pipeline diagram (home only by default). */
  showPipeline?: boolean;
  href?: string;
  id?: string;
  /** "dark" = deep-navy authority close (mondrian-style). Pipeline hidden on dark. */
  variant?: "light" | "dark";
}

/** Horizontal Physical AI Pipeline — distinct from the Hero's vertical diagram. */
function Pipeline() {
  return (
    <div
      data-reveal
      style={{ transitionDelay: ".12s" }}
      className="relative mx-auto mb-[76px] max-w-[1000px]"
    >
      <span className="mb-[38px] block font-sans text-xs font-bold uppercase leading-none tracking-[0.2em] text-idle">
        Physical AI Pipeline
      </span>
      <div className="relative flex items-start justify-between gap-2">
        {/* Connecting rail (desktop) */}
        <div
          className="absolute left-[6%] right-[6%] top-[29px] z-0 hidden h-px sm:block"
          style={{
            background:
              "linear-gradient(90deg,#D8E4F5 0%,#D8E4F5 78%,#016CFF 100%)",
          }}
        />
        {pipelineNodes.map((node) => (
          <div
            key={node.label}
            className="relative z-[1] flex flex-1 flex-col items-center gap-4"
          >
            <span
              className={cn(
                "inline-flex h-[58px] w-[58px] items-center justify-center rounded-[14px]",
                node.terminal
                  ? "bg-navy shadow-[0_12px_28px_rgba(0,24,80,0.22)] text-white"
                  : "border border-line bg-white text-navy",
              )}
            >
              {node.terminal ? (
                <Icon name="check" size={26} strokeWidth={2} />
              ) : (
                <Icon name={node.icon} size={26} />
              )}
            </span>
            <span
              className={cn(
                "max-w-[130px] whitespace-pre-line text-center font-sans text-[13.5px] leading-[1.35]",
                node.terminal ? "font-bold text-navy" : "font-semibold text-muted",
              )}
            >
              {node.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactCta({
  title,
  description,
  showPipeline = true,
  href = routes.contact,
  id,
  variant = "light",
}: ContactCtaProps = {}) {
  const dark = variant === "dark";
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden border-t px-6 py-24 sm:px-14 lg:pb-[156px] lg:pt-[148px]",
        dark ? "border-navy bg-navy" : "border-line",
      )}
      style={
        dark
          ? undefined
          : {
              background:
                "linear-gradient(160deg,#DCE7FF 0%,#EEF3FF 40%,#F7FAFF 72%,#FFFFFF 100%)",
            }
      }
    >
      {dark ? (
        <>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 0%, rgba(1,108,255,0.26) 0%, rgba(1,108,255,0) 55%)",
            }}
          />
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.05]" />
        </>
      ) : (
        <>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(58% 62% at 50% 8%, rgba(0,104,248,0.20) 0%, rgba(0,104,248,0) 60%)",
            }}
          />
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-[0.03]" />
          <SectionConnector dotBg="#fff" />
        </>
      )}

      <div className="relative mx-auto max-w-prose text-center">
        <h2
          data-reveal
          className={cn(
            "mx-auto mb-[26px] max-w-[1100px] font-sans text-[44px] font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-[64px] lg:text-[86px] lg:leading-[1.0]",
            dark ? "text-white" : "text-navy",
          )}
        >
          {title ?? (
            <>
              Let&apos;s Build Physical
              <br />
              AI Together.
            </>
          )}
        </h2>
        <p
          data-reveal
          style={{ transitionDelay: ".06s" }}
          className={cn(
            "mx-auto mb-16 max-w-[560px] whitespace-pre-line font-sans text-xl font-normal leading-[1.6] lg:mb-[84px]",
            dark ? "text-white/70" : "text-muted",
          )}
        >
          {description ??
            "AI를 실제 서비스와 디바이스 환경에 적용하고 싶다면 YOnLab과 논의해보세요."}
        </p>

        {showPipeline && !dark && <Pipeline />}

        <div data-reveal>
          <Button href={href} size="lg" withArrow>
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}

import {
  Blocks,
  Gauge,
  CheckCircle2,
  UploadCloud,
  Activity,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  workflowSteps,
  workflowIntro,
  companySectionIds,
  type WorkflowIconId,
} from "@/lib/company";

const stepIcons: Record<WorkflowIconId, LucideIcon> = {
  build: Blocks,
  optimize: Gauge,
  validate: CheckCircle2,
  deploy: UploadCloud,
  operate: Activity,
};

export function EngineeringWorkflow() {
  return (
    <section
      id={companySectionIds.workflow}
      className="relative scroll-mt-24 border-t border-line bg-surface px-6 py-20 sm:px-14 lg:py-[120px]"
    >
      <div className="mx-auto max-w-content">
        <div data-reveal className="mb-14 max-w-[760px]">
          <Eyebrow className="mb-6">{workflowIntro.eyebrow}</Eyebrow>
          <h2 className="mb-5 whitespace-pre-line font-sans text-[30px] font-extrabold leading-[1.15] tracking-[-0.02em] text-navy sm:text-[40px]">
            {workflowIntro.title}
          </h2>
          <p className="max-w-[520px] whitespace-pre-line font-sans text-lg leading-[1.7] text-muted">
            {workflowIntro.description}
          </p>
        </div>

        {/* Desktop — horizontal flow */}
        <ol data-reveal className="relative hidden grid-cols-5 gap-4 lg:grid">
          <div
            aria-hidden="true"
            className="absolute left-[10%] right-[10%] top-7 h-px bg-line"
          />
          {workflowSteps.map((step) => {
            const IconComp = stepIcons[step.icon];
            return (
              <li key={step.n} className="relative flex flex-col items-center text-center">
                <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-white text-navy">
                  <IconComp size={24} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="mb-2 font-sans text-[22px] font-extrabold leading-none tabular-nums text-blue">
                  {step.n}
                </span>
                <span className="mb-2 font-sans text-[18px] font-bold text-navy">
                  {step.title}
                </span>
                <span className="max-w-[190px] font-sans text-[14px] leading-[1.6] text-muted">
                  {step.desc}
                </span>
              </li>
            );
          })}
        </ol>

        {/* Mobile / tablet — vertical timeline */}
        <ol data-reveal className="relative flex flex-col gap-8 lg:hidden">
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-[27px] top-6 w-px bg-line"
          />
          {workflowSteps.map((step) => {
            const IconComp = stepIcons[step.icon];
            return (
              <li key={step.n} className="relative flex items-start gap-5 pl-0">
                <span className="relative z-[1] inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-white text-navy">
                  <IconComp size={24} strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="flex flex-col pt-1.5">
                  <span className="mb-1 flex items-baseline gap-2.5">
                    <span className="font-sans text-[20px] font-extrabold tabular-nums text-blue">
                      {step.n}
                    </span>
                    <span className="font-sans text-[18px] font-bold text-navy">
                      {step.title}
                    </span>
                  </span>
                  <span className="font-sans text-[14.5px] leading-[1.6] text-muted">
                    {step.desc}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

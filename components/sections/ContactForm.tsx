"use client";

import { useId, useState, type ReactNode } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { contactTypes, contactEmail, routes, type ContactTypeId } from "@/lib/content";
import { typeIcons } from "@/components/sections/contactMeta";

const inputClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3.5 font-sans text-[15px] text-ink placeholder:text-faint transition-[border-color,box-shadow] duration-200 hover:border-line-deco focus:border-blue focus:outline-none focus:ring-4 focus:ring-blue/10 aria-[invalid=true]:border-[#D14343]";

interface FieldProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

function Field({ label, htmlFor, required, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="font-sans text-[14px] font-semibold text-navy">
        {label}
        {required && <span className="ml-1 text-blue">*</span>}
      </label>
      {children}
      {error && (
        <span id={`${htmlFor}-error`} role="alert" className="font-sans text-[13px] text-[#D14343]">
          {error}
        </span>
      )}
    </div>
  );
}

interface FormState {
  typeId: ContactTypeId;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  agree: boolean;
}

const EMPTY: FormState = {
  typeId: contactTypes[0].id,
  name: "",
  company: "",
  email: "",
  phone: "",
  message: "",
  agree: false,
};

export function ContactForm() {
  const uid = useId();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const id = (k: string) => `${uid}-${k}`;
  const selectedType = contactTypes.find((t) => t.id === form.typeId)!;

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "이름을 입력해주세요.";
    if (!form.company.trim()) next.company = "회사명을 입력해주세요.";
    if (!form.email.trim()) next.email = "이메일을 입력해주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "올바른 이메일 형식을 입력해주세요.";
    if (!form.message.trim()) next.message = "문의 내용을 입력해주세요.";
    if (!form.agree) next.agree = "개인정보 수집 · 이용에 동의해주세요.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildMailto = () => {
    const subject = `[YOnLab 문의] ${selectedType.label} - ${form.company}`;
    const body = [
      `문의 유형: ${selectedType.label} (${selectedType.desc})`,
      `이름: ${form.name}`,
      `회사명: ${form.company}`,
      `이메일: ${form.email}`,
      `연락처: ${form.phone || "-"}`,
      "",
      form.message,
    ].join("\n");
    return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // Front-end only (no backend wired): open the user's mail client as a fallback
    // and show a confirmation. No data is transmitted or stored by the site.
    if (typeof window !== "undefined") window.location.href = buildMailto();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-[24px] border border-line-soft bg-white p-10 text-center shadow-[0_22px_54px_-30px_rgba(0,24,80,0.4)] sm:p-12">
        <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue text-white">
          <Check size={28} strokeWidth={2} aria-hidden="true" />
        </span>
        <h2 className="mb-3 font-sans text-[24px] font-extrabold tracking-[-0.02em] text-navy">
          문의가 준비되었습니다
        </h2>
        <p className="mb-6 max-w-[420px] font-sans text-[15px] leading-[1.7] text-muted">
          메일 앱이 열리지 않았다면 아래 주소로 직접 보내주세요. 영업일 기준으로
          회신드리겠습니다.
        </p>
        <Link href={buildMailto()} className="font-sans text-[15px] font-semibold text-blue">
          {contactEmail}
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[24px] border border-line-soft bg-white p-7 shadow-[0_22px_54px_-30px_rgba(0,24,80,0.4)] sm:p-10 lg:p-11"
    >
      {/* Inquiry type — accessible radio group */}
      <fieldset className="mb-6">
        <legend className="mb-3 font-sans text-[14px] font-semibold text-navy">
          문의 유형<span className="ml-1 text-blue">*</span>
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {contactTypes.map((t) => {
            const IconComp = typeIcons[t.id];
            const checked = form.typeId === t.id;
            return (
              <label key={t.id} className="block cursor-pointer">
                <input
                  type="radio"
                  name={id("type")}
                  value={t.id}
                  checked={checked}
                  onChange={() => setForm({ ...form, typeId: t.id })}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "flex min-h-[60px] items-center gap-3.5 rounded-xl border px-4 py-3.5 transition-[border-color,background-color,box-shadow] duration-200",
                    checked
                      ? "border-blue bg-blue/[0.06] shadow-[0_0_0_1px_rgba(1,108,255,0.35)_inset]"
                      : "border-line bg-white hover:border-line-deco",
                    "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-blue",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border transition-colors duration-200",
                      checked
                        ? "border-blue/25 bg-blue text-white"
                        : "border-line bg-surface text-navy",
                    )}
                  >
                    <IconComp size={18} strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <span className="flex flex-col">
                    <span
                      className={cn(
                        "font-sans text-[14px] leading-tight tracking-[-0.01em] text-navy transition-[font-weight]",
                        checked ? "font-extrabold" : "font-bold",
                      )}
                    >
                      {t.label}
                    </span>
                    <span className="font-sans text-[12.5px] leading-snug text-muted">
                      {t.desc}
                    </span>
                  </span>
                </span>
              </label>
            );
          })}
        </div>
        {/* Guidance text that changes with the selected type */}
        <p aria-live="polite" className="mt-3 font-sans text-[13.5px] leading-relaxed text-muted">
          {selectedType.hint}
        </p>
      </fieldset>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="이름 / 담당자" htmlFor={id("name")} required error={errors.name}>
          <input
            id={id("name")}
            type="text"
            autoComplete="name"
            className={inputClass}
            placeholder="홍길동"
            value={form.name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? `${id("name")}-error` : undefined}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Field>
        <Field label="회사명" htmlFor={id("company")} required error={errors.company}>
          <input
            id={id("company")}
            type="text"
            autoComplete="organization"
            className={inputClass}
            placeholder="YOnLab Inc."
            value={form.company}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? `${id("company")}-error` : undefined}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
          />
        </Field>
        <Field label="이메일" htmlFor={id("email")} required error={errors.email}>
          <input
            id={id("email")}
            type="email"
            autoComplete="email"
            className={inputClass}
            placeholder="you@company.com"
            value={form.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${id("email")}-error` : undefined}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </Field>
        <Field label="연락처" htmlFor={id("phone")}>
          <input
            id={id("phone")}
            type="tel"
            autoComplete="tel"
            className={inputClass}
            placeholder="010-0000-0000"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </Field>
      </div>

      <div className="mt-5">
        <Field label="문의 내용" htmlFor={id("message")} required error={errors.message}>
          <textarea
            id={id("message")}
            rows={6}
            className={cn(inputClass, "resize-y")}
            placeholder="도입 배경, 대상 디바이스/환경, 검토 중인 과제 등을 자유롭게 적어주세요."
            value={form.message}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? `${id("message")}-error` : undefined}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </Field>
      </div>

      <div className="mt-6">
        <label htmlFor={id("agree")} className="flex cursor-pointer items-start gap-3">
          <input
            id={id("agree")}
            type="checkbox"
            className="mt-0.5 h-[18px] w-[18px] shrink-0 cursor-pointer accent-blue"
            checked={form.agree}
            aria-invalid={!!errors.agree}
            aria-describedby={errors.agree ? `${id("agree")}-error` : undefined}
            onChange={(e) => setForm({ ...form, agree: e.target.checked })}
          />
          {/* Retention wording lives in the policy, not here, so the two can
              never drift apart. The link must not toggle the checkbox. */}
          <span className="font-sans text-[14px] leading-[1.6] text-muted">
            개인정보 수집·이용에 동의합니다. 자세한 내용은{" "}
            <Link
              href={routes.legal.privacy}
              onClick={(e) => e.stopPropagation()}
              className="font-semibold text-blue underline-offset-4 hover:underline"
            >
              개인정보처리방침
            </Link>
            을 확인해주세요.
            <span className="ml-1 text-blue">*</span>
          </span>
        </label>
        {errors.agree && (
          <span
            id={`${id("agree")}-error`}
            role="alert"
            className="mt-2 block font-sans text-[13px] text-[#D14343]"
          >
            {errors.agree}
          </span>
        )}
      </div>

      {/* Pill button, matching the site-wide button style */}
      <button
        type="submit"
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue px-[30px] py-[17px] font-sans text-base font-semibold text-white transition-colors duration-200 ease-out hover:bg-blue-hover sm:w-auto"
      >
        문의 보내기
      </button>
    </form>
  );
}

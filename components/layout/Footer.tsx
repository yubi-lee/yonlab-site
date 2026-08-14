import Link from "next/link";
import Image from "next/image";
import { Mail } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  footerColumns,
  footerTagline,
  footerBlurb,
  routes,
} from "@/lib/content";

const socials = [{ label: "Email", href: routes.social.email, Icon: Mail }];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-white px-6 pb-10 pt-20 sm:px-10 lg:px-14">
      <div className="relative mx-auto max-w-content">
        <div className="grid grid-cols-2 gap-10 border-b border-line pb-14 md:grid-cols-4 lg:grid-cols-[1.8fr_1fr_1.2fr_1.1fr] lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Image
              src="/yonlab-logo-trim-removebg-preview.png"
              alt="YOnLab"
              width={127}
              height={28}
              className="mb-[22px] h-7 w-auto object-contain"
            />
            <p className="mb-2.5 whitespace-pre-line font-sans text-[15px] font-bold leading-[1.4] text-navy">
              {footerTagline}
            </p>
            <p className="mb-[26px] max-w-[250px] font-sans text-[13.5px] font-normal leading-[1.6] text-muted">
              {footerBlurb}
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-[9px] border border-line text-navy transition-colors hover:border-navy hover:bg-surface"
                >
                  <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-[18px] font-sans text-xs font-bold uppercase leading-none tracking-[0.1em] text-navy">
                {col.headingHref ? (
                  <Link href={col.headingHref} className="transition-colors hover:text-blue">
                    {col.heading}
                  </Link>
                ) : (
                  col.heading
                )}
              </h3>
              <div className="flex flex-col gap-0.5">
                {col.links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className={cn(
                      "font-sans text-[14.5px] font-normal leading-[1.9] text-muted transition-colors hover:text-blue",
                      l.accent && "text-blue",
                    )}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 pt-7">
          <span className="font-sans text-[13px] font-normal leading-normal text-faint">
            © 2026 YOnLab. All Rights Reserved.
          </span>
          <div className="flex gap-[26px]">
            <Link
              href={routes.legal.privacy}
              className="font-sans text-[13px] text-muted transition-colors hover:text-blue"
            >
              Privacy Policy
            </Link>
            <Link
              href={routes.legal.terms}
              className="font-sans text-[13px] text-muted transition-colors hover:text-blue"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { megaSolutions, routes } from "@/lib/content";

type MenuName = "sol";

interface MenuDef {
  name: MenuName;
  label: string;
  /** Route prefix that marks this top-level menu active (undefined = never). */
  basePath?: string;
  items: { label: string; href: string }[];
}

/** v1.0 nav: About · Solutions · Contact. Only Solutions has a dropdown. */
const MENUS: MenuDef[] = [
  {
    name: "sol",
    label: "Solutions",
    basePath: "/solutions",
    items: megaSolutions.map((i) => ({ label: i.key, href: i.href })),
  },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<MenuName | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuName | null>(null);

  const isActivePath = (href: string) => pathname === href;
  const isActiveMenu = (base?: string) => Boolean(base && pathname.startsWith(base));

  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);

  const clearTimers = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  // Hover intent: open after 120ms, close 160ms after leaving.
  const scheduleOpen = (name: MenuName) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openTimer.current) clearTimeout(openTimer.current);
    openTimer.current = setTimeout(() => setOpen(name), 120);
  };
  const scheduleClose = () => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpen(null), 160);
  };
  const openNow = (name: MenuName) => {
    clearTimers();
    setOpen(name);
  };

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(null);
      setMobileOpen(false);
    }
  };
  const handleBlur = (e: React.FocusEvent) => {
    if (!headerRef.current?.contains(e.relatedTarget as Node)) setOpen(null);
  };

  return (
    <header
      ref={headerRef}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className="sticky top-0 z-[60] bg-white/95 backdrop-blur-sm"
    >
      <div className="relative flex items-center justify-between px-6 py-[18px] sm:px-10 lg:px-14 lg:py-[26px]">
        <Link href={routes.home} aria-label="YOnLab home" className="inline-flex items-center">
          <Image
            src="/yonlab-logo-trim-removebg-preview.png"
            alt="YOnLab"
            width={136}
            height={30}
            priority
            className="h-[30px] w-auto object-contain"
          />
        </Link>

        {/* Desktop nav — centered (stepai-style GNB) */}
        <div className="pointer-events-none absolute inset-x-0 hidden justify-center lg:flex">
          <nav className="pointer-events-auto flex items-center gap-12">
            {/* About — company one-pager, no dropdown */}
            <Link
              href={routes.company}
              aria-current={isActivePath(routes.company) ? "page" : undefined}
              className={cn(
                "font-sans text-[19px] font-normal tracking-[-0.02em] transition-colors duration-150 hover:text-blue",
                isActivePath(routes.company) ? "text-blue" : "text-ink/80",
              )}
            >
              About
            </Link>

            {MENUS.map((menu) => {
              const isOpen = open === menu.name;
              const active = isOpen || isActiveMenu(menu.basePath);
              return (
                <div
                  key={menu.name}
                  className="relative"
                  onMouseEnter={() => scheduleOpen(menu.name)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onFocus={() => openNow(menu.name)}
                    onClick={() => setOpen((o) => (o === menu.name ? null : menu.name))}
                    className={cn(
                      // Weight stays constant (no reflow); state is colour-only.
                      "flex cursor-pointer items-center gap-2 font-sans text-[19px] font-normal tracking-[-0.02em] transition-colors duration-150 hover:text-blue",
                      active ? "text-blue" : "text-ink/80",
                    )}
                  >
                    {menu.label}
                    <ChevronDown
                      size={12}
                      strokeWidth={1.6}
                      aria-hidden="true"
                      className={cn("transition-transform duration-200", isOpen && "rotate-180")}
                    />
                  </button>

                  {isOpen && (
                    <div className="animate-ydropin absolute left-0 top-full z-[70] mt-3 min-w-[240px] rounded-xl border border-line bg-white p-2 shadow-mega">
                      <ul className="flex flex-col">
                        {menu.items.map((it) => {
                          const itemActive = isActivePath(it.href);
                          return (
                            <li key={it.label}>
                              <Link
                                href={it.href}
                                aria-current={itemActive ? "page" : undefined}
                                onClick={() => setOpen(null)}
                                className={cn(
                                  "block rounded-lg px-3.5 py-2.5 font-sans text-[14px] transition-colors duration-150 hover:bg-surface hover:text-blue",
                                  itemActive ? "bg-surface font-semibold text-blue" : "font-medium text-navy",
                                )}
                              >
                                {it.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
            {/* Contact — goes to the contact page */}
            <Link
              href={routes.contact}
              aria-current={isActivePath(routes.contact) ? "page" : undefined}
              className={cn(
                "font-sans text-[19px] font-normal tracking-[-0.02em] transition-colors duration-150 hover:text-blue",
                isActivePath(routes.contact) ? "text-blue" : "text-ink/80",
              )}
            >
              Contact
            </Link>
          </nav>
        </div>

        {/* Right spacer — balances the logo so the centered nav stays optically centered */}
        <div aria-hidden="true" className="hidden w-[136px] lg:block" />

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-navy lg:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div id="mobile-nav" className="border-t border-line bg-white lg:hidden">
          <nav className="flex flex-col px-6 py-4 sm:px-10">
            <Link
              href={routes.company}
              onClick={() => setMobileOpen(false)}
              className="border-b border-line py-4 font-sans text-base font-semibold text-navy"
            >
              About
            </Link>
            {MENUS.map((menu) => (
              <div key={menu.name} className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={mobileSection === menu.name}
                  onClick={() =>
                    setMobileSection((s) => (s === menu.name ? null : menu.name))
                  }
                  className="flex w-full items-center justify-between py-4 font-sans text-base font-semibold text-navy"
                >
                  {menu.label}
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={cn(
                      "transition-transform duration-200",
                      mobileSection === menu.name && "rotate-180",
                    )}
                  />
                </button>
                {mobileSection === menu.name && (
                  <ul className="flex flex-col gap-0.5 pb-3">
                    {menu.items.map((it) => {
                      const itemActive = isActivePath(it.href);
                      return (
                        <li key={it.label}>
                          <Link
                            href={it.href}
                            aria-current={itemActive ? "page" : undefined}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "block rounded-lg px-2 py-2.5 font-sans text-[14px] hover:bg-surface",
                              itemActive
                                ? "font-semibold text-blue"
                                : "font-medium text-muted hover:text-blue",
                            )}
                          >
                            {it.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            ))}
            <Link
              href={routes.contact}
              onClick={() => setMobileOpen(false)}
              className="border-b border-line py-4 font-sans text-base font-semibold text-navy"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

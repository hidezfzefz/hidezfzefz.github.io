"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/practice/", label: "Practice" },
  { href: "/tutor/", label: "Tutor" },
  { href: "/progress/", label: "Progress" },
  { href: "/pricing/", label: "Pricing" },
];

export function SiteNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-cv-line bg-cv-bg/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-[15px] font-medium tracking-[-0.02em]">
          <span
            aria-hidden="true"
            className="grid size-8 place-items-center rounded-full border border-cv-line bg-cv-raised text-[13px]"
          >
            B
          </span>
          <span className="sm:hidden">BAC STE</span>
          <span className="hidden sm:inline">BAC STE Tutor</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-0.5 sm:gap-1">
          {links.map((l) => {
            const active = pathname === l.href || pathname === l.href.replace(/\/$/, "");
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-2 py-2 text-[13px] transition-colors sm:px-3 sm:text-sm ${
                  active ? "bg-cv-raised text-cv-text" : "text-cv-text-50 hover:text-cv-text"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link href="/practice/" className="pill pill-primary pill-small ml-1 hidden sm:inline-flex">
            Start
          </Link>
        </nav>
      </div>
    </header>
  );
}

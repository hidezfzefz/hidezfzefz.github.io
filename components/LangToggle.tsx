"use client";

import type { Lang } from "@/lib/lang";

export function LangToggle({
  lang,
  onChange,
  label = "Language",
}: {
  lang: Lang;
  onChange: (lang: Lang) => void;
  label?: string;
}) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label={label}>
      {(
        [
          ["en", "EN"],
          ["fr", "FR"],
        ] as const
      ).map(([value, text]) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          aria-pressed={lang === value}
          className={`pill pill-small ${
            lang === value ? "pill-primary" : "border border-cv-line text-cv-text-50"
          }`}
        >
          {text}
        </button>
      ))}
    </div>
  );
}

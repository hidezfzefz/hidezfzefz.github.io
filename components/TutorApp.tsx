"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { QUESTIONS } from "@/lib/questions";
import { isPremium } from "@/lib/progress";

export function TutorApp() {
  const [query, setQuery] = useState("");
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    setPremium(isPremium());
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return QUESTIONS.filter((x) => x.difficulty === "core").slice(0, 6);
    return QUESTIONS.filter((x) => {
      const hay = `${x.topic} ${x.prompt} ${x.explanation}`.toLowerCase();
      return hay.includes(q);
    }).slice(0, 12);
  }, [query]);

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.04em]">
        Ask the revision tutor.
      </h1>
      <p className="mt-2 max-w-xl text-cv-text-75">
        Search a topic, a rule or a keyword. The tutor answers from the built-in revision
        bank with a short explanation and the reasoning behind it.
      </p>

      <div className="mt-8 max-w-2xl">
        <label htmlFor="tutor-search" className="text-sm text-cv-text-50">
          What are you stuck on?
        </label>
        <input
          id="tutor-search"
          className="input mt-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. derivative, conditionals, probability"
          autoComplete="off"
        />
      </div>

      <div className="mt-8 grid gap-4">
        {results.length === 0 && (
          <div className="card p-6">
            <p className="text-cv-text-75">
              Nothing matched &ldquo;{query}&rdquo; yet. Try a shorter keyword such as
              &ldquo;limit&rdquo;, &ldquo;tense&rdquo; or &ldquo;vocabulary&rdquo;.
            </p>
          </div>
        )}
        {results.map((r) => {
          const locked = r.premium && !premium;
          return (
            <article key={r.id} className="card p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2 text-xs text-cv-text-50">
                <span className="rounded-full border border-cv-line bg-cv-raised px-2.5 py-1">
                  {r.subject === "maths" ? "Maths" : "English"}
                </span>
                <span>{r.topic}</span>
              </div>
              <h2 className="mt-3 text-lg leading-snug tracking-[-0.02em]">{r.prompt}</h2>
              {locked ? (
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-cv-text-75">
                  <span>The full walkthrough is part of Premium.</span>
                  <Link href="/pricing/" className="pill pill-secondary pill-small">
                    See Premium
                  </Link>
                </div>
              ) : (
                <p className="mt-3 text-[15px] leading-relaxed text-cv-text-75">{r.explanation}</p>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

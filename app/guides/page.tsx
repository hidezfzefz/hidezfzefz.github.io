import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES, guidesFor } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Study guides",
  description:
    "Short, exam-focused guides for 2BAC STE maths and English: limits, derivatives, integrals, complex numbers, tenses, conditionals, passive voice and reported speech.",
};

export default function GuidesPage() {
  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.04em]">
        Study guides.
      </h1>
      <p className="mt-2 max-w-2xl text-cv-text-75">
        One page per topic: the rules, the worked reasoning and the mistakes that cost
        marks. Read the guide, then practise the same topic with instant feedback.
      </p>

      {(["maths", "english"] as const).map((subject) => (
        <section key={subject} className="mt-10">
          <h2 className="text-xl tracking-[-0.02em]">
            {subject === "maths" ? "Maths" : "English"}
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {guidesFor(subject).map((g) => (
              <article key={g.slug} className="card flex flex-col p-5 sm:p-6">
                <p className="text-xs text-cv-text-50">{g.topic}</p>
                <h3 className="mt-1.5 text-lg tracking-[-0.02em]">
                  <Link href={`/guides/${g.slug}/`} className="hover:text-cv-text-75">
                    {g.title}
                  </Link>
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-cv-text-75">
                  {g.description}
                </p>
                <Link
                  href={`/guides/${g.slug}/`}
                  className="pill pill-secondary pill-small mt-4 self-start"
                >
                  Read the guide
                </Link>
              </article>
            ))}
          </div>
        </section>
      ))}

      <p className="mt-10 text-sm text-cv-text-50">
        {GUIDES.length} guides, written for the Moroccan 2BAC STE syllabus.
      </p>
    </div>
  );
}

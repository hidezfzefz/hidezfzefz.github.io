import Link from "next/link";
import { SampleQuestion } from "@/components/SampleQuestion";
import { GUIDES } from "@/lib/guides";

const featuredGuides = GUIDES.filter((g) =>
  ["limits", "derivatives", "tenses", "conditionals"].includes(g.slug),
);

const subjects = [
  {
    label: "Maths",
    topics: "Limits · Derivatives · Integrals · Sequences · Complex numbers · Probability",
  },
  {
    label: "English",
    topics: "Tenses · Conditionals · Passive voice · Modals · Vocabulary · Word formation",
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="container-page pb-10 pt-14 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="reveal">
            <h1 className="max-w-xl text-[clamp(2.4rem,5.5vw,3.75rem)] leading-[1.05] tracking-[-0.04em]">
              Pass the 2BAC STE with practice that explains.
            </h1>
            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-cv-text-75">
              Short maths and English questions, instant feedback, and a written reason for
              every answer. Built for the Moroccan baccalaureate, not a generic course.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/practice/" className="pill pill-primary">
                Start practising
              </Link>
              <Link href="/pricing/" className="pill pill-secondary">
                See pricing
              </Link>
            </div>
          </div>
          <div className="reveal" style={{ animationDelay: "60ms" }}>
            <SampleQuestion />
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="grid gap-4 sm:grid-cols-2">
          {subjects.map((s) => (
            <div key={s.label} className="card p-6">
              <h2 className="text-xl tracking-[-0.02em]">{s.label}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-cv-text-75">{s.topics}</p>
              <Link href="/practice/" className="pill pill-secondary pill-small mt-5">
                Practise {s.label.toLowerCase()}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl tracking-[-0.02em]">Read the rule, then practise it</h2>
            <p className="mt-1 max-w-lg text-[15px] text-cv-text-75">
              Free study guides for the topics that decide the exam, each linked to practice
              on the same topic.
            </p>
          </div>
          <Link href="/guides/" className="pill pill-secondary pill-small">
            All guides
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {featuredGuides.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}/`}
              className="card flex flex-col p-5 transition-colors hover:bg-cv-raised"
            >
              <p className="text-xs text-cv-text-50">
                {g.subject === "maths" ? "Maths" : "English"} · {g.topic}
              </p>
              <p className="mt-1.5 text-lg tracking-[-0.02em]">{g.title}</p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-cv-text-75">
                {g.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-page py-10">
        <div className="card flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-2xl tracking-[-0.02em]">Ready for a timed run?</h2>
            <p className="mt-1 max-w-lg text-[15px] text-cv-text-75">
              Ten mixed questions, fifteen minutes, feedback only at the end. It shows what
              you actually remember under pressure.
            </p>
          </div>
          <Link href="/exam/" className="pill pill-primary shrink-0">
            Start exam
          </Link>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="card overflow-hidden">
          <div className="grid divide-y divide-cv-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {[
              {
                n: "01",
                t: "Answer a question",
                d: "One question at a time, with four clear options and no timer pressure.",
              },
              {
                n: "02",
                t: "Read the reason",
                d: "Every answer shows the method, so you learn the rule instead of memorising the result.",
              },
              {
                n: "03",
                t: "Fix the weak topic",
                d: "Progress puts your weakest topic first, so the next session starts where it matters.",
              },
            ].map((step) => (
              <div key={step.n} className="p-6 sm:p-8">
                <p className="text-sm text-cv-text-50">{step.n}</p>
                <h3 className="mt-2 text-lg tracking-[-0.02em]">{step.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-cv-text-75">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[24px] border border-cv-line bg-cv-card p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-2xl tracking-[-0.02em]">Start with the free tier.</h2>
            <p className="mt-1 max-w-md text-[15px] text-cv-text-75">
              Core questions and explanations cost nothing. Premium adds the exam-style bank
              when you are ready.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/practice/" className="pill pill-primary">
              Practise free
            </Link>
            <Link href="/pricing/" className="pill pill-secondary">
              Compare
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

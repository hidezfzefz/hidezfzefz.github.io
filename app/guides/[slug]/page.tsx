import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GUIDES, guideBySlug } from "@/lib/guides";

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — 2BAC STE guide`,
    description: guide.description,
    alternates: { canonical: `/guides/${guide.slug}/` },
    openGraph: {
      type: "article",
      title: `${guide.title} — 2BAC STE guide`,
      description: guide.description,
      url: `/guides/${guide.slug}/`,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guideBySlug(slug);
  if (!guide) notFound();

  const siblings = GUIDES.filter(
    (g) => g.subject === guide.subject && g.slug !== guide.slug,
  ).slice(0, 3);

  return (
    <article className="container-page max-w-3xl py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="text-sm text-cv-text-50">
        <Link href="/guides/" className="hover:text-cv-text">
          Guides
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{guide.subject === "maths" ? "Maths" : "English"}</span>
      </nav>

      <h1 className="mt-4 text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.04em]">
        {guide.title}
      </h1>
      <p className="mt-4 text-[17px] leading-relaxed text-cv-text-75">{guide.intro}</p>

      <div className="mt-9 grid gap-8">
        {guide.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl tracking-[-0.02em]">{section.heading}</h2>
            <div className="mt-2 grid gap-3">
              {section.body.map((p) => (
                <p key={p} className="text-[15px] leading-relaxed text-cv-text-75">
                  {p}
                </p>
              ))}
            </div>
            {section.formula && (
              <p className="mt-4 overflow-x-auto rounded-[12px] border border-cv-line bg-cv-raised px-4 py-3 font-mono text-[13px] leading-relaxed text-cv-text">
                {section.formula}
              </p>
            )}
          </section>
        ))}
      </div>

      <section className="card mt-10 p-5 sm:p-6">
        <h2 className="text-lg tracking-[-0.02em]">Key points</h2>
        <ul className="mt-3 grid gap-2 text-[15px] text-cv-text-75">
          {guide.keyPoints.map((point) => (
            <li key={point} className="flex gap-2.5">
              <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-cv-text-50" />
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/practice/?topic=${encodeURIComponent(guide.practiceTopic)}`}
            className="pill pill-primary"
          >
            Practise {guide.topic.toLowerCase()}
          </Link>
          <Link href="/exam/" className="pill pill-secondary">
            Try a timed exam
          </Link>
        </div>
      </section>

      {siblings.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg tracking-[-0.02em]">More {guide.subject} guides</h2>
          <ul className="mt-3 grid gap-2">
            {siblings.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}/`}
                  className="flex items-center justify-between gap-3 rounded-[12px] border border-cv-line px-4 py-3 text-[15px] text-cv-text-75 transition-colors hover:bg-cv-raised hover:text-cv-text"
                >
                  <span>{g.title}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

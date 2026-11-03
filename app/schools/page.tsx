import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "For teachers",
  description:
    "Use BAC STE Tutor with your class: free printable worksheets, exam simulations and a 30-day class pilot for 2BAC STE maths and English teachers.",
  alternates: {
    canonical: "/schools/",
    languages: { en: "/schools/", fr: "/fr/ecoles/", "x-default": "/schools/" },
  },
};

const EMAIL = "bilal6087xx@gmail.com";
const PILOT_SUBJECT = "Class pilot — BAC STE Tutor";
const PILOT_BODY =
  "Hi, I teach 2BAC STE. I would like to try the free 30-day class pilot. Subject: maths / English. Class size:";

const included = [
  {
    title: "Printable worksheets",
    body: "Choose a subject and topic, shuffle the questions and print a clean sheet with or without the answer key.",
  },
  {
    title: "Exam simulation",
    body: "Ten mixed questions in fifteen minutes, with a full review at the end. Useful as a low-stakes class test.",
  },
  {
    title: "No student accounts",
    body: "Nothing to set up and no personal data collected. Students can use the site on any phone, or work from paper.",
  },
];

export default function SchoolsPage() {
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(PILOT_SUBJECT)}&body=${encodeURIComponent(PILOT_BODY)}`;

  return (
    <div className="container-page max-w-4xl py-10 sm:py-14">
      <p className="text-sm text-cv-text-50">For teachers</p>
      <h1 className="mt-3 text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.04em]">
        Bring it to your class.
      </h1>
      <p className="mt-3 max-w-2xl text-[17px] leading-relaxed text-cv-text-75">
        BAC STE Tutor is free for every student. For teachers, the useful part is the
        printable worksheet builder and the timed exam: ready-made practice without another
        account to manage.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {included.map((item) => (
          <section key={item.title} className="card p-5">
            <h2 className="text-lg tracking-[-0.02em]">{item.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-cv-text-75">{item.body}</p>
          </section>
        ))}
      </div>

      <section className="card mt-8 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl tracking-[-0.02em]">30-day class pilot</h2>
          <span className="pill pill-small border border-cv-line text-cv-text-75">
            Free · no card
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-cv-text-75">
          Try it with one class for a month. I will prepare a worksheet pack for the topics
          you are teaching and take requests for new questions. If it saves you time, we can
          talk about a class licence; if not, nothing happens.
        </p>
        <ul className="mt-4 grid gap-2 text-[15px] text-cv-text-75">
          <li>· A printable pack for one maths or English topic.</li>
          <li>· The timed exam, ready to use as a class activity.</li>
          <li>· New questions written for the topic you choose.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={href} className="pill pill-primary">
            Request the pilot
          </a>
          <Link href="/worksheets/" className="pill pill-secondary">
            Try the worksheet builder
          </Link>
          <Link
            href="/worksheets/?mix=balanced&count=20&title=Entry%20diagnostic"
            className="pill pill-secondary"
          >
            See a 20-question diagnostic
          </Link>
        </div>
        <p className="mt-3 text-xs text-cv-text-50">
          Opens your email app with a short message. No form, no account.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl tracking-[-0.02em]">What a class licence will include</h2>
        <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-cv-text-75">
          The pilot is free because the teacher dashboard does not exist yet. A licence at
          <strong className="text-cv-text"> 1,500 MAD per class per year</strong> is planned
          to include printed topic packs, a private class page and priority topic requests.
          We will only invoice after the pilot proves useful, and we will not pretend the
          dashboard is ready before it is.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl tracking-[-0.02em]">Questions teachers ask</h2>
        <div className="mt-3 grid gap-3">
          {[
            {
              q: "Do students need to create an account?",
              a: "No. Progress is stored in the browser on each device. Nothing is sent to a server.",
            },
            {
              q: "Is the content aligned with the 2BAC STE syllabus?",
              a: "The maths topics follow the 2BAC STE programme: limits, derivatives, integrals, sequences, complex numbers, probability and geometry. English covers the grammar and vocabulary tested in the exam.",
            },
            {
              q: "Can I use the worksheets in class?",
              a: "Yes. Print them, photocopy them, or project them. The answer key is optional.",
            },
            {
              q: "What if a topic is missing?",
              a: "Reply to the pilot email with the topic. New questions are added from teacher requests.",
            },
          ].map((item) => (
            <details key={item.q} className="card p-5">
              <summary className="cursor-pointer text-[15px] font-medium">{item.q}</summary>
              <p className="mt-2 text-[15px] leading-relaxed text-cv-text-75">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-8 text-sm text-cv-text-50">
        Version française :{" "}
        <Link href="/fr/ecoles/" hrefLang="fr" className="underline hover:text-cv-text">
          Pour les enseignants
        </Link>
        .
      </p>
    </div>
  );
}

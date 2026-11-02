import type { Metadata } from "next";
import { PremiumActions } from "@/components/PremiumActions";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Free core practice, or Premium for the full question bank and exam walkthroughs.",
};

const free = [
  "Core maths and English questions",
  "Instant feedback with a short explanation",
  "Progress and weak-topic tracking",
  "Tutor answers for core topics",
];

const premium = [
  "Every question, including exam-style ones",
  "Step-by-step walkthroughs for harder questions",
  "Tutor answers across the full revision bank",
  "New questions added as the syllabus is covered",
];

export default function PricingPage() {
  return (
    <div className="container-page py-10 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.04em]">
          Simple pricing.
        </h1>
        <p className="mt-3 text-cv-text-75">
          Start free. Upgrade only if the extra questions and walkthroughs are worth it for
          your exam.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <section className="card flex flex-col p-6 sm:p-8">
          <h2 className="text-xl tracking-[-0.02em]">Free</h2>
          <p className="mt-1 text-sm text-cv-text-50">Everything you need to start.</p>
          <p className="mt-6 text-4xl tracking-[-0.04em]">0 MAD</p>
          <ul className="mt-6 grid gap-2.5 text-[15px] text-cv-text-75">
            {free.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-cv-text-50" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <a href="/practice/" className="pill pill-secondary w-full">
              Start practising
            </a>
          </div>
        </section>

        <section className="card flex flex-col p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl tracking-[-0.02em]">Premium</h2>
            <span className="pill pill-small border border-cv-line text-cv-text-75">
              For exam season
            </span>
          </div>
          <p className="mt-1 text-sm text-cv-text-50">The full bank, no gaps.</p>
          <p className="mt-6 text-4xl tracking-[-0.04em]">
            39 MAD <span className="text-base text-cv-text-50">/ month</span>
          </p>
          <ul className="mt-6 grid gap-2.5 text-[15px] text-cv-text-75">
            {premium.map((f) => (
              <li key={f} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-cv-text-50" />
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <PremiumActions />
          </div>
        </section>
      </div>

      <p className="mt-8 max-w-2xl text-sm text-cv-text-50">
        Prices are in Moroccan dirham. If you are a student who cannot afford Premium, use
        the free tier — it covers the core questions. No account is required to practise.
      </p>
    </div>
  );
}

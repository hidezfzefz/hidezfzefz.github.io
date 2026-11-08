import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thanks for your order",
  description: "Your BAC STE pack is on its way. What to do next.",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <div className="container-page max-w-2xl py-10 sm:py-16">
      <h1 className="text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.04em]">
        Thanks. Your pack is on its way.
      </h1>
      <p className="mt-3 text-[17px] leading-relaxed text-cv-text-75">
        Check the email you entered at checkout. If nothing arrives in 10 minutes, email
        bilal6087xx@gmail.com with subject “Order help” and we will resend it.
      </p>

      <div className="card mt-8 p-6 sm:p-8">
        <h2 className="text-xl tracking-[-0.02em]">While you wait</h2>
        <ul className="mt-4 grid gap-3 text-[15px] text-cv-text-75">
          <li>· Start a free practice session so the pack has something to fix.</li>
          <li>· Run one timed exam (10 questions, 15 minutes) to spot weak topics.</li>
          <li>· Print the pack when it arrives and keep the answer key separate.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/practice/" className="pill pill-primary">
            Practise now
          </Link>
          <Link href="/exam/" className="pill pill-secondary">
            Run an exam
          </Link>
          <Link href="/pricing/" className="pill pill-secondary">
            See Premium
          </Link>
        </div>
      </div>

      <p className="mt-6 text-sm text-cv-text-50">
        If you bought Premium, keep your Stripe receipt email — it proves your subscription until
        the in-app unlock is connected.
      </p>
    </div>
  );
}

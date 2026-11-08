import type { Metadata } from "next";
import Link from "next/link";
import { PACKS, formatMad } from "@/lib/packs";
import { PackBuyButton } from "@/components/PackBuyButton";

export const metadata: Metadata = {
  title: "Shop — printable packs",
  description: "One-time BAC STE packs: Cram Pack PDF and printable worksheet bundle. Pay once, revise offline.",
  alternates: { canonical: "/shop/" },
};

export default function ShopPage() {
  return (
    <div className="container-page py-10 sm:py-16">
      <div className="max-w-2xl">
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.04em]">
          Pay once. Print and revise.
        </h1>
        <p className="mt-3 text-cv-text-75">
          The free site stays free. These one-time packs are the same questions and guides, as
          clean PDFs you can print. No account, no subscription.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {PACKS.map((p) => (
          <section key={p.id} className="card flex flex-col p-6 sm:p-8">
            <h2 className="text-xl tracking-[-0.02em]">{p.title}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-cv-text-75">{p.blurb}</p>
            <p className="mt-5 text-4xl tracking-[-0.04em]">{formatMad(p.priceMad)}</p>
            <ul className="mt-5 grid gap-2.5 text-[15px] text-cv-text-75">
              {p.includes.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-cv-text-50" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <PackBuyButton packId={p.id} title={p.title} priceMad={p.priceMad} env={p.env} />
              {p.pdf ? (
                <p className="mt-3 text-center text-sm text-cv-text-50">
                  Delivered by email after payment. Free sample:{" "}
                  <Link href="/guides/" className="underline hover:text-cv-text">
                    read a guide free
                  </Link>
                  .
                </p>
              ) : (
                <p className="mt-3 text-center text-sm text-cv-text-50">
                  Ordered by mail or PayPal. Delivered in 48 hours.
                </p>
              )}
            </div>
          </section>
        ))}
      </div>

      <div className="card mt-8 p-6 sm:p-8">
        <h2 className="text-xl tracking-[-0.02em]">Prefer a subscription?</h2>
        <p className="mt-2 max-w-2xl text-[15px] text-cv-text-75">
          Premium (39 MAD/month) keeps everything online with new questions added as topics are
          covered.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/pricing/" className="pill pill-secondary">
            Compare Premium
          </Link>
          <Link href="/practice/" className="pill pill-primary">
            Practise free first
          </Link>
        </div>
      </div>

      <p className="mt-8 max-w-2xl text-sm text-cv-text-50">
        Prices in Moroccan dirham. If you cannot pay, the free tier covers core questions.
        Questions and answers paid for are delivered to the email you enter at checkout.
      </p>
    </div>
  );
}

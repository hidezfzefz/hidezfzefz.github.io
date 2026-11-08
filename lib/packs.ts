export type Pack = {
  id: string;
  title: string;
  blurb: string;
  priceMad: number;
  kind: "one-time" | "subscription" | "service";
  includes: string[];
  env: string[];
  pdf?: string;
};

function linkFor(env: string[]): string | undefined {
  for (const key of env) {
    const v = process.env[key];
    if (v) return v;
  }
  return undefined;
}

// Fallback payment URLs (set at build time). No secrets here — NEXT_PUBLIC_* only.
export const KOFI_URL = process.env.NEXT_PUBLIC_KOFI_URL ?? "";
export const PAYPAL_ME = process.env.NEXT_PUBLIC_PAYPAL_ME ?? "";

export const PACKS: Pack[] = [
  {
    id: "cram-pack",
    title: "BAC Cram Pack (PDF)",
    blurb: "Every core question with answers and explanations, plus the 8 study guides. Print once, revise offline.",
    priceMad: 49,
    kind: "one-time",
    includes: ["62 questions + explanations", "8 study guides (maths + English)", "Exam strategy checklist"],
    env: ["NEXT_PUBLIC_STRIPE_PACK_CRAM", "NEXT_PUBLIC_KOFI_URL"],
    pdf: "/packs/bac-cram-pack.pdf",
  },
  {
    id: "worksheets-bundle",
    title: "Printable Worksheet Bundle (PDF)",
    blurb: "20 ready-to-print sheets by topic, with answer keys. For last-minute revision or for teachers to hand out.",
    priceMad: 29,
    kind: "one-time",
    includes: ["20 topic sheets (maths + English)", "Answer keys included", "French headers"],
    env: ["NEXT_PUBLIC_STRIPE_PACK_WORKSHEETS", "NEXT_PUBLIC_KOFI_URL"],
    pdf: "/packs/worksheet-bundle.pdf",
  },
  {
    id: "custom-topic-pack",
    title: "Custom topic pack for your class",
    blurb: "Tell us the topic. We prepare a printable pack with new exam-style questions and a clean answer key.",
    priceMad: 199,
    kind: "service",
    includes: ["1 topic pack (10–20 questions)", "Answer key + mark scheme", "Delivered by email in 48h"],
    env: ["NEXT_PUBLIC_STRIPE_PACK_CUSTOM", "NEXT_PUBLIC_PAYPAL_ME", "NEXT_PUBLIC_KOFI_URL"],
  },
];

export function packLink(pack: Pack): string | undefined {
  return linkFor(pack.env) ?? (KOFI_URL || undefined);
}

export function formatMad(n: number): string {
  return `${n} MAD`;
}

// Annual premium link (slot). Monthly uses stripe-best-practices Checkout Session.
export const PREMIUM_MONTHLY = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ?? "";
export const PREMIUM_ANNUAL = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_ANNUAL ?? "";

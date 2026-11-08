"use client";

import { useEffect, useState } from "react";

const STRIPE_CRAM = process.env.NEXT_PUBLIC_STRIPE_PACK_CRAM ?? "";
const STRIPE_WORKSHEETS = process.env.NEXT_PUBLIC_STRIPE_PACK_WORKSHEETS ?? "";
const STRIPE_CUSTOM = process.env.NEXT_PUBLIC_STRIPE_PACK_CUSTOM ?? "";
const KOFI = process.env.NEXT_PUBLIC_KOFI_URL ?? "";
const PAYPAL = process.env.NEXT_PUBLIC_PAYPAL_ME ?? "";

const MAP: Record<string, string> = {
  "cram-pack": STRIPE_CRAM || KOFI,
  "worksheets-bundle": STRIPE_WORKSHEETS || KOFI,
  "custom-topic-pack": STRIPE_CUSTOM || PAYPAL || KOFI,
};

export function PackBuyButton({
  packId,
  title,
  priceMad,
  env,
}: {
  packId: string;
  title: string;
  priceMad: number;
  env: string[];
}) {
  const [url, setUrl] = useState<string | undefined>(undefined);
  useEffect(() => {
    let resolved = MAP[packId];
    if (!resolved) {
      for (const k of env) {
        const v = process.env[k];
        if (v) {
          resolved = v;
          break;
        }
      }
    }
    setUrl(resolved || undefined);
  }, [packId, env]);

  if (url) {
    return (
      <a href={url} className="pill pill-primary w-full" rel="noreferrer">
        Buy {title} — {priceMad} MAD
      </a>
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <a
        href={`mailto:bilal6087xx@gmail.com?subject=${encodeURIComponent(`Order: ${title}`)}&body=${encodeURIComponent(`Hi, I want the ${title} (${priceMad} MAD). My email:`)}`}
        className="pill pill-primary w-full"
      >
        Order by email — {priceMad} MAD
      </a>
      <p className="text-center text-xs text-cv-text-50">
        No payment link yet. Send the email, we reply with a PayPal/Ko-fi link within a day.
      </p>
    </div>
  );
}

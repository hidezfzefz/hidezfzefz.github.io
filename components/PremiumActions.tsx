"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { isPremium, setPremium } from "@/lib/progress";

const PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ?? "";

export function PremiumActions() {
  const [premium, setPremiumState] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPremiumState(isPremium());
    setReady(true);
  }, []);

  if (!ready) return null;

  if (premium) {
    return (
      <div className="flex flex-col gap-3">
        <p className="pill pill-primary w-full">Premium is active on this device</p>
        <Link href="/practice/" className="pill pill-secondary w-full">
          Practise premium questions
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {PAYMENT_LINK ? (
        <a href={PAYMENT_LINK} className="pill pill-primary w-full" rel="noreferrer">
          Get Premium
        </a>
      ) : (
        <button
          type="button"
          className="pill pill-primary w-full"
          onClick={() => {
            setPremium(true);
            setPremiumState(true);
          }}
        >
          Preview Premium (demo)
        </button>
      )}
      <p className="text-center text-xs text-cv-text-50">
        {PAYMENT_LINK
          ? "Secure checkout. Cancel any time."
          : "Payments are not connected yet, so this unlocks a local demo of Premium."}
      </p>
    </div>
  );
}

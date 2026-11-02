import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thanks",
  description: "Your message was received.",
  robots: { index: false },
};

export default function ThanksPage() {
  return (
    <div className="container-page py-20">
      <h1 className="text-[clamp(2rem,4vw,2.75rem)] tracking-[-0.04em]">You are on the list.</h1>
      <p className="mt-3 max-w-lg text-cv-text-75">
        We will send one message when Premium opens. In the meantime, the free questions are
        all open.
      </p>
      <Link href="/practice/" className="pill pill-primary mt-6">
        Keep practising
      </Link>
    </div>
  );
}

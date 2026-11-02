import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What BAC STE Tutor stores and what it does not.",
};

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-3xl py-12 sm:py-16">
      <h1 className="text-[clamp(2rem,4vw,2.75rem)] tracking-[-0.04em]">Privacy</h1>
      <p className="mt-3 text-cv-text-75">Last updated 2 November 2026.</p>

      <div className="mt-8 grid gap-6 text-[15px] leading-relaxed text-cv-text-75">
        <section>
          <h2 className="text-lg tracking-[-0.02em] text-cv-text">What stays on your device</h2>
          <p className="mt-2">
            Practice attempts and the Premium preview flag are stored in your browser&apos;s
            local storage. They never leave your device. Clearing site data removes them.
          </p>
        </section>

        <section>
          <h2 className="text-lg tracking-[-0.02em] text-cv-text">What we receive</h2>
          <p className="mt-2">
            Nothing by default. There are no accounts, cookies, analytics or third-party
            scripts. If you choose to join the Premium waitlist, we receive the email address
            you type. It is used once, to tell you when Premium opens, and nothing else.
          </p>
        </section>

        <section>
          <h2 className="text-lg tracking-[-0.02em] text-cv-text">Children</h2>
          <p className="mt-2">
            The app is made for baccalaureate students. We do not ask for names, schools,
            birth dates or any other personal detail. The waitlist is optional and asks only
            for an email.
          </p>
        </section>

        <section>
          <h2 className="text-lg tracking-[-0.02em] text-cv-text">Deleting your data</h2>
          <p className="mt-2">
            Clear your browser storage to delete local progress. To remove a waitlist email,
            open an issue on the project&apos;s GitHub repository and ask for deletion.
          </p>
        </section>

        <section>
          <h2 className="text-lg tracking-[-0.02em] text-cv-text">Hosting</h2>
          <p className="mt-2">
            The site is served by Netlify, which processes standard request logs such as IP
            address and user agent to deliver the pages and protect the service.
          </p>
        </section>
      </div>
    </div>
  );
}

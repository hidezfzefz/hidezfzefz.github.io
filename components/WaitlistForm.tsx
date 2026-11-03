const EMAIL = "bilal6087xx@gmail.com";
const SUBJECT = "Premium waitlist — BAC STE Tutor";
const BODY = "Hi, please tell me when paid Premium opens for BAC STE Tutor.";

export function WaitlistForm() {
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}&body=${encodeURIComponent(BODY)}`;

  return (
    <section className="mt-10 grid gap-3 rounded-[24px] border border-cv-line bg-cv-card p-6 sm:p-8">
      <h2 className="text-xl tracking-[-0.02em]">Get told when Premium opens</h2>
      <p className="max-w-lg text-[15px] text-cv-text-75">
        Paid Premium is not connected yet. Send one email and we will reply once when it is
        live. No account, no newsletter, no spam.
      </p>
      <div className="mt-1 flex flex-wrap items-center gap-3">
        <a href={href} className="pill pill-primary">
          Email to join
        </a>
        <a href={`mailto:${EMAIL}`} className="text-sm text-cv-text-50 hover:text-cv-text">
          {EMAIL}
        </a>
      </div>
    </section>
  );
}

export function WaitlistForm() {
  return (
    <form
      name="premium-waitlist"
      method="POST"
      data-netlify="true"
      action="/thanks/"
      className="mt-10 grid gap-3 rounded-[24px] border border-cv-line bg-cv-card p-6 sm:p-8"
    >
      <input type="hidden" name="form-name" value="premium-waitlist" />
      <p className="hidden">
        <label>
          Do not fill this out: <input name="bot-field" />
        </label>
      </p>
      <h2 className="text-xl tracking-[-0.02em]">Get told when Premium opens</h2>
      <p className="max-w-lg text-[15px] text-cv-text-75">
        Leave an email and we will send one message when paid Premium is live. No spam and
        no account needed.
      </p>
      <div className="mt-1 flex flex-col gap-2 sm:flex-row">
        <label htmlFor="waitlist-email" className="sr-only">
          Email
        </label>
        <input
          id="waitlist-email"
          className="input sm:max-w-sm"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
        />
        <button type="submit" className="pill pill-primary">
          Notify me
        </button>
      </div>
    </form>
  );
}

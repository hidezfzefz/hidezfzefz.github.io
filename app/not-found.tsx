import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page py-20 sm:py-28">
      <p className="text-sm text-cv-text-50">404</p>
      <h1 className="mt-3 text-[clamp(2rem,4vw,2.75rem)] tracking-[-0.04em]">
        That page is not here.
      </h1>
      <p className="mt-3 max-w-lg text-cv-text-75">
        The link may be old, or the page never existed. The practice questions and the tutor
        are one tap away.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/practice/" className="pill pill-primary">
          Practise
        </Link>
        <Link href="/" className="pill pill-secondary">
          Home
        </Link>
      </div>
    </div>
  );
}

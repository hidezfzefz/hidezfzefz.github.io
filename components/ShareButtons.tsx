"use client";

import { useState } from "react";

export function ShareButtons({
  path,
  message,
}: {
  path: string;
  message: string;
}) {
  const [copied, setCopied] = useState(false);
  const url = `https://hidezfzefz.github.io${path}`;
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(`${message} ${url}`)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be blocked; the link is still visible in the address bar.
    }
  }

  return (
    <div className="no-print flex flex-wrap items-center gap-2">
      <a
        href={whatsapp}
        target="_blank"
        rel="noreferrer"
        className="pill pill-secondary pill-small"
      >
        Share on WhatsApp
      </a>
      <button type="button" onClick={copy} className="pill pill-secondary pill-small">
        {copied ? "Link copied" : "Copy link"}
      </button>
    </div>
  );
}

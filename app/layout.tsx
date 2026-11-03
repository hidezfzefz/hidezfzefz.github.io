import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteNav } from "@/components/SiteNav";
import { ServiceWorkerRegistrar } from "@/components/ServiceWorkerRegistrar";

export const metadata: Metadata = {
  title: {
    default: "BAC STE Tutor — revise maths and English for the 2BAC STE exam",
    template: "%s — BAC STE Tutor",
  },
  description:
    "Practice maths and English for the Moroccan 2BAC STE baccalaureate with instant feedback, clear explanations and progress tracking.",
  metadataBase: new URL("https://hidezfzefz.github.io"),
  referrer: "strict-origin-when-cross-origin",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_MA",
    url: "/",
    siteName: "BAC STE Tutor",
    title: "BAC STE Tutor — revise maths and English for the 2BAC STE exam",
    description:
      "Short maths and English questions with instant feedback and a written explanation for every answer.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "BAC STE Tutor — pass the exam with practice that explains",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BAC STE Tutor",
    description: "Revise maths and English for the 2BAC STE exam with practice that explains.",
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/icon-192.png",
  },
  appleWebApp: {
    capable: true,
    title: "BAC STE",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-cv-primary focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>
        <SiteNav />
        <ServiceWorkerRegistrar />
        <main id="main">{children}</main>
        <footer className="mt-24 border-t border-cv-line">
          <div className="container-page flex flex-col gap-3 py-10 text-sm text-cv-text-50 sm:flex-row sm:items-center sm:justify-between">
            <p>BAC STE Tutor — independent revision tool for 2BAC STE students.</p>
            <p className="flex gap-4">
              <a href="/guides/" className="hover:text-cv-text">
                Guides
              </a>
              <a href="/worksheets/" className="hover:text-cv-text">
                Worksheets
              </a>
              <a href="/schools/" className="hover:text-cv-text">
                For teachers
              </a>
              <a href="/privacy/" className="hover:text-cv-text">
                Privacy
              </a>
              <span className="hidden sm:inline">
                Built to be useful, not to replace your teacher.
              </span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

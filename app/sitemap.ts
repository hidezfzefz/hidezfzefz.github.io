import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hidezfzefz.github.io";
  const routes = [
    "",
    "/practice/",
    "/exam/",
    "/tutor/",
    "/progress/",
    "/guides/",
    "/worksheets/",
    "/schools/",
    "/pricing/",
    "/privacy/",
  ];

  const pages: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/guides/" ? 0.8 : 0.7,
  }));

  const guides: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${base}/guides/${g.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...pages, ...guides];
}

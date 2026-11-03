import type { MetadataRoute } from "next";
import { GUIDES } from "@/lib/guides";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hidezfzefz.github.io";
  const routes = [
    "",
    "/fr/",
    "/ar/",
    "/practice/",
    "/exam/",
    "/tutor/",
    "/progress/",
    "/guides/",
    "/worksheets/",
    "/pricing/",
    "/privacy/",
  ];

  const languages = {
    en: `${base}/`,
    fr: `${base}/fr/`,
    ar: `${base}/ar/`,
  };

  const pages: MetadataRoute.Sitemap = routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : ["/fr/", "/ar/", "/guides/"].includes(path) ? 0.8 : 0.7,
    ...(["", "/fr/", "/ar/"].includes(path) ? { alternates: { languages } } : {}),
  }));

  const guides: MetadataRoute.Sitemap = GUIDES.map((g) => ({
    url: `${base}/guides/${g.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const schoolsLanguages = {
    en: `${base}/schools/`,
    fr: `${base}/fr/ecoles/`,
    "x-default": `${base}/schools/`,
  };

  const schools: MetadataRoute.Sitemap = ["/schools/", "/fr/ecoles/"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
    alternates: { languages: schoolsLanguages },
  }));

  return [...pages, ...guides, ...schools];
}

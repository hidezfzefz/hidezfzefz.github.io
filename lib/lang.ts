import { MATHS_FR, TOPIC_FR } from "./questions-fr";
import type { Question } from "./questions";

export type Lang = "en" | "fr";

const LANG_KEY = "bacste.lang.v1";

/** ?lang= from a language-specific link, then the stored preference, then English. */
export function loadLang(): Lang {
  if (typeof window === "undefined") return "en";
  const fromUrl = langFromSearch(window.location.search);
  if (fromUrl) return fromUrl;
  try {
    const stored = window.localStorage.getItem(LANG_KEY);
    if (stored === "fr" || stored === "en") return stored;
  } catch {
    // storage can be blocked; English is still a fine fallback
  }
  return "en";
}

export function saveLang(lang: Lang): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LANG_KEY, lang);
  } catch {
    // not fatal: the page still switches for this session
  }
  const url = new URL(window.location.href);
  if (lang === "fr") url.searchParams.set("lang", "fr");
  else url.searchParams.delete("lang");
  window.history.replaceState(null, "", url.toString());
}

export function langFromSearch(search: string): Lang | null {
  const value = new URLSearchParams(search).get("lang");
  return value === "fr" || value === "en" ? value : null;
}

export function tr(lang: Lang, en: string, fr: string): string {
  return lang === "fr" ? fr : en;
}

export function topicLabel(topic: string, lang: Lang): string {
  return lang === "fr" ? (TOPIC_FR[topic] ?? topic) : topic;
}

/** Maths questions have a French version; English exercises stay in English. */
export function localizeQuestion(question: Question, lang: Lang): Question {
  if (lang !== "fr" || question.subject !== "maths") return question;
  const translated = MATHS_FR[question.id];
  if (!translated) return question;
  return {
    ...question,
    prompt: translated.prompt,
    options: translated.options ?? question.options,
    explanation: translated.explanation,
  };
}

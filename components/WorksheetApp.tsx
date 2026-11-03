"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { QUESTIONS, SUBJECTS, type Question, type Subject } from "@/lib/questions";
import { loadLang, localizeQuestion, saveLang, topicLabel, tr, type Lang } from "@/lib/lang";
import { LangToggle } from "@/components/LangToggle";
import { pickQuestions, type WorksheetMix } from "@/lib/worksheet";

export function WorksheetApp() {
  const [subject, setSubject] = useState<Subject>("maths");
  const [topic, setTopic] = useState("all");
  const [count, setCount] = useState(12);
  const [mix, setMix] = useState<WorksheetMix>("random");
  const [title, setTitle] = useState("");
  const [includeKey, setIncludeKey] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [ready, setReady] = useState(false);
  const [version, setVersion] = useState(0);
  const [lang, setLang] = useState<Lang>("en");

  const topics = Array.from(
    new Set(QUESTIONS.filter((q) => q.subject === subject).map((q) => q.topic)),
  );

  useEffect(() => {
    setLang(loadLang());

    // A teacher can share a configured sheet: /worksheets/?mix=balanced&count=20&title=…
    const params = new URLSearchParams(window.location.search);
    const nextCount = Number(params.get("count"));
    if ([8, 12, 16, 20].includes(nextCount)) setCount(nextCount);
    const nextMix = params.get("mix");
    if (nextMix === "balanced" || nextMix === "random") setMix(nextMix);
    const nextTitle = params.get("title");
    if (nextTitle) setTitle(nextTitle.slice(0, 60));
    const nextSubject = params.get("subject");
    if (nextSubject === "maths" || nextSubject === "english") {
      setSubject(nextSubject);
      const nextTopic = params.get("topic");
      if (nextTopic && QUESTIONS.some((q) => q.subject === nextSubject && q.topic === nextTopic)) {
        setTopic(nextTopic);
      }
    }
  }, []);

  function changeLang(next: Lang) {
    setLang(next);
    saveLang(next);
  }

  useEffect(() => {
    const pool = QUESTIONS.filter(
      (q) => q.subject === subject && (topic === "all" || q.topic === topic),
    );
    setQuestions(pickQuestions(pool, count, mix));
    setReady(true);
  }, [subject, topic, count, mix, version]);

  function changeSubject(next: Subject) {
    setSubject(next);
    setTopic("all");
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="no-print">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.04em]">
            {tr(lang, "Printable worksheets.", "Fiches imprimables.")}
          </h1>
          <LangToggle lang={lang} onChange={changeLang} label={tr(lang, "Language", "Langue")} />
        </div>
        <p className="mt-2 max-w-2xl text-cv-text-75">
          {tr(
            lang,
            "Build a clean practice sheet in seconds, with or without the answer key. Print it for a class, a study group, or a phone-free revision session. Free to use.",
            "Créez une fiche d’exercices propre en quelques secondes, avec ou sans le corrigé. Imprimez-la pour une classe, un groupe de révision ou une séance sans téléphone. Gratuit.",
          )}
        </p>

        <div className="card mt-7 p-5 sm:p-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <label className="grid gap-1.5 text-sm text-cv-text-50">
              {tr(lang, "Subject", "Matière")}
              <select
                className="input"
                value={subject}
                onChange={(e) => changeSubject(e.target.value as Subject)}
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {lang === "fr" && s.id === "english" ? "Anglais" : s.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1.5 text-sm text-cv-text-50">
              {tr(lang, "Topic", "Chapitre")}
              <select
                className="input"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              >
                <option value="all">{tr(lang, "All topics", "Tous les chapitres")}</option>
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {topicLabel(t, lang)}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1.5 text-sm text-cv-text-50">
              {tr(lang, "Questions", "Questions")}
              <select
                className="input"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
              >
                {[8, 12, 16, 20].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-1.5 text-sm text-cv-text-50">
              {tr(lang, "Question mix", "Mélange")}
              <select
                className="input"
                value={mix}
                onChange={(e) => setMix(e.target.value as WorksheetMix)}
              >
                <option value="random">{tr(lang, "Random", "Aléatoire")}</option>
                <option value="balanced">
                  {tr(lang, "Balanced across topics", "Équilibré (tous les chapitres)")}
                </option>
              </select>
            </label>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm text-cv-text-50">
              {tr(lang, "Sheet title (optional)", "Titre de la fiche (facultatif)")}
              <input
                className="input"
                value={title}
                maxLength={60}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={tr(lang, "Maths practice", "Exercices de maths")}
              />
            </label>
            <label className="flex items-center gap-2.5 self-end pb-3 text-sm text-cv-text-75">
              <input
                type="checkbox"
                checked={includeKey}
                onChange={(e) => setIncludeKey(e.target.checked)}
                className="size-4 accent-[#f4f4f5]"
              />
              {tr(lang, "Include answer key", "Inclure le corrigé")}
            </label>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button onClick={() => setVersion((v) => v + 1)} className="pill pill-secondary">
              {tr(lang, "Shuffle again", "Mélanger à nouveau")}
            </button>
            <button onClick={() => window.print()} className="pill pill-primary">
              {tr(lang, "Print worksheet", "Imprimer la fiche")}
            </button>
            <Link
              href={lang === "fr" ? "/fr/ecoles/" : "/schools/"}
              className="pill pill-secondary"
            >
              {tr(lang, "Using this with a class?", "Vous l’utilisez en classe ?")}
            </Link>
            <span className="self-center text-xs text-cv-text-50">
              {tr(
                lang,
                `${questions.length} question${questions.length === 1 ? "" : "s"} on this sheet`,
                `${questions.length} question${questions.length === 1 ? "" : "s"} sur cette fiche`,
              )}
            </span>
          </div>
        </div>
      </div>

      <section className="print-sheet card mt-8 p-6 sm:p-10" aria-live="polite">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-cv-line pb-4">
          <div>
            <p className="text-sm text-cv-text-50">BAC STE Tutor · 2BAC STE</p>
            <h2 className="mt-1 text-2xl tracking-[-0.02em]">
              {title.trim()
                ? title.trim()
                : subject === "maths"
                  ? tr(lang, "Maths practice", "Exercices de maths")
                  : tr(lang, "English practice", "Exercices d’anglais")}
            </h2>
            <p className="mt-1 text-sm text-cv-text-50">
              {topic === "all"
                ? tr(lang, "Mixed topics", "Chapitres mélangés")
                : topicLabel(topic, lang)}
            </p>
          </div>
          <div className="text-sm text-cv-text-50">
            <p>{tr(lang, "Name:", "Nom :")} ______________________</p>
            <p className="mt-2">{tr(lang, "Class:", "Classe :")} _____________________</p>
            <p className="mt-2">{tr(lang, "Date:", "Date :")} _______________________</p>
          </div>
        </div>

        {!ready ? (
          <p className="mt-6 text-sm text-cv-text-50">
            {tr(lang, "Building the sheet…", "Création de la fiche…")}
          </p>
        ) : questions.length === 0 ? (
          <p className="mt-6 text-sm text-cv-text-50">
            {tr(
              lang,
              "No questions in this topic yet. Choose another topic.",
              "Aucune question dans ce chapitre. Choisissez-en un autre.",
            )}
          </p>
        ) : (
          <>
            <p className="mt-4 text-sm text-cv-text-50">
              {tr(
                lang,
                "Circle one answer for each question. Take your time; the explanations are on the practice page.",
                "Entourez une seule réponse par question. Prenez votre temps ; les explications sont sur la page d’entraînement.",
              )}
            </p>

            <ol className="mt-6 grid gap-6">
              {questions.map((q, i) => {
                const shown = localizeQuestion(q, lang);
                return (
                <li key={q.id} className="print-question">
                  <p className="text-[15px] leading-snug">
                    <span className="mr-2 text-cv-text-50">{i + 1}.</span>
                    {shown.prompt}
                  </p>
                  <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                    {shown.options.map((opt, j) => (
                      <p key={j} className="text-[15px] text-cv-text-75">
                        <span className="mr-2 font-mono text-cv-text-50">
                          {String.fromCharCode(65 + j)}
                        </span>
                        {opt}
                      </p>
                    ))}
                  </div>
                </li>
                );
              })}
            </ol>

            {includeKey && (
              <div className="mt-10 border-t border-cv-line pt-5">
                <h3 className="text-lg tracking-[-0.02em]">{tr(lang, "Answer key", "Corrigé")}</h3>
                <div className="mt-3 grid grid-cols-4 gap-x-4 gap-y-2 text-sm text-cv-text-75 sm:grid-cols-6">
                  {questions.map((q, i) => (
                    <p key={q.id}>
                      <span className="text-cv-text-50">{i + 1}.</span>{" "}
                      {String.fromCharCode(65 + q.answer)}
                    </p>
                  ))}
                </div>
                <p className="mt-4 text-xs text-cv-text-50">
                  {tr(lang, "Worked explanations:", "Explications détaillées :")}{" "}
                  https://hidezfzefz.github.io/guides · {tr(lang, "Practice:", "Entraînement :")}{" "}
                  https://hidezfzefz.github.io/practice
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { QUESTIONS, SUBJECTS, type Question, type Subject } from "@/lib/questions";
import { isPremium, recordAttempt } from "@/lib/progress";

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function PracticeApp() {
  const [subject, setSubject] = useState<Subject>("maths");
  const [topic, setTopic] = useState<string>("all");
  const [premium, setPremiumState] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(0);
  const [correct, setCorrect] = useState(0);

  useEffect(() => {
    setPremiumState(isPremium());
  }, []);

  const topics = useMemo(
    () => Array.from(new Set(QUESTIONS.filter((q) => q.subject === subject).map((q) => q.topic))),
    [subject],
  );

  const basePool = useMemo(() => {
    return QUESTIONS.filter(
      (q) => q.subject === subject && (topic === "all" || q.topic === topic),
    );
  }, [subject, topic]);

  const [order, setOrder] = useState<string[] | null>(null);

  // Shuffle after mount so the server-rendered order and the first client render
  // match; otherwise React throws a hydration error.
  useEffect(() => {
    setOrder(shuffle(basePool).map((q) => q.id));
    setIndex(0);
    setSelected(null);
  }, [basePool]);

  const pool = useMemo(() => {
    if (!order) return basePool;
    const byId = new Map(basePool.map((q) => [q.id, q]));
    return order.map((id) => byId.get(id)).filter((q): q is Question => Boolean(q));
  }, [order, basePool]);

  const current: Question | undefined = pool[index];

  function changeSubject(next: Subject) {
    setSubject(next);
    setTopic("all");
    setIndex(0);
    setSelected(null);
    setOrder(null);
  }
  function changeTopic(next: string) {
    setTopic(next);
    setIndex(0);
    setSelected(null);
    setOrder(null);
  }
  function choose(option: number) {
    if (selected !== null || !current) return;
    setSelected(option);
    const ok = option === current.answer;
    setAnswered((n) => n + 1);
    if (ok) setCorrect((n) => n + 1);
    recordAttempt(current.id, ok);
  }
  function next() {
    setSelected(null);
    setIndex((i) => (i + 1 >= pool.length ? 0 : i + 1));
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="flex flex-col gap-2">
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.04em]">
          Practice, one question at a time.
        </h1>
        <p className="max-w-xl text-cv-text-75">
          Pick a subject and a topic. Every answer comes with a short explanation, so a
          mistake becomes a note you remember.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2" role="tablist" aria-label="Subject">
        {SUBJECTS.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={subject === s.id}
            onClick={() => changeSubject(s.id)}
            className={`pill pill-small ${subject === s.id ? "pill-primary" : "pill-secondary"}`}
          >
            {s.label}
          </button>
        ))}
        {premium ? (
          <span className="pill pill-small border border-cv-ok/40 text-cv-ok">Premium active</span>
        ) : (
          <Link href="/pricing/" className="pill pill-small pill-secondary">
            Go premium
          </Link>
        )}
      </div>

      <div className="mt-6">
        <p className="text-sm text-cv-text-50">Topic</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            onClick={() => changeTopic("all")}
            className={`pill pill-small ${topic === "all" ? "pill-primary" : "pill-secondary"}`}
          >
            All
          </button>
          {topics.map((t) => (
            <button
              key={t}
              onClick={() => changeTopic(t)}
              className={`pill pill-small ${topic === t ? "pill-primary" : "pill-secondary"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
        <section className="card p-5 sm:p-8" aria-live="polite">
          {!current ? (
            <p className="text-cv-text-75">No questions in this topic yet.</p>
          ) : current.premium && !premium ? (
            <div className="flex flex-col items-start gap-4">
              <p className="text-sm text-cv-warn">Premium question</p>
              <h2 className="text-2xl tracking-[-0.02em]">
                This topic is part of Premium.
              </h2>
              <p className="max-w-md text-cv-text-75">
                Free covers the core questions. Premium opens the full bank, exam-style
                questions and the tutor&apos;s step-by-step notes.
              </p>
              <Link href="/pricing/" className="pill pill-primary">
                See Premium
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3 text-sm text-cv-text-50">
                <span>{current.topic}</span>
                <span>
                  {index + 1} / {pool.length}
                </span>
              </div>
              <h2 className="mt-4 text-xl leading-snug tracking-[-0.02em] sm:text-2xl">
                {current.prompt}
              </h2>
              <div className="mt-6 grid gap-3">
                {current.options.map((opt, i) => {
                  const isChosen = selected === i;
                  const isAnswer = current.answer === i;
                  let cls = "row flex min-h-12 w-full items-center gap-3 px-4 py-3 text-left text-[15px] transition-colors";
                  if (selected === null) cls += " hover:bg-cv-raised";
                  else if (isAnswer) cls += " border-cv-ok/60 text-cv-text";
                  else if (isChosen) cls += " border-cv-bad/60 text-cv-text";
                  else cls += " opacity-60";
                  return (
                    <button
                      key={i}
                      onClick={() => choose(i)}
                      disabled={selected !== null}
                      className={cls}
                      aria-pressed={isChosen}
                    >
                      <span className="grid size-6 shrink-0 place-items-center rounded-full border border-cv-line text-xs text-cv-text-50">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <div className="reveal mt-6 rounded-[12px] border border-cv-line bg-cv-raised p-4">
                  <p
                    className={`text-sm font-medium ${
                      selected === current.answer ? "text-cv-ok" : "text-cv-bad"
                    }`}
                  >
                    {selected === current.answer ? "Correct" : "Not quite"}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-cv-text-75">
                    {current.explanation}
                  </p>
                  <button onClick={next} className="pill pill-primary mt-4">
                    Next question
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <aside className="flex flex-col gap-4">
          <div className="card p-5">
            <p className="text-sm text-cv-text-50">This session</p>
            <div className="mt-3 flex items-end gap-6">
              <div>
                <p className="text-3xl tracking-[-0.03em]">{answered}</p>
                <p className="text-xs text-cv-text-50">answered</p>
              </div>
              <div>
                <p className="text-3xl tracking-[-0.03em]">
                  {answered ? Math.round((correct / answered) * 100) : 0}%
                </p>
                <p className="text-xs text-cv-text-50">accuracy</p>
              </div>
            </div>
          </div>
          <div className="card p-5">
            <p className="text-sm text-cv-text-50">Study habit</p>
            <p className="mt-2 text-[15px] leading-relaxed text-cv-text-75">
              Ten questions a day beats a four-hour session the night before. Progress is
              saved on this device.
            </p>
            <Link href="/progress/" className="pill pill-secondary pill-small mt-4">
              View progress
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

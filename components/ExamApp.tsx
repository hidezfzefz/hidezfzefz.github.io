"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { QUESTIONS, type Question } from "@/lib/questions";
import { bestExam, loadExams, recordExam, type ExamResult } from "@/lib/exam";

const EXAM_SIZE = 10;
const EXAM_SECONDS = 15 * 60;

type Phase = "idle" | "running" | "done";

function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function clock(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function ExamApp() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [ids, setIds] = useState<string[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(EXAM_SECONDS);
  const [history, setHistory] = useState<ExamResult[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setHistory(loadExams());
    setMounted(true);
  }, []);

  const questions = useMemo(
    () =>
      ids
        .map((id) => QUESTIONS.find((q) => q.id === id))
        .filter((q): q is Question => Boolean(q)),
    [ids],
  );

  const current = questions[index];
  const correctCount = useMemo(
    () =>
      questions.reduce(
        (n, q, i) => n + (answers[i] === q.answer ? 1 : 0),
        0,
      ),
    [questions, answers],
  );

  useEffect(() => {
    if (phase !== "running") return;
    if (secondsLeft <= 0) {
      finish();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, secondsLeft]);

  function start() {
    const picked = shuffle(QUESTIONS).slice(0, EXAM_SIZE);
    setIds(picked.map((q) => q.id));
    setAnswers(Array(picked.length).fill(null));
    setIndex(0);
    setSecondsLeft(EXAM_SECONDS);
    setPhase("running");
  }

  function finish() {
    const total = ids.length;
    const correct = ids.reduce((n, id, i) => {
      const q = QUESTIONS.find((x) => x.id === id);
      return n + (q && answers[i] === q.answer ? 1 : 0);
    }, 0);
    const result: ExamResult = {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : String(Date.now()),
      at: Date.now(),
      total,
      correct,
      secondsUsed: EXAM_SECONDS - secondsLeft,
    };
    setHistory(recordExam(result));
    setPhase("done");
  }

  function choose(option: number) {
    setAnswers((prev) => prev.map((a, i) => (i === index ? option : a)));
  }

  function next() {
    if (index + 1 >= questions.length) finish();
    else setIndex((i) => i + 1);
  }

  const best = mounted ? bestExam(history) : null;

  if (phase === "idle") {
    return (
      <div className="container-page py-10 sm:py-14">
        <h1 className="text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.04em]">
          Exam simulation.
        </h1>
        <p className="mt-2 max-w-xl text-cv-text-75">
          Ten mixed maths and English questions, fifteen minutes, no feedback until the end.
          Closer to the real thing than endless untimed practice.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_300px]">
          <section className="card p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-3">
              <Stat label="Questions" value={String(EXAM_SIZE)} />
              <Stat label="Time" value="15 min" />
              <Stat label="Subjects" value="Maths + English" />
            </div>
            <ul className="mt-6 grid gap-2 text-[15px] text-cv-text-75">
              <li>Answers can be changed until you move on.</li>
              <li>You can finish early; unanswered questions count as wrong.</li>
              <li>The review at the end shows the method for every question.</li>
            </ul>
            <button onClick={start} className="pill pill-primary mt-7">
              Start exam
            </button>
          </section>

          <aside className="card p-6">
            <p className="text-sm text-cv-text-50">Your best result</p>
            {!mounted ? (
              <div className="mt-3 h-12 animate-pulse rounded-[12px] bg-cv-raised" />
            ) : best ? (
              <>
                <p className="mt-2 text-3xl tracking-[-0.03em]">
                  {best.correct}/{best.total}
                </p>
                <p className="text-xs text-cv-text-50">
                  {new Date(best.at).toLocaleDateString()} · {clock(best.secondsUsed)} used
                </p>
              </>
            ) : (
              <p className="mt-2 text-[15px] text-cv-text-75">
                No exam yet. The first one sets the bar.
              </p>
            )}
            {mounted && history.length > 0 && (
              <p className="mt-4 text-sm text-cv-text-50">
                {history.length} attempt{history.length === 1 ? "" : "s"} saved on this device.
              </p>
            )}
          </aside>
        </div>
      </div>
    );
  }

  if (phase === "running" && current) {
    const answered = answers[index] !== null;
    return (
      <div className="container-page py-8 sm:py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-cv-text-50">Exam simulation</p>
            <p className="mt-0.5 text-lg tracking-[-0.02em]">
              Question {index + 1} of {questions.length}
            </p>
          </div>
          <div
            className={`pill pill-small border ${
              secondsLeft <= 60 ? "border-cv-bad/60 text-cv-bad" : "border-cv-line text-cv-text-75"
            }`}
            aria-live="polite"
          >
            {clock(secondsLeft)} left
          </div>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-cv-raised" aria-hidden="true">
          <div
            className="h-full rounded-full bg-cv-text-75 transition-[width] duration-300"
            style={{ width: `${((index + 1) / questions.length) * 100}%` }}
          />
        </div>

        <section className="card mt-6 p-5 sm:p-8" aria-live="polite">
          <p className="text-sm text-cv-text-50">{current.topic}</p>
          <h2 className="mt-2 text-xl leading-snug tracking-[-0.02em] sm:text-2xl">
            {current.prompt}
          </h2>
          <div className="mt-6 grid gap-3">
            {current.options.map((opt, i) => {
              const chosen = answers[index] === i;
              return (
                <button
                  key={i}
                  onClick={() => choose(i)}
                  aria-pressed={chosen}
                  className={`row flex min-h-12 w-full items-center gap-3 px-4 py-3 text-left text-[15px] transition-colors ${
                    chosen ? "border-cv-text-75/60 bg-cv-raised" : "hover:bg-cv-raised"
                  }`}
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full border border-cv-line text-xs text-cv-text-50">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button onClick={next} disabled={!answered} className="pill pill-primary">
              {index + 1 >= questions.length ? "Finish exam" : "Next question"}
            </button>
            <button onClick={finish} className="pill pill-secondary">
              Finish early
            </button>
          </div>
        </section>
      </div>
    );
  }

  // done
  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.04em]">
        Exam finished.
      </h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
        <div>
          <section className="card p-6 sm:p-8">
            <p className="text-sm text-cv-text-50">Score</p>
            <p className="mt-1 text-5xl tracking-[-0.04em]">
              {correctCount}
              <span className="text-2xl text-cv-text-50">/{questions.length}</span>
            </p>
            <p className="mt-2 text-[15px] text-cv-text-75">
              {correctCount === questions.length
                ? "Clean sheet. Try a faster run or a harder topic next."
                : "Read the review below, then retake it in a couple of days."}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button onClick={start} className="pill pill-primary">
                Retake
              </button>
              <Link href="/progress/" className="pill pill-secondary">
                View progress
              </Link>
            </div>
          </section>

          <h2 className="mt-8 text-xl tracking-[-0.02em]">Review</h2>
          <div className="mt-3 grid gap-3">
            {questions.map((q, i) => {
              const picked = answers[i];
              const ok = picked === q.answer;
              return (
                <article key={q.id} className="card p-5">
                  <div className="flex items-center justify-between gap-3 text-xs text-cv-text-50">
                    <span>{q.topic}</span>
                    <span className={ok ? "text-cv-ok" : "text-cv-bad"}>
                      {ok ? "Correct" : picked === null ? "Unanswered" : "Wrong"}
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] leading-snug">{q.prompt}</p>
                  <p className="mt-2 text-sm text-cv-text-50">
                    Answer: {q.options[q.answer]}
                  </p>
                  <p className="mt-2 text-[15px] leading-relaxed text-cv-text-75">
                    {q.explanation}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="card h-fit p-6">
          <p className="text-sm text-cv-text-50">This attempt</p>
          <p className="mt-2 text-3xl tracking-[-0.03em]">
            {Math.round((correctCount / Math.max(questions.length, 1)) * 100)}%
          </p>
          <p className="text-xs text-cv-text-50">
            {clock(EXAM_SECONDS - secondsLeft)} used
          </p>
          <Link href="/practice/" className="pill pill-secondary pill-small mt-5">
            Practise weak topics
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-cv-text-50">{label}</p>
      <p className="mt-1 text-lg tracking-[-0.02em]">{value}</p>
    </div>
  );
}

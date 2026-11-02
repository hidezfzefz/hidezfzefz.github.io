"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SUBJECTS, type Subject } from "@/lib/questions";
import { loadAttempts, resetAttempts, statsFor, type Attempt, type SubjectStats } from "@/lib/progress";
import { bestExam, loadExams, type ExamResult } from "@/lib/exam";

export function ProgressApp() {
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [exams, setExams] = useState<ExamResult[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAttempts(loadAttempts());
    setExams(loadExams());
    setReady(true);
  }, []);

  function reset() {
    resetAttempts();
    setAttempts([]);
  }

  return (
    <div className="container-page py-10 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[clamp(2rem,4vw,2.75rem)] leading-[1.1] tracking-[-0.04em]">
            Your progress.
          </h1>
          <p className="mt-2 max-w-xl text-cv-text-75">
            Saved on this device. Topics are ordered weakest first, so the next session
            starts where it helps most.
          </p>
        </div>
        {attempts.length > 0 && (
          <button onClick={reset} className="pill pill-secondary pill-small">
            Reset progress
          </button>
        )}
      </div>

      {ready && exams.length > 0 && (
        <div className="card mt-8 flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
          <div>
            <p className="text-sm text-cv-text-50">Best exam result</p>
            <p className="mt-1 text-2xl tracking-[-0.03em]">
              {bestExam(exams)?.correct}/{bestExam(exams)?.total}
            </p>
          </div>
          <Link href="/exam/" className="pill pill-secondary pill-small">
            Retake the exam
          </Link>
        </div>
      )}

      {!ready ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2" aria-hidden="true">
          {[0, 1].map((i) => (
            <div key={i} className="card h-56 animate-pulse p-5 sm:p-6" />
          ))}
        </div>
      ) : attempts.length === 0 ? (
        <div className="card mt-8 p-6 sm:p-8">
          <p className="text-cv-text-75">
            No answers yet. Do a few questions and this page fills in as you go.
          </p>
          <Link href="/practice/" className="pill pill-primary mt-4">
            Start practising
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {SUBJECTS.map((s) => (
            <SubjectCard key={s.id} subject={s.id} label={s.label} attempts={attempts} />
          ))}
        </div>
      )}
    </div>
  );
}

function SubjectCard({
  subject,
  label,
  attempts,
}: {
  subject: Subject;
  label: string;
  attempts: Attempt[];
}) {
  const stats: SubjectStats = statsFor(subject, attempts);
  return (
    <section className="card p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl tracking-[-0.02em]">{label}</h2>
        <span className="text-sm text-cv-text-50">
          {stats.answered} answered
        </span>
      </div>
      <div className="mt-4 flex items-end gap-6">
        <div>
          <p className="text-4xl tracking-[-0.04em]">{stats.accuracy}%</p>
          <p className="text-xs text-cv-text-50">accuracy</p>
        </div>
        <div>
          <p className="text-4xl tracking-[-0.04em]">{stats.correct}</p>
          <p className="text-xs text-cv-text-50">correct</p>
        </div>
      </div>

      {stats.byTopic.length > 0 ? (
        <ul className="mt-6 grid gap-3">
          {stats.byTopic.map((t) => {
            const pct = t.answered ? Math.round((t.correct / t.answered) * 100) : 0;
            return (
              <li key={t.topic}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-cv-text-75">{t.topic}</span>
                  <span className="text-cv-text-50">
                    {t.correct}/{t.answered}
                  </span>
                </div>
                <div
                  className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-cv-raised"
                  role="img"
                  aria-label={`${t.topic}: ${pct}% correct`}
                >
                  <div className="h-full rounded-full bg-cv-text-75" style={{ width: `${pct}%` }} />
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mt-6 text-sm text-cv-text-50">Nothing answered in {label} yet.</p>
      )}

      {stats.weakest && (
        <p className="mt-5 text-sm text-cv-text-50">
          Weakest so far: <span className="text-cv-text">{stats.weakest}</span>
        </p>
      )}
      <Link href="/practice/" className="pill pill-secondary pill-small mt-4">
        Practise {label.toLowerCase()}
      </Link>
    </section>
  );
}

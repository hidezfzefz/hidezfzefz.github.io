"use client";

export type ExamResult = {
  id: string;
  at: number;
  total: number;
  correct: number;
  secondsUsed: number;
};

const EXAMS_KEY = "bacste.exams.v1";

export function loadExams(): ExamResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(EXAMS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as ExamResult[]) : [];
  } catch {
    return [];
  }
}

export function recordExam(result: ExamResult): ExamResult[] {
  const next = [result, ...loadExams()].slice(0, 50);
  try {
    window.localStorage.setItem(EXAMS_KEY, JSON.stringify(next));
  } catch {
    // ignore storage failures
  }
  return next;
}

export function bestExam(results: ExamResult[]): ExamResult | null {
  if (!results.length) return null;
  return results.reduce((best, r) =>
    r.correct / r.total > best.correct / best.total ? r : best,
  );
}

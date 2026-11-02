"use client";

import { QUESTIONS, type Subject } from "./questions";

export type Attempt = {
  questionId: string;
  correct: boolean;
  at: number;
};

const ATTEMPTS_KEY = "bacste.attempts.v1";
const PREMIUM_KEY = "bacste.premium.v1";

export function loadAttempts(): Attempt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ATTEMPTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Attempt[]) : [];
  } catch {
    return [];
  }
}

export function recordAttempt(questionId: string, correct: boolean): Attempt[] {
  const next = [...loadAttempts(), { questionId, correct, at: Date.now() }];
  try {
    window.localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(next.slice(-1000)));
  } catch {
    // storage full or blocked; progress simply won't persist
  }
  return next;
}

export function resetAttempts(): void {
  try {
    window.localStorage.removeItem(ATTEMPTS_KEY);
  } catch {
    // ignore
  }
}

export function isPremium(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(PREMIUM_KEY) === "1";
  } catch {
    return false;
  }
}

export function setPremium(value: boolean): void {
  try {
    if (value) window.localStorage.setItem(PREMIUM_KEY, "1");
    else window.localStorage.removeItem(PREMIUM_KEY);
  } catch {
    // ignore
  }
}

export type SubjectStats = {
  answered: number;
  correct: number;
  accuracy: number;
  byTopic: { topic: string; answered: number; correct: number }[];
  weakest: string | null;
};

export function statsFor(subject: Subject, attempts: Attempt[]): SubjectStats {
  const ids = new Set(QUESTIONS.filter((q) => q.subject === subject).map((q) => q.id));
  const relevant = attempts.filter((a) => ids.has(a.questionId));
  const byTopicMap = new Map<string, { answered: number; correct: number }>();
  for (const q of QUESTIONS.filter((x) => x.subject === subject)) {
    if (!byTopicMap.has(q.topic)) byTopicMap.set(q.topic, { answered: 0, correct: 0 });
  }
  let correct = 0;
  for (const a of relevant) {
    const q = QUESTIONS.find((x) => x.id === a.questionId);
    if (!q) continue;
    const t = byTopicMap.get(q.topic);
    if (!t) continue;
    t.answered += 1;
    if (a.correct) {
      t.correct += 1;
      correct += 1;
    }
  }
  const byTopic = Array.from(byTopicMap.entries())
    .map(([topic, v]) => ({ topic, ...v }))
    .filter((t) => t.answered > 0)
    .sort((a, b) => a.correct / a.answered - b.correct / b.answered);
  return {
    answered: relevant.length,
    correct,
    accuracy: relevant.length ? Math.round((correct / relevant.length) * 100) : 0,
    byTopic,
    weakest: byTopic.length ? byTopic[0].topic : null,
  };
}

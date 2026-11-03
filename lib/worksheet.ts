import { type Question } from "./questions";

export type WorksheetMix = "random" | "balanced";

export function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Random gives a shuffled slice. Balanced takes one question per topic in turn, so a
 * teacher who prints the sheet sees every chapter before a topic repeats.
 */
export function pickQuestions(
  pool: Question[],
  count: number,
  mix: WorksheetMix,
): Question[] {
  if (mix === "random") return shuffle(pool).slice(0, count);

  const byTopic = new Map<string, Question[]>();
  for (const question of shuffle(pool)) {
    const group = byTopic.get(question.topic);
    if (group) group.push(question);
    else byTopic.set(question.topic, [question]);
  }

  const groups = shuffle(Array.from(byTopic.values()));
  const picked: Question[] = [];
  let round = 0;
  while (picked.length < count && round <= pool.length) {
    let added = false;
    for (const group of groups) {
      if (picked.length >= count) break;
      const next = group[round];
      if (next) {
        picked.push(next);
        added = true;
      }
    }
    if (!added) break;
    round += 1;
  }
  return picked;
}

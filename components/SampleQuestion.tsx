"use client";

import { useState } from "react";
import { QUESTIONS } from "@/lib/questions";

const q = QUESTIONS[0];

export function SampleQuestion() {
  const [selected, setSelected] = useState<number | null>(null);
  const correct = selected === q.answer;

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3 text-xs text-cv-text-50">
        <span>{q.topic}</span>
        <span>Sample question</span>
      </div>
      <p className="mt-3 text-[17px] leading-snug tracking-[-0.01em]">{q.prompt}</p>
      <div className="mt-5 grid gap-2.5">
        {q.options.map((opt, i) => {
          const chosen = selected === i;
          const isAnswer = q.answer === i;
          let cls = "row flex min-h-11 w-full items-center gap-3 px-4 py-2.5 text-left text-[15px] transition-colors";
          if (selected === null) cls += " hover:bg-cv-raised";
          else if (isAnswer) cls += " border-cv-ok/60";
          else if (chosen) cls += " border-cv-bad/60";
          else cls += " opacity-60";
          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              disabled={selected !== null}
              className={cls}
              aria-pressed={chosen}
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-full border border-cv-line text-xs text-cv-text-50">
                {String.fromCharCode(65 + i)}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
      {selected !== null && (
        <div className="reveal mt-4 rounded-[12px] border border-cv-line bg-cv-raised p-4">
          <p className={`text-sm font-medium ${correct ? "text-cv-ok" : "text-cv-bad"}`}>
            {correct ? "Correct" : "Not quite"}
          </p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-cv-text-75">{q.explanation}</p>
        </div>
      )}
    </div>
  );
}

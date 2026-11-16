"use client";

import { useState } from "react";
import type { QuizQuestion } from "@/types";

export default function QuizCard({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));

  const answered = answers.filter((a) => a !== null).length;
  const score = answers.reduce<number>(
    (total, answer, index) => total + (answer === questions[index].answerIndex ? 1 : 0),
    0
  );

  function choose(qIndex: number, optIndex: number) {
    setAnswers((prev) => {
      if (prev[qIndex] !== null) return prev; // lock after first answer
      const next = [...prev];
      next[qIndex] = optIndex;
      return next;
    });
  }

  return (
    <div className="space-y-5">
      {answered > 0 && (
        <div
          aria-live="polite"
          className="flex items-center justify-between rounded-xl bg-violet-50 px-3.5 py-3"
        >
          <div>
            <p className="text-xs font-medium text-violet-700">
              {answered === questions.length ? "Final score" : "Current score"}
            </p>
            <p className="mt-0.5 text-lg font-bold text-violet-950">
              {score} / {questions.length}
            </p>
          </div>
          <p className="text-xs text-violet-700">
            {answered} of {questions.length} answered
          </p>
        </div>
      )}

      {questions.map((q, qi) => {
        const picked = answers[qi];
        const explanation =
          q.explanation || `The correct answer is ${q.options[q.answerIndex]}.`;
        return (
          <div key={qi} className="border-b border-zinc-100 pb-5 last:border-0 last:pb-0">
            <p className="text-sm font-semibold text-zinc-900">
              <span className="mr-1 text-violet-600">Q{qi + 1}.</span>
              {q.question}
            </p>
            <div className="mt-2 space-y-2">
              {q.options.map((opt, oi) => {
                let style = "border-zinc-200 hover:border-zinc-300";
                if (picked !== null) {
                  if (oi === q.answerIndex) style = "border-emerald-500 bg-emerald-50";
                  else if (oi === picked) style = "border-red-400 bg-red-50";
                  else style = "border-zinc-200 opacity-60";
                }
                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => choose(qi, oi)}
                    disabled={picked !== null}
                    className={`w-full rounded-lg border px-3 py-2 text-left text-sm text-zinc-800 transition-colors ${style}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            {picked !== null && (
              <div
                role="status"
                className={`mt-3 rounded-lg px-3 py-2.5 text-xs leading-relaxed ${
                  picked === q.answerIndex
                    ? "bg-emerald-50 text-emerald-800"
                    : "bg-rose-50 text-rose-800"
                }`}
              >
                <p className="font-semibold">
                  {picked === q.answerIndex
                    ? "Correct!"
                    : `Not quite. The correct answer is: ${q.options[q.answerIndex]}`}
                </p>
                <p className="mt-1">{explanation}</p>
              </div>
            )}
          </div>
        );
      })}

      {answered === questions.length && (
        <p className="text-center text-sm font-semibold text-slate-800">
          Quiz complete — Score: {score} / {questions.length}
        </p>
      )}
    </div>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import { BookOpen, Lightbulb, ListChecks, Send, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ChatMode, Course, Lesson, QuizQuestion } from "@/types";
import QuizCard from "./QuizCard";
import TutorReply from "./TutorReply";

type Props = {
  course: Course;
  lesson: Lesson;
  completedLessons: string[];
};

const ACTIONS: { mode: ChatMode; label: string; icon: LucideIcon }[] = [
  { mode: "explain", label: "Explain simply", icon: Sparkles },
  { mode: "example", label: "Give an example", icon: BookOpen },
  { mode: "hint", label: "Give me a hint", icon: Lightbulb },
  { mode: "quiz", label: "Generate a quiz", icon: ListChecks },
];

export default function AiPanel({ course, lesson, completedLessons }: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  // Clear everything when the student switches lessons
  useEffect(() => {
    requestId.current += 1; // invalidates any in-flight request
    setReply(null);
    setQuiz(null);
    setError(null);
    setLoading(false);
    setInput("");
  }, [lesson.id]);

  async function ask(mode: ChatMode, message = "") {
    const id = ++requestId.current;
    setLoading(true);
    setError(null);
    setReply(null);
    setQuiz(null);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          message,
          lesson: { title: lesson.title, content: lesson.content },
          courseTitle: course.title,
          completedLessons,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (id !== requestId.current) return; // stale response, ignore

      if (!res.ok) throw new Error(data.error ?? "Something went wrong. Please try again.");

      if (data.quiz) setQuiz(data.quiz as QuizQuestion[]);
      else setReply(typeof data.reply === "string" ? data.reply : "No response received.");
    } catch (e) {
      if (id !== requestId.current) return;
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      if (id === requestId.current) setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    ask("chat", text);
    setInput("");
  }

  return (
    <div className="flex flex-col rounded-xl border border-zinc-200 bg-white">
      <div className="border-b border-zinc-100 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-violet-600">
          LearnSelf AI tutor
        </p>
        <h2 className="mt-0.5 font-semibold text-zinc-900">{lesson.title}</h2>
      </div>

      <div className="flex flex-wrap gap-2 px-5 pt-4">
        {ACTIONS.map(({ mode, label, icon: Icon }) => (
          <button
            key={mode}
            type="button"
            onClick={() => ask(mode)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <div className="min-h-[200px] px-5 py-4" aria-live="polite">
        {loading && <p className="text-sm text-zinc-400">Thinking…</p>}

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        )}

        {reply && (
          <TutorReply reply={reply} />
        )}

        {quiz && <QuizCard key={quiz.map((q) => q.question).join("|")} questions={quiz} />}

        {!loading && !error && !reply && !quiz && (
          <p className="text-sm text-zinc-400">
            Pick an action above or ask a question about this lesson.
          </p>
        )}
      </div>

      <form onSubmit={onSubmit} className="flex gap-2 border-t border-zinc-100 p-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={1000}
          placeholder="Ask about this lesson…"
          className="flex-1 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-indigo-500"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send"
          className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-3 text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
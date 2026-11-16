"use client";

import { useEffect, useState } from "react";
import { BookOpen, RotateCcw, Search, Sparkles } from "lucide-react";
import { courses } from "@/data/courses";
import { getProgress, resetProgress } from "@/lib/storage";
import type { ProgressMap } from "@/types";
import { nextLessonOverall, overallProgress } from "@/lib/progress";
import ProgressOverview from "@/components/ProgressOverview";
import CourseCard from "@/components/CourseCard";
import ContinueButton from "@/components/ContinueButton";

export default function DashboardPage() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");

  // localStorage is read only after mount to avoid a hydration mismatch
  useEffect(() => {
    setProgress(getProgress());
    setReady(true);
  }, []);

  function handleReset() {
    if (!window.confirm("Reset all progress? This cannot be undone.")) return;
    resetProgress();
    setProgress({});
  }

  if (!ready) {
    return <p className="text-sm text-slate-400">Loading your learning progress…</p>;
  }

  const overall = overallProgress(courses, progress);
  const next = nextLessonOverall(courses, progress);
  const visibleCourses = courses.filter((course) =>
    `${course.title} ${course.description}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-600">
            Your learning hub
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Make your next lesson count.
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Pick up where you left off, explore a new skill, or celebrate how far you have come.
          </p>
        </div>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition-colors hover:border-slate-300 hover:text-slate-900"
        >
          <RotateCcw size={15} />
          Reset progress
        </button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.2fr_0.95fr]">
        <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-800 p-6 text-white shadow-sm sm:p-7">
          <div className="absolute -right-10 -top-12 -z-10 h-48 w-48 rounded-full border-[28px] border-white/5" />
          <div className="flex h-full flex-col">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-violet-100">
              <BookOpen size={22} />
            </span>
            <p className="mt-6 text-sm font-medium text-violet-200">Learn at your own pace</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight">Curiosity, meet capability.</h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-indigo-100/75">
              Take a big idea one focused lesson at a time. Practice the fundamentals, connect the
              concepts, and grow skills you can put to work.
            </p>
            <div className="mt-auto grid grid-cols-2 gap-3 pt-7">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-3.5">
                <p className="text-2xl font-semibold">{courses.length}</p>
                <p className="mt-0.5 text-xs text-indigo-100/70">Learning paths</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-3.5">
                <p className="text-2xl font-semibold">{overall.total}</p>
                <p className="mt-0.5 text-xs text-indigo-100/70">Lessons available</p>
              </div>
            </div>
          </div>
        </section>

        <ProgressOverview courses={courses} progress={progress} />

        <section className="flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
                Up next
              </p>
              <h2 className="mt-1 text-lg font-semibold text-slate-900">Your next lesson</h2>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-50 text-amber-600">
              <Sparkles size={20} />
            </span>
          </div>
          {next ? (
            <>
              <p className="mt-6 text-sm text-slate-500">{next.course.title}</p>
              <p className="mt-1 text-xl font-semibold leading-snug text-slate-900">
                {next.lesson.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Work through the explanation and examples, then mark it complete when the idea
                clicks.
              </p>
              <div className="mt-auto pt-6">
                <ContinueButton courses={courses} progress={progress} />
              </div>
            </>
          ) : (
            <div className="mt-8 rounded-2xl bg-emerald-50 p-4">
              <p className="font-medium text-emerald-900">You have reached the end of every path.</p>
              <p className="mt-1 text-sm text-emerald-800">
                Revisit a favorite topic to strengthen what you know, or reset your progress for a
                fresh start.
              </p>
            </div>
          )}
        </section>
      </div>

      <section id="subjects" className="scroll-mt-24">
        <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
              Choose your next challenge
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              Find your next learning path
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Start with the basics, connect ideas across topics, and build skills you can use.
            </p>
          </div>
          <label className="flex w-full items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm sm:max-w-xs">
            <Search size={17} className="shrink-0 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search learning paths"
              aria-label="Search learning paths"
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />
          </label>
        </div>
        {visibleCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {visibleCourses.map((course) => (
              <CourseCard key={course.id} course={course} progress={progress} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
            <p className="font-medium text-slate-800">No learning paths match that search</p>
            <p className="mt-1 text-sm text-slate-500">
              Try a broader topic, such as Python, web development, or databases.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
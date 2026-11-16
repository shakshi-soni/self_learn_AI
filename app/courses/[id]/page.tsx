"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCourse } from "@/data/courses";
import { getProgress, toggleLesson } from "@/lib/storage";
import { completedTitles, courseProgress, nextLesson } from "@/lib/progress";
import type { ProgressMap } from "@/types";
import LessonList from "@/components/LessonList";
import AiPanel from "@/components/AiPanel";
import ProgressBar from "@/components/ProgressBar";

function CoursePageInner() {
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const courseId = Array.isArray(params.id) ? params.id[0] : params.id;
  const course = getCourse(courseId);

  const [progress, setProgress] = useState<ProgressMap>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // Load saved progress after mount, then pick the starting lesson
  useEffect(() => {
    if (!course) return;
    const saved = getProgress();
    setProgress(saved);

    const requested = searchParams.get("lesson");
    const fromUrl = course.lessons.find((l) => l.id === requested);
    const start = fromUrl ?? nextLesson(course, saved) ?? course.lessons[0];

    setSelectedId(start.id);
    setReady(true);
  }, [course, searchParams]);

  if (!course) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-zinc-600">Course not found.</p>
        <Link href="/" className="text-sm text-indigo-600 hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  if (!ready || !selectedId) {
    return <p className="text-sm text-zinc-400">Loading…</p>;
  }

  const lesson = course.lessons.find((l) => l.id === selectedId) ?? course.lessons[0];
  const p = courseProgress(course, progress);

  function handleToggle(lessonId: string) {
    setProgress(toggleLesson(lessonId));
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-800"
        >
          <ArrowLeft size={14} />
          Dashboard
        </Link>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">{course.title}</h1>
        <p className="mt-1 text-sm text-zinc-500">{course.description}</p>
        <div className="mt-4 max-w-md">
          <ProgressBar percent={p.percent} />
          <p className="mt-2 text-xs text-zinc-500">
            {p.done} of {p.total} lessons completed ({p.percent}%)
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <LessonList
            course={course}
            progress={progress}
            selectedId={lesson.id}
            onSelect={setSelectedId}
            onToggle={handleToggle}
          />

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-zinc-400">Lesson</p>
            <h2 className="mt-1 text-lg font-semibold text-slate-900">{lesson.title}</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-slate-600">
              {lesson.content.split("\n\n").map((paragraph, index) => (
                <p key={`${lesson.id}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <AiPanel
            course={course}
            lesson={lesson}
            completedLessons={completedTitles(course, progress)}
          />
        </div>
      </div>
    </div>
  );
}

export default function CoursePage() {
  // useSearchParams requires a Suspense boundary for production builds
  return (
    <Suspense fallback={<p className="text-sm text-zinc-400">Loading…</p>}>
      <CoursePageInner />
    </Suspense>
  );
}
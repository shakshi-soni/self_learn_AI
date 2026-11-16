"use client";

import { Check } from "lucide-react";
import type { Course, ProgressMap } from "@/types";

type Props = {
  course: Course;
  progress: ProgressMap;
  selectedId: string;
  onSelect: (lessonId: string) => void;
  onToggle: (lessonId: string) => void;
};

export default function LessonList({ course, progress, selectedId, onSelect, onToggle }: Props) {
  return (
    <ul className="divide-y divide-zinc-100 overflow-hidden rounded-xl border border-zinc-200 bg-white">
      {course.lessons.map((lesson, i) => {
        const done = !!progress[lesson.id];
        const selected = lesson.id === selectedId;

        return (
          <li
            key={lesson.id}
            className={`flex items-center gap-3 px-4 py-3 ${selected ? "bg-indigo-50/60" : ""}`}
          >
            <button
              type="button"
              onClick={() => onToggle(lesson.id)}
              aria-label={done ? `Mark ${lesson.title} as not done` : `Mark ${lesson.title} as done`}
              aria-pressed={done}
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                done
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-zinc-300 bg-white hover:border-zinc-400"
              }`}
            >
              {done && <Check size={14} strokeWidth={3} />}
            </button>

            <button
              type="button"
              onClick={() => onSelect(lesson.id)}
              className="flex-1 text-left"
            >
              <span className="block text-xs text-zinc-400">Lesson {i + 1}</span>
              <span
                className={`block text-sm ${
                  done ? "text-zinc-400 line-through" : "text-zinc-900"
                } ${selected ? "font-medium" : ""}`}
              >
                {lesson.title}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
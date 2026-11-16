import type { Course, Lesson, ProgressMap } from "@/types";

export type ProgressSummary = { done: number; total: number; percent: number };
export type Status = "Not started" | "In progress" | "Completed";

function toPercent(done: number, total: number): number {
  return total === 0 ? 0 : Math.round((done / total) * 100);
}

export function courseProgress(course: Course, progress: ProgressMap): ProgressSummary {
  const total = course.lessons.length;
  const done = course.lessons.filter((l) => progress[l.id]).length;
  return { done, total, percent: toPercent(done, total) };
}

export function overallProgress(courses: Course[], progress: ProgressMap): ProgressSummary {
  let done = 0;
  let total = 0;
  for (const course of courses) {
    const p = courseProgress(course, progress);
    done += p.done;
    total += p.total;
  }
  return { done, total, percent: toPercent(done, total) };
}

export function nextLesson(course: Course, progress: ProgressMap): Lesson | null {
  return course.lessons.find((l) => !progress[l.id]) ?? null;
}

// First incomplete lesson across all courses (for the dashboard Continue button)
export function nextLessonOverall(
  courses: Course[],
  progress: ProgressMap
): { course: Course; lesson: Lesson } | null {
  for (const course of courses) {
    const lesson = nextLesson(course, progress);
    if (lesson) return { course, lesson };
  }
  return null;
}

export function status(percent: number): Status {
  if (percent >= 100) return "Completed";
  if (percent > 0) return "In progress";
  return "Not started";
}

// Titles of completed lessons in a course (sent to the AI as context)
export function completedTitles(course: Course, progress: ProgressMap): string[] {
  return course.lessons.filter((l) => progress[l.id]).map((l) => l.title);
}
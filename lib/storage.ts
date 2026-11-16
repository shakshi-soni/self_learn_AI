import type { ProgressMap } from "@/types";

const KEY = "learnmate_progress_v1";

export function getProgress(): ProgressMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as ProgressMap;
    }
    return {};
  } catch {
    return {};
  }
}

function save(progress: ProgressMap): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(progress));
  } catch {
    // storage full or blocked (private mode) - fail silently
  }
}

export function toggleLesson(lessonId: string): ProgressMap {
  const current = getProgress();
  const updated: ProgressMap = { ...current, [lessonId]: !current[lessonId] };
  save(updated);
  return updated;
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
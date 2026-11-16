import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Course, ProgressMap } from "@/types";
import { nextLessonOverall } from "@/lib/progress";

type Props = { courses: Course[]; progress: ProgressMap };

export default function ContinueButton({ courses, progress }: Props) {
  const next = nextLessonOverall(courses, progress);

  if (!next) {
    return (
      <p className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
        All lessons completed. Nice work.
      </p>
    );
  }

  return (
    <Link
      href={`/courses/${next.course.id}?lesson=${next.lesson.id}`}
      className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
    >
      Continue: {next.lesson.title}
      <ArrowRight size={16} />
    </Link>
  );
}
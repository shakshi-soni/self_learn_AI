import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Brain, Calculator, Code2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Course, ProgressMap } from "@/types";
import { courseProgress, nextLesson } from "@/lib/progress";
import ProgressBar from "./ProgressBar";

type Props = { course: Course; progress: ProgressMap };

const courseThemes: Record<string, { icon: LucideIcon; tile: string; iconColor: string }> = {
  "python-basics": {
    icon: Code2,
    tile: "from-amber-100 via-orange-50 to-yellow-50",
    iconColor: "text-amber-600",
  },
  "ml-intro": {
    icon: Brain,
    tile: "from-violet-100 via-indigo-50 to-blue-50",
    iconColor: "text-indigo-600",
  },
  mathematics: {
    icon: Calculator,
    tile: "from-emerald-100 via-teal-50 to-cyan-50",
    iconColor: "text-emerald-700",
  },
  javascript: {
    icon: Code2,
    tile: "from-yellow-100 via-amber-50 to-orange-50",
    iconColor: "text-amber-700",
  },
  "web-development": {
    icon: BookOpen,
    tile: "from-sky-100 via-cyan-50 to-blue-50",
    iconColor: "text-sky-700",
  },
  "git-github": {
    icon: Code2,
    tile: "from-rose-100 via-orange-50 to-amber-50",
    iconColor: "text-rose-700",
  },
  "sql-databases": {
    icon: Calculator,
    tile: "from-teal-100 via-emerald-50 to-green-50",
    iconColor: "text-teal-700",
  },
  "data-structures": {
    icon: Brain,
    tile: "from-fuchsia-100 via-violet-50 to-indigo-50",
    iconColor: "text-violet-700",
  },
  default: {
    icon: BookOpen,
    tile: "from-violet-100 to-indigo-50",
    iconColor: "text-violet-700",
  },
};

export default function CourseCard({ course, progress }: Props) {
  const p = courseProgress(course, progress);
  const theme = courseThemes[course.id] ?? courseThemes.default;
  const Icon = theme.icon;
  const next = nextLesson(course, progress) ?? course.lessons[0];
  const href = next ? `/courses/${course.id}?lesson=${next.id}` : `/courses/${course.id}`;

  return (
    <Link
      href={href}
      className="group flex min-h-56 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-md"
    >
      <div
        className={`relative flex w-[36%] shrink-0 items-center justify-center overflow-hidden bg-gradient-to-br ${theme.tile} sm:w-[38%]`}
      >
        <span className="absolute -right-7 -top-7 h-24 w-24 rounded-full border-[16px] border-white/50" />
        <span className="absolute -bottom-8 -left-7 h-24 w-24 rounded-full bg-white/40" />
        <span className={`relative grid h-16 w-16 place-items-center rounded-2xl bg-white/75 shadow-sm sm:h-20 sm:w-20 ${theme.iconColor}`}>
          <Icon size={34} strokeWidth={1.7} />
        </span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
            Learning path
          </p>
          <ArrowUpRight
            size={17}
            className="shrink-0 text-slate-400 transition-colors group-hover:text-violet-600"
          />
        </div>
        <h3 className="mt-1 text-base font-semibold leading-snug text-slate-900 sm:text-lg">
          {course.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500 sm:text-sm">
          {course.description}
        </p>
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 sm:text-xs">
            <span>
              {p.done} of {p.total} lessons
            </span>
            <span className="font-semibold text-slate-700">{p.percent}%</span>
          </div>
          <div className="mt-2">
            <ProgressBar percent={p.percent} />
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-violet-700">
            {p.percent === 100
              ? "Revisit and reinforce"
              : p.done > 0
                ? "Pick up where you left off"
                : "Build your first skill"}
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
import type { Course, ProgressMap } from "@/types";
import { overallProgress } from "@/lib/progress";

type Props = { courses: Course[]; progress: ProgressMap };

export default function ProgressOverview({ courses, progress }: Props) {
  const overall = overallProgress(courses, progress);

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-7">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-600">
          Your learning journey
        </p>
        <h2 className="mt-1 text-lg font-semibold text-slate-900">Skills in progress</h2>
      </div>
      <div className="mt-5 flex items-center gap-5 sm:gap-6">
        <div
          className="grid h-32 w-32 shrink-0 place-items-center rounded-full p-2 sm:h-36 sm:w-36"
          role="progressbar"
          aria-label="Your learning journey progress"
          aria-valuenow={overall.percent}
          aria-valuemin={0}
          aria-valuemax={100}
          style={{
            background: `conic-gradient(#7959e8 0% ${overall.percent}%, #eeeafc ${overall.percent}% 100%)`,
          }}
        >
          <div className="grid h-full w-full place-items-center rounded-full bg-white text-center">
            <div>
              <p className="text-3xl font-semibold tracking-tight text-slate-900">
                {overall.percent}%
              </p>
              <p className="mt-0.5 text-[11px] font-medium text-slate-400">complete</p>
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-2xl font-semibold tracking-tight text-slate-900">
            {overall.done}
            <span className="ml-1.5 text-sm font-medium text-slate-500">
              of {overall.total} lessons
            </span>
          </p>
          <p className="mt-1 text-sm text-slate-500">lessons completed</p>
          <div className="mt-4 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-violet-500" />
            <span className="text-xs text-slate-500">{courses.length} paths to explore</span>
          </div>
        </div>
      </div>
      <div className="mt-5 h-px bg-slate-100" />
      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Every finished lesson moves your progress forward—and gives you another skill to build on.
      </p>
    </section>
  );
}
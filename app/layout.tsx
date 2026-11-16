import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, GraduationCap, LayoutDashboard, Sparkles } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnSelf AI",
  description: "Track your learning progress and get help from an AI tutor.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="min-h-screen lg:flex">
          <aside className="sticky top-0 z-20 border-b border-indigo-900 bg-[#25215f] text-white lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-60 lg:flex-col lg:border-b-0">
            <Link
              href="/"
              className="flex items-center gap-3 px-5 py-4 lg:px-6 lg:py-7"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
                <GraduationCap size={23} />
              </span>
              <span className="text-lg font-semibold tracking-tight">
                LearnSelf <span className="text-violet-300">AI</span>
              </span>
            </Link>
            <nav aria-label="Main navigation" className="flex gap-2 overflow-x-auto px-3 pb-3 lg:mt-8 lg:flex-col lg:px-4">
              <Link
                href="/"
                className="flex shrink-0 items-center gap-3 rounded-xl bg-white/10 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/15"
              >
                <LayoutDashboard size={18} />
                Home
              </Link>
              <Link
                href="/#subjects"
                className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-indigo-100/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                <BookOpen size={18} />
                Subjects
              </Link>
              <Link
                href="/courses/python-basics"
                className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-indigo-100/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Sparkles size={18} />
                AI tutor
              </Link>
            </nav>
            <div className="mt-auto hidden px-6 pb-7 lg:block">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium">Knowledge, put into practice.</p>
                <p className="mt-1 text-xs leading-relaxed text-indigo-100/65">
                  Explore the idea, test your understanding, and keep building.
                </p>
              </div>
            </div>
          </aside>
          <div className="min-w-0 flex-1 lg:pl-60">
            <header className="border-b border-slate-200/80 bg-white/85">
              <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 sm:px-7 lg:px-9">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-violet-100 text-xs font-semibold text-violet-800">
                    LS
                  </span>
                  <span className="hidden text-sm font-medium text-slate-700 sm:inline">Learner</span>
                </div>
              </div>
            </header>
            <main className="mx-auto w-full max-w-[1440px] px-4 py-7 sm:px-7 sm:py-9 lg:px-9">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
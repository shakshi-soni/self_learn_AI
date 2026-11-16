# Architecture

## Overview

LearnSelf AI is a Next.js App Router application. The browser renders the dashboard and lesson experience; progress is stored in browser `localStorage`; AI requests go through a server route so the Groq API key is not included in client code.

```text
Dashboard
  ├─ reads progress from localStorage
  ├─ calculates course and overall summaries
  └─ links to a course and lesson
       ├─ lesson list and lesson content
       ├─ completion updates localStorage
       └─ AI tutor panel
            └─ POST /api/chat
                 ├─ validate request
                 ├─ build lesson-aware prompt
                 ├─ call Groq on the server
                 ├─ validate quiz JSON when needed
                 └─ return reply or quiz
```

## Application layers

### Routes

- [`../app/layout.tsx`](../app/layout.tsx) provides the shared shell, navigation, metadata, and global stylesheet.
- [`../app/page.tsx`](../app/page.tsx) is the dashboard. It waits until the browser has mounted before reading `localStorage`, avoiding a server/client hydration mismatch.
- [`../app/courses/[id]/page.tsx`](../app/courses/%5Bid%5D/page.tsx) resolves a course ID and optional lesson query parameter, displays the lesson list and content, and joins the tutor panel to the current lesson.
- [`../app/api/chat/route.ts`](../app/api/chat/route.ts) is the server-side AI boundary.

### UI components

- [`../components/CourseCard.tsx`](../components/CourseCard.tsx) displays one learning path and its completion state.
- [`../components/ProgressOverview.tsx`](../components/ProgressOverview.tsx) displays overall course completion.
- [`../components/ProgressBar.tsx`](../components/ProgressBar.tsx) is a reusable visual progress indicator.
- [`../components/ContinueButton.tsx`](../components/ContinueButton.tsx) links to the first incomplete lesson across courses.
- [`../components/LessonList.tsx`](../components/LessonList.tsx) selects lessons and toggles their completion state.
- [`../components/AiPanel.tsx`](../components/AiPanel.tsx) sends tutor requests and displays loading, errors, replies, or a quiz.
- [`../components/TutorReply.tsx`](../components/TutorReply.tsx) renders a limited Markdown subset as React elements rather than injecting raw HTML.
- [`../components/QuizCard.tsx`](../components/QuizCard.tsx) tracks answers and score in component state and reveals feedback.

### Data and shared logic

- [`../data/courses.ts`](../data/courses.ts) is the static source for course descriptions and lesson content.
- [`../types/index.ts`](../types/index.ts) defines the TypeScript contracts shared across the app.
- [`../lib/progress.ts`](../lib/progress.ts) calculates completion, chooses the next lesson, and selects completed lesson titles.
- [`../lib/storage.ts`](../lib/storage.ts) reads and writes completion flags in the browser.
- [`../lib/prompts.ts`](../lib/prompts.ts) builds system prompts by tutor mode.
- [`../lib/quiz.ts`](../lib/quiz.ts) validates and normalizes generated quiz JSON.
- [`../lib/groq.ts`](../lib/groq.ts) creates a lazy Groq client using server environment configuration.

## Progress data model

Courses and lessons are static objects. Each lesson needs a stable unique ID because progress is represented as a map:

```text
lessonId -> completed boolean
```

The browser saves that map under `learnmate_progress_v1`. Shared helpers count only lesson IDs present in the course data, then calculate completion percentages. The next lesson is the first incomplete lesson in the course array order; this is deterministic, but it is not personalized.

Consequences:

- Progress is isolated to one browser profile and device.
- Changing a lesson ID disconnects it from the previously saved completion key.
- There is no account identity, server-side authorization, or synchronization.
- Browser storage is convenient for this prototype but is not a trusted source for grading or access control.

## Tutor API contract

The client sends a JSON body containing:

- `mode`: `explain`, `example`, `hint`, `quiz`, or `chat`.
- `message`: learner text for chat; limited to 1,000 characters.
- `lesson`: current lesson title and content.
- `courseTitle`: course name.
- `completedLessons`: completed lesson titles, filtered to strings and limited to 50.

The route validates the mode, message, and basic lesson fields. It builds a mode-specific prompt and limits lesson content included in that prompt to 2,000 characters. Context originates in the browser, so it is context for generation—not authoritative learner or course data.

### Non-quiz responses

The server returns `{ "reply": "..." }`. Prompts ask the model for concise, formatted beginner explanations; [`../components/TutorReply.tsx`](../components/TutorReply.tsx) renders supported headings, lists, bold text, inline code, and fenced code blocks. This is not a complete Markdown renderer.

### Quiz responses

The model is asked for five questions, each with four options, a zero-based answer index, and an explanation. The route requests structured JSON and then uses [`../lib/quiz.ts`](../lib/quiz.ts) to reject malformed data and remove common Markdown delimiters from question, option, and explanation text before returning `{ "quiz": [...] }`.

The UI calculates the score from model-supplied answer indices. Validation confirms structure and value ranges; it does not independently prove that an answer is correct.

## Provider and errors

[`../lib/groq.ts`](../lib/groq.ts) reads `GROQ_API_KEY` only on the server and configures the model. The route handles missing configuration, rejected keys, rate limiting, and generic provider failures with user-facing errors. Selected transient failures receive one retry after a short delay; rate limits and other non-transient errors do not.

The remaining risk is operational: there is no authentication, per-user budget, or rate limit in the app. A deployed public endpoint can consume provider quota. Add these protections and monitoring before scaling access.

## Styling and tooling

- [`../app/globals.css`](../app/globals.css) loads Tailwind CSS v4 and sets small global styles.
- [`../postcss.config.mjs`](../postcss.config.mjs) connects Tailwind to PostCSS.
- [`../tsconfig.json`](../tsconfig.json) enables strict TypeScript and the `@/` project-root import alias.
- [`../next.config.ts`](../next.config.ts) contains Next.js output tracing configuration.
- [`../package.json`](../package.json) defines runtime dependencies and developer commands; [`../package-lock.json`](../package-lock.json) records the resolved npm dependency tree.

There are currently no automated tests or lint command in the package scripts. See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for available verification commands and [`bugs.md`](./bugs.md) for known limitations.

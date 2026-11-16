# LearnSelf AI

**Live demo:** https://self-learn-ai-git-main-shakshi-s-projects2.vercel.app/

---

## About the project

LearnSelf AI is a learning dashboard where students study structured lessons, track their progress, and get help from an AI tutor that knows which lesson they are on.

I built it for the LearnSelf AI Developer Internship practical task, which asked for three things: a learning-progress feature, an AI learning assistant, and product thinking. Instead of building three separate demos, I built one small product where all three work together. Progress gives the tutor real context, and the tutor gives the progress feature a purpose.

## Features

**Learning progress**
- 8 learning paths and 56 lessons: Python, machine learning, mathematics, JavaScript, web development, Git/GitHub, SQL and databases, and data structures and algorithms.
- Dashboard with overall progress, per-course progress bars and subject search.
- Mark lessons as done or undo them. Progress is calculated from saved data and survives a page refresh.
- "Continue learning" button that jumps to the first incomplete lesson.

**AI tutor**
- Lives beside the lesson and receives the current lesson plus the lessons you have already completed.
- Five modes: explain simply, give an example, give a hint (never the full answer), generate a quiz, or answer a typed question.
- 5-question quizzes, scored in the browser. Each answer locks after selection and comes with an explanation.
- Replies support light Markdown (headings, bold, lists, inline code, code blocks) so answers are easy to read.

The dashboard and progress tracking work without an API key. Only the AI tutor needs one.

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| Styling | Tailwind CSS v4 |
| AI | Groq API via `groq-sdk` |
| Storage | Browser `localStorage` |
| Icons | Lucide React |
| Hosting | Vercel |

## Architecture

### How the pieces work together

```
Browser
  ├─ Pages / components ─► lib/progress.ts ─► lib/storage.ts ─► localStorage
  └─ AiPanel ── POST /api/chat ──┐
                                 ▼
Server (Next.js API route)
  validate input → lib/prompts.ts → Groq API → lib/quiz.ts (validates quiz JSON)
```

- **Frontend (Next.js + React):** pages and components render the dashboard, lessons, tutor and quizzes. Interactive parts are client components.
- **Progress storage:** lesson completion is saved in `localStorage`. Every read and write goes through one module, `lib/storage.ts`, so no component touches storage directly. It is read after the page mounts to avoid a hydration mismatch.
- **Progress logic:** percentages, status and "next lesson" are pure functions in `lib/progress.ts`, calculated from saved data and never hardcoded.
- **AI request flow:** `AiPanel` sends the mode, message, current lesson, course title and completed lesson titles to `POST /api/chat`. The route validates the input, builds a mode-specific prompt (`lib/prompts.ts`), calls Groq, and retries once on certain transient failures. Quiz responses are checked by `lib/quiz.ts` (5 questions, 4 options each, valid answer index, explanation) before they reach the browser.
- **Security:** `GROQ_API_KEY` is only ever read on the server inside the API route, never in browser code.
- **Race protection:** `AiPanel` ignores stale responses, so switching lessons mid-request cannot show an old answer on the wrong lesson.

### Project structure

```
.
├── app/
│   ├── layout.tsx              # Shared shell, header, metadata
│   ├── page.tsx                # Dashboard
│   ├── globals.css             # Tailwind import and global styles
│   ├── courses/[id]/page.tsx   # Lesson page with the AI tutor
│   └── api/chat/route.ts       # POST /api/chat (server-side AI)
├── components/
│   ├── AiPanel.tsx             # Tutor interface and requests
│   ├── TutorReply.tsx          # Light Markdown renderer for answers
│   ├── QuizCard.tsx            # Quiz UI, scoring, explanations
│   ├── CourseCard.tsx          # Subject card with progress
│   ├── ProgressOverview.tsx    # Overall progress display
│   ├── ProgressBar.tsx         # Reusable progress bar
│   ├── ContinueButton.tsx      # Jump to next incomplete lesson
│   └── LessonList.tsx          # Lesson selection and completion
├── data/
│   └── courses.ts              # 8 courses, 56 lessons
├── lib/
│   ├── storage.ts              # All localStorage access
│   ├── progress.ts             # Progress calculations
│   ├── prompts.ts              # System prompt for each tutor mode
│   ├── quiz.ts                 # Quiz JSON validation
│   └── groq.ts                 # Groq client and model selection
├── types/index.ts              # Shared TypeScript types
├── docs/
│   ├── PRODUCT.md              # Product thinking and trade-offs
│   └── bugs.md                 # Bugs hit while building
└── .env.example                # Environment variable template
```

## Getting started

### Requirements
- Node.js 20.9 or newer
- npm 10 or newer
- A Groq API key (only for the AI tutor)

### 1. Clone and install
```bash
git clone https://github.com/shakshi-soni/self_learn_AI.git
cd self_learn_AI
npm install
```

### 2. Set up the environment file

Windows (PowerShell):
```powershell
Copy-Item .env.example .env.local
```
macOS / Linux:
```bash
cp .env.example .env.local
```

Open `.env.local` and add your key:
```text
GROQ_API_KEY=your_actual_groq_api_key
```
Get a key from the Groq Console.

### 3. Run
```bash
npm run dev
```
Open http://localhost:3000. Restart the server after any change to `.env.local`.

### Other commands
```bash
npm run typecheck   # check TypeScript
npm run build       # production build
npm start           # serve the production build
```

> **Keep your key private.** Never prefix it with `NEXT_PUBLIC_` and never commit it. `.env.local` is already in `.gitignore`. If a key leaks, rotate it in the Groq Console.

### Deploy to Vercel
1. Import the repository into Vercel. It detects Next.js automatically.
2. Add `GROQ_API_KEY` under **Settings → Environment Variables**.
3. Redeploy. Variable changes only apply to new deployments.

## API

`POST /api/chat`

```json
{
  "mode": "explain | example | hint | quiz | chat",
  "message": "required for chat, max 1000 characters",
  "lesson": { "title": "Loops", "content": "..." },
  "courseTitle": "Python Basics",
  "completedLessons": ["Variables and Data Types"]
}
```

Returns `{ "reply": "..." }` for text modes or `{ "quiz": [...] }` for quizzes. Errors return `{ "error": "..." }` with `400` (bad input), `429` (rate limit), `500` (key missing or rejected) or `502` (AI failure or invalid quiz).

## Key decisions

- **One product instead of three demos.** The features support each other, which makes a more meaningful submission.
- **`localStorage` behind one module.** It was the fastest option inside the 4-6 hour limit, and moving to a real database later means changing a single file.
- **A lesson-aware tutor.** Putting the tutor beside the lesson, with the lesson text and completed topics in the prompt, keeps answers relevant instead of generic.
- **Hint mode never gives the answer.** A small prompt rule that makes it a tutor and not an answer machine.
- **Quiz output is validated, not trusted.** Malformed model JSON shows a clear error instead of breaking the UI.

## Limitations

- Progress is stored in one browser only. There are no accounts and no cross-device sync.
- Quiz scores are not saved after a refresh.
- AI answers can be wrong. Quiz validation checks structure, not factual accuracy.
- **The AI endpoint has no authentication or rate limiting.** It should be protected before the public URL is widely shared.
- Course content is hard-coded, and lesson IDs are storage keys, so keep them stable when editing.
- No automated tests or lint script yet.

## Roadmap

1. Rate limiting and usage caps on `/api/chat`
2. Accounts and a database behind `lib/storage.ts`
3. Saved quiz attempts and review recommendations
4. Answers grounded in lesson text, with a way to flag wrong responses
5. Unit tests for progress and quiz parsing, plus browser tests for key flows

More product thinking is in [`docs/PRODUCT.md`](./docs/PRODUCT.md).

## Tools used

Claude and GitHub Copilot, Next.js, React, TypeScript, Tailwind CSS, Groq API, Lucide React, Vercel, GitHub and VS Code.

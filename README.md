# LearnSelf AI

LearnSelf AI is a learning dashboard with structured coding lessons, browser-based progress tracking, and a lesson-aware AI tutor powered by Groq.

## What it includes

- Eight learning paths with 56 lessons covering Python, machine learning, mathematics, JavaScript, web development, Git/GitHub, SQL/databases, and data structures/algorithms.
- Dashboard summaries, course progress, subject search, and a continue-learning action.
- Lesson completion controls and a progress indicator.
- AI actions to explain a lesson, provide an example or hint, generate a five-question quiz, or answer a typed question.
- Quiz scoring and explanations after answers are selected.

## Requirements

- Node.js 20.9 or newer.
- npm 10 or newer.
- A Groq API key for AI tutor features. The dashboard, lessons, and local progress work without one.

Check your installed versions:

```powershell
node --version
npm --version
```

## Run locally

Open PowerShell or a terminal and clone the repository:

```powershell
git clone https://github.com/shakshi-soni/self_learn_AI.git
cd self_learn_AI
npm install
```

Create a local environment file:

```powershell
Copy-Item .env.example .env.local
```

Open `.env.local` and add your actual Groq API key:

```text
GROQ_API_KEY=your_actual_groq_api_key
```

Get the key from the Groq Console. Keep it private: do not paste it into client-side code, commit it, or share it in screenshots. `.env.local` is excluded by `.gitignore`.

Start the development server:

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If you change `.env.local` while the server is running, stop and restart the development server.

## Useful commands

```powershell
npm run typecheck
npm run build
npm start
```

- `npm run typecheck` checks TypeScript without generating output.
- `npm run build` creates the production build.
- `npm start` serves that build locally; run it after `npm run build`.

There is currently no automated test or lint script configured in `package.json`.

## Deploy to Vercel

1. Import `shakshi-soni/self_learn_AI` into Vercel.
2. Keep the project root at the repository root and let Vercel detect Next.js.
3. In **Project Settings → Environment Variables**, add:
   - **Name:** `GROQ_API_KEY`
   - **Value:** your actual Groq API key
   - **Environments:** Production, Preview, and Development as needed
4. Save the variable and redeploy. Environment-variable changes apply to new deployments.

The key is read by the server-side API route; it should never be exposed as a `NEXT_PUBLIC_` variable. The app uses the model configured in [`lib/groq.ts`](./lib/groq.ts).

## Where things live

- [`app/page.tsx`](./app/page.tsx) — dashboard and subject search.
- [`app/courses/[id]/page.tsx`](./app/courses/%5Bid%5D/page.tsx) — lesson page and course progress.
- [`app/api/chat/route.ts`](./app/api/chat/route.ts) — server-side AI endpoint.
- [`components/`](./components/) — dashboard, lesson, tutor, and quiz UI.
- [`data/courses.ts`](./data/courses.ts) — course and lesson content.
- [`lib/`](./lib/) — progress calculations, local storage, prompts, quiz validation, and Groq client.
- [`types/index.ts`](./types/index.ts) — shared TypeScript data types.
- [`docs/PRODUCT.md`](./docs/PRODUCT.md) — product approach, trade-offs, and improvement ideas.

## Progress and data

Lesson completion is saved in this browser's `localStorage`, not on a server. It is not synced between devices and can be cleared by resetting progress or clearing browser data. Lesson IDs in `data/courses.ts` are used as storage keys, so keep them stable when editing lesson titles or content.

The tutor receives the selected lesson and completed lesson titles as context. Quiz scores are held in the page state and are not saved after leaving or refreshing the lesson.

## Troubleshooting

- **Cannot find a package such as `next` or `react`:** run `npm install` from the repository root.
- **AI says it is not configured:** check that the environment variable is named exactly `GROQ_API_KEY`, then restart the local server or redeploy on Vercel.
- **AI rejects the key:** create or copy a valid key from the Groq Console and update the environment variable. Never add the key to source files.
- **AI request is unavailable or rate-limited:** check the terminal running `npm run dev` for `[/api/chat]` errors, verify Groq service/model availability, and check your Groq usage limits.
- **Progress looks missing:** progress belongs to the current browser profile. Confirm you are using the same browser and have not cleared its site data.

## Limitations and next steps

- There are no accounts or cloud progress sync.
- Course content is static TypeScript data rather than a content-management system.
- AI output can be inaccurate; quiz validation checks response structure, not factual correctness.
- The AI endpoint does not yet include user authentication, per-user quotas, or rate limiting. Add those protections and monitoring before exposing the service to a large audience.
- Future improvements could include saved quiz attempts, review recommendations, citations to lesson content, usability testing, and automated tests for progress calculations, quiz parsing, and key user flows.

More product and technical context is in [`docs/PRODUCT.md`](./docs/PRODUCT.md).

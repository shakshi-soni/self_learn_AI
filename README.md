# LearnSelf AI

A small learning dashboard with local lesson progress and a lesson-aware AI tutor.

## Run locally

Requirements: Node.js 20.9+ and npm 10+.

```sh
npm install
```

Copy `.env.example` to `.env.local` and add a Groq API key:

```text
GROQ_API_KEY=your_key_here
```

Then start the app:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Progress works without an API key; AI tutor requests need a valid server-side `GROQ_API_KEY`.

## Features

- Dashboard summaries, course completion indicators, and a continue-learning action.
- Lesson completion is stored in browser local storage and can be reset from the dashboard.
- Lesson-aware tutor actions: simple explanations, examples, hints, quizzes, and free-form questions.
- Quiz answers are checked in the UI; the API validates model-generated quiz data before returning it.

## Product and technical notes

See [docs/PRODUCT.md](./docs/PRODUCT.md) for the architecture, trade-offs, known challenges, and next product improvements.

## Checks

```sh
npm run typecheck
npm run build
```

## Tools used

Next.js App Router, React, TypeScript, Tailwind CSS v4, Groq API (`groq-sdk` with GPT-OSS 120B), Lucide React, npm, and AI-assisted development with GitHub Copilot.

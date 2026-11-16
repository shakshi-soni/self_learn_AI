# Product brief and technical approach

## Product goal

Help beginner learners decide what to study, see their progress, and get lesson-specific support without leaving the lesson.

## Intended learner and problem

The current experience is designed for an individual learner exploring foundational coding and computing topics. A learner may not know what to study next, may lose track of completed material, or may need an explanation in different words while reading a lesson.

The app addresses those needs with a small set of connected actions:

1. Choose a learning path.
2. Read a focused lesson and mark it complete.
3. Use the dashboard to see progress and resume the next incomplete lesson.
4. Ask the tutor for an explanation, example, hint, quiz, or answer to a typed question.

This is a product hypothesis, not a result of user research. The current repository does not include analytics or usability-study results.

## Product principles

- **Keep the next step visible.** Show course progress and a direct link to the next incomplete lesson.
- **Keep help in context.** The tutor receives the selected lesson rather than a broad, unrelated conversation history.
- **Make progress useful without an account.** Local browser storage makes the core progress feature available with minimal setup.
- **Make AI optional.** Reading lessons and tracking progress do not require an API key.
- **Make generated content reviewable.** Quizzes must pass structural validation before the UI displays them, and incorrect answers receive an explanation.

## Current scope

The curriculum is stored as static, typed data in [`../data/courses.ts`](../data/courses.ts). It contains eight learning paths and 56 lessons. The dashboard and lesson page are implemented in the Next.js App Router. Progress is stored in the browser. Tutor requests are sent to a server route, which calls Groq using a server-side environment variable.

The app does not currently have user accounts, a database, a course-authoring UI, saved quiz history, or a recommendation model.

## Main learner journey

### Discover

The dashboard shows available subjects, a search field, an overall completion ring, and the next incomplete lesson. Search filters by course title and description.

### Learn

Opening a subject displays its lesson list and the selected lesson content. The learner can select any lesson and independently mark it complete or incomplete.

### Get help

The tutor offers a small number of focused actions and a typed question form. Its prompt includes the course, current lesson, lesson text, and titles of completed lessons in that course.

### Check understanding

The quiz action requests exactly five multiple-choice questions. The learner gets a score as they answer and sees the correct answer and explanation after each selection. Quiz answers and scores are temporary page state.

## Product and technical trade-offs

### Local storage versus accounts

Local storage avoids account creation, database operations, and learner-data retention decisions. It also means progress belongs to one browser profile and can be lost when site data is cleared. A future sync feature should define account recovery, privacy, retention, and deletion behavior before implementation.

### Static curriculum versus a content system

Static TypeScript data is easy to review and deploy for a small prototype. It requires a code change and deployment to edit lessons, and content updates are not available to instructors through the app.

### Generative tutor versus authored answers

The AI can adapt an explanation to the current lesson and answer open questions, but responses are non-deterministic and may be incorrect. Prompts guide presentation; they are not a guarantee of factual correctness. Quiz parsing validates shape, not educational quality.

### Limited context versus personalization

Sending only the current lesson and completed lesson titles keeps the request focused. It does not provide a complete learner profile, prior conversation history, or measured understanding. More personalization would require additional data and clear privacy choices.

### Server-side API key

The browser calls the app's API route, and the route calls Groq. The Groq key stays on the server in `GROQ_API_KEY`; it must not be exposed through a `NEXT_PUBLIC_` variable or committed to source control.

## Success measures to consider

These are proposed measures; the app does not currently collect them.

- **Activation:** percentage of new learners who open a lesson and complete a first lesson.
- **Learning engagement:** lessons completed per active learner and return visits to continue a course.
- **Learning outcome:** change in quiz accuracy on a later attempt, interpreted carefully because the questions are model-generated.
- **Tutor usefulness:** learner rating of whether the answer clarified the current lesson.
- **Quality guardrails:** reported incorrect explanations, malformed quiz rate, API error rate, latency, and model cost.

Do not treat time spent or number of AI requests as proof of learning by themselves.

## Roadmap

### Before wider public use

1. Add request rate limits, usage budgets, and monitoring to the AI endpoint.
2. Add focused automated tests for progress calculation, quiz parsing, API validation, and key learner flows.
3. Review keyboard navigation, screen-reader labels, mobile layout, and error/loading states.
4. Create a small curated set of lesson questions to evaluate AI explanations and quizzes for factual and pedagogical quality.

### After learner feedback

1. Add accounts and server-side progress sync if learners need cross-device access.
2. Persist quiz attempts and missed concepts, then use that evidence for review suggestions.
3. Add citations or links from tutor answers to the relevant lesson paragraphs.
4. Add a content-authoring workflow with review and publication states.
5. Consider more languages, difficulty levels, and accessibility accommodations based on observed needs.

## Related documentation

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) explains the application layers and request/data flows.
- [`DEPLOYMENT.md`](./DEPLOYMENT.md) explains local setup and Vercel deployment.
- [`bugs.md`](./bugs.md) records known limitations and follow-up items.
# Product and technical approach

## Product goal

Help a learner understand what to study next, see tangible progress, and get lesson-specific support without leaving the lesson.

## Implementation

- **Progress:** course and lesson data are typed in `data/courses.ts`. Shared helpers in `lib/progress.ts` calculate per-course and overall completion. `lib/storage.ts` persists completion by lesson ID in browser local storage, keeping the feature usable without an account or database.
- **Tutor:** the course page passes only the selected lesson and completed lesson titles to the `/api/chat` route. The route validates the request, builds a mode-specific tutoring prompt, calls Groq server-side, and validates quiz JSON before returning it. The API key is never sent to the browser.
- **UI:** the dashboard summarizes completion and suggests the next incomplete lesson. The lesson page combines the lesson list, reading content, progress, and tutor.

## Trade-offs and challenges

- Local storage keeps this prototype simple, but progress is device- and browser-specific and has no account sync.
- Model output is non-deterministic. Quiz parsing rejects malformed responses, and the UI presents clear request failures; responses may still need review for factual quality.
- The AI integration requires an external API key and network access. The rest of the learning-progress experience works without that configuration.
- Context is deliberately limited to the current lesson and completed lesson titles to keep requests focused and avoid sending unnecessary learner data.

## Next improvements

1. Add accounts and server-side progress sync, with explicit privacy and retention controls.
2. Track study sessions and quiz attempts so the dashboard can show trends and recommend review based on demonstrated gaps.
3. Add citations or lesson references to tutor answers and evaluate generated explanations and quizzes against a curated test set.
4. Add loading/retry controls, request limits, and monitoring around the AI endpoint before exposing it to a larger audience.
5. Test usability with learners and prioritize accessibility, mobile layouts, and course authoring based on observed needs.
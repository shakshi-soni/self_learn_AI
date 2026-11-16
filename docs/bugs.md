# Known issues and limitations

This is a practical follow-up list, not a claim that every possible defect has been found. The repository currently has no automated test suite. Recheck these items as the app and its dependencies change.

## Known product limitations

| Priority | Item | Current behavior | Suggested next step |
| --- | --- | --- | --- |
| High before public scale | AI endpoint has no authentication or rate limiting | Anyone who can reach the deployed route may be able to request model completions and consume the configured Groq quota. | Add per-user or per-IP limits, usage budgets, monitoring, and an abuse-response plan. |
| Medium | Progress is browser-local | Progress is saved in `localStorage` and is not shared across browsers or devices. | Add accounts and server-side persistence only after defining privacy, retention, and deletion behavior. |
| Medium | Quiz results are temporary | Answers and scores disappear when the learner leaves or refreshes the lesson. | Persist attempts and timestamps if they will power review or progress features. |
| Medium | AI correctness is not independently verified | Quiz JSON is structurally validated, but the app does not verify that generated answers are pedagogically or factually correct. | Build a curated evaluation set and a report/feedback path for learners. |
| Low | Curriculum is static | Lesson changes require editing TypeScript and deploying the app. | Consider a reviewed content-authoring workflow if instructors need to update lessons. |
| Low | Progress-card copy is not state-specific | “Skills in progress” can appear when completion is zero, and completion wording can be repetitive. | Make the heading and supporting text reflect the learner's actual progress state. |
| Low | AI tutor navigation uses a default course | The shared navigation links to the Python course rather than remembering the learner's last course. | Link to a course chooser or preserve the last visited course if learners find this confusing. |

## Reliability and error behavior

- The AI route returns user-friendly status messages for missing configuration, rejected keys, rate limits, and general provider failures. The server logs provider errors under `[/api/chat]`; avoid putting API keys or private learner information in logs.
- A transient connection/time-out or selected provider server error is retried once. Other failures are not retried automatically.
- Browser storage reads and writes are wrapped so that blocked or unavailable storage does not crash the page. A storage failure can nevertheless make progress look empty or prevent it from being saved.
- The AI depends on the configured Groq service, model availability, network access, and account limits. The lesson and progress features do not depend on Groq.

## Diagnostics note

The current progress summary component is [`../components/ProgressOverview.tsx`](../components/ProgressOverview.tsx). An old `StatsRow.tsx` attachment shown in an editor is not part of this repository. If an editor reports diagnostics for that attachment, verify that the active workspace is the repository root and that the diagnostic points to a file in the project rather than a copied attachment.

## Reporting a new issue

When adding an issue, include:

1. A short title and whether it is a bug, a product limitation, or an improvement idea.
2. Steps to reproduce, the expected result, and the actual result.
3. Browser/OS and whether the app is local or deployed.
4. A sanitized error message or screenshot. Never include API keys, access tokens, or private learner data.

# Setup and deployment

## Requirements

- Node.js 20.9 or newer.
- npm 10 or newer.
- A Groq API key for tutor functionality. Lessons and progress tracking work without it.

## Local development

From PowerShell:

```powershell
git clone https://github.com/shakshi-soni/self_learn_AI.git
cd self_learn_AI
npm install
Copy-Item .env.example .env.local
```

Edit `.env.local` and set the key:

```text
GROQ_API_KEY=your_actual_groq_api_key
```

Then start the app:

```powershell
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000). Restart the development process after changing environment variables.

Do not commit `.env.local`, share the key in screenshots, or expose it through a `NEXT_PUBLIC_` variable. The root `.gitignore` excludes local environment files.

## Verification commands

```powershell
npm run typecheck
npm run build
npm start
```

Run `npm start` after a successful production build. There is no test or lint script configured currently.

## Vercel

1. Import the GitHub repository `shakshi-soni/self_learn_AI` in Vercel.
2. Use the repository root as the project root and allow Vercel to detect Next.js.
3. Open **Project Settings → Environment Variables**.
4. Add `GROQ_API_KEY` with the actual key from the Groq Console. Select Production, Preview, and Development environments as appropriate.
5. Save the setting and trigger a new deployment; an existing deployment does not automatically receive newly added values.
6. Open the deployed site and test one non-AI lesson flow and one AI tutor action.

The API key is used by the server-side [`../app/api/chat/route.ts`](../app/api/chat/route.ts) through [`../lib/groq.ts`](../lib/groq.ts). Never put the secret in client-side code or a public environment variable.

## Troubleshooting

| Symptom | Checks |
| --- | --- |
| `next` or `react` cannot be found | Run `npm install` from the repository root. |
| AI reports that it is not configured | Check the exact variable name `GROQ_API_KEY`; restart locally or redeploy on Vercel. |
| AI rejects the key | Generate or copy a valid key in the Groq Console and replace the environment value. Do not paste it into source code. |
| AI request is unavailable | Check the local dev terminal for `[/api/chat]` errors and confirm provider/model availability and account limits. |
| AI request is rate-limited | Wait and review Groq quota/usage. The app does not currently implement a user-specific quota. |
| Progress appears empty | Progress is stored per browser profile. Check the same browser and ensure its site data was not cleared. |
| Build fails after framework changes | Run `npm run typecheck`, inspect the first build error, and verify Node meets the version requirement. |

## Release checklist

- Confirm the Vercel project points to the intended GitHub repository and branch.
- Configure `GROQ_API_KEY` in the required Vercel environments.
- Confirm `.env.local`, API keys, and provider logs are not committed.
- Run `npm run typecheck` and `npm run build`.
- Smoke-test dashboard navigation, selecting a lesson, marking it complete, and the AI endpoint.
- Review provider usage limits. Add rate limiting, monitoring, and abuse controls before broad public sharing.

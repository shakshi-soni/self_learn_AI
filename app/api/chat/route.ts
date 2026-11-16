import { NextResponse } from "next/server";
import { getGroq, GROQ_MODEL } from "@/lib/groq";
import { buildSystemPrompt } from "@/lib/prompts";
import { parseQuiz } from "@/lib/quiz";
import type { ChatMode } from "@/types";

export const runtime = "nodejs";

const MODES: ChatMode[] = ["explain", "example", "hint", "quiz", "chat"];
const MAX_MESSAGE = 1000;

const QUIZ_QUESTION_SCHEMA = {
  type: "object",
  properties: {
    question: { type: "string" },
    options: {
      type: "object",
      properties: {
        a: { type: "string" },
        b: { type: "string" },
        c: { type: "string" },
        d: { type: "string" },
      },
      required: ["a", "b", "c", "d"],
      additionalProperties: false,
    },
    answerIndex: { type: "integer", minimum: 0, maximum: 3 },
    explanation: { type: "string" },
  },
  required: ["question", "options", "answerIndex", "explanation"],
  additionalProperties: false,
};

const QUIZ_RESPONSE_FORMAT = {
  type: "json_schema" as const,
  json_schema: {
    name: "lesson_quiz",
    strict: true,
    schema: {
      type: "object",
      properties: {
        quiz: {
          type: "object",
          properties: {
            q1: QUIZ_QUESTION_SCHEMA,
            q2: QUIZ_QUESTION_SCHEMA,
            q3: QUIZ_QUESTION_SCHEMA,
            q4: QUIZ_QUESTION_SCHEMA,
            q5: QUIZ_QUESTION_SCHEMA,
          },
          required: ["q1", "q2", "q3", "q4", "q5"],
          additionalProperties: false,
        },
      },
      required: ["quiz"],
      additionalProperties: false,
    },
  },
};

function fail(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function getErrorStatus(error: unknown): number | undefined {
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number"
  ) {
    return error.status;
  }
  return undefined;
}

function isTransientGroqError(error: unknown): boolean {
  const status = getErrorStatus(error);
  if (status !== undefined) {
    return status === 408 || status === 409 || status >= 500;
  }
  return error instanceof Error &&
    /connection|fetch failed|network|timeout|timed out|socket|econnreset|etimedout/i.test(
      `${error.name} ${error.message}`
    );
}

export async function POST(request: Request) {
  // 1. Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid request body.", 400);
  }
  if (!isRecord(body)) return fail("Invalid request body.", 400);

  // 2. Validate input
  const mode = body.mode as ChatMode;
  if (typeof body.mode !== "string" || !MODES.includes(mode)) {
    return fail("Invalid mode.", 400);
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (message.length > MAX_MESSAGE) {
    return fail(`Message must be ${MAX_MESSAGE} characters or fewer.`, 400);
  }
  if (mode === "chat" && !message) {
    return fail("Please type a question.", 400);
  }

  const lesson = body.lesson;
  if (
    !isRecord(lesson) ||
    typeof lesson.title !== "string" ||
    !lesson.title.trim() ||
    typeof lesson.content !== "string"
  ) {
    return fail("Missing lesson information.", 400);
  }

  const courseTitle = typeof body.courseTitle === "string" ? body.courseTitle : "Course";
  const completedLessons = Array.isArray(body.completedLessons)
    ? body.completedLessons
        .filter((t): t is string => typeof t === "string")
        .slice(0, 50)
    : [];

  // 3. Build prompt
  const system = buildSystemPrompt(mode, {
    courseTitle,
    lessonTitle: lesson.title,
    lessonContent: lesson.content,
    completedLessons,
  });

  const userContent =
    mode === "chat" ? message : "Please help me with the current lesson.";

  // 4. Call Groq
  try {
    const createCompletion = () =>
      getGroq().chat.completions.create({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: system },
          { role: "user", content: userContent },
        ],
        temperature: mode === "quiz" ? 0.4 : 0.6,
        max_tokens: mode === "quiz" ? 2500 : 600,
        ...(mode === "quiz" ? { response_format: QUIZ_RESPONSE_FORMAT } : {}),
      });

    let completion;
    try {
      completion = await createCompletion();
    } catch (error) {
      if (!isTransientGroqError(error)) throw error;
      console.warn("[/api/chat] transient Groq error; retrying once.");
      await new Promise((resolve) => setTimeout(resolve, 750));
      completion = await createCompletion();
    }

    const text = completion.choices[0]?.message?.content?.trim() ?? "";
    if (!text) return fail("The AI returned an empty response. Please try again.", 502);

    // 5. Respond
    if (mode === "quiz") {
      const quiz = parseQuiz(text);
      if (!quiz) {
        return fail("Could not generate a valid quiz. Please try again.", 502);
      }
      return NextResponse.json({ quiz });
    }

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("[/api/chat] error:", err);

    if (err instanceof Error && err.message.includes("GROQ_API_KEY")) {
      return fail("The AI service is not configured on the server.", 500);
    }
    const status = getErrorStatus(err);

    if (status === 429) {
      return fail("Too many requests right now. Please wait a moment and try again.", 429);
    }
    if (status === 401) {
      return fail("The AI service rejected the API key.", 500);
    }
    return fail("The AI service is unavailable. Please try again.", 502);
  }
}
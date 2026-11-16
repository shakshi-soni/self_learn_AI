import type { QuizQuestion } from "@/types";

const QUESTION_KEYS = ["q1", "q2", "q3", "q4", "q5"] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function cleanText(value: string): string {
  return value
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/__(.+?)__/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .trim();
}

export function parseQuiz(raw: string): QuizQuestion[] | null {
  try {
    const data: unknown = JSON.parse(raw);
    if (!isRecord(data)) return null;

    const quiz = data.quiz;
    if (!isRecord(quiz) || Object.keys(quiz).length !== QUESTION_KEYS.length) {
      return null;
    }

    const list = QUESTION_KEYS.map((key) => quiz[key]);

    const questions: QuizQuestion[] = [];
    for (const item of list) {
      if (!isRecord(item)) return null;

      const options = item.options;
      const idx = item.answerIndex;
      const optionValues = Array.isArray(options)
        ? options
        : isRecord(options) &&
            Object.keys(options).length === 4 &&
            ["a", "b", "c", "d"].every((key) => typeof options[key] === "string")
          ? ["a", "b", "c", "d"].map((key) => options[key])
          : null;
      if (
        typeof item.question !== "string" ||
        !item.question.trim() ||
        !optionValues ||
        optionValues.length !== 4 ||
        !optionValues.every((option) => typeof option === "string" && option.trim()) ||
        typeof idx !== "number" ||
        !Number.isInteger(idx) ||
        idx < 0 ||
        idx > 3 ||
        typeof item.explanation !== "string" ||
        !item.explanation.trim()
      ) {
        return null;
      }

      questions.push({
        question: cleanText(item.question),
        options: optionValues.map((option) => cleanText(option as string)),
        answerIndex: idx,
        explanation: cleanText(item.explanation),
      });
    }
    return questions.length === QUESTION_KEYS.length ? questions : null;
  } catch {
    return null;
  }
}
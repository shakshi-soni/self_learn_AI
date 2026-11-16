export type Lesson = { id: string; title: string; content: string };

export type Course = {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
};

export type ProgressMap = Record<string, boolean>; // lessonId -> completed

export type ChatMode = "explain" | "example" | "hint" | "quiz" | "chat";

export type QuizQuestion = {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};
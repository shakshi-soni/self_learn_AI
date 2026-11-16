import Groq from "groq-sdk";

export const GROQ_MODEL = "openai/gpt-oss-120b";

let client: Groq | null = null;

// Created lazily so the build doesn't fail when the key isn't set
export function getGroq(): Groq {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not set");
  }
  if (!client) {
    client = new Groq({ apiKey });
  }
  return client;
}
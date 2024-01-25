import { NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { initialProgrammerMessages } from "./messages";

export const runtime = "edge";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { content } = await req.json();
  console.log("server content", content);

  //   send content to openai
  const response = await openai.chat.completions.create({
    messages: [...initialProgrammerMessages, { role: "user", content }],
    model: "gpt-4-vision-preview",
    stream: true,
    max_tokens: 1000,
  });
  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}

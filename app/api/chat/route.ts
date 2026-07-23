import { z } from "zod";

import { retrievePortfolioKnowledge } from "@/lib/knowledge/cv-resource";
import { createPortfolioAgent } from "@/lib/mastra/portfolio-agent";

export const runtime = "nodejs";

const chatRequest = z.object({
  message: z.string().trim().min(1).max(1_000),
});

export async function POST(request: Request) {
  if (!process.env.GEMINI_API_KEY) {
    return Response.json(
      { error: "The portfolio assistant is being configured. Please try again soon." },
      { status: 503 },
    );
  }

  const parsed = chatRequest.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Please send a short question." }, { status: 400 });
  }

  try {
    const sources = retrievePortfolioKnowledge(parsed.data.message);
    const context = sources.map((source) => `[${source.title}]\n${source.content}`).join("\n\n");
    const agent = createPortfolioAgent(context);
    const result = await agent.generate(parsed.data.message);
    return Response.json({
      answer: result.text,
      sources: [...new Set(sources.map((source) => source.source))],
    });
  } catch (error) {
    console.error("Portfolio assistant failed", error);
    return Response.json(
      { error: "The portfolio assistant could not answer right now. Please try again shortly." },
      { status: 502 },
    );
  }
}

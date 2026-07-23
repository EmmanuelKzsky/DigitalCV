import { z } from "zod";

import { createPortfolioAgent } from "@/lib/mastra/portfolio-agent";

export const runtime = "nodejs";

const chatRequest = z.object({
  message: z.string().trim().min(1).max(1_000),
});

export async function POST(request: Request) {
  if (!process.env.AI_GATEWAY_API_KEY) {
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
    const agent = createPortfolioAgent();
    const result = await agent.generate(parsed.data.message, { maxSteps: 3 });
    return Response.json({
      answer: result.text,
      sources: ["CV"],
    });
  } catch (error) {
    console.error("Portfolio assistant failed", error);
    return Response.json(
      { error: "The portfolio assistant could not answer right now. Please try again shortly." },
      { status: 502 },
    );
  }
}

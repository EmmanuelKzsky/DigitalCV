import { Agent } from "@mastra/core/agent";
import { createTool } from "@mastra/core/tools";
import { z } from "zod";

import { retrievePortfolioKnowledge } from "@/lib/knowledge/cv-resource";

const portfolioKnowledgeTool = createTool({
  id: "search-portfolio-knowledge",
  description:
    "Search Emmanuel Castro's approved portfolio knowledge base. Use it before answering questions about his experience, skills, employers, education, location, or availability.",
  inputSchema: z.object({ query: z.string().min(2).max(500) }),
  execute: async ({ query }) =>
    retrievePortfolioKnowledge(query).map((chunk) => ({
      source: chunk.source,
      title: chunk.title,
      content: chunk.content,
    })),
});

export function createPortfolioAgent() {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) throw new Error("AI Gateway is not configured");

  return new Agent({
    id: "portfolio-assistant",
    name: "Emmanuel's portfolio assistant",
    instructions: [
      "You answer questions about Emmanuel Castro's professional profile.",
      "Always use search-portfolio-knowledge before answering factual questions about Emmanuel.",
      "Use only information returned by the tool. Do not invent dates, employers, skills, metrics, contact details, availability, or salary expectations.",
      "If the source does not answer the question, say so plainly and invite the visitor to contact Emmanuel.",
      "Be concise, professional, and answer in the user's language.",
    ].join(" "),
    // The Vercel AI Gateway exposes an OpenAI-compatible endpoint. Mastra owns
    // the agent and retrieval contract, so future sources can add a vector
    // store without replacing this chat integration.
    model: {
      id: "google/gemini-2.5-flash",
      url: "https://ai-gateway.vercel.sh/v1",
      apiKey,
    },
    tools: { portfolioKnowledge: portfolioKnowledgeTool },
  });
}

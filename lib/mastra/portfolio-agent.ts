import { Agent } from "@mastra/core/agent";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export function createPortfolioAgent(context: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("Gemini API is not configured");
  const google = createGoogleGenerativeAI({ apiKey });

  return new Agent({
    id: "portfolio-assistant",
    name: "Emmanuel's portfolio assistant",
    instructions: [
      "You answer questions about Emmanuel Castro's professional profile.",
      "Use only the provided portfolio context. Do not invent dates, employers, skills, metrics, contact details, availability, or salary expectations.",
      "If the source does not answer the question, say so plainly and invite the visitor to contact Emmanuel.",
      "Be concise, professional, and answer in the user's language.",
      `Portfolio context:\n${context}`,
    ].join(" "),
    // Mastra owns the agent and retrieval contract, so future sources can add
    // a vector store without replacing this chat integration.
    model: google("gemini-3-flash-preview"),
  });
}

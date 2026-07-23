import { cvProfile } from "@/lib/cv-profile";

export type KnowledgeChunk = {
  id: string;
  source: string;
  title: string;
  content: string;
};

/**
 * First knowledge resource for the portfolio assistant.
 *
 * The original PDF is deliberately not stored in git. This is its reviewed,
 * structured representation and is the first source in the RAG registry.
 */
export const cvKnowledgeResource: KnowledgeChunk[] = [
  {
    id: "cv-summary",
    source: "CV",
    title: "Professional summary",
    content: `${cvProfile.name} is a ${cvProfile.title} based in ${cvProfile.location}. ${cvProfile.summary} Core skills: ${cvProfile.skills.join(", ")}. Education: ${cvProfile.education}.`,
  },
  ...cvProfile.experience.map((job) => ({
    id: `cv-${job.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    source: "CV",
    title: `${job.company} - ${job.role} (${job.period})`,
    content: `${job.company}. Role: ${job.role}. Period: ${job.period}. ${job.highlights.join(" ")}`,
  })),
];

const stopWords = new Set([
  "about", "from", "have", "with", "that", "this", "what", "which", "your", "emmanuel", "does", "the", "and", "for", "are", "como", "para", "con", "del", "las", "los", "que", "una", "sus",
]);

function terms(value: string) {
  return [...new Set(value.toLowerCase().match(/[a-z0-9+#.]{2,}/g)?.filter((term) => !stopWords.has(term)) ?? [])];
}

/**
 * Retrieval boundary used by Mastra today. It returns the most relevant CV
 * passages and can later be replaced by the pgvector adapter without changing
 * the agent, API route, or chat UI.
 */
export function retrievePortfolioKnowledge(query: string, limit = 4): KnowledgeChunk[] {
  const queryTerms = terms(query);
  const scored = cvKnowledgeResource.map((chunk) => {
    const haystack = `${chunk.title} ${chunk.content}`.toLowerCase();
    const score = queryTerms.reduce((total, term) => total + (haystack.includes(term) ? 1 : 0), 0);
    return { chunk, score };
  });

  const matches = scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ chunk }) => chunk);

  return matches.length > 0 ? matches : cvKnowledgeResource.slice(0, Math.min(2, limit));
}

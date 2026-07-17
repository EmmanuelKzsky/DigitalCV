import { generateText } from "ai";
import mammoth from "mammoth";

import { cvProfile } from "@/lib/cv-profile";

export const runtime = "nodejs";
const MAX_FILE_SIZE = 8 * 1024 * 1024;

export async function POST(request: Request) {
  if (!process.env.AI_GATEWAY_API_KEY) return Response.json({ error: "AI Gateway is not configured yet. Add AI_GATEWAY_API_KEY in your Vercel project settings." }, { status: 503 });
  const formData = await request.formData();
  const template = formData.get("template");
  const role = String(formData.get("role") || "").slice(0, 500);
  if (!(template instanceof File)) return Response.json({ error: "Upload a PDF or Word template first." }, { status: 400 });
  if (template.size > MAX_FILE_SIZE) return Response.json({ error: "Please use a template smaller than 8 MB." }, { status: 413 });
  const isPdf = template.type === "application/pdf" || template.name.toLowerCase().endsWith(".pdf");
  const isDocx = template.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || template.name.toLowerCase().endsWith(".docx");
  if (!isPdf && !isDocx) return Response.json({ error: "Only PDF and .docx templates are supported." }, { status: 400 });

  let templateText = "";
  if (isDocx) templateText = (await mammoth.extractRawText({ buffer: Buffer.from(await template.arrayBuffer()) })).value.slice(0, 45_000);
  const prompt = `You are a precise resume editor. Adapt Emmanuel's resume to an employer template without inventing experience, employers, metrics, dates, credentials, or skills.\n\nTarget role: ${role || "Not provided"}\nCandidate profile: ${JSON.stringify(cvProfile)}\n${isDocx ? `Template text:\n${templateText}` : "The employer template is attached as a PDF. Infer its section order, headings, tone, and requested fields."}\n\nReturn only valid JSON with this structure: {"headline":"string","summary":"string","sectionOrder":["Summary"],"experience":[{"company":"string","role":"string","period":"string","bullets":["string"]}],"skills":["string"],"education":"string","notes":["string"]}. Use concise ATS-friendly wording. Keep all true work entries and make notes call out fields to review before submitting.`;
  const content: Array<Record<string, unknown>> = [{ type: "text", text: prompt }];
  if (isPdf) content.push({ type: "file", data: Buffer.from(await template.arrayBuffer()).toString("base64"), mediaType: "application/pdf" });
  try {
    const { text } = await generateText({ model: "google/gemini-2.5-flash", messages: [{ role: "user", content: content as never }], temperature: 0.2 });
    return Response.json({ document: JSON.parse(text.replace(/^```json\s*/i, "").replace(/```$/i, "").trim()) });
  } catch (error) {
    console.error("Template adaptation failed", error);
    return Response.json({ error: "The template could not be analyzed. Please try another PDF or .docx file." }, { status: 422 });
  }
}

"use client";

import { useState } from "react";
import { Document, HeadingLevel, Packer, Paragraph, TextRun } from "docx";
import { jsPDF } from "jspdf";
import { ArrowLeft, Download, FileText, FileUp, LoaderCircle, ShieldCheck, Sparkles, WandSparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cvProfile } from "@/lib/cv-profile";

type AdaptedDocument = {
  headline: string;
  summary: string;
  experience: Array<{ company: string; role: string; period: string; bullets: string[] }>;
  skills: string[];
  education: string;
  notes: string[];
};

const downloadBlob = (blob: Blob, name: string) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
};

const wrap = (pdf: jsPDF, text: string, x: number, y: number, width: number, height = 5) => {
  const lines = pdf.splitTextToSize(text, width);
  pdf.text(lines, x, y);
  return y + lines.length * height;
};

export default function ExportPage() {
  const [template, setTemplate] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [documentData, setDocumentData] = useState<AdaptedDocument | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function standardPdf() {
    const pdf = new jsPDF({ unit: "mm", format: "letter" });
    const x = 17;
    let y = 19;
    pdf.setFillColor(2, 9, 10);
    pdf.rect(0, 0, 216, 45, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text(cvProfile.name, x, y);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9.5);
    pdf.text(`${cvProfile.title}  |  ${cvProfile.location}`, x, y + 8);
    pdf.text(`${cvProfile.email}  |  ${cvProfile.phone}`, x, y + 15);
    y = 58;
    pdf.setTextColor(241, 251, 252);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.text("PROFILE", x, y);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9.3);
    y = wrap(pdf, cvProfile.summary, x, y + 7, 182) + 8;
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.text("EXPERIENCE", x, y);
    y += 7;
    cvProfile.experience.forEach((job) => {
      if (y > 245) { pdf.addPage(); y = 18; }
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9.7);
      pdf.text(`${job.company} — ${job.role}`, x, y);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(154, 184, 189);
      pdf.text(job.period, 199, y, { align: "right" });
      pdf.setTextColor(241, 251, 252);
      pdf.setFontSize(8.6);
      job.highlights.forEach((bullet) => { y = wrap(pdf, `• ${bullet}`, x + 2, y + 5, 178, 4.7) + 1; });
      y += 3;
    });
    if (y > 245) { pdf.addPage(); y = 18; }
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    pdf.text("SKILLS & EDUCATION", x, y);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    y = wrap(pdf, cvProfile.skills.join("  ·  "), x, y + 7, 182) + 5;
    wrap(pdf, cvProfile.education, x, y, 182);
    pdf.save("emmanuel-castro-resume.pdf");
  }

  async function wordDocument(adapted: AdaptedDocument | null = null) {
    const source = adapted ?? {
      headline: cvProfile.title,
      summary: cvProfile.summary,
      experience: cvProfile.experience.map((job) => ({ ...job, bullets: job.highlights })),
      skills: cvProfile.skills,
      education: cvProfile.education,
      notes: [],
    };
    const children = [
      new Paragraph({ text: cvProfile.name, heading: HeadingLevel.TITLE }),
      new Paragraph({ text: `${source.headline} | ${cvProfile.location}` }),
      new Paragraph({ text: `${cvProfile.email} | ${cvProfile.phone}` }),
      new Paragraph({ text: "PROFILE", heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: source.summary }),
      new Paragraph({ text: "EXPERIENCE", heading: HeadingLevel.HEADING_1 }),
      ...source.experience.flatMap((job) => [
        new Paragraph({ children: [new TextRun({ text: `${job.company} — ${job.role}`, bold: true })] }),
        new Paragraph({ text: job.period }),
        ...job.bullets.map((bullet) => new Paragraph({ text: bullet, bullet: { level: 0 } })),
      ]),
      new Paragraph({ text: "SKILLS", heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: source.skills.join(" · ") }),
      new Paragraph({ text: "EDUCATION", heading: HeadingLevel.HEADING_1 }),
      new Paragraph({ text: source.education }),
    ];
    downloadBlob(await Packer.toBlob(new Document({ sections: [{ children }] })), "emmanuel-castro-resume.docx");
  }

  async function adapt() {
    if (!template) return;
    setLoading(true);
    setError("");
    const form = new FormData();
    form.append("template", template);
    form.append("role", role);
    try {
      const response = await fetch("/api/adapt-template", { method: "POST", body: form });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || "Unable to analyze the template.");
      setDocumentData(body.document);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to analyze the template.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="section-kicker">Export this</p>
        <div className="mt-4 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end"><div>
          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.93] tracking-[-0.055em] text-white sm:text-7xl">A résumé ready for the format you need.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Download the standard editable résumé, or add an employer&apos;s PDF or Word template and let AI tailor the content to its section order.</p>
        </div><div className="rounded-2xl border border-border/30 bg-card/70 p-6 backdrop-blur-sm"><p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-400">Your data stays intentional</p><p className="mt-3 text-sm leading-6 text-muted-foreground">The source résumé is not stored in this repository. Exports are generated from portfolio data, and template files are used only for the current request.</p></div></div>
      </section>
      <section className="border-y border-border/20 bg-[#030f14] px-5 py-16 sm:px-8"><div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-border/20 bg-card p-7 text-white sm:p-9"><div className="flex size-11 items-center justify-center rounded-xl bg-cyan-400 text-background"><FileText className="size-5" /></div><p className="mt-9 font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">01 / Standard résumé</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Clean, ATS-friendly and yours.</h2><p className="mt-4 max-w-md leading-7 text-muted-foreground">Generate a polished PDF or an editable Word version from this portfolio—no original document is shipped with the project.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button onClick={standardPdf} className="rounded-full bg-cyan-400 text-background hover:bg-cyan-300"><Download className="size-4" /> Download PDF</Button><Button onClick={() => wordDocument()} variant="outline" className="rounded-full border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"><Download className="size-4" /> Download Word</Button></div></article>
        <article className="rounded-2xl border border-border/20 bg-card/50 p-7 sm:p-9"><div className="flex size-11 items-center justify-center rounded-xl bg-background text-cyan-300"><WandSparkles className="size-5" /></div><p className="mt-9 font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">02 / Employer template</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">Adapt your story to their format.</h2><p className="mt-4 max-w-md leading-7 text-muted-foreground">Upload an employer PDF or .docx. AI reads the headings and structure, then prepares an editable Word version aligned to it.</p><label className="mt-7 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border/30 bg-white/5 px-4 py-4 text-sm font-medium text-white transition-colors hover:border-cyan-400/40 hover:bg-white/10"><FileUp className="size-5 text-cyan-400" /><span className="truncate">{template ? template.name : "Choose a PDF or .docx template"}</span><input className="sr-only" type="file" accept="application/pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={(event) => { setTemplate(event.target.files?.[0] ?? null); setDocumentData(null); }} /></label><input value={role} onChange={(event) => setRole(event.target.value)} placeholder="Target role or job description (optional)" className="mt-3 h-12 w-full rounded-xl border border-border/20 bg-background px-4 text-sm text-white placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-cyan-400/40" /><Button disabled={!template || loading} onClick={adapt} className="mt-3 w-full rounded-xl bg-cyan-500 text-background hover:bg-cyan-400">{loading ? <LoaderCircle className="size-4 animate-spin" /> : <Sparkles className="size-4" />}{loading ? "Adapting your résumé…" : "Adapt with AI"}</Button>{error && <p className="mt-3 text-sm text-red-400">{error}</p>}</article>
      </div></section>
      {documentData && <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24"><div className="grid gap-8 rounded-3xl border border-border/20 bg-card p-7 shadow-[0_20px_70px_rgba(2,9,10,0.3)] sm:p-10 lg:grid-cols-[1fr_auto]"><div><p className="section-kicker">Ready to review</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">{documentData.headline}</h2><p className="mt-4 max-w-3xl leading-7 text-muted-foreground">{documentData.summary}</p><div className="mt-7 grid gap-3 sm:grid-cols-2">{documentData.notes.map((note) => <p key={note} className="flex gap-2 rounded-xl bg-cyan-400/10 p-3 text-sm leading-6 text-cyan-200 border border-cyan-400/10"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-cyan-400" />{note}</p>)}</div></div><div className="flex flex-col justify-end gap-3"><Button onClick={() => wordDocument(documentData)} className="rounded-full bg-cyan-400 px-5 text-background hover:bg-cyan-300"><Download className="size-4" /> Download tailored Word</Button><p className="max-w-xs text-xs leading-5 text-muted-foreground">Review the editable copy before submitting.</p></div></div></section>}
    </main>
  );
}

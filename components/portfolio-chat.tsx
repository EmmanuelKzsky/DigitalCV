"use client";

import { FormEvent, useRef, useState } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Message = { role: "assistant" | "user"; text: string };

const starterQuestions = ["What is Emmanuel's tech stack?", "Tell me about his latest role", "Does he have cloud experience?"];

export function PortfolioChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi, I can answer questions about Emmanuel's professional experience, technical stack, and past roles." },
  ]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function ask(question: string) {
    const message = question.trim();
    if (!message || isSending) return;

    setMessages((current) => [...current, { role: "user", text: message }]);
    setError(null);
    setIsSending(true);
    if (inputRef.current) inputRef.current.value = "";

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const payload = (await response.json()) as { answer?: string; error?: string };
      const answer = payload.answer;
      if (!response.ok || !answer) throw new Error(payload.error || "Unable to answer");
      setMessages((current) => [...current, { role: "assistant", text: answer }]);
    } catch (chatError) {
      setError(chatError instanceof Error ? chatError.message : "Unable to answer right now.");
    } finally {
      setIsSending(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    ask(inputRef.current?.value || "");
  }

  return (
    <div className="fixed bottom-5 right-20 z-[60]">
      {open && (
        <section aria-label="Ask about Emmanuel" className="animate-scale-in absolute bottom-14 right-0 flex h-[min(32rem,calc(100vh-7.5rem))] w-[min(25rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-cyan-400/25 bg-[#061923]/98 shadow-[0_22px_80px_rgba(0,0,0,0.62)] backdrop-blur-xl">
          <header className="flex items-start justify-between border-b border-cyan-400/15 px-4 py-4">
            <div className="flex gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-cyan-400 text-background"><Sparkles className="size-4" /></div>
              <div><h2 className="font-semibold text-white">Ask about Emmanuel</h2><p className="mt-0.5 text-xs text-cyan-100/65">Grounded in his CV</p></div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close portfolio assistant" className="rounded-md p-1.5 text-cyan-100/65 transition hover:bg-cyan-400/10 hover:text-cyan-100"><X className="size-4" /></button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-8 rounded-2xl rounded-br-sm bg-cyan-400 px-3 py-2 text-sm leading-6 text-background" : "mr-5 rounded-2xl rounded-bl-sm border border-cyan-400/15 bg-black/20 px-3 py-2 text-sm leading-6 text-cyan-50/90"}>
                {message.role === "user" ? message.text : (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                      strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                      ul: ({ children }) => <ul className="my-2 list-disc space-y-1 pl-5 marker:text-cyan-300">{children}</ul>,
                      ol: ({ children }) => <ol className="my-2 list-decimal space-y-1 pl-5 marker:text-cyan-300">{children}</ol>,
                      li: ({ children }) => <li>{children}</li>,
                      a: ({ children, href }) => <a href={href} target="_blank" rel="noreferrer" className="font-medium text-cyan-300 underline decoration-cyan-300/50 underline-offset-2 hover:text-cyan-100">{children}</a>,
                      code: ({ children }) => <code className="rounded bg-cyan-400/10 px-1 py-0.5 font-mono text-[0.8em] text-cyan-100">{children}</code>,
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                )}
              </div>
            ))}
            {isSending && <div className="mr-5 w-fit rounded-2xl rounded-bl-sm border border-cyan-400/15 bg-black/20 px-3 py-2 text-sm text-cyan-100/70">Searching the portfolio knowledge base...</div>}
            {error && <p className="rounded-lg border border-red-400/25 bg-red-400/10 px-3 py-2 text-xs leading-5 text-red-100">{error}</p>}
          </div>

          {messages.length === 1 && <div className="flex gap-2 overflow-x-auto px-4 pb-3">{starterQuestions.map((question) => <button key={question} type="button" onClick={() => ask(question)} className="shrink-0 rounded-full border border-cyan-400/20 px-3 py-1.5 text-xs text-cyan-100/80 transition hover:border-cyan-400/60 hover:bg-cyan-400/10">{question}</button>)}</div>}
          <form onSubmit={onSubmit} className="flex gap-2 border-t border-cyan-400/15 p-3">
            <input ref={inputRef} disabled={isSending} maxLength={1_000} placeholder="Ask a question..." className="min-w-0 flex-1 rounded-xl border border-cyan-400/20 bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-cyan-100/35 focus:border-cyan-400/60 disabled:opacity-50" />
            <button type="submit" disabled={isSending} aria-label="Send question" className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400 text-background transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"><Send className="size-4" /></button>
          </form>
        </section>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close portfolio assistant" : "Ask about Emmanuel"} aria-expanded={open} className="group flex size-11 items-center justify-center rounded-full bg-cyan-400 text-background shadow-[0_12px_32px_rgba(2,9,10,0.5)] transition-transform hover:-translate-y-1 hover:bg-cyan-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400"><Bot className="size-5" aria-hidden="true" /><span className="pointer-events-none absolute bottom-full right-0 mb-3 w-max rounded-lg bg-card px-3 py-2 text-xs font-medium leading-5 text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">Ask about Emmanuel</span></button>
    </div>
  );
}

"use client";

import { type ReactNode, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function TechnologyTooltip({ children, content }: { children: ReactNode; content: string }) {
  const trigger = useRef<HTMLSpanElement>(null);
  const [position, setPosition] = useState<{ left: number; top: number } | null>(null);
  const show = () => {
    const rect = trigger.current?.getBoundingClientRect();
    if (rect) setPosition({ left: rect.left + rect.width / 2, top: rect.top - 10 });
  };
  return <span ref={trigger} className="relative block shrink-0" onMouseEnter={show} onMouseLeave={() => setPosition(null)} onFocus={show} onBlur={() => setPosition(null)}>{children}{position && createPortal(<span role="tooltip" style={{ left: position.left, top: position.top }} className="pointer-events-none fixed z-[100] w-max max-w-52 -translate-x-1/2 -translate-y-full rounded-lg bg-[#09090b] px-3 py-2 text-center text-[11px] font-medium leading-4 text-white shadow-2xl">{content}</span>, document.body)}</span>;
}

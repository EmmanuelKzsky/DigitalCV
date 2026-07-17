"use client";

import { ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation";

export function InternalNavigation() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#09090b]/90 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="/" className="font-mono text-sm font-semibold tracking-[0.18em]">EC<span className="text-blue-400">.</span></a>
        <div className="flex items-center gap-1 sm:gap-3">
          <a href="/#experience" className="hidden rounded-md px-2.5 py-1.5 text-sm text-zinc-300 hover:bg-white/10 hover:text-white sm:inline-flex">Experience</a>
          <a href="/#expertise" className="hidden rounded-md px-2.5 py-1.5 text-sm text-zinc-300 hover:bg-white/10 hover:text-white sm:inline-flex">Expertise</a>
          <a href="/export" className="hidden rounded-md px-2.5 py-1.5 text-sm text-zinc-300 hover:bg-white/10 hover:text-white sm:inline-flex">Export this</a>
          <a href="/github" className="hidden rounded-md px-2.5 py-1.5 text-sm text-zinc-300 hover:bg-white/10 hover:text-white sm:inline-flex">My GitHub</a>
          <a href="mailto:Emmanuel.castro.pantoja@gmail.com" className="inline-flex items-center gap-1 rounded-full bg-blue-400 px-4 py-1.5 text-sm font-medium text-[#09090b] hover:bg-blue-300">Let&apos;s talk <ArrowUpRight className="size-4" /></a>
        </div>
      </div>
    </nav>
  );
}

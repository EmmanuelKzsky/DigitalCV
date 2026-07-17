import { FaGithub } from "react-icons/fa";

export function GitHubProjectLink() {
  return <a href="https://github.com/EmmanuelKzsky/DigitalCV" target="_blank" rel="noreferrer" aria-label="Use this project as a CV template" className="group fixed bottom-5 right-5 z-[60] flex size-11 items-center justify-center rounded-full bg-[#07110f] text-white shadow-[0_12px_32px_rgba(7,17,15,0.3)] transition-transform hover:-translate-y-1 hover:bg-emerald-500 hover:text-[#07110f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"><FaGithub className="size-5" aria-hidden="true" /><span className="pointer-events-none absolute bottom-full right-0 mb-3 w-max max-w-56 rounded-lg bg-[#07110f] px-3 py-2 text-xs font-medium leading-5 text-white opacity-0 shadow-xl transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">Use this project as a CV template</span></a>;
}

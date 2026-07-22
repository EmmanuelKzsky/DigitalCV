import { ArrowUpRight, Clock3, GitBranch, GitCommitHorizontal, LockKeyhole } from "lucide-react";

const Github = GitBranch;

type Repo = { id: number; name: string; description: string | null; private: boolean; html_url: string; language: string | null; pushed_at: string };
type CardRepo = Repo & { latestChange: string; latestChangeDate: string };
const headers: HeadersInit = process.env.GITHUB_TOKEN ? { Accept: "application/vnd.github+json", Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, "X-GitHub-Api-Version": "2022-11-28" } : { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };

async function getRepos(): Promise<CardRepo[]> {
  const endpoint = process.env.GITHUB_TOKEN ? "https://api.github.com/user/repos?affiliation=owner&per_page=100&sort=updated&direction=desc" : "https://api.github.com/users/EmmanuelKzsky/repos?per_page=100&sort=updated&direction=desc";
  const response = await fetch(endpoint, { headers, next: { revalidate: 300 } });
  if (!response.ok) throw new Error("GitHub API unavailable");
  const repos = await response.json() as Repo[];
  return Promise.all(repos.map(async (repo) => {
    try { const commits = await fetch(`https://api.github.com/repos/EmmanuelKzsky/${repo.name}/commits?per_page=1`, { headers, next: { revalidate: 300 } }); const [commit] = await commits.json() as Array<{ commit: { message: string; author: { date: string } } }>; return { ...repo, latestChange: commit?.commit.message.split("\n")[0] ?? "No commits available", latestChangeDate: commit?.commit.author.date ?? repo.pushed_at }; }
    catch { return { ...repo, latestChange: "Recently updated", latestChangeDate: repo.pushed_at }; }
  }));
}

const relative = (date: string) => { const days = Math.max(0, Math.floor((Date.now() - new Date(date).getTime()) / 86_400_000)); if (days === 0) return "today"; if (days === 1) return "yesterday"; if (days < 30) return `${days} days ago`; const months = Math.floor(days / 30); return `${months} month${months === 1 ? "" : "s"} ago`; };

function RepoCard({ repo }: { repo: CardRepo }) {
  const content = <>
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="truncate text-xl font-semibold tracking-tight text-white">{repo.name}</h2>
          {repo.private && <span className="inline-flex items-center gap-1 rounded-full bg-background/80 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground border border-border/20"><LockKeyhole className="size-3" /> Private</span>}
        </div>
        <p className="mt-2 min-h-10 text-sm leading-5 text-muted-foreground">{repo.description || "A repository by Emmanuel Castro."}</p>
      </div>
      {!repo.private && <ArrowUpRight className="mt-1 size-5 shrink-0 text-cyan-400" />}
    </div>
    <div className="mt-7 border-t border-border/20 pt-4">
      <div className="flex items-center gap-2 text-sm font-medium text-white">
        <GitCommitHorizontal className="size-4 text-cyan-400" />
        <span className="truncate">{repo.latestChange}</span>
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
        <Clock3 className="size-3.5" /> Updated {relative(repo.latestChangeDate)}{repo.language && <><span>·</span><span>{repo.language}</span></>}
      </div>
    </div>
  </>;
  const classes = "group rounded-2xl border border-border/20 bg-card p-6 transition-all hover:border-cyan-400/30 hover:shadow-[0_18px_45px_rgba(2,9,10,0.4)]";
  return repo.private ? <article className={classes}>{content}</article> : <a href={repo.html_url} target="_blank" rel="noreferrer" className={classes}>{content}</a>;
}

export const dynamic = "force-dynamic";
export default async function GitHubPage() {
  let repos: CardRepo[] = []; let unavailable = false;
  try { repos = await getRepos(); } catch { unavailable = true; }
  const publicRepos = repos.filter((repo) => !repo.private).sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at));
  const privateRepos = repos.filter((repo) => repo.private).sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at));
  return (
    <main className="min-h-screen bg-background text-white">
      <nav className="border-b border-border/30 bg-background/90 text-white backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="/" className="font-mono text-sm font-semibold tracking-[0.18em]">EC<span className="text-cyan-400">.</span></a>
          <a href="/export" className="text-sm text-muted-foreground hover:text-white transition-colors">Export this</a>
        </div>
      </nav>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="section-kicker">My GitHub</p>
        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl">Work in progress, in public.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Repositories are read live from the GitHub API. Public work appears first and links to its source; private work is listed without a public link.</p>
          </div>
          <a href="https://github.com/EmmanuelKzsky" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-muted-foreground hover:text-cyan-300 transition-colors"><Github className="size-4" /> @EmmanuelKzsky <ArrowUpRight className="size-4" /></a>
        </div>
      </section>
      {unavailable ? (
        <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
          <p className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5 text-cyan-200">GitHub could not be reached right now. Please try again shortly.</p>
        </section>
      ) : (
        <>
          <section className="border-y border-border/20 bg-[#030f14] px-5 py-16 sm:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="mb-8 flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-cyan-400/15 text-sm font-semibold text-cyan-300 border border-cyan-400/20">{publicRepos.length}</span>
                <h2 className="text-2xl font-semibold tracking-tight text-white">Public repositories</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{publicRepos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}</div>
            </div>
          </section>
          {privateRepos.length > 0 && (
            <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
              <div className="mb-8 flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-background text-sm font-semibold text-white border border-border/20">{privateRepos.length}</span>
                <h2 className="text-2xl font-semibold tracking-tight text-white">Private repositories</h2>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{privateRepos.map((repo) => <RepoCard key={repo.id} repo={repo} />)}</div>
            </section>
          )}
        </>
      )}
    </main>
  );
}

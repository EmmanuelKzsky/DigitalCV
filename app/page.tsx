import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  BrainCircuit,
  CloudCog,
  Code2,
  Database,
  Download,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { FaAws, FaJava, FaUsersCog } from "react-icons/fa";
import {
  SiAngular,
  SiAnthropic,
  SiArgo,
  SiCheckmarx,
  SiCircleci,
  SiClaude,
  SiCypress,
  SiCursor,
  SiDatadog,
  SiDocker,
  SiGooglecloud,
  SiHelm,
  SiJenkins,
  SiJest,
  SiKubernetes,
  SiMongodb,
  SiNestjs,
  SiNewrelic,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiOpsgenie,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiRubyonrails,
  SiSentry,
  SiSonarqubecloud,
  SiSplunk,
  SiSpring,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
  SiWindsurf,
} from "react-icons/si";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TechnologyTooltip } from "@/components/technology-tooltip";

const experience = [
  {
    company: "Wizeline",
    role: "Lead Fullstack Engineer",
    period: "Mar 2025 — Present",
    featured: true,
    summary:
      "Leading modern product delivery across React frontends, NestJS services and AWS infrastructure.",
    highlights: [
      "Build React interfaces with MUI, Tailwind CSS and Zustand, backed by NestJS services using Knex and TypeORM.",
      "Run production workloads on AWS EKS with Docker, Helm, CloudFormation, CircleCI and ArgoCD.",
      "Designed rollout and blue/green delivery workflows, including custom Helm charts and reusable CircleCI orbs.",
      "Implemented AI-assisted workflows with custom Claude Code skills, Mastra AI and AWS Bedrock.",
      "Monitor reliability and security with New Relic, Splunk, OpsGenie, SonarQube and Checkmarx.",
    ],
    stack: ["React", "NestJS", "AWS", "Kubernetes", "Bedrock"],
  },
  {
    company: "Deloitte",
    role: "Senior Fullstack Engineer",
    period: "Apr 2024 — Mar 2025",
    summary:
      "Evolved a customer CRM across its user experience, services and cloud delivery pipeline.",
    highlights: [
      "Maintained Vue and React interfaces with Tailwind, Quasar and PrimeVue, delivering pixel-accurate product screens.",
      "Updated Spring and Ruby on Rails services and managed MongoDB-backed functionality.",
      "Delivered containerized releases through GCP Cloud Build and monitored production with Datadog and Sentry.",
      "Integrated Authorize.net payments and AI-driven user behavior insights for administrators.",
    ],
    stack: ["Vue", "React", "GCP", "Rails", "MongoDB"],
  },
  {
    company: "Cognizant",
    role: "Senior Fullstack Engineer",
    period: "Oct 2023 — Apr 2024",
    summary:
      "Built and operated tooling for monitoring daily data jobs across GCP environments.",
    highlights: [
      "Maintained a React monitoring application and Node.js jobs deployed on GCP.",
      "Investigated customer file issues across GCP buckets and Kubernetes environments.",
      "Shipped releases with Jenkins and resolved production issues using Kibana and Sentry.",
    ],
    stack: ["React", "Node.js", "GCP", "Kubernetes", "Jenkins"],
  },
  {
    company: "UST Global",
    role: "Senior Fullstack Engineer / UI Lead",
    period: "Aug 2018 — Aug 2023",
    summary:
      "Led a five-year modernization program spanning distributed UI architecture, backend jobs and release quality.",
    highlights: [
      "Migrated two applications to Java and Angular and modernized a legacy monorepo into a distributed React/React Native UI.",
      "Built and maintained four scheduled Node.js jobs running on GCP.",
      "Owned UI engineering standards, pull-request review, roadmap planning and customer communication.",
      "Improved application build and load times while expanding automated test coverage.",
      "Strengthened security and delivery with Black Duck, Coverity, SonarQube, Octopus Deploy, TFS and Docker.",
    ],
    stack: ["React", "Angular", "Node.js", "GCP", "DevOps"],
  },
  {
    company: "Improving",
    role: "PM / Lead / Senior Fullstack Engineer",
    period: "Sep 2017 — Aug 2018",
    summary:
      "Combined hands-on engineering, delivery planning and early-stage team leadership.",
    highlights: [
      "Created an Angular application from scratch and maintained Java and React/Redux products.",
      "Managed a seven-person team through the beginning of a new project.",
      "Planned releases and maintained direct communication with customer stakeholders.",
    ],
    stack: ["Angular", "React", "Redux", "Java", "Leadership"],
  },
  {
    company: "HCL Technologies",
    role: "Senior Fullstack Engineer",
    period: "Feb 2017 — Sep 2017",
    summary:
      "Automated delivery workflows and maintained enterprise dashboards across Angular, React and Java.",
    highlights: [
      "Created Angular components integrated with ServiceNow.",
      "Maintained a dashboard built with Java, Neo4j, React and GraphQL.",
      "Turned manual conflict-resolution tasks into faster automated workflows.",
    ],
    stack: ["Angular", "React", "GraphQL", "Neo4j", "ServiceNow"],
  },
  {
    company: "Jaguar Labs",
    role: "Fullstack Lead / Developer",
    period: "Jun 2016 — Feb 2017",
    summary:
      "Delivered startup products and high-concurrency solutions for payments, devices and scheduling.",
    highlights: [
      "Created multiple products with Java, Angular and React.",
      "Improved payment charge processing and distribution of funds.",
      "Designed integrations between electronic devices across customer offices and optimized concurrent routes and appointments.",
    ],
    stack: ["Java", "Angular", "React", "Payments"],
  },
  {
    company: "IsWeb AllDigital",
    role: "Fullstack Engineer",
    period: "Nov 2015 — Jun 2016",
    summary:
      "Built web products, APIs, mapping and live-tracking experiences for field operations.",
    highlights: [
      "Created products with Node.js, Angular and React and delivered Java/Node.js APIs.",
      "Implemented Google Maps, live user tracking and optimized sales routes.",
      "Built insurance budget calculations for the automotive sector.",
    ],
    stack: ["Node.js", "React", "Angular", "Maps"],
  },
  {
    company: "Vinos América",
    role: "Fullstack Engineer",
    period: "Feb 2015 — Nov 2015",
    summary:
      "Digitized warehouse operations, product control and communication between business devices.",
    highlights: [
      "Developed customer applications for warehouse and SKU control.",
      "Built Java and Node.js APIs and new React product features.",
      "Created two mobile applications with React.",
    ],
    stack: ["React", "Node.js", "Java", "Mobile"],
  },
  {
    company: "BPEJ",
    role: "Fullstack Engineer",
    period: "Apr 2014 — Feb 2015",
    summary:
      "Started a career in fullstack engineering by solving large-scale data retrieval and library management challenges.",
    highlights: [
      "Implemented UI and backend solutions for library management.",
      "Built Java and Node.js APIs and delivered React features.",
      "Optimized queries across millions of records to return information faster.",
    ],
    stack: ["React", "Node.js", "Java", "SQL"],
  },
];

const capabilities = [
  {
    icon: Code2,
    title: "Product engineering",
    tools: [
      { name: "React", icon: SiReact, color: "#087EA4" },
      { name: "Next.js", icon: SiNextdotjs, color: "#111111" },
      { name: "Vue", icon: SiVuedotjs, color: "#42B883" },
      { name: "Angular", icon: SiAngular, color: "#DD0031" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    icon: CloudCog,
    title: "Cloud & platform",
    tools: [
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "Google Cloud", icon: SiGooglecloud, color: "#4285F4" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Helm", icon: SiHelm, color: "#0F1689" },
      { name: "CircleCI", icon: SiCircleci, color: "#343434" },
      { name: "ArgoCD", icon: SiArgo, color: "#EF7B4D" },
      { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
    ],
  },
  {
    icon: Database,
    title: "Backend & data",
    tools: [
      { name: "NestJS", icon: SiNestjs, color: "#E0234E" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Java", icon: FaJava, color: "#E76F00" },
      { name: "OpenJDK", icon: SiOpenjdk, color: "#437291" },
      { name: "Spring", icon: SiSpring, color: "#6DB33F" },
      { name: "Rails", icon: SiRubyonrails, color: "#D30001" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Quality & reliability",
    tools: [
      { name: "Jest", icon: SiJest, color: "#C21325" },
      { name: "Cypress", icon: SiCypress, color: "#17202C" },
      { name: "SonarQube", icon: SiSonarqubecloud, color: "#4E9BCD" },
      { name: "Checkmarx", icon: SiCheckmarx, color: "#54B948" },
      { name: "Splunk", icon: SiSplunk, color: "#111111" },
      { name: "New Relic", icon: SiNewrelic, color: "#1CE783" },
      { name: "Datadog", icon: SiDatadog, color: "#632CA6" },
      { name: "Sentry", icon: SiSentry, color: "#362D59" },
      { name: "Opsgenie", icon: SiOpsgenie, color: "#2684FF" },
    ],
  },
  {
    icon: BrainCircuit,
    title: "Applied AI",
    tools: [
      { name: "Claude", icon: SiClaude, color: "#D97757" },
      { name: "Anthropic", icon: SiAnthropic, color: "#191919" },
      { name: "Cursor", icon: SiCursor, color: "#111111" },
      { name: "Windsurf", icon: SiWindsurf, color: "#0B85F3" },
      { name: "AWS Bedrock", icon: BrainCircuit, color: "#8B5CF6" },
      { name: "Mastra AI", icon: Sparkles, color: "#059669" },
    ],
  },
  {
    icon: Sparkles,
    title: "Technical leadership",
    tools: [
      { name: "Architecture", icon: CloudCog, color: "#047857" },
      { name: "Engineering", icon: Code2, color: "#0F766E" },
      { name: "Mentoring", icon: FaUsersCog, color: "#7C3AED" },
      { name: "Quality", icon: ShieldCheck, color: "#0284C7" },
      { name: "Data", icon: Database, color: "#EA580C" },
      { name: "Innovation", icon: Sparkles, color: "#D97706" },
    ],
  },
];

const technologyExperience: Record<string, string> = {
  "React": "11+ years of experience · since 2015", "Next.js": "1+ year of experience · since 2025", "Vue": "2+ years of experience · since 2024", "Angular": "12+ years of experience · since 2014", "TypeScript": "9+ years of experience · since 2017", "Tailwind": "2+ years of experience · since 2024", "AWS": "1+ year of experience · since 2025", "Google Cloud": "8+ years of experience · since 2018", "Kubernetes": "3+ years of experience · since 2023", "Docker": "9+ years of experience · since 2017", "Helm": "1+ year of experience · since 2025", "CircleCI": "1+ year of experience · since 2025", "ArgoCD": "1+ year of experience · since 2025", "Jenkins": "3+ years of experience · since 2023", "NestJS": "1+ year of experience · since 2025", "Node.js": "12+ years of experience · since 2014", "Java": "12+ years of experience · since 2014", "OpenJDK": "8+ years of experience · since 2018", "Spring": "2+ years of experience · since 2024", "Rails": "2+ years of experience · since 2024", "Python": "Production experience", "PostgreSQL": "Production experience", "MongoDB": "2+ years of experience · since 2024", "Prisma": "1+ year of experience · since 2025", "Jest": "8+ years of experience · since 2018", "Cypress": "8+ years of experience · since 2018", "SonarQube": "8+ years of experience · since 2018", "Checkmarx": "1+ year of experience · since 2025", "Splunk": "1+ year of experience · since 2025", "New Relic": "1+ year of experience · since 2025", "Datadog": "2+ years of experience · since 2024", "Sentry": "3+ years of experience · since 2023", "Opsgenie": "1+ year of experience · since 2025", "Claude": "1+ year of experience · since 2025", "Anthropic": "1+ year of experience · since 2025", "Cursor": "1+ year of experience · since 2025", "Windsurf": "1+ year of experience · since 2025", "AWS Bedrock": "1+ year of experience · since 2025", "Mastra AI": "1+ year of experience · since 2025", "Architecture": "9+ years of experience · since 2017", "Engineering": "12+ years of experience · since 2014", "Mentoring": "9+ years of experience · since 2017", "Quality": "8+ years of experience · since 2018", "Data": "12+ years of experience · since 2014", "Innovation": "9+ years of experience · since 2017",
};

const companies = [
  { name: "Wizeline", logo: "/company-wizeline.png" },
  { name: "Deloitte", logo: "/company-deloitte.png" },
  { name: "Cognizant", logo: "/company-cognizant.png" },
  { name: "UST Global", logo: "/company-ust.png" },
  { name: "Improving", logo: "/company-improving.png" },
  { name: "HCLTech", logo: "/company-hcl.png" },
  { name: "Jaguar Labs", logo: "/company-jaguar.png" },
  { name: "IsWeb AllDigital", mark: "IA" },
  { name: "Vinos América", mark: "VA" },
  { name: "BPEJ", mark: "BP" },
];

export default function Home() {
  return (
    <main>
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#07110f]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="font-mono text-sm font-semibold tracking-[0.18em] text-white">
            EC<span className="text-emerald-400">.</span>
          </a>
          <div className="flex items-center gap-1 sm:gap-3">
            <Button nativeButton={false} render={<a href="#experience" />} variant="ghost" size="sm" className="hidden text-zinc-300 hover:bg-white/10 hover:text-white sm:inline-flex">
              Experience
            </Button>
            <Button nativeButton={false} render={<a href="#expertise" />} variant="ghost" size="sm" className="hidden text-zinc-300 hover:bg-white/10 hover:text-white sm:inline-flex">
              Expertise
            </Button>
            <Button nativeButton={false} render={<a href="/export" />} variant="ghost" size="sm" className="hidden text-zinc-300 hover:bg-white/10 hover:text-white sm:inline-flex">
              Export this
            </Button>
            <Button nativeButton={false} render={<a href="/github" />} variant="ghost" size="sm" className="hidden text-zinc-300 hover:bg-white/10 hover:text-white sm:inline-flex">
              My GitHub
            </Button>
            <Button nativeButton={false} render={<a href="mailto:Emmanuel.castro.pantoja@gmail.com" />} size="sm" className="rounded-full bg-emerald-400 px-4 text-[#07110f] hover:bg-emerald-300">
              Let&apos;s talk <ArrowUpRight className="size-4" />
            </Button>
          </div>
        </div>
      </nav>

      <section id="top" className="relative overflow-hidden bg-[#07110f] text-white">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[72%]" aria-hidden="true">
          <Image
            src="/hero-uml-software-v2.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 72vw, 100vw"
            className="object-cover object-right opacity-65 lg:opacity-85"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#07110f_0%,rgba(7,17,15,0.96)_18%,rgba(7,17,15,0.58)_50%,rgba(7,17,15,0.12)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#07110f_0%,transparent_34%,rgba(7,17,15,0.2)_100%)]" />
        </div>
        <div className="hero-grid absolute inset-0 opacity-35" aria-hidden="true" />
        <div className="hero-glow absolute -right-40 top-0 size-[42rem] rounded-full" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-7xl flex-col justify-center px-5 py-20 sm:px-8 lg:py-24">
          <div className="max-w-5xl">
            <Badge className="mb-7 rounded-full border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-emerald-300">
              <span className="mr-2 inline-block size-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(96,165,250,0.2)]" />
              Lead Fullstack Engineer · Guadalajara, MX
            </Badge>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">Emmanuel Castro Pantoja</p>
            <h1 className="max-w-5xl text-balance text-[clamp(3.1rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.06em]">
              I turn ambitious ideas into
              <span className="text-emerald-400"> production-ready software.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-pretty text-lg leading-8 text-zinc-300 sm:text-xl">
              Fullstack engineer and technical leader with 12+ years building reliable digital products across frontend, backend, cloud and AI.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button nativeButton={false} render={<a href="#experience" />} size="lg" className="rounded-full bg-emerald-400 px-6 text-[#07110f] hover:bg-emerald-300">
                Explore my work <ArrowDown className="size-4" />
              </Button>
              <Button nativeButton={false} render={<a href="/export" />} size="lg" variant="outline" className="rounded-full border-white/15 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white">
                <Download className="size-4" /> Export résumé
              </Button>
            </div>
          </div>

          <div className="mt-16 grid max-w-3xl border-y border-white/10 sm:grid-cols-3 lg:mt-20">
            {[
              ["12+", "years in fullstack engineering"],
              ["6", "years in technical leadership"],
              ["10", "companies across the journey"],
            ].map(([value, label]) => (
              <div key={label} className="border-white/10 px-5 py-5 sm:border-l sm:first:border-l-0">
                <div className="font-mono text-4xl font-medium tracking-tight text-white">{value}</div>
                <p className="mt-1 text-sm leading-5 text-zinc-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-b border-white/10 bg-[#07110f] py-10 text-white sm:py-12" aria-labelledby="companies-heading">
        <div className="mx-auto mb-8 max-w-7xl px-5 sm:px-8">
          <p id="companies-heading" className="font-mono text-xs uppercase tracking-[0.28em] text-zinc-500">
            Previously worked with
          </p>
        </div>
        <div className="company-marquee">
          <div className="company-track">
            {[false, true].map((duplicate) => (
              <div key={String(duplicate)} className="company-group" aria-hidden={duplicate || undefined} data-duplicate={duplicate || undefined}>
                {companies.map((company) => (
                  <div key={company.name} className="company-logo" title={company.name}>
                    {company.logo ? (
                      <Image src={company.logo} alt="" width={42} height={42} className="size-9 rounded-lg object-contain sm:size-10" />
                    ) : (
                      <span className="flex size-10 items-center justify-center rounded-lg bg-emerald-400/10 font-mono text-xs font-semibold text-emerald-300">
                        {company.mark}
                      </span>
                    )}
                    <span>{company.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="expertise" className="overflow-hidden bg-[#f3f1ea] py-24 sm:py-32" aria-labelledby="expertise-heading">
        <div className="mx-auto mb-14 max-w-7xl px-5 sm:px-8">
          <p className="section-kicker">What I bring</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <h2 id="expertise-heading" className="max-w-3xl text-balance text-4xl font-semibold tracking-[-0.045em] text-[#0a1714] sm:text-6xl">
              From product idea to production reality.
            </h2>
            <p className="max-w-xl text-lg leading-8 text-zinc-600 lg:justify-self-end">
              I work comfortably across the stack, connecting product decisions to maintainable architecture and dependable delivery.
            </p>
          </div>
        </div>

        <div className="technology-marquee">
          <div className="technology-track">
            {[false, true].map((duplicate) => (
              <div key={String(duplicate)} className="technology-group" aria-hidden={duplicate || undefined} data-duplicate={duplicate || undefined}>
                {capabilities.map((item, index) => (
                  <Card key={item.title} className="group relative z-0 w-max min-w-0 shrink-0 rounded-2xl border-black/8 bg-white/75 shadow-none transition-[background-color,box-shadow] duration-300 hover:z-30 hover:bg-white hover:shadow-[0_18px_50px_rgba(9,24,20,0.12)]">
                    <CardHeader className="!flex !w-max flex-col p-5 sm:p-6">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 items-center justify-center rounded-xl bg-[#0a1714] text-emerald-300">
                            <item.icon className="size-4.5" strokeWidth={1.7} />
                          </div>
                          <CardTitle className="text-xl tracking-tight text-[#0a1714]">{item.title}</CardTitle>
                        </div>
                        <span className="font-mono text-xs text-zinc-400">0{index + 1}</span>
                      </div>
                      <CardDescription className="sr-only">Technologies and capabilities used in {item.title}</CardDescription>
                      <div className="mt-4 flex w-max gap-2 overflow-visible">
                        {item.tools.map((tool) => (
                          <TechnologyTooltip key={tool.name} content={technologyExperience[tool.name] ?? "Production experience"}>
                            <div className="flex min-h-16 w-[4.75rem] shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-black/7 bg-[#f7f7f3] px-1.5 py-2 text-center transition-colors group-hover:bg-white">
                              <tool.icon className="size-5" aria-hidden="true" style={{ color: tool.color }} />
                              <span className="text-[9px] font-medium leading-tight text-zinc-600">{tool.name}</span>
                            </div>
                          </TechnologyTooltip>
                        ))}
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="bg-white px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid gap-6 lg:grid-cols-2">
            <div>
              <p className="section-kicker">Selected experience</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] text-[#0a1714] sm:text-6xl">A decade of building forward.</h2>
            </div>
            <p className="max-w-xl self-end text-lg leading-8 text-zinc-600 lg:justify-self-end">
              A career shaped by modernization: evolving legacy platforms, scaling cloud delivery and helping teams adopt better engineering practices.
            </p>
          </div>

          <Accordion defaultValue={["Wizeline"]} multiple className="border-t border-black/10">
            {experience.map((job, index) => (
              <AccordionItem key={job.company} value={job.company} className="border-black/10">
                <AccordionTrigger className="group py-7 text-left hover:no-underline sm:py-9">
                  <div className="grid w-full gap-3 pr-5 sm:grid-cols-[3rem_1fr_1fr_auto] sm:items-center sm:gap-5">
                    <span className="hidden font-mono text-xs text-zinc-400 sm:block">{String(index + 1).padStart(2, "0")}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-semibold tracking-tight text-[#0a1714] sm:text-3xl">{job.company}</span>
                      {job.featured && <Badge className="rounded-full bg-emerald-100 text-emerald-800">Now</Badge>}
                    </div>
                    <span className="text-sm font-medium text-zinc-600 sm:text-base">{job.role}</span>
                    <span className="font-mono text-xs text-zinc-500 sm:text-right">{job.period}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-9 sm:pl-[5rem]">
                  <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
                    <div>
                      <p className="text-lg leading-7 text-zinc-800">{job.summary}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {job.stack.map((tech) => (
                          <Badge key={tech} variant="outline" className="rounded-full border-black/10 bg-zinc-50 px-3 py-1 font-normal text-zinc-600">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {job.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3 text-[15px] leading-6 text-zinc-600">
                          <span className="mt-2.5 size-1 shrink-0 rounded-full bg-emerald-500" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="bg-[#0a1714] px-5 py-24 text-white sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.72fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-emerald-400">Education & foundation</p>
              <h2 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-[-0.045em] sm:text-6xl">
                Computer science foundations. Product-minded execution.
              </h2>
            </div>
            <div>
              <Separator className="mb-6 bg-white/15" />
              <p className="text-lg font-medium">Bachelor in Computer Science</p>
              <p className="mt-2 text-zinc-400">Universidad de Guadalajara · 2012–2016</p>
              <p className="mt-1 text-sm text-zinc-500">Guadalajara, Jalisco, México</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-[#0b1120] px-5 py-24 text-white sm:px-8 sm:py-32">
        <div className="contact-orbit absolute right-[-8rem] top-[-10rem] size-[34rem] rounded-full border border-[#07110f]/15" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-blue-300">Start a conversation</p>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <h2 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl">
              Let&apos;s build something people enjoy using.
            </h2>
            <Button nativeButton={false} render={<a href="mailto:Emmanuel.castro.pantoja@gmail.com" />} size="lg" className="h-14 rounded-full bg-blue-400 px-7 text-[#09090b] hover:bg-blue-300">
              Send an email <ArrowUpRight className="size-5" />
            </Button>
          </div>
          <Separator className="my-12 bg-white/15" />
          <div className="flex flex-col gap-4 text-sm font-medium sm:flex-row sm:flex-wrap sm:gap-8">
            <a className="flex items-center gap-2 hover:underline" href="mailto:Emmanuel.castro.pantoja@gmail.com">
              <Mail className="size-4" /> Emmanuel.castro.pantoja@gmail.com
            </a>
            <a className="flex items-center gap-2 hover:underline" href="tel:+523324960556">
              <Phone className="size-4" /> +52 33 2496 0556
            </a>
            <span className="flex items-center gap-2"><MapPin className="size-4" /> Guadalajara, Jalisco, México</span>
          </div>
        </div>
      </section>

      <footer className="bg-[#07110f] px-5 py-7 text-zinc-500 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Emmanuel Castro Pantoja</span>
          <span className="font-mono">Fullstack · Cloud · AI · Leadership</span>
        </div>
      </footer>
    </main>
  );
}

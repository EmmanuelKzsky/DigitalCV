export const cvProfile = {
  name: "Emmanuel Castro Pantoja",
  title: "Lead Fullstack Engineer",
  location: "Guadalajara, Jalisco, Mexico",
  email: "emmanuel.castro.pantoja@gmail.com",
  phone: "+52 33 2496 0556",
  summary: "Fullstack engineer and technical leader with 12+ years building reliable digital products across frontend, backend, cloud and AI.",
  education: "Bachelor in Computer Science, Universidad de Guadalajara (2012-2016)",
  skills: ["React", "Next.js", "TypeScript", "Node.js", "NestJS", "Java", "Spring", "AWS", "GCP", "Kubernetes", "Docker", "CI/CD", "Technical leadership"],
  experience: [
    { company: "Wizeline", role: "Lead Fullstack Engineer", period: "Mar 2025 - Present", highlights: ["Lead modern product delivery across React frontends, NestJS services and AWS infrastructure.", "Run production workloads on AWS EKS with Docker, Helm, CloudFormation, CircleCI and ArgoCD.", "Build AI-assisted workflows with Claude Code skills, Mastra AI and AWS Bedrock."] },
    { company: "Deloitte", role: "Senior Fullstack Engineer", period: "Apr 2024 - Mar 2025", highlights: ["Evolved a customer CRM across user experience, services and cloud delivery.", "Maintained Vue and React interfaces and updated Spring and Ruby on Rails services.", "Delivered containerized releases on GCP and integrated payment and AI-driven insights."] },
    { company: "Cognizant", role: "Senior Fullstack Engineer", period: "Oct 2023 - Apr 2024", highlights: ["Built and operated tooling for monitoring daily data jobs across GCP environments.", "Maintained React monitoring tools and Node.js jobs deployed on GCP."] },
    { company: "UST Global", role: "Senior Fullstack Engineer / UI Lead", period: "Aug 2018 - Aug 2023", highlights: ["Led a five-year modernization program across distributed UI architecture, backend jobs and release quality.", "Modernized a legacy monorepo into a distributed React and React Native UI.", "Owned UI standards, roadmap planning, reviews and customer communication."] },
    { company: "Improving", role: "PM / Lead / Senior Fullstack Engineer", period: "Sep 2017 - Aug 2018", highlights: ["Combined hands-on engineering, delivery planning and leadership of a seven-person team."] },
    { company: "HCL Technologies", role: "Senior Fullstack Engineer", period: "Feb 2017 - Sep 2017", highlights: ["Automated delivery workflows and maintained enterprise dashboards across Angular, React and Java."] },
  ],
};

export type CvProfile = typeof cvProfile;

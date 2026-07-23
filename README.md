# Emmanuel Castro - Digital CV

## Portfolio assistant

The floating assistant is built on **Mastra**. Its first approved RAG resource is a reviewed, structured representation of the CV in `lib/knowledge/cv-resource.ts`; the original PDF is intentionally not committed.

The assistant uses the Gemini API free tier through a server-side key. Create a restricted Gemini API key in Google AI Studio, then add it as `GEMINI_API_KEY` in Vercel for Production and in `.env.local` for local development. The key is never sent to the browser or committed to Git.

```bash
GEMINI_API_KEY=...
```

The current retrieval boundary is `retrievePortfolioKnowledge()`: it retrieves relevant CV passages before Mastra generates the answer (two-step RAG). When new sources are added, replace that adapter with Mastra's vector retrieval (`@mastra/rag`) and a persistent `pgvector` store. The agent, `/api/chat` route, and UI remain unchanged.

## Development

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

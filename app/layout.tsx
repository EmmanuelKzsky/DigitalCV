import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GitHubProjectLink } from "@/components/github-project-link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://emmanuel-castro-career.vercel.app"),
  title: "Emmanuel Castro — Lead Fullstack Engineer",
  description:
    "Portfolio of Emmanuel Castro Pantoja, a fullstack engineer and technical leader with 12+ years of experience across product, cloud and AI.",
  openGraph: {
    title: "Emmanuel Castro — Lead Fullstack Engineer",
    description:
      "12+ years turning ambitious ideas into production-ready software.",
    type: "website",
    images: [
      {
        url: "/hero-uml-software.png",
        width: 1717,
        height: 916,
        alt: "Software architecture visualization for Emmanuel Castro's portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emmanuel Castro — Lead Fullstack Engineer",
    description:
      "12+ years turning ambitious ideas into production-ready software.",
    images: ["/hero-uml-software.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}<GitHubProjectLink /></body>
    </html>
  );
}

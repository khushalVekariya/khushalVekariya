import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khushal Vekariya | Senior Full Stack Developer & SaaS Architect",
  description:
    "Senior Full Stack Developer with 6+ years building scalable SaaS applications with Laravel, Vue.js, React, and AI integration. Top Rated Plus on Upwork.",
  keywords: [
    "Khushal Vekariya",
    "Full-Stack Developer",
    "SaaS Architect",
    "Laravel",
    "Vue.js",
    "React",
    "AI Integration",
    "Upwork Top Rated Plus",
  ],
  openGraph: {
    title: "Khushal Vekariya | Senior Full Stack Developer & SaaS Architect",
    description:
      "6+ years building scalable SaaS applications with Laravel, Vue.js, React, and AI integration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-white antialiased">{children}</body>
    </html>
  );
}

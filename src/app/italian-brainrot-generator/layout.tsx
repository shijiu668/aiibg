import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Italian Brainrot Generator - AI-Powered Italian Brainrot Content Creator",
  description: "Generate authentic Italian Brainrot characters, text, and audio with our advanced AI Italian Brainrot Generator. Create unique 3D Italian Brainrot content instantly. Free Italian Brainrot Generator tool for viral content creation.",
  keywords: "Italian Brainrot Generator, AI Italian Brainrot, Italian Brainrot characters, Italian Brainrot memes, 3D Italian Brainrot, Italian Brainrot creator, surreal Italian content, Italian Brainrot aesthetic, viral Italian content, Italian Brainrot AI tool",
  authors: [{ name: "Italian Brainrot Generator Team" }],
  openGraph: {
    title: "Italian Brainrot Generator - Create Viral Italian Brainrot Content",
    description: "The ultimate Italian Brainrot Generator for creating authentic 3D characters, surreal Italian text, and immersive audio. Generate viral Italian Brainrot content with advanced AI technology.",
    url: "https://italianbrainrots.org/italian-brainrot-generator",
    siteName: "Italian Brainrot Generator",
    locale: "en",
    type: "website",
  },
  alternates: {
    canonical: 'https://italianbrainrots.org/italian-brainrot-generator',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ItalianBrainrotGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
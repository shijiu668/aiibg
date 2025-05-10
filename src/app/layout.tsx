import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Italian Brainrot Generator",
  description: "Generate Italian Brainrot images, text and voice content using AI technology. Enter your creativity and get unique Italian-style generated content.",
  keywords: "AI generation, Italian style, brainrot, image generation, voice generation, text generation, AI art",
  authors: [{ name: "AI Creative Studio" }],
  openGraph: {
    title: "AI Italian Brainrot Generator",
    description: "Generate Italian Brainrot images, text and voice content using AI technology. Enter your creativity and get unique Italian-style generated content.",
    url: "https://italianbrainrots.org",
    siteName: "AI Italian Brainrot Generator",
    locale: "en",
    type: "website",
  },
  alternates: {
    canonical: 'https://italianbrainrots.org',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
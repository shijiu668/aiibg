import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Italian Brainrot Translator",
  description: "Free Italian Brainrot Translator converts normal text into delightful Italian-style brainrot content. Transform any message into playful, nonsensical gibberish that adds confetti to conversations with our AI-powered translator.",
  keywords: "Italian Brainrot Translator, brainrot translator, Italian text converter, AI text transformer, brainrot generator, Italian gibberish translator, playful text converter, nonsensical text generator, Italian brainrot style, brainrot content creator",
  authors: [{ name: "AI Creative Studio" }],
  openGraph: {
    title: "Italian Brainrot Translator | Transform Text into Playful Italian Brainrot Style",
    description: "Free Italian Brainrot Translator converts normal text into delightful Italian-style brainrot content. Transform any message into playful, nonsensical gibberish instantly.",
    url: "https://italianbrainrots.org/italian-brainrot-translator",
    siteName: "AI Italian Brainrot Generator",
    locale: "en",
    type: "website",
  },
  alternates: {
    canonical: 'https://italianbrainrots.org/italian-brainrot-translator',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
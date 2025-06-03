import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brainrot Voice Generator | AI-Powered Text to Speech Converter",
  description: "Transform your text into engaging brainrot-style audio content with our AI-powered brainrot voice generator. Create viral voice content instantly with multiple voice options and professional quality output.",
  keywords: "brainrot voice generator, AI voice generator, text to speech, brainrot audio, voice synthesis, AI audio generator, viral content creator, brainrot text to speech, voice AI tool",
  authors: [{ name: "AI Creative Studio" }],
  openGraph: {
    title: "Brainrot Voice Generator | AI-Powered Text to Speech Converter",
    description: "Transform your text into engaging brainrot-style audio content with our AI-powered brainrot voice generator. Create viral voice content instantly with multiple voice options and professional quality output.",
    url: "https://italianbrainrots.org/brainrot-voice-generator",
    siteName: "AI Italian Brainrot Generator",
    locale: "en",
    type: "website",
  },
  alternates: {
    canonical: 'https://italianbrainrots.org/brainrot-voice-generator',
  },
};

export default function BrainrotVoiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
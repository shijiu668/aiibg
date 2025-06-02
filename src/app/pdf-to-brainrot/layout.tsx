import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to Brainrot: Transform PDFs to Brainrot Video With AI",
  description: "Convert PDF documents into engaging brainrot-style videos instantly. Upload PDFs, customize templates, and generate viral content with AI-powered PDF to brainrot technology.",
  keywords: "PDF to brainrot, PDF video generator, brainrot content, viral video creation, AI PDF converter",
  openGraph: {
    title: "PDF to Brainrot: Transform PDFs to Brainrot Video With AI",
    description: "Convert PDF documents into engaging brainrot-style videos instantly. Upload PDFs, customize templates, and generate viral content with AI-powered PDF to brainrot technology.",
    url: "https://italianbrainrots.org/pdf-to-brainrot",
  },
};

export default function PdfToBrainrotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
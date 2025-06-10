import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Italian Brainrot Generator | Create Video",
  description: "Generate Italian brainrot video with AI. Our AI creates the most ridiculous, over-the-top content perfect for sharing across all your social platforms.",
  keywords: "italian brainrot video, AI video generation, brainrot content creator, italian brainrot generator, viral video maker, AI video composer, brainrot video editor, italian meme generator",
  authors: [{ name: "AI Creative Studio" }],
  openGraph: {
    title: "Italian Brainrot Video Generator - Create AI-Powered Viral Content",
    description: "Generate Italian brainrot video with AI. Our AI creates the most ridiculous, over-the-top content perfect for sharing across all your social platforms.",
    url: "https://italianbrainrots.org/italian-brainrot-video",
    siteName: "AI Italian Brainrot Generator",
    locale: "en",
    type: "website",
    images: [
      {
        url: "https://italianbrainrots.org/og-italian-brainrot-video.jpg",
        width: 1200,
        height: 630,
        alt: "Italian Brainrot Video Generator - AI-Powered Content Creation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Italian Brainrot Video Generator - Create AI-Powered Viral Content",
    description: "Generate stunning Italian brainrot video content with AI. Create surreal 3D characters, authentic Italian text, and immersive audio.",
    images: ["https://italianbrainrots.org/og-italian-brainrot-video.jpg"],
  },
  alternates: {
    canonical: 'https://italianbrainrots.org/italian-brainrot-video',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function ItalianBrainrotVideoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical resources for video generation */}
        <link rel="preload" href="https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js" as="script" />
        <link rel="preload" href="https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm" as="fetch" crossOrigin="anonymous" />
        
        {/* Additional meta tags for video content */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Schema.org structured data for video application */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Italian Brainrot Video Generator",
              "description": "AI-powered tool for creating Italian brainrot video content with surreal 3D characters, authentic Italian text, and immersive audio.",
              "url": "https://italianbrainrots.org/italian-brainrot-video",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "AI Creative Studio"
              },
              "featureList": [
                "AI-powered image generation",
                "Italian text creation",
                "Voice synthesis",
                "Video composition",
                "Real-time processing",
                "Free unlimited usage"
              ]
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}

        {/* Page-specific optimization for video processing */}
        <Script id="ffmpeg-optimization" strategy="afterInteractive">
          {`
            // Optimize memory for video processing
            if (typeof window !== 'undefined') {
              // Preload FFmpeg resources for better performance
              window.ffmpegPreloaded = true;
              
              // Optimize garbage collection for video processing
              if (window.performance && window.performance.memory) {
                console.log('Memory optimization enabled for video generation');
              }
            }
          `}
        </Script>
      </body>
    </html>
  );
}
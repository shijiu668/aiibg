import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QQ7D0ST9FK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QQ7D0ST9FK');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rmemgiylp4");
          `}
        </Script>
        
        <Script id="microsoft-clarity-2" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rmbvtyddzo");
          `}
        </Script>
      </body>
    </html>
  );
}
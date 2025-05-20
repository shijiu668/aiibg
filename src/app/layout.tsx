import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
      <body className={inter.className}>
        {children}

        {/* Google Analytics代码 - 页面加载后执行 */}
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

        {/* Microsoft Clarity代码 - 页面加载后执行 */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rmemgiylp4");
          `}

          {/* Microsoft Clarity代码2 - 页面加载后执行 */}
          <Script id="microsoft-clarity-2" strategy="afterInteractive">
            {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "rmbvtyddzo");
          `}
          </Script>
        </Script>
      </body>
    </html>
  );
}
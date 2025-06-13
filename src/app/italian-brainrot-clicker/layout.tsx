import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Italian Brainrot Clicker",
  description: "Play the ultimate Italian Brainrot Clicker game! Click your way through surreal Italian Brainrot adventures. Free Italian Brainrot Clicker with endless fun and viral Italian content.",
  keywords: "Italian Brainrot Clicker, Italian Brainrot game, clicker game, Italian Brainrot Clicker online, free clicker game, Italian Brainrot Clicker browser, addictive clicker, Italian gaming, viral clicker game, Italian Brainrot Clicker free",
  authors: [{ name: "Italian Brainrot Clicker Team" }],
  openGraph: {
    title: "Italian Brainrot Clicker",
    description: "Experience the most addictive Italian Brainrot Clicker game! Click through surreal Italian adventures with viral content. Play Italian Brainrot Clicker free in your browser.",
    url: "https://italianbrainrots.org/italian-brainrot-clicker",
    siteName: "Italian Brainrot Clicker Game",
    locale: "en",
    type: "website",
  },
  alternates: {
    canonical: 'https://italianbrainrots.org/italian-brainrot-clicker',
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function ItalianBrainrotClickerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
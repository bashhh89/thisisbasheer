import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import Script from "next/script";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        {children}
        <Script
          src="https://abc-umami.izcgmb.easypanel.host/script.js"
          data-website-id="6517ae52-fc41-450b-941f-c848d9a188ae"
          strategy="afterInteractive"
        />
        <Script
          src="https://abc-umami.izcgmb.easypanel.host/recorder.js"
          data-website-id="6517ae52-fc41-450b-941f-c848d9a188ae"
          data-sample-rate="0.5"
          data-mask-level="moderate"
          data-max-duration="900000"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

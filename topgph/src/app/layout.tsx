import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TOP-G Tech & Construction | Premier Infrastructure & Surveillance Leader",
  description:
    "TOP-G Tech & Construction is a premier technology integration and civil engineering firm in the Philippines. CCTV systems, solar power, construction services, and smart infrastructure solutions.",
  keywords: [
    "CCTV Philippines",
    "surveillance systems",
    "construction company Philippines",
    "solar power Philippines",
    "infrastructure",
    "TOP-G Tech",
    "smart city",
    "fire detection",
    "electric fence",
  ],
  openGraph: {
    title: "TOP-G Tech & Construction",
    description: "Securing Tomorrow | Building Today — Premier Infrastructure & Surveillance Leader in the Philippines.",
    url: "https://topgph.com",
    siteName: "TOP-G Tech & Construction",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "TOP-G Tech & Construction",
      },
    ],
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TOP-G Tech & Construction",
    description: "Securing Tomorrow | Building Today",
    images: ["/opengraph.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://topgph.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

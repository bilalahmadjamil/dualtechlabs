import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Navbar from "../components/navbar";
import SmoothScroll from "../components/smooth-scroll";
import WhatsAppFloat from "../components/whatsapp-float";
import SkipLink from "../components/skip-link";
import SeoJsonLd from "../components/seo-json-ld";
import CustomCursor from "../components/ui/CustomCursor";
import { getSiteUrl } from "../config/site";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800"],
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const siteDescription =
  "DualTech Labs delivers custom software development, AI integration, cloud solutions, mobile engineering, and digital transformation services worldwide. Your idea, built right.";

const googleVerification =
  typeof process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION === "string" &&
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.trim() !== ""
    ? process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.trim()
    : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Custom Software Development & IT Services | DualTech Labs",
    template: "%s | DualTech Labs",
  },
  description: siteDescription,
  applicationName: "DualTech Labs",
  keywords: [
    "IT services company",
    "custom software development",
    "software development company",
    "AI development services",
    "cloud services company",
    "mobile app development",
    "digital transformation services",
    "UI UX design services",
    "DevOps services",
    "fintech development",
    "IT consulting company",
    "global IT services provider",
    "software development company worldwide",
    "API development services",
    "cybersecurity services",
  ],
  authors: [{ name: "DualTech Labs", url: getSiteUrl() }],
  creator: "DualTech Labs",
  alternates: {
    canonical: "/",
    languages: {
      "en": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DualTech Labs",
    title: "Custom Software Development & IT Services | DualTech Labs",
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Software Development & IT Services | DualTech Labs",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
  ...(googleVerification
    ? {
        verification: {
          google: googleVerification,
        },
      }
    : {}),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050714",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <SeoJsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <CustomCursor />
            <SkipLink />
            <Navbar />
            <main id="main-content" tabIndex={-1} className="min-h-screen pt-[5rem] md:pt-[5.5rem]">
              {children}
            </main>
            <WhatsAppFloat />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}

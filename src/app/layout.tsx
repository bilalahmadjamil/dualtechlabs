import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Navbar from "../components/navbar";
import SmoothScroll from "../components/smooth-scroll";
import WhatsAppFloat from "../components/whatsapp-float";
import SkipLink from "../components/skip-link";
import SeoJsonLd from "../components/seo-json-ld";
import { getSiteUrl } from "../config/site";

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
  "Small team, senior engineers. We design and ship high-performance software: payments, AI systems, and cloud platforms for ambitious teams and products worldwide.";

const googleVerification =
  typeof process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION === "string" &&
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.trim() !== ""
    ? process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.trim()
    : undefined;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "DualTech Labs · Global Custom Software Development & AI Solutions",
    template: "%s · DualTech Labs",
  },
  description: siteDescription,
  applicationName: "DualTech Labs",
  keywords: [
    "Software development",
    "Custom software development",
    "AI solutions studio",
    "FinTech development services",
    "Government digital services",
    "AI products",
    "Enterprise engineering",
    "Global software engineering",
    "Development agency USA Canada Europe Gulf Australia",
    "Software studio",
    "Custom software development USA",
    "AI product engineering",
  ],
  authors: [{ name: "DualTech Labs", url: getSiteUrl() }],
  creator: "DualTech Labs",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DualTech Labs",
    title: "DualTech Labs · Global Custom Software Development & AI Solutions",
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "DualTech Labs · Global Custom Software Development & AI Solutions",
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
    icon: "/assets/fav-icon.png",
  },
  ...(googleVerification
    ? {
        verification: {
          google: googleVerification,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <SeoJsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
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

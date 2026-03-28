import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import Navbar from "../components/navbar";
import SmoothScroll from "../components/smooth-scroll";
import WhatsAppFloat from "../components/whatsapp-float";
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
  "Small team, senior engineers. We design and ship serious software: payments, government services, AI, and large web apps, with clear timelines and code your team can own.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "DualTech Labs · Software for fintech, public sector, and AI products",
    template: "%s · DualTech Labs",
  },
  description: siteDescription,
  keywords: [
    "Software development",
    "Custom software",
    "FinTech",
    "Government digital services",
    "AI products",
    "Enterprise engineering",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DualTech Labs",
    title: "DualTech Labs · Software for fintech, public sector, and AI products",
    description: siteDescription,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "DualTech Labs · Software for fintech, public sector, and AI products",
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <head>
        <link rel="icon" href="/assets/fav-icon.png" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
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

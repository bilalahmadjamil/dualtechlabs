import type { Metadata } from "next";
import { getSiteUrl } from "@/config/site";
import ContactContent from "./ContactContent";

const contactDescription =
  "Get in touch with DualTech Labs. Email us or start a WhatsApp conversation — we respond within one business day.";

export const metadata: Metadata = {
  title: "Contact",
  description: contactDescription,
  alternates: {
    canonical: `${getSiteUrl()}/contact`,
    languages: {
      "en": `${getSiteUrl()}/contact`,
      "x-default": `${getSiteUrl()}/contact`,
    },
  },
  openGraph: {
    type: "website",
    siteName: "DualTech Labs",
    title: "Contact | DualTech Labs",
    description: contactDescription,
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | DualTech Labs",
    description: contactDescription,
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return <ContactContent />;
}

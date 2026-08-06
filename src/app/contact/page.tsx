import type { Metadata } from "next";
import Link from "next/link";
import { getMailtoUrl, getWhatsAppUrl, contactEmail } from "@/config/contact";
import { getSiteUrl } from "@/config/site";

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
  const mailtoUrl   = getMailtoUrl("Project Enquiry — DualTech Labs");
  const whatsappUrl = getWhatsAppUrl();

  return (
    <div
      className="relative flex min-h-[calc(100dvh-5rem)] flex-col items-center justify-center overflow-hidden py-14 md:min-h-[calc(100dvh-5.5rem)] md:py-20 lg:py-28 dtl-bg-light"
    >
      {/* Very subtle brand blush — barely visible on white */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[500px]"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.06) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="dtl-section relative z-10 w-full max-w-4xl">

        {/* Heading */}
        <div className="mb-8 text-center md:mb-12 lg:mb-16">
          <h1
            className="font-display font-bold tracking-tight"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#0F172A",
            }}
          >
            Say hello.
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed md:text-lg" style={{ color: "#475569" }}>
            We read every message ourselves. Email or WhatsApp — whichever
            is easier. We&apos;ll get back to you the same day if we can.
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          {/* Email card */}
          <a
            href={mailtoUrl}
            className="group dtl-card-l dtl-gradient-border flex flex-col gap-5 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dtl-purple/40 md:p-8 lg:p-10"
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
              style={{
                background: "rgba(124,58,237,0.08)",
                border: "1px solid rgba(124,58,237,0.2)",
                color: "#7C3AED",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" aria-hidden>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-xl font-bold" style={{ color: "#0F172A" }}>Email Us</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                Describe your project, share a brief, or just say hello.
                We&apos;ll read it properly and reply with something useful.
              </p>
            </div>

            <p
              className="font-sans text-sm font-medium transition-colors duration-200 group-hover:text-dtl-purple"
              style={{ color: "rgba(124,58,237,0.7)" }}
            >
              {contactEmail}
            </p>

            <div
              className="mt-auto flex items-center gap-2 rounded-xl px-5 py-3 font-sans text-sm font-semibold text-white transition-[filter] duration-200 group-hover:brightness-110"
              style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)" }}
            >
              Send an Email
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                <path d="M2 8h12M9 3l5 5-5 5" />
              </svg>
            </div>

            <p className="text-center font-mono text-xs" style={{ color: "rgba(124,58,237,0.6)" }}>
              or copy: {contactEmail}
            </p>
          </a>

          {/* WhatsApp card */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group dtl-card-l flex flex-col gap-5 p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40 md:p-8 lg:p-10"
            style={{ borderColor: "rgba(52,211,153,0.25)" }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
              style={{
                background: "rgba(52,211,153,0.07)",
                border: "1px solid rgba(52,211,153,0.2)",
                color: "#059669",
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-xl font-bold" style={{ color: "#0F172A" }}>Chat on WhatsApp</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                Prefer a quick back-and-forth? Send us a message on WhatsApp.
                We keep conversations there too, so nothing gets lost.
              </p>
            </div>

            <p className="font-sans text-sm font-medium" style={{ color: "rgba(5,150,105,0.8)" }}>
              Opens WhatsApp with a pre-filled message
            </p>

            <div className="mt-auto flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 font-sans text-sm font-semibold text-emerald-700 transition-[background-color] duration-200 group-hover:bg-emerald-100">
              Open WhatsApp
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" aria-hidden>
                <path d="M2 8h12M9 3l5 5-5 5" />
              </svg>
            </div>
          </a>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="font-sans text-sm underline-offset-2 transition-colors hover:underline"
            style={{ color: "#64748B" }}
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

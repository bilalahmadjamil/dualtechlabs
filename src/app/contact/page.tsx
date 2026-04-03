import type { Metadata } from "next";
import Link from "next/link";
import {
  contactEmail,
  formatPhoneDisplay,
  getMailtoUrl,
  getWhatsAppUrl,
  whatsappPhoneDigits,
} from "@/config/contact";

const contactDescription = "Email or WhatsApp DualTech Labs. We usually reply within one business day.";

export const metadata: Metadata = {
  title: "Contact",
  description: contactDescription,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    type: "website",
    siteName: "DualTech Labs",
    title: "Contact · DualTech Labs",
    description: contactDescription,
    url: "/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact · DualTech Labs",
    description: contactDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  const mailto = getMailtoUrl("Project inquiry — DualTech Labs");
  const wa = getWhatsAppUrl();
  const phoneLabel = formatPhoneDisplay(whatsappPhoneDigits);

  return (
    <div className="min-h-screen bg-portal-void bg-portal-mesh pb-28 pt-6 md:pt-10">
      <div className="portal-section max-w-4xl">
        <nav className="mb-10 font-sans text-sm text-slate-400 md:mb-14">
          <Link href="/" className="text-cyan-400/90 transition-colors hover:text-white">
            ← Back to home
          </Link>
        </nav>

        <div className="portal-kicker">
          <span className="portal-kicker-line" aria-hidden />
          <span>Contact</span>
        </div>

        <h1 className="portal-headline mt-4 text-display-sm text-white md:text-display-md">
          Email or WhatsApp. Pick what you prefer.
        </h1>
        <p className="portal-body mt-6 max-w-2xl">
          Use email for briefs and attachments. Use WhatsApp for quick questions or to find a time to talk. We aim to get back within one business day.
        </p>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          <div className="portal-card flex flex-col p-8 md:p-10">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/35 bg-cyan-500/10 text-cyan-300">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h2 className="font-sans text-sm font-semibold text-cyan-400/95">Email</h2>
            <a
              href={mailto}
              className="mt-3 block break-all font-sans text-sm font-medium text-white transition-colors hover:text-cyan-300/95 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 md:text-base"
            >
              {contactEmail}
            </a>
            <p className="portal-body-muted mt-4 flex-1">
              Best when you want something in writing or need to send files. We&apos;ll confirm we got it and suggest a call if it makes sense.
            </p>
            <a href={mailto} className="portal-cta-primary mt-8 w-full sm:w-auto">
              Open in email
            </a>
          </div>

          <div className="portal-card flex flex-col p-8 md:p-10">
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-500/35 bg-emerald-500/10 text-emerald-400">
              <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <h2 className="font-sans text-sm font-semibold text-emerald-400/95">WhatsApp</h2>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block font-sans text-sm font-medium text-white transition-colors hover:text-emerald-300/95 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 md:text-base"
            >
              {phoneLabel}
            </a>
            <p className="portal-body-muted mt-4 flex-1">
              Same number on WhatsApp. Handy for quick questions, scheduling, or a short voice note.
            </p>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#25D366] px-8 py-3.5 font-sans text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:brightness-110 active:scale-[0.98] sm:w-auto"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import PortfolioSlider from "../components/portfolio-slider";
import Hero from "../components/hero";
import Link from "next/link";
import { contactEmail, getMailtoUrl, getWhatsAppUrl } from "@/config/contact";

const mailtoHome = getMailtoUrl("Project inquiry — DualTech Labs");
const whatsappHome = getWhatsAppUrl();

const CAPABILITIES = [
  {
    title: "Mobile engineering",
    desc: "Cross-platform apps that feel native, with offline flows where they matter.",
    icon:
      "M12 18h.01M8 21h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z",
  },
  {
    title: "Cloud & DevOps",
    desc: "Pipelines, logging, and hosting you can run without a fire drill.",
    icon:
      "M12 2v4m0 12v4M4.22 4.22l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.22 19.78l2.83-2.83m8.48-8.48l2.83-2.83",
  },
  {
    title: "Security & quality",
    desc: "Reviews, threat thinking, and tests that run before every release.",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10",
  },
  {
    title: "Web platforms",
    desc: "Fast sites, internal tools, and design systems your team can build on.",
    icon: "M3 9h18M9 21V9m6 12V9",
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-col bg-portal-void pb-16 md:pb-24">
      <Hero />

      <section
        id="solutions"
        className="relative z-20 border-t border-white/[0.06] bg-portal-void py-20 md:py-28"
      >
        <div className="portal-section">
          <div className="mb-14 md:mb-20">
            <div className="portal-kicker">
              <span className="portal-kicker-line" aria-hidden />
              <span>What we build</span>
            </div>
            <h2 className="portal-headline max-w-4xl text-display-sm text-white md:text-display-md lg:text-display-lg">
              Software for teams where uptime and accuracy actually matter.
            </h2>
            <p className="portal-body mt-6 max-w-2xl">
              From first sketch to production, we own the build: AI features, payments, citizen-facing services, and big retail flows. One team, clear communication, no disappearing act after go-live.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 [contain:layout] md:grid-cols-4 md:gap-5">
            <Link
              prefetch={false}
              href="/contact"
              className="solutions-card group flex min-h-[280px] flex-col justify-between p-8 md:col-span-2 md:row-span-2 md:min-h-[360px] md:p-12"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 transition-[border-color,background-color] duration-200 group-hover:border-cyan-400/60 group-hover:bg-cyan-500/20">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-8 w-8"
                  aria-hidden
                >
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
                  <path d="M12 6v12M6 12h12" />
                </svg>
              </div>
              <div>
                <h3 className="portal-card-title text-2xl md:text-3xl">AI &amp; intelligent systems</h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400 md:text-base">
                  Models, agents, search, and vision wired into your product—not a demo that never ships.
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-white/10 pt-8 font-sans text-sm font-medium text-cyan-400/90">
                <span>Tell us what you&apos;re solving</span>
                <div className="h-px flex-grow bg-gradient-to-r from-cyan-500/40 to-transparent" />
              </div>
            </Link>

            <Link
              prefetch={false}
              href="/contact"
              className="solutions-card group flex flex-col justify-center gap-6 p-8 md:col-span-2 md:flex-row md:items-start md:gap-10"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-cyan-500/30 text-cyan-300 transition-[border-color,background-color] duration-200 group-hover:border-cyan-400/50 group-hover:bg-cyan-500/10">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="portal-card-title">Fintech &amp; payments</h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  Money movement, onboarding, and ledgers built for regulated environments.
                </p>
              </div>
            </Link>

            <Link prefetch={false} href="/contact" className="solutions-card group p-8">
              <h3 className="portal-card-title-sm text-cyan-200">Public-sector digital services</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Citizen-facing journeys and back-office tools that stay up when traffic spikes.
              </p>
            </Link>

            <Link prefetch={false} href="/contact" className="solutions-card group p-8">
              <h3 className="portal-card-title-sm text-cyan-200">Commerce &amp; retail</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                Storefronts and data paths that stay quick on Black Friday and normal Tuesday alike.
              </p>
            </Link>

            {CAPABILITIES.map((cap) => (
              <Link
                key={cap.title}
                prefetch={false}
                href="/contact"
                className="solutions-card group space-y-3 p-6 md:p-7"
              >
                <div className="text-cyan-400/90">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden>
                    <path d={cap.icon} />
                  </svg>
                </div>
                <h4 className="portal-card-title-sm">{cap.title}</h4>
                <p className="text-sm leading-relaxed text-slate-500">{cap.desc}</p>
                <div className="mt-1 h-px w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-400 to-cyan-500/20 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <PortfolioSlider />

      <section
        id="about"
        className="relative overflow-hidden border-t border-white/[0.06] py-20 md:py-28"
      >
        <div className="portal-section grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-20 lg:gap-24">
          <div className="space-y-6">
            <div className="portal-kicker">
              <span className="portal-kicker-line" aria-hidden />
              <span>About us</span>
            </div>
            <h2 className="portal-headline text-display-sm text-white md:text-display-md lg:text-display-lg">
              Engineers who speak product and write code you can own.
            </h2>
          </div>
          <div className="space-y-6 border-white/10 md:border-l md:pl-12 md:pt-0">
            <p className="portal-body text-slate-300">
              DualTech Labs is a small studio for messy work: regulated industries, high traffic, and real deadlines. We stick around for architecture, delivery, and the hard conversations that keep the roadmap honest.
            </p>
            <p className="portal-body-muted">
              You get straight answers, written decisions, and repos your team can pick up. We fit best with teams who care as much about Tuesday&apos;s uptime as launch day.
            </p>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="px-4 py-20 sm:px-6 md:py-28"
      >
        <div className="portal-section">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-white/[0.07] via-portal-surface/80 to-portal-void p-10 text-center shadow-glow md:p-16 lg:p-20">
            <div className="pointer-events-none absolute -right-8 -top-8 select-none font-sans text-[clamp(4rem,18vw,12rem)] font-bold leading-none text-white/[0.04]">
              DTL
            </div>
            <div className="portal-kicker justify-center">
              <span className="portal-kicker-line" aria-hidden />
              <span>Get in touch</span>
            </div>
            <h2 className="portal-headline mt-4 text-display-sm text-white md:text-display-md lg:text-display-lg">
              Tell us what you&apos;re building. We&apos;ll reply with a straight answer.
            </h2>
            <p className="portal-body mx-auto mt-6 max-w-2xl text-slate-300">
              A short note on goals, timeline, and budget range is enough. If we&apos;re a fit, we&apos;ll suggest a next step; if not, we&apos;ll say so.
            </p>
            <a
              href={mailtoHome}
              className="mt-6 inline-block font-sans text-sm text-slate-400 underline-offset-2 transition-colors hover:text-cyan-400/90 hover:underline focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60"
            >
              {contactEmail}
            </a>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={mailtoHome} className="portal-cta-primary min-w-[200px]">
                Email us
              </a>
              <a
                href={whatsappHome}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-emerald-500/35 bg-emerald-500/10 px-8 py-3.5 font-sans text-sm font-semibold text-emerald-200 transition-[filter,transform] duration-200 ease-out hover:bg-emerald-500/15 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-portal-void"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/[0.06] py-10 text-center">
        <p className="font-sans text-xs text-slate-500">
          © {new Date().getFullYear()} DualTech Labs. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

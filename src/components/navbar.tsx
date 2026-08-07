"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ── All 12 services for the mega-menu ────────────────────────────────────────
const SERVICES = [
  { title: "Custom Software",       tagline: "Built for you. Owned by you.",           href: "/services/custom-software-development", accent: "#7C3AED",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { title: "AI & Intelligent Systems", tagline: "Real AI in real products.",           href: "/services/ai-development",              accent: "#6D28D9",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/><circle cx="7.5" cy="14.5" r="1"/><circle cx="16.5" cy="14.5" r="1"/></svg> },
  { title: "Cloud & DevOps",        tagline: "Deployments that don't page you.",       href: "/services/cloud-devops",                accent: "#0891B2",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg> },
  { title: "Mobile Engineering",    tagline: "Native feel. Cross-platform reach.",     href: "/services/mobile-app-development",      accent: "#7C3AED",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg> },
  { title: "UI/UX Design",          tagline: "Makes sense first. Looks good second.",  href: "/services/ui-ux-design",                accent: "#A855F7",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg> },
  { title: "Web Platforms",         tagline: "Fast, scalable, built to last.",         href: "/services/web-development",             accent: "#0891B2",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { title: "Digital Transformation",tagline: "Off legacy. Into systems that move.",    href: "/services/digital-transformation",      accent: "#059669",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg> },
  { title: "Fintech & Payments",    tagline: "Correctness first. Compliance always.",  href: "/services/fintech-development",         accent: "#0891B2",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
  { title: "API & Integrations",    tagline: "Clean contracts. Designed for failure.", href: "/services/api-development",             accent: "#7C3AED",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg> },
  { title: "Cybersecurity",         tagline: "Find problems before attackers do.",     href: "/services/cybersecurity",               accent: "#DC2626",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { title: "QA & Testing",          tagline: "Tests that mean something.",             href: "/services/qa-testing",                  accent: "#059669",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg> },
  { title: "IT Consulting",         tagline: "Sometimes the best advice: don't build.",href: "/services/it-consulting",               accent: "#7C3AED",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> },
] as const;

const NAV_LINKS = [
  { label: "Services",    hash: "services",    hasMega: true  },
  { label: "How We Work", hash: "how-it-works", hasMega: false },
  { label: "Our Stack",   hash: "tech-stack",  hasMega: false },
  { label: "Why Us",      hash: "why-us",      hasMega: false },
] as const;

function sectionHref(pathname: string, hash: string) {
  return pathname === "/" ? `#${hash}` : `/#${hash}`;
}

// ── Mega-menu panel ───────────────────────────────────────────────────────────
function MegaMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-full z-[54]"
      // Keep open while mouse is within the panel
      onMouseEnter={() => {/* handled by parent */}}
    >
      {/* Backdrop blur border */}
      <div
        className="mx-auto max-w-5xl rounded-2xl border border-white/[0.08] shadow-2xl backdrop-blur-xl"
        style={{ background: "rgba(8,10,22,0.96)", marginTop: "6px" }}
      >
        {/* Header row */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-3.5">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
            12 Service Lines
          </span>
          <Link
            href="/#services"
            onClick={onClose}
            className="flex items-center gap-1.5 font-sans text-[11px] font-semibold text-slate-400 transition-colors hover:text-white"
          >
            View all
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* 3-column service grid */}
        <div className="grid grid-cols-2 gap-px p-3 md:grid-cols-3 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              onClick={onClose}
              className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-all duration-150 hover:bg-white/[0.05]"
            >
              {/* Accent icon badge */}
              <div
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-150"
                style={{
                  background: `${s.accent}18`,
                  color: s.accent,
                  border: `1px solid ${s.accent}25`,
                }}
              >
                {s.icon}
              </div>
              <div className="min-w-0">
                <p className="font-sans text-[13px] font-semibold leading-tight text-slate-200 transition-colors group-hover:text-white">
                  {s.title}
                </p>
                <p className="mt-0.5 font-sans text-[11px] leading-snug text-slate-500 transition-colors group-hover:text-slate-400">
                  {s.tagline}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="border-t border-white/[0.06] px-6 py-3">
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center gap-2 font-sans text-[12px] font-semibold transition-colors"
            style={{ color: "#7C3AED" }}
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
              <path d="M8 2v12M2 8h12" strokeLinecap="round"/>
            </svg>
            Not sure which service fits? Let&apos;s talk.
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const pathname = usePathname();
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [megaOpen,      setMegaOpen]      = useState(false);
  const [mobileServices,setMobileServices]= useState(false);

  // Delayed close to prevent flicker when moving from button → panel
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openMega  = useCallback(() => { if (closeTimer.current) clearTimeout(closeTimer.current); setMegaOpen(true);  }, []);
  const closeMega = useCallback(() => { closeTimer.current = setTimeout(() => setMegaOpen(false), 120); }, []);

  useEffect(() => {
    const nav = document.getElementById("dtl-nav");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const isScrolled = window.scrollY > 24;
        setScrolled(isScrolled);
        nav?.classList.toggle("is-scrolled", isScrolled);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); setMegaOpen(false); }, [pathname]);

  // Close mega-menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMegaOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const onContact = pathname === "/contact";

  return (
    <header id="dtl-nav" className="fixed inset-x-0 top-0 z-50">
      {/* Top accent line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5) 40%, rgba(6,182,212,0.5) 60%, transparent)" }}
        aria-hidden
      />

      <nav
        className={`relative border-b border-white/[0.06] bg-dtl-void transition-shadow duration-300 ${
          scrolled ? "glass-nav shadow-nav-scrolled" : ""
        }`}
        aria-label="Primary"
      >
        <div className="dtl-section flex h-[5rem] items-center md:h-[5.5rem]">

          {/* Logo */}
          <div className="flex flex-1 justify-start">
            <Link
              href="/"
              className="group relative z-[60] flex items-center outline-none focus-visible:ring-2 focus-visible:ring-dtl-purple/80 focus-visible:ring-offset-2 focus-visible:ring-offset-dtl-void rounded-lg"
            >
              <span className="relative block h-12 w-16 sm:h-14 sm:w-20 md:h-16 md:w-[4.75rem] lg:h-[4.5rem] lg:w-[5.5rem]">
                <Image
                  src="/assets/logo-light-removebg-preview.png"
                  alt="DualTech Labs"
                  fill
                  className="object-contain object-left opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                  priority
                  sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 76px, 88px"
                />
              </span>
            </Link>
          </div>

          {/* Desktop nav pill */}
          <div className="hidden items-center lg:flex">
            <div className="relative flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.04] p-[3px]">
              {NAV_LINKS.map(({ label, hash, hasMega }) =>
                hasMega ? (
                  /* Services — hover trigger */
                  <div
                    key={hash}
                    onMouseEnter={openMega}
                    onMouseLeave={closeMega}
                    className="relative"
                  >
                    <button
                      type="button"
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                      className="flex items-center gap-1 rounded-full px-3.5 py-1.5 font-sans text-sm font-medium text-slate-400 transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dtl-purple/50"
                    >
                      {label}
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`h-3 w-3 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                      >
                        <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <Link
                    key={hash}
                    href={sectionHref(pathname, hash)}
                    className="rounded-full px-3.5 py-1.5 font-sans text-sm font-medium text-slate-400 transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dtl-purple/50"
                  >
                    {label}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* CTA + hamburger */}
          <div className="flex flex-1 items-center justify-end gap-2 min-w-0">
            <Link
              href="/contact"
              aria-current={onContact ? "page" : undefined}
              className="relative z-[60] inline-flex items-center justify-center rounded-full px-3 py-2 font-sans text-xs font-semibold text-white transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dtl-purple/80 focus-visible:ring-offset-2 focus-visible:ring-offset-dtl-void sm:px-5 sm:py-2.5 sm:text-sm"
              style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)" }}
            >
              Get in Touch
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="relative z-[60] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.09] bg-white/[0.04] text-slate-300 transition-colors hover:border-dtl-purple/30 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dtl-purple/60 lg:hidden"
              aria-expanded={mobileOpen}
              aria-controls="dtl-mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <span className="relative block h-4 w-5">
                <span className={`absolute inset-x-0 top-0 h-0.5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? "top-[7px] rotate-45" : ""}`} />
                <span className={`absolute inset-x-0 top-[7px] h-0.5 rounded-full bg-current transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
                <span className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-current transition-all duration-300 ${mobileOpen ? "top-[7px] -rotate-45 bottom-auto" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop mega-menu — sits inside header so it inherits the fixed stacking context */}
      <div
        className="hidden lg:block dtl-section"
        onMouseEnter={openMega}
        onMouseLeave={closeMega}
      >
        <AnimatePresence>
          {megaOpen && (
            <MegaMenu onClose={() => setMegaOpen(false)} />
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile"
            className="fixed inset-0 z-[55] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-dtl-void/80 backdrop-blur-sm"
              aria-hidden
              tabIndex={-1}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              id="dtl-mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="absolute inset-x-3 top-[5.25rem] z-[56] overflow-hidden rounded-2xl border border-white/[0.07] bg-dtl-surface shadow-nav-scrolled backdrop-blur-xl"
            >
              <div className="flex max-h-[80svh] flex-col overflow-y-auto p-4">

                {/* Services — expandable */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileServices((o) => !o)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-sans text-base font-medium text-slate-300 transition-colors hover:bg-white/[0.07] hover:text-white"
                  >
                    Services
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`h-4 w-4 transition-transform duration-200 ${mobileServices ? "rotate-180" : ""}`}
                    >
                      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                  <AnimatePresence>
                    {mobileServices && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="overflow-hidden"
                      >
                        <div className="mx-2 mb-2 mt-1 grid grid-cols-1 gap-0.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-2">
                          {SERVICES.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.06]"
                            >
                              <div
                                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                                style={{ background: `${s.accent}20`, color: s.accent }}
                              >
                                {s.icon}
                              </div>
                              <span className="font-sans text-[13px] font-medium text-slate-300">
                                {s.title}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Other nav links */}
                {NAV_LINKS.filter((l) => !l.hasMega).map(({ label, hash }, i) => (
                  <motion.div
                    key={hash}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * (i + 1) }}
                  >
                    <Link
                      href={sectionHref(pathname, hash)}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-4 py-3 font-sans text-base font-medium text-slate-300 transition-colors hover:bg-white/[0.07] hover:text-white"
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}

                <div className="mt-3 border-t border-white/[0.07] pt-3">
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-sans text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)" }}
                  >
                    Get in Touch
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3" aria-hidden>
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

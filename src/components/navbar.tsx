"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Services",    hash: "services" },
  { label: "How We Work", hash: "how-it-works" },
  { label: "Our Stack",   hash: "tech-stack" },
] as const;

function sectionHref(pathname: string, hash: string) {
  return pathname === "/" ? `#${hash}` : `/#${hash}`;
}

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Direct DOM class toggle — zero React re-renders on scroll
    const nav = document.getElementById("dtl-nav");
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const isScrolled = window.scrollY > 24;
        if (isScrolled !== scrolled) setScrolled(isScrolled);
        // Also toggle class directly so style updates skip React entirely
        nav?.classList.toggle("is-scrolled", isScrolled);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const onContact = pathname === "/contact";

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top accent line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.5) 40%, rgba(6,182,212,0.5) 60%, transparent)" }}
        aria-hidden
      />

      <nav
        id="dtl-nav"
        className={`relative border-b border-white/[0.06] bg-dtl-void transition-shadow duration-200 ${
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
                  className="object-contain object-left opacity-90 transition-opacity duration-300 group-hover:opacity-100 group-hover:drop-shadow-[0_0_20px_rgba(124,58,237,0.4)]"
                  priority
                  sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, (max-width: 1024px) 76px, 88px"
                />
              </span>
            </Link>
          </div>

          {/* Desktop nav pill */}
          <div className="hidden items-center lg:flex">
            <div className="flex items-center gap-1 rounded-full border border-white/[0.07] bg-white/[0.04] p-1">
              {NAV_LINKS.map(({ label, hash }) => (
                <Link
                  key={hash}
                  href={sectionHref(pathname, hash)}
                  className="rounded-full px-4 py-2 font-sans text-sm font-medium text-slate-400 transition-colors hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dtl-purple/50"
                >
                  {label}
                </Link>
              ))}
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
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", damping: 26, stiffness: 300 }}
              className="absolute inset-x-4 top-[5.5rem] z-[56] overflow-hidden rounded-2xl border border-white/[0.07] bg-dtl-surface p-5 shadow-nav-scrolled backdrop-blur-xl"
            >
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map(({ label, hash }, i) => (
                  <motion.div
                    key={hash}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      href={sectionHref(pathname, hash)}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-4 py-3 font-sans text-base font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-3 border-t border-white/[0.07] pt-3">
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl py-3.5 font-sans text-sm font-semibold text-white"
                    style={{ background: "linear-gradient(135deg,#7C3AED,#06B6D4)" }}
                  >
                    Get in Touch
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

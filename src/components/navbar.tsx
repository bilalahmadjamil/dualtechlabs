"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { label: "Solutions", hash: "solutions" },
  { label: "Portfolio", hash: "portfolio" },
  { label: "About", hash: "about" },
] as const;

function sectionHref(pathname: string, hash: string) {
  return pathname === "/" ? `#${hash}` : `/#${hash}`;
}

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          ticking = false;
          const next = window.scrollY > 24;
          setScrolled((prev) => (prev === next ? prev : next));
        });
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const contactActive = pathname === "/contact";

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Subtle top accent line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
        aria-hidden
      />

      <nav
        className={`relative border-b border-white/[0.06] bg-portal-void bg-portal-mesh transition-[box-shadow] duration-200 ease-out ${
          scrolled ? "shadow-nav-scrolled backdrop-blur-md backdrop-saturate-150" : ""
        }`}
        aria-label="Primary"
      >
        <div className="portal-section flex h-[5rem] items-center md:h-[5.5rem]">
          {/* Left: logo — same horizontal rhythm as .portal-section */}
          <div className="flex min-w-0 flex-1 justify-start">
            <Link
              href="/"
              className="group relative z-[60] flex shrink-0 items-center outline-none ring-offset-2 ring-offset-portal-void focus-visible:ring-2 focus-visible:ring-cyan-400/80"
            >
              <span className="relative h-9 w-[8.5rem] min-h-[2.25rem] sm:h-10 sm:w-[9.5rem] md:h-11 md:w-[11rem] lg:h-12 lg:w-[12.5rem] xl:h-[3.25rem] xl:w-[14rem]">
                <Image
                  src="/assets/dual-logo.png"
                  alt="DualTech Labs — Home"
                  fill
                  className="object-contain object-left brightness-0 invert transition-[filter,opacity] duration-300 group-hover:opacity-100 group-hover:drop-shadow-[0_0_24px_rgba(34,211,238,0.28)] opacity-[0.92] drop-shadow-[0_1px_14px_rgba(34,211,238,0.14)]"
                  priority
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 220px, 260px"
                />
              </span>
            </Link>
          </div>

          {/* Center: pill nav — aligned with page typography (slate + cyan accents) */}
          <div className="hidden shrink-0 items-center justify-center lg:flex">
            <div className="flex items-center rounded-full border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.03] p-1 shadow-inner shadow-black/20">
              {NAV.map(({ label, hash }) => (
                <Link
                  key={hash}
                  href={sectionHref(pathname, hash)}
                  className="rounded-full px-4 py-2 font-sans text-sm font-medium text-slate-300 transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right: CTA + menu — mirror left flex-1 so center stays geometrically centered */}
          <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4 md:gap-5">
            <Link
              href="/contact"
              aria-current={contactActive ? "page" : undefined}
              className={`relative z-[60] inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-2.5 font-sans text-sm font-semibold tracking-wide transition-[filter,box-shadow,transform] duration-200 ease-out sm:px-7 sm:py-3 ${
                contactActive
                  ? "bg-cyan-500 text-portal-void shadow-cta ring-1 ring-cyan-400/50"
                  : "bg-gradient-to-r from-cyan-500 to-sky-600 text-white shadow-cta hover:brightness-110 active:scale-[0.98]"
              }`}
            >
              <span className="relative z-10">Get in touch</span>
              {!contactActive && (
                <span
                  className="absolute inset-0 bg-gradient-to-t from-white/0 via-white/10 to-white/20 opacity-0 transition-opacity hover:opacity-100"
                  aria-hidden
                />
              )}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="relative z-[60] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.05] text-slate-200 transition-colors hover:border-cyan-500/25 hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 lg:hidden"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">Menu</span>
              <span className="relative block h-5 w-5">
                <span
                  className={`absolute left-0 top-1 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "top-2.5 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-2.5 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-4 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                    mobileMenuOpen ? "top-2.5 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav"
            className="fixed inset-0 z-[55] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-portal-void/75 backdrop-blur-sm"
              aria-hidden
              tabIndex={-1}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="absolute left-4 right-4 top-[5.5rem] z-[56] max-h-[min(70vh,calc(100dvh-6rem))] overflow-y-auto rounded-2xl border border-white/[0.08] bg-portal-void/98 bg-portal-mesh p-6 shadow-nav-scrolled backdrop-blur-xl md:top-[6rem]"
            >
              <div className="flex flex-col gap-1">
                {NAV.map(({ label, hash }, i) => (
                  <motion.div
                    key={hash}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={sectionHref(pathname, hash)}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block rounded-xl px-4 py-3 font-sans text-base font-medium text-slate-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
                <div className="mt-4 border-t border-white/10 pt-4">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600 py-3.5 font-sans text-sm font-semibold text-white shadow-cta"
                  >
                    Get in touch
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

"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    num: "01",
    title: "We listen first.",
    headline: "Tell us the problem, not the solution.",
    body: "Most briefs describe a feature, not the actual need. We dig into what's really going wrong, who's affected, and what good looks like — before anyone opens a code editor.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "We build it — all of it.",
    headline: "Design, code, QA. Same team, start to finish.",
    body: "No handoffs between agencies. The people who design it build it, the people who build it test it. You get weekly demos tied to working software — not slides about software.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "You own it. Fully.",
    headline: "The code is yours the day we ship.",
    body: "Full source, clean docs, infrastructure you control. We don't lock you in. And we're reachable after launch — because the work doesn't stop when the site goes live.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
        <path d="M22 2L11 13" />
        <path d="M22 2L15 22l-4-9-9-4 20-7z" />
      </svg>
    ),
  },
] as const;

export default function HowItWorks() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative dtl-border-light py-16 md:py-24 lg:py-32 overflow-hidden dtl-bg-subtle"
    >
      {/* Very subtle brand glow — barely visible on off-white */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full opacity-[0.04]"
        style={{ background: "radial-gradient(ellipse, rgba(124,58,237,1) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="dtl-section relative z-10">
        {/* Heading */}
        <div className="mb-10 max-w-2xl md:mb-16 lg:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="font-display font-bold tracking-tight"
            style={{ fontSize: "clamp(2rem,4.5vw,3.25rem)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "#0F172A" }}
          >
            Three steps.{" "}
            <span className="dtl-gradient-text">No surprises.</span>
          </motion.h2>
        </div>

        {/* Animated connector line */}
        <div className="relative hidden md:block" aria-hidden>
          <svg
            className="absolute top-7 left-0 w-full"
            height="2"
            viewBox="0 0 900 2"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="stepLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"   stopColor="#7C3AED" stopOpacity="0" />
                <stop offset="15%"  stopColor="#7C3AED" stopOpacity="0.5" />
                <stop offset="50%"  stopColor="#A855F7" stopOpacity="0.4" />
                <stop offset="85%"  stopColor="#06B6D4" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d="M 60 1 L 840 1"
              stroke="url(#stepLineGrad)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            />
          </svg>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.16 + i * 0.14 }}
              className="relative flex flex-col gap-6"
            >
              {/* Watermark number — dark on light bg */}
              <div
                className="pointer-events-none absolute -top-6 right-0 font-display font-black select-none leading-none"
                style={{ fontSize: "clamp(5rem,12vw,8rem)", color: "rgba(15,23,42,0.05)" }}
                aria-hidden
              >
                {step.num}
              </div>

              {/* Icon */}
              <div className="relative z-10">
                <motion.div
                  animate={inView ? { scale: [0.85, 1], opacity: [0, 1] } : {}}
                  transition={{ duration: 0.5, ease, delay: 0.28 + i * 0.14 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    background: "rgba(124,58,237,0.08)",
                    border: "1px solid rgba(124,58,237,0.25)",
                    color: "#7C3AED",
                    boxShadow: "0 0 20px rgba(124,58,237,0.08)",
                  }}
                >
                  {step.icon}
                </motion.div>
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-3">
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-dtl-purple">
                  Step {step.num}
                </p>
                <h3
                  className="font-display font-bold leading-snug"
                  style={{ fontSize: "1.15rem", color: "#0F172A" }}
                >
                  {step.headline}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

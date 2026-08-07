"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const CARDS = [
  {
    id: "ownership",
    accentColor: "#7C3AED",
    accentAlpha: "rgba(124,58,237,",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "We own the whole build.",
    body: "Design, engineering, QA, and deployment — one team, zero handoffs. If it's broken, we fix it, regardless of who wrote it first.",
  },
  {
    id: "ip",
    accentColor: "#A855F7",
    accentAlpha: "rgba(168,85,247,",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: "Your code. Your IP. Always.",
    body: "Full source code on delivery. Clean documentation written for engineers who'll actually maintain it — not a PowerPoint that collects dust.",
  },
  {
    id: "honesty",
    accentColor: "#06B6D4",
    accentAlpha: "rgba(6,182,212,",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: "We'll say no when we should.",
    body: "If the timeline's wrong, the scope doesn't fit the budget, or you're solving the wrong problem — we tell you early, not after things go sideways.",
  },
] as const;

export default function WhyUs() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative border-t border-white/[0.05] py-16 md:py-24 lg:py-32 overflow-hidden"
      style={{ background: "#080c1e" }}
    >
      {/* Diagonal gradient background accent */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 50%, rgba(6,182,212,0.08) 0%, transparent 60%), " +
            "radial-gradient(ellipse 60% 50% at 10% 50%, rgba(124,58,237,0.10) 0%, transparent 60%)",
        }}
        aria-hidden
      />

      <div className="dtl-section relative z-10">

        {/* Heading */}
        <div className="mb-14 max-w-2xl md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="font-display font-bold tracking-tight text-white"
            style={{ fontSize: "clamp(2rem,4.5vw,3.25rem)", lineHeight: 1.05, letterSpacing: "-0.025em" }}
          >
            A few things that make{" "}
            <span className="dtl-gradient-text">working with us different.</span>
          </motion.h2>
        </div>

        {/* Cards — each visually distinct with its own accent */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.12 + i * 0.12 }}
              whileHover={{
                y: -4,
                boxShadow: `0 12px 48px -8px ${card.accentAlpha}0.35), inset 0 1px 0 ${card.accentAlpha}0.12)`,
              }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border"
              style={{
                borderColor: `${card.accentAlpha}0.18)`,
                background: `linear-gradient(155deg, ${card.accentAlpha}0.07) 0%, rgba(12,18,38,0.98) 60%)`,
                boxShadow: `0 4px 40px -8px ${card.accentAlpha}0.2), inset 0 1px 0 ${card.accentAlpha}0.08)`,
              }}
            >
              <div className="flex flex-col gap-5 p-6 md:p-8">
                {/* Icon */}
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl"
                  style={{
                    background: `${card.accentAlpha}0.15)`,
                    color: card.accentColor,
                  }}
                >
                  {card.icon}
                </div>

                {/* Title */}
                <h3
                  className="font-display font-bold leading-snug text-white"
                  style={{ fontSize: "1.15rem" }}
                >
                  {card.title}
                </h3>

                {/* Body */}
                <p className="text-sm leading-relaxed text-slate-300">
                  {card.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

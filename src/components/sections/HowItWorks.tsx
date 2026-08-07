"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const STEPS = [
  {
    num: "01",
    label: "Discovery",
    headline: "Tell us the problem,\nnot the solution.",
    body: "Most briefs describe a feature, not the actual need. We dig into what's really going wrong, who's affected, and what good looks like — before anyone opens a code editor.",
    accentFrom: "#7C3AED",
    accentTo:   "#A855F7",
    flip: false,
    // Decorative SVG — abstract radar/listen motif
    art: (color: string) => (
      <svg viewBox="0 0 200 200" fill="none" aria-hidden className="w-full h-full">
        <circle cx="100" cy="100" r="80"  stroke={color} strokeWidth="1"   opacity="0.10" />
        <circle cx="100" cy="100" r="55"  stroke={color} strokeWidth="1.2" opacity="0.14" />
        <circle cx="100" cy="100" r="30"  stroke={color} strokeWidth="1.5" opacity="0.18" />
        <circle cx="100" cy="100" r="10"  fill={color}   opacity="0.30" />
        {/* Sweep line */}
        <line x1="100" y1="100" x2="175" y2="30" stroke={color} strokeWidth="1.5" opacity="0.25" strokeLinecap="round" />
        <circle cx="175" cy="30" r="4" fill={color} opacity="0.40" />
        {/* Tick marks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 100 + Math.cos(rad) * 82;
          const y1 = 100 + Math.sin(rad) * 82;
          const x2 = 100 + Math.cos(rad) * 90;
          const y2 = 100 + Math.sin(rad) * 90;
          return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.5" opacity="0.20" strokeLinecap="round" />;
        })}
      </svg>
    ),
  },
  {
    num: "02",
    label: "Delivery",
    headline: "Design, code, QA.\nSame team, start to finish.",
    body: "No handoffs between agencies. The people who design it build it, the people who build it test it. You get weekly demos tied to working software — not slides about software.",
    accentFrom: "#0891B2",
    accentTo:   "#06B6D4",
    flip: true,
    // Decorative SVG — abstract build/code motif
    art: (color: string) => (
      <svg viewBox="0 0 200 200" fill="none" aria-hidden className="w-full h-full">
        {/* Code lines */}
        {[30, 50, 70, 90, 110, 130, 150].map((y, i) => (
          <rect key={y} x={20 + (i % 2) * 10} y={y} width={80 + (i % 3) * 30} height="10" rx="5"
            fill={color} opacity={0.06 + (i % 3) * 0.03} />
        ))}
        {/* Bracket */}
        <path d="M140 40 L120 40 L120 160 L140 160" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
        <path d="M160 40 L180 40 L180 160 L160 160" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.18" />
        {/* Cursor */}
        <rect x="130" y="95" width="3" height="18" rx="1.5" fill={color} opacity="0.55" />
        {/* Checkmark circle — bottom right */}
        <circle cx="165" cy="155" r="18" stroke={color} strokeWidth="1.5" opacity="0.30" />
        <polyline points="155,155 162,162 176,148" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
      </svg>
    ),
  },
  {
    num: "03",
    label: "Handover",
    headline: "The code is yours\nthe day we ship.",
    body: "Full source, clean docs, infrastructure you control. We don't lock you in. And we're reachable after launch — because the work doesn't stop when the site goes live.",
    accentFrom: "#7C3AED",
    accentTo:   "#06B6D4",
    flip: false,
    // Decorative SVG — abstract handover/key motif
    art: (color: string) => (
      <svg viewBox="0 0 200 200" fill="none" aria-hidden className="w-full h-full">
        {/* Key shape */}
        <circle cx="80" cy="90" r="35"  stroke={color} strokeWidth="2"   opacity="0.25" />
        <circle cx="80" cy="90" r="20"  stroke={color} strokeWidth="1.5" opacity="0.20" />
        <circle cx="80" cy="90" r="8"   fill={color}   opacity="0.30" />
        {/* Key shaft */}
        <line x1="108" y1="110" x2="170" y2="165" stroke={color} strokeWidth="6" strokeLinecap="round" opacity="0.20" />
        {/* Teeth */}
        <line x1="138" y1="133" x2="148" y2="123" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.25" />
        <line x1="152" y1="146" x2="162" y2="136" stroke={color} strokeWidth="4" strokeLinecap="round" opacity="0.20" />
        {/* Arrow — right */}
        <path d="M130 60 L160 60 M148 50 L160 60 L148 70" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
        {/* Arrow — right 2 */}
        <path d="M130 72 L155 72 M144 63 L155 72 L144 81" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.22" />
      </svg>
    ),
  },
] as const;

// ── Step row ────────────────────────────────────────────────────────────────
function StepRow({ step, index }: { step: typeof STEPS[number]; index: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  const isFlipped = step.flip;

  return (
    <div ref={ref}>
      <div
        className={`grid grid-cols-1 items-center gap-10 py-16 md:py-20 md:grid-cols-2 md:gap-16 lg:gap-24 ${
          isFlipped ? "md:[direction:rtl]" : ""
        }`}
      >
        {/* Text side */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className="flex flex-col gap-4 md:[direction:ltr]"
        >
          {/* Step label */}
          <div className="flex items-center gap-3">
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-[0.28em]"
              style={{ color: step.accentFrom }}
            >
              {step.num}
            </span>
            <div className="h-px w-6 rounded-full" style={{ background: step.accentFrom, opacity: 0.4 }} />
            <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#94A3B8" }}>
              {step.label}
            </span>
          </div>

          {/* Headline — the star of the show */}
          <h3
            className="font-display font-bold"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 3.2rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#0F172A",
              whiteSpace: "pre-line",
            }}
          >
            {step.headline}
          </h3>

          {/* Accent rule */}
          <div
            className="h-[2.5px] w-12 rounded-full"
            style={{ background: `linear-gradient(to right, ${step.accentFrom}, ${step.accentTo})` }}
          />

          {/* Body */}
          <p className="max-w-md text-[0.94rem] leading-[1.8]" style={{ color: "#64748B" }}>
            {step.body}
          </p>
        </motion.div>

        {/* Visual side — large gradient number + decorative art */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.75, ease, delay: 0.15 }}
          className="relative flex items-center justify-center md:[direction:ltr]"
          style={{ minHeight: "240px" }}
        >
          {/* Gradient number — the visual centrepiece */}
          <span
            aria-hidden
            className="pointer-events-none select-none font-display font-black leading-none"
            style={{
              fontSize: "clamp(9rem, 20vw, 14rem)",
              letterSpacing: "-0.06em",
              background: `linear-gradient(135deg, ${step.accentFrom}22 0%, ${step.accentTo}14 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              position: "absolute",
              zIndex: 0,
              lineHeight: 1,
            }}
          >
            {step.num}
          </span>

          {/* Decorative illustration — sits on top of number */}
          <div
            className="relative z-10"
            style={{ width: "clamp(140px, 22vw, 200px)", height: "clamp(140px, 22vw, 200px)" }}
          >
            {step.art(step.accentFrom)}
          </div>
        </motion.div>
      </div>

      {/* Divider — not after last step */}
      {index < STEPS.length - 1 && (
        <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, #E2E8F0 30%, #E2E8F0 70%, transparent)" }} />
      )}
    </div>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────
export default function HowItWorks() {
  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, amount: 0.5 });

  return (
    <section
      id="how-it-works"
      className="relative dtl-border-light overflow-hidden dtl-bg-subtle"
    >
      {/* Ambient purple glow — top left */}
      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full"
        style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.05) 0%, transparent 65%)" }}
        aria-hidden
      />

      <div className="dtl-section py-20 md:py-28">
        {/* Section heading */}
        <div ref={headingRef} className="mb-4 max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="mb-4 font-sans text-[10.5px] font-bold uppercase tracking-[0.26em]"
            style={{ color: "#94A3B8" }}
          >
            How we work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease, delay: 0.08 }}
            className="font-display font-bold"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#0F172A",
            }}
          >
            Three steps.{" "}
            <span className="dtl-gradient-text">No surprises.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease, delay: 0.16 }}
            className="mt-4 max-w-md text-[0.94rem] leading-relaxed"
            style={{ color: "#64748B" }}
          >
            From the first call to the final handover — here&apos;s exactly what working with us looks like.
          </motion.p>
        </div>

        {/* Steps */}
        <div>
          {STEPS.map((step, i) => (
            <StepRow key={step.num} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

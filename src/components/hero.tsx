"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Node positions [x%, y%] — pre-computed, SSR-safe, no random ──────────────
const NODES: readonly [number, number][] = [
  [8, 12],  [22, 6],  [38, 18], [56, 10], [72, 22], [88, 8],
  [4, 38],  [18, 32], [34, 44], [50, 28], [66, 40], [82, 35], [94, 42],
  [12, 58], [28, 68], [46, 52], [62, 63], [78, 70], [90, 57],
  [6, 82],  [24, 88], [42, 80], [58, 75], [74, 86], [86, 78],
  [50, 50], [33, 24], [68, 74], [15, 72], [88, 25],
];

// Pre-selected edges (visual, not exhaustive)
const EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],
  [0,6],[1,7],[2,8],[3,9],[4,10],[5,11],
  [6,7],[7,8],[8,9],[9,10],[10,11],[11,12],
  [6,13],[7,14],[8,15],[9,16],[10,17],[11,18],
  [13,14],[14,15],[15,16],[16,17],[17,18],
  [13,19],[14,20],[15,21],[16,22],[17,23],[18,24],
  [19,20],[20,21],[21,22],[22,23],[23,24],
  [2,25],[8,25],[9,25],[15,25],
  [1,26],[7,26],[8,26],
  [16,27],[17,27],[22,27],
  [13,28],[19,28],
  [4,29],[5,29],[11,29],
];

// Accent nodes — purple or cyan glow
const PURPLE_NODES = new Set([25, 9, 26]);
const CYAN_NODES   = new Set([27, 16]);

// ── Animated node graph ───────────────────────────────────────────────────────
function NodeGraph({ reduced }: { reduced: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden
    >
      {!reduced && (
        <defs>
          <style>{`
            @keyframes dtlNodePulse {
              0%, 100% { opacity: 0.18; }
              50%       { opacity: 0.48; }
            }
            @keyframes dtlAccentPulse {
              0%, 100% { r: 0.38; opacity: 0.9; }
              50%       { r: 0.55; opacity: 1;   }
            }
            @keyframes dtlGlowPulse {
              0%, 100% { r: 1.0; opacity: 0.35; }
              50%       { r: 1.8; opacity: 0.55; }
            }
            @keyframes dtlScanLine {
              0%   { transform: translateY(-8%); opacity: 0; }
              10%  { opacity: 1; }
              90%  { opacity: 1; }
              100% { transform: translateY(108%); opacity: 0; }
            }
          `}</style>
          <radialGradient id="hPurple" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#7C3AED" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0"   />
          </radialGradient>
          <radialGradient id="hCyan" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#06B6D4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0"   />
          </radialGradient>
          <filter id="hGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.25" />
          </filter>
        </defs>
      )}

      {/* Edges */}
      {EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a][0]} y1={NODES[a][1]}
          x2={NODES[b][0]} y2={NODES[b][1]}
          stroke="rgba(255,255,255,0.055)"
          strokeWidth="0.14"
        />
      ))}

      {/* Nodes */}
      {NODES.map(([cx, cy], i) => {
        const isPurple = PURPLE_NODES.has(i);
        const isCyan   = CYAN_NODES.has(i);
        const isAccent = isPurple || isCyan;
        const color    = isCyan ? "#06B6D4" : isPurple ? "#7C3AED" : "rgba(255,255,255,0.35)";
        const glowGrad = isCyan ? "url(#hCyan)" : "url(#hPurple)";
        const dur      = `${2.8 + (i % 6) * 0.45}s`;
        const begin    = `${(i % 5) * 0.35}s`;

        return (
          <g key={i}>
            {/* Accent glow halo */}
            {isAccent && !reduced && (
              <circle
                cx={cx} cy={cy} r="1.2"
                fill={glowGrad}
                filter="url(#hGlow)"
                style={{ animation: `dtlGlowPulse ${dur} ease-in-out ${begin} infinite` }}
              />
            )}
            {/* Node dot */}
            <circle
              cx={cx} cy={cy}
              r={isAccent ? 0.42 : 0.24}
              fill={color}
              style={!reduced ? {
                animation: isAccent
                  ? `dtlAccentPulse ${dur} ease-in-out ${begin} infinite`
                  : `dtlNodePulse  ${dur} ease-in-out ${begin} infinite`,
              } : { opacity: isAccent ? 0.7 : 0.25 }}
            />
          </g>
        );
      })}

      {/* Slow horizontal scan line */}
      {!reduced && (
        <line
          x1="0" y1="0" x2="100" y2="0"
          stroke="rgba(124,58,237,0.035)"
          strokeWidth="6"
          style={{ animation: "dtlScanLine 14s ease-in-out 2s infinite" }}
        />
      )}
    </svg>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HEADLINE_LINES = ["We build it.", "You own it."] as const;
const VALUE_PROPS    = ["Global Engineering", "Complete Ownership", "Zero Lock-in"] as const;

const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced    = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reduced ? {} : {
      initial:    { opacity: 0, y: 16 },
      animate:    { opacity: 1, y: 0  },
      transition: { duration: 0.65, ease, delay },
    };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const graphY      = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -55]);
  const contentY    = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -28]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "#050714", height: "100dvh", minHeight: "620px" }}
    >
      {/* ── Node graph ─────────────────────────────────────────────────────── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: graphY }}>
        <NodeGraph reduced={!!reduced} />
      </motion.div>

      {/* ── Ambient glow — centred, purple tint ────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background: [
            "radial-gradient(ellipse 65% 60% at 50% 42%,",
            "rgba(124,58,237,0.13) 0%,",
            "rgba(6,182,212,0.04) 52%,",
            "transparent 75%)",
          ].join(" "),
        }}
        aria-hidden
      />

      {/* Top + bottom vignettes */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32" style={{ background: "linear-gradient(to bottom, rgba(5,7,18,0.65), transparent)" }} aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40" style={{ background: "linear-gradient(to top, #050714 12%, rgba(5,7,18,0.55) 60%, transparent)" }} aria-hidden />

      {/* ── Content — centred ──────────────────────────────────────────────── */}
      <motion.div
        className="dtl-section relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ y: contentY, opacity: heroOpacity }}
      >
        <div className="flex max-w-[740px] flex-col items-center">

          {/* Kicker with flanking lines */}
          <motion.div {...fadeUp(0.10)} className="mb-8 flex items-center gap-3">
            <div className="h-px w-10 rounded-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.6))" }} />
            <span className="font-sans text-[10.5px] font-semibold uppercase tracking-[0.24em]" style={{ color: "#475569" }}>
              Global IT Services
            </span>
            <div className="h-px w-10 rounded-full" style={{ background: "linear-gradient(90deg, rgba(6,182,212,0.6), transparent)" }} />
          </motion.div>

          {/* Headline — word-reveal animation */}
          <h1
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(2.8rem, 8.5vw, 7.8rem)", lineHeight: 0.91, letterSpacing: "-0.04em" }}
          >
            {HEADLINE_LINES.map((line, i) => (
              <span key={line} className="block" style={{ overflow: "hidden" }}>
                <motion.span
                  initial={reduced ? undefined : { y: "112%", opacity: 0 }}
                  animate={reduced ? undefined : { y: "0%",   opacity: 1 }}
                  transition={{ duration: 0.85, ease, delay: reduced ? 0 : 0.18 + i * 0.12 }}
                  style={{ display: "block" }}
                >
                  {line}
                </motion.span>
              </span>
            ))}

            {/* "Forever." — gradient accent word */}
            <span className="block" style={{ overflow: "hidden" }}>
              <motion.span
                initial={reduced ? undefined : { y: "112%", opacity: 0 }}
                animate={reduced ? undefined : { y: "0%",   opacity: 1 }}
                transition={{ duration: 0.85, ease, delay: reduced ? 0 : 0.44 }}
                style={{ display: "block" }}
              >
                <span className="dtl-gradient-text">Forever.</span>
              </motion.span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.62)}
            className="mt-6 max-w-[500px] text-[0.94rem] leading-[1.75] text-slate-300"
          >
            Design, engineering, and delivery — one team, start to finish.
            No middlemen, no platform lock-in, no dependency on us after handover.
          </motion.p>

          {/* Value props — brand claims, not numbers */}
          <motion.div
            {...fadeUp(0.72)}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            {VALUE_PROPS.map((prop, i) => (
              <React.Fragment key={prop}>
                <span
                  className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "#4B5563" }}
                >
                  {prop}
                </span>
                {i < VALUE_PROPS.length - 1 && (
                  <span
                    className="hidden sm:block h-3 w-px rounded-full"
                    style={{ background: "#1E293B" }}
                  />
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.84)}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton
              as="a"
              href="/contact"
              className="dtl-cta-primary"
              strength={0.35}
              style={{ boxShadow: "0 4px 22px rgba(124,58,237,0.42)" }}
            >
              Let&apos;s Talk
            </MagneticButton>
            <MagneticButton as="a" href="#services" className="dtl-cta-secondary" strength={0.28}>
              Our Services
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll indicator ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-700">
          Scroll
        </span>
        <div className="relative h-8 w-px overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
          <div
            className="absolute inset-x-0 h-1/2 rounded-full"
            style={{
              background: "linear-gradient(to bottom, transparent, #7C3AED, #06B6D4, transparent)",
              animation:  "scrollDot 1.7s cubic-bezier(0.4,0,0.6,1) infinite",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;

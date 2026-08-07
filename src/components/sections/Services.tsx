"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  motion, AnimatePresence,
  useScroll, useMotionValueEvent,
  useMotionValue, useSpring, useTransform,
  useReducedMotion,
} from "framer-motion";
import { ServiceBgs } from "@/lib/service-bgs";

// ─── Navigation links ─────────────────────────────────────────────────────────
const SERVICE_LINKS: Record<string, string> = {
  "custom-software":        "/services/custom-software-development",
  "ai-systems":             "/services/ai-development",
  "cloud-devops":           "/services/cloud-devops",
  "mobile":                 "/services/mobile-app-development",
  "ui-ux":                  "/services/ui-ux-design",
  "web-platforms":          "/services/web-development",
  "digital-transformation": "/services/digital-transformation",
  "fintech":                "/services/fintech-development",
  "api":                    "/services/api-development",
  "security":               "/services/cybersecurity",
  "qa":                     "/services/qa-testing",
  "consulting":             "/services/it-consulting",
};

// ─── Service icons ────────────────────────────────────────────────────────────
const ServiceIcons: Record<string, React.ReactElement> = {
  "custom-software": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  "ai-systems": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
      <circle cx="7.5" cy="14.5" r="1"/><circle cx="16.5" cy="14.5" r="1"/>
    </svg>
  ),
  "cloud-devops": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  ),
  "mobile": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  "ui-ux": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/>
      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/>
    </svg>
  ),
  "web-platforms": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  "digital-transformation": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  ),
  "fintech": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  "api": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
    </svg>
  ),
  "security": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  "qa": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
    </svg>
  ),
  "consulting": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
};

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "custom-software",
    title: "Custom Software",
    fullTitle: "Custom Software Development",
    tagline: "We own the architecture, delivery, and hand you the keys.",
    desc: "End-to-end software built to your exact requirements — from system architecture through QA, deployment, and 30-day post-launch support.",
    accentFrom: "#7C3AED", accentTo: "#A855F7",
  },
  {
    id: "ai-systems",
    title: "AI & Intelligent Systems",
    fullTitle: "AI & Intelligent Systems",
    tagline: "Real AI in real products — not wrappers, not demos.",
    desc: "We build, train, and embed models that solve genuine problems. Every use case is evaluated for real ROI before a single line of model code is written.",
    accentFrom: "#6D28D9", accentTo: "#06B6D4",
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    fullTitle: "Cloud & DevOps",
    tagline: "Deployments should be boring. Incidents should be rare.",
    desc: "Right-sized cloud infrastructure, CI/CD pipelines, and automated observability. We audit, migrate, and optimise — with rollback procedures at every step.",
    accentFrom: "#0891B2", accentTo: "#06B6D4",
  },
  {
    id: "mobile",
    title: "Mobile Engineering",
    fullTitle: "Mobile Engineering",
    tagline: "Fast on a 3-year-old phone. Native where it matters.",
    desc: "iOS and Android apps built for real device performance. React Native, Flutter, or pure native — chosen for your users, not our convenience.",
    accentFrom: "#7C3AED", accentTo: "#06B6D4",
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    fullTitle: "UI/UX Design",
    tagline: "Makes sense first. Then it looks good.",
    desc: "Research-driven design validated with real users. High-fidelity Figma handover with design tokens your developers can build from without guessing.",
    accentFrom: "#A855F7", accentTo: "#EC4899",
  },
  {
    id: "web-platforms",
    title: "Web Platforms",
    fullTitle: "Web Platforms & Applications",
    tagline: "Loads fast, handles traffic, built for the long run.",
    desc: "Next.js, Remix, or custom stacks chosen for your actual scale. Core Web Vitals tracked from day one, SEO and accessibility built in — not bolted on.",
    accentFrom: "#0891B2", accentTo: "#7C3AED",
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    fullTitle: "Digital Transformation",
    tagline: "Off legacy stacks. Into systems that move fast.",
    desc: "Phased migration roadmaps that deliver value early. We sequence changes so existing operations keep running while modern capabilities come online.",
    accentFrom: "#059669", accentTo: "#06B6D4",
  },
  {
    id: "fintech",
    title: "Fintech & Payments",
    fullTitle: "Fintech & Payments",
    tagline: "Where bugs aren't bugs — they're liabilities.",
    desc: "Payment flows, compliance mapping, and financial system architecture built for correctness first. Edge cases — failed payments, disputes, refunds — designed explicitly.",
    accentFrom: "#0891B2", accentTo: "#059669",
  },
  {
    id: "api",
    title: "API & Integrations",
    fullTitle: "API Development & Integrations",
    tagline: "Connect things that weren't meant to talk. Clean contracts.",
    desc: "RESTful, GraphQL, or event-driven APIs with versioning, auth model, and contract testing. We design for the failure cases, not just the happy path.",
    accentFrom: "#7C3AED", accentTo: "#0891B2",
  },
  {
    id: "security",
    title: "Cybersecurity",
    fullTitle: "Cybersecurity & Compliance",
    tagline: "Find problems before someone else does it for you.",
    desc: "Manual penetration testing, architecture review, and ongoing SIEM monitoring. We look at your system the way an attacker would — then fix what we find.",
    accentFrom: "#DC2626", accentTo: "#7C3AED",
  },
  {
    id: "qa",
    title: "QA & Testing",
    fullTitle: "QA & Testing",
    tagline: "Tests that mean something. Not just tests that run green.",
    desc: "Automated suites on every commit plus exploratory testing that catches what scripts miss. Coverage ratcheting keeps the suite trustworthy as you grow.",
    accentFrom: "#059669", accentTo: "#0891B2",
  },
  {
    id: "consulting",
    title: "IT Consulting",
    fullTitle: "IT Consulting",
    tagline: "Sometimes the best advice is what not to build.",
    desc: "Specific, actionable recommendations backed by deep diagnosis of your actual bottlenecks — not generic best practices. We stay involved through implementation.",
    accentFrom: "#7C3AED", accentTo: "#A855F7",
  },
] as const;

type ServiceType = typeof SERVICES[number];

// +1 for intro screen, +1 for end buffer
const TOTAL_SLOTS = SERVICES.length + 2;

// ─── Service card ─────────────────────────────────────────────────────────────
function ServiceCard({
  service,
  index,
  noMotion,
}: {
  service: ServiceType;
  index: number;
  noMotion: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const BgRenderer = ServiceBgs[service.id];

  // Mouse-tracking motion values — always initialised (rules of hooks)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-5, 5]),  { stiffness: 180, damping: 28 });
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [4, -4]),  { stiffness: 180, damping: 28 });
  // Illustration drifts opposite — adds depth
  const illX = useTransform(rawX, [-0.5, 0.5], [14, -14]);
  const illY = useTransform(rawY, [-0.5, 0.5], [8, -8]);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (noMotion || !cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width  - 0.5);
    rawY.set((e.clientY - r.top)  / r.height - 0.5);
  }, [noMotion, rawX, rawY]);

  const onMouseLeave = useCallback(() => { rawX.set(0); rawY.set(0); }, [rawX, rawY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, x: 110, scale: 0.93 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{
        opacity: 0, x: -80, scale: 0.97,
        transition: { duration: 0.20, ease: [0.36, 0, 0.66, 0] },
      }}
      transition={noMotion
        ? { duration: 0.25 }
        : { type: "spring", stiffness: 260, damping: 28 }
      }
      style={{
        rotateX: noMotion ? 0 : rotateX,
        rotateY: noMotion ? 0 : rotateY,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
        position: "absolute",
        inset: 0,
        borderRadius: "26px",
        // Flat ultra-dark card — no gradient, avoids the generic "dark tech" gradient look
        background: "#0A0E1C",
        border: "1px solid rgba(255,255,255,0.06)",
        // Top accent hairline — the one deliberate gradient element
        boxShadow: `
          0 0 0 0.5px rgba(255,255,255,0.04) inset,
          0 48px 96px -24px rgba(0,0,0,0.90),
          0 0 80px ${service.accentFrom}12
        `,
        overflow: "hidden",
      }}
    >
      {/* Top hairline gradient — editorial accent, not decoration */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent 5%, ${service.accentFrom}70 40%, ${service.accentTo}70 60%, transparent 95%)` }}
      />

      {/* ── Illustration zone — left ≥ md, top < md ─────────────────────── */}
      <div className="svc-illus-zone absolute left-0 top-0 w-full md:inset-y-0 md:w-[52%]">
        {/* Asymmetric glow — from top-left, not centered (breaks the AI-template look) */}
        <motion.div
          key={`glow-${index}`}
          className="pointer-events-none absolute inset-0"
          animate={noMotion ? {} : { opacity: [0.75, 1.15, 0.75] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: `radial-gradient(ellipse 80% 75% at 30% 35%, ${service.accentFrom}26 0%, ${service.accentTo}0c 55%, transparent 78%)`,
          }}
        />

        {/* Floating illustration */}
        <motion.div
          className="absolute inset-0"
          style={{ color: service.accentFrom, x: noMotion ? 0 : illX, y: noMotion ? 0 : illY }}
          animate={noMotion ? {} : { y: [0, -7, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        >
          {BgRenderer?.(service.accentFrom)}
        </motion.div>

        {/* Fade edge: right (desktop) */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-28 md:block"
          style={{ background: "linear-gradient(to right, transparent, #0A0E1C)" }}
        />
        {/* Fade edge: bottom (mobile) */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14 md:hidden"
          style={{ background: "linear-gradient(to bottom, transparent, #0A0E1C)" }}
        />
      </div>

      {/* ── Text zone — right ≥ md, bottom < md ──────────────────────────── */}
      <div className="svc-text-zone absolute inset-x-0 bottom-0 flex flex-col justify-center md:inset-y-0 md:right-0 md:left-[52%]">
        <div className="flex h-full flex-col justify-center px-5 py-3 md:px-9 md:py-10">

          {/* Service icon */}
          <div
            className="mb-3 md:mb-4 flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{
              background: `${service.accentFrom}20`,
              border: `1.5px solid ${service.accentFrom}35`,
              color: service.accentFrom,
              boxShadow: `0 0 28px ${service.accentFrom}30`,
            }}
          >
            {ServiceIcons[service.id]}
          </div>

          {/* Counter */}
          <span
            className="mb-1.5 font-mono text-[11px] tracking-[0.22em]"
            style={{ color: `${service.accentFrom}75` }}
          >
            {String(index + 1).padStart(2, "0")} / {SERVICES.length}
          </span>

          {/* Service name — large, no animation stagger (feels more editorial, less template) */}
          <h2
            className="font-display font-bold text-white"
            style={{
              fontSize: "clamp(1.35rem, 2.3vw, 2rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            {service.fullTitle}
          </h2>

          {/* Accent rule — the ONE animated element in text zone */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "42px", opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.45 }}
            className="my-3 h-[2px] shrink-0 rounded-full"
            style={{ background: `linear-gradient(to right, ${service.accentFrom}, ${service.accentTo})` }}
          />

          {/* Tagline — accent, bold, distinct from description */}
          <p
            className="mb-2.5 font-sans text-[13px] font-semibold leading-snug"
            style={{ color: service.accentFrom }}
          >
            {service.tagline}
          </p>

          {/* Description — clamped to 3 lines on mobile so CTA stays visible */}
          <p
            className="svc-desc mb-3 md:mb-5 font-sans text-[12px] md:text-[12.5px] leading-relaxed"
            style={{ color: "#94A3B8", maxWidth: "280px" }}
          >
            {service.desc}
          </p>

          {/* CTA — flat solid button, not gradient (less AI-generated) */}
          {SERVICE_LINKS[service.id] && (
            <Link
              href={SERVICE_LINKS[service.id]}
              className="inline-flex self-start items-center gap-2 rounded-xl px-4 py-2.5 font-sans text-[13px] font-semibold transition-all duration-200 hover:opacity-80 active:scale-[0.97]"
              style={{
                background: service.accentFrom,
                color: "#fff",
                boxShadow: `0 4px 18px ${service.accentFrom}38`,
              }}
            >
              Explore service
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 shrink-0" aria-hidden>
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Intro overlay (cinematic opening beat) ───────────────────────────────────
function IntroOverlay({ visible, noMotion }: { visible: boolean; noMotion: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: noMotion ? 0.1 : 0.55, ease: "easeIn" } }}
          transition={{ duration: 0.4 }}
        >
          <motion.span
            className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-slate-500"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            What we do
          </motion.span>
          <motion.h2
            className="text-center font-display font-bold text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, type: "spring", stiffness: 240, damping: 26 }}
          >
            12 capabilities.<br />One engineering team.
          </motion.h2>
          <motion.p
            className="mt-4 font-sans text-sm text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            Scroll to explore each service
          </motion.p>
          <motion.div
            className="mt-6"
            animate={noMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg viewBox="0 0 16 24" className="h-5 w-3 text-slate-600" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="1" y="1" width="14" height="22" rx="7"/>
              <line x1="8" y1="5" x2="8" y2="10" strokeLinecap="round"/>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function Services() {
  const sectionRef    = useRef<HTMLElement>(null);
  const [activeIdx,  setActiveIdx]  = useState(0);
  const [showIntro,  setShowIntro]  = useState(true);
  const [showHint,   setShowHint]   = useState(true);
  const noMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // First slot (0 → 1/TOTAL_SLOTS) = intro screen
    const introCutoff = 0.75 / TOTAL_SLOTS;
    if (latest < introCutoff) { setShowIntro(true); return; }
    setShowIntro(false);
    // Remaining slots map to services
    const serviceProgress = (latest - introCutoff) / (1 - introCutoff);
    const newIdx = Math.min(
      Math.floor(serviceProgress * (SERVICES.length + 0.5)),
      SERVICES.length - 1,
    );
    if (newIdx !== activeIdx) setActiveIdx(newIdx);
  });

  // Hide scroll hint after 4s or on first service change
  useEffect(() => {
    if (activeIdx > 0) { setShowHint(false); return; }
    const t = setTimeout(() => setShowHint(false), 4000);
    return () => clearTimeout(t);
  }, [activeIdx]);

  // Jump to a service via smooth scroll
  const goToService = useCallback((idx: number) => {
    if (!sectionRef.current) return;
    const top    = sectionRef.current.getBoundingClientRect().top + window.scrollY;
    const height = sectionRef.current.offsetHeight;
    // Aim for 80% into the target service slot
    const introCutoff = 0.75 / TOTAL_SLOTS;
    const slotSize    = (1 - introCutoff) / (SERVICES.length + 0.5);
    const progress    = introCutoff + (idx + 0.2) * slotSize;
    window.scrollTo({ top: top + progress * height, behavior: "smooth" });
  }, []);

  // Keyboard navigation (arrow keys)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (showIntro) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goToService(Math.min(activeIdx + 1, SERVICES.length - 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goToService(Math.max(activeIdx - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, showIntro, goToService]);

  const service = SERVICES[activeIdx];

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-label="Our services"
      className="services-scroll-section"
    >
      {/* ── Sticky viewport ─────────────────────────────────────────────── */}
      <div
        className="services-sticky-inner sticky top-0 flex flex-col items-center justify-center overflow-hidden"
        style={{ background: "#050714" }}
      >
        {/* Ambient section glow — asymmetric left-side origin, shifts per service */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`ambient-${activeIdx}`}
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            style={{
              background: `radial-gradient(ellipse 55% 65% at 22% 45%, ${service.accentFrom}18 0%, ${service.accentTo}08 50%, transparent 72%)`,
            }}
          />
        </AnimatePresence>

        {/* Intro overlay */}
        <IntroOverlay visible={showIntro} noMotion={noMotion} />

        {/* Card area */}
        {!showIntro && (
          <div className="relative z-10 w-full px-4">
            {/* Card size wrapper */}
            <div className="services-card-wrapper relative mx-auto">

              {/* ← Prev arrow (desktop only) */}
              <button
                onClick={() => goToService(Math.max(activeIdx - 1, 0))}
                disabled={activeIdx === 0}
                aria-label="Previous service"
                className="services-arrow services-arrow--left group absolute -left-12 top-1/2 -translate-y-1/2 hidden md:flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 backdrop-blur transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-0"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                  <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* → Next arrow (desktop only) */}
              <button
                onClick={() => goToService(Math.min(activeIdx + 1, SERVICES.length - 1))}
                disabled={activeIdx === SERVICES.length - 1}
                aria-label="Next service"
                className="services-arrow services-arrow--right absolute -right-12 top-1/2 -translate-y-1/2 hidden md:flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 backdrop-blur transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white disabled:pointer-events-none disabled:opacity-0"
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-3.5 w-3.5">
                  <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Animated card */}
              <AnimatePresence initial={false}>
                <ServiceCard
                  key={activeIdx}
                  service={service}
                  index={activeIdx}
                  noMotion={noMotion}
                />
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ── Progress dots ───────────────────────────────────────────────── */}
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2.5">
          {/* Current service name */}
          {!showIntro && (
            <AnimatePresence mode="wait">
              <motion.span
                key={`label-${activeIdx}`}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.22 }}
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.20em]"
                style={{ color: `${service.accentFrom}90` }}
              >
                {service.title}
              </motion.span>
            </AnimatePresence>
          )}

          {/* Dot strip */}
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Service navigation">
            {SERVICES.map((s, i) => (
              <motion.button
                key={s.id}
                role="tab"
                aria-selected={i === activeIdx && !showIntro}
                aria-label={`Go to ${s.title}`}
                onClick={() => { setShowIntro(false); goToService(i); }}
                animate={{
                  width:   i === activeIdx && !showIntro ? "20px" : "6px",
                  opacity: i === activeIdx && !showIntro ? 1
                         : Math.abs(i - activeIdx) === 1 ? 0.40
                         : 0.18,
                  background: i === activeIdx && !showIntro ? service.accentFrom : "#334155",
                }}
                transition={{ duration: 0.26 }}
                className="h-1.5 rounded-full"
              />
            ))}
          </div>

          {/* Scroll hint */}
          <AnimatePresence>
            {showHint && !showIntro && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-0.5 flex items-center gap-1.5 font-sans text-[10px] text-slate-600"
              >
                <svg viewBox="0 0 14 22" className="h-4 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <rect x="1" y="1" width="12" height="20" rx="6"/>
                  <line x1="7" y1="5" x2="7" y2="9" strokeLinecap="round"/>
                </svg>
                Scroll or use arrow keys
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

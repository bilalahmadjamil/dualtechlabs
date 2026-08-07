"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  motion, AnimatePresence,
  useReducedMotion, useInView, useScroll,
} from "framer-motion";
import Footer from "@/components/footer";
import { ServiceBgs } from "@/lib/service-bgs";
import { ENGAGEMENT_MODELS, type ServicePageData } from "@/lib/services-data";

// ─── Animation helpers ─────────────────────────────────────────────────────────
const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
};

// Trigger as soon as 5% of section enters viewport — prevents blank-padding flash
const vp = { once: true, amount: 0.05 } as const;

// ─── Section kicker ────────────────────────────────────────────────────────────
function Kicker({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <motion.p
      variants={fadeUp}
      className="mb-3 font-sans text-[10.5px] font-bold uppercase tracking-[0.24em]"
      style={{ color: light ? "#94A3B8" : "#64748B" }}
    >
      {label}
    </motion.p>
  );
}

// ─── Section heading ───────────────────────────────────────────────────────────
function SectionHeading({
  children,
  light = false,
  gradient,
}: {
  children: React.ReactNode;
  light?: boolean;
  gradient: string;
}) {
  return (
    <motion.h2
      variants={fadeUp}
      className={`font-display font-bold mb-10 ${light ? "" : "text-white"}`}
      style={{
        fontSize: "clamp(1.65rem, 2.8vw, 2.4rem)",
        lineHeight: 1.08,
        letterSpacing: "-0.026em",
        color: light ? "#0F172A" : undefined,
      }}
    >
      {children}
    </motion.h2>
  );
}

function Grad({ children, gradient }: { children: React.ReactNode; gradient: string }) {
  return (
    <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradient }}>
      {children}
    </span>
  );
}

// ─── Persona icons — distinct per audience type ────────────────────────────────
const PERSONA_ICONS = [
  // Startup / founder
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
  </svg>,
  // CTO / technical
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>,
  // Product / growth
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
  </svg>,
  // Enterprise
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>,
  // Agency / partner
  <svg key="4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>,
  // Investor / board
  <svg key="5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
  </svg>,
];

// ─── Process step row ──────────────────────────────────────────────────────────
function ProcessStep({
  step,
  index,
  total,
  accentFrom,
  accentTo,
  gradient,
}: {
  step: { num: string; name: string; desc: string; deliverables: readonly string[] };
  index: number;
  total: number;
  accentFrom: string;
  accentTo: string;
  gradient: string;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const isLast = index === total - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease, delay: index * 0.08 }}
      className="relative flex gap-6 md:gap-10"
    >
      {/* Left: number + connector line */}
      <div className="flex flex-col items-center">
        {/* Step circle */}
        <div
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display font-bold text-white z-10"
          style={{
            background: gradient,
            fontSize: "0.8rem",
            boxShadow: `0 0 20px ${accentFrom}40`,
          }}
        >
          {step.num}
        </div>
        {/* Connector line */}
        {!isLast && (
          <div
            className="mt-2 flex-1 w-px min-h-[40px]"
            style={{
              background: `linear-gradient(to bottom, ${accentFrom}50, ${accentFrom}10)`,
            }}
          />
        )}
      </div>

      {/* Right: content */}
      <div className={`flex-1 min-w-0 ${isLast ? "pb-0" : "pb-10 md:pb-12"}`}>
        <div className="mb-1 flex items-baseline gap-3">
          <h3
            className="font-display font-bold text-white"
            style={{ fontSize: "clamp(1.05rem, 2vw, 1.25rem)", lineHeight: 1.25 }}
          >
            {step.name}
          </h3>
        </div>
        <p className="mb-4 text-[0.9rem] leading-relaxed" style={{ color: "#94A3B8" }}>
          {step.desc}
        </p>

        {/* Deliverables — clean tag-style pills */}
        <div className="flex flex-wrap gap-2">
          {step.deliverables.map((d) => (
            <span
              key={d}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-[11px] font-medium"
              style={{
                background: `${accentFrom}12`,
                color: `${accentFrom}dd`,
                border: `1px solid ${accentFrom}20`,
              }}
            >
              <span
                className="h-1 w-1 shrink-0 rounded-full"
                style={{ background: accentFrom }}
                aria-hidden
              />
              {d}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── FAQ item with animated expand ────────────────────────────────────────────
function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
  accentFrom,
  gradient,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  accentFrom: string;
  gradient: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="overflow-hidden rounded-2xl border"
      style={{
        borderColor: isOpen ? `${accentFrom}30` : "#E2E8F0",
        background: isOpen ? `linear-gradient(to right, ${accentFrom}06, transparent)` : "#FFFFFF",
        transition: "border-color 0.2s, background 0.3s",
      }}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-5 py-4 text-left md:px-6 md:py-5"
        aria-expanded={isOpen}
      >
        {/* Question number */}
        <span
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[10px] font-bold"
          style={
            isOpen
              ? { background: gradient, color: "#fff" }
              : { background: "#F1F5F9", color: "#64748B" }
          }
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <h3
          className="flex-1 font-display font-semibold"
          style={{ fontSize: "0.97rem", lineHeight: 1.4, color: "#0F172A" }}
        >
          {faq.q}
        </h3>

        <motion.svg
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-4 w-4 shrink-0"
          style={{ color: accentFrom }}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          aria-hidden
        >
          <path d="M3 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease }}
          >
            <div className="px-5 pb-5 md:px-6 md:pb-6">
              <p
                className="pl-10 text-[0.9rem] leading-[1.75]"
                style={{ color: "#475569" }}
              >
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function ServiceDetailPage({ data }: { data: ServicePageData }) {
  const { serviceId, accentFrom, accentTo } = data;
  const BgRenderer = ServiceBgs[serviceId];

  const reduceMotion = useReducedMotion();
  const heroRef      = useRef<HTMLElement>(null);
  const heroInView   = useInView(heroRef);

  const heroDrift = reduceMotion || !heroInView
    ? undefined
    : { x: [0, -14, 0], y: [0, -9, 0] };

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const { scrollYProgress } = useScroll();

  const gradient = `linear-gradient(135deg, ${accentFrom}, ${accentTo})`;
  const badgeStyle = { background: `${accentFrom}18`, color: accentFrom, border: `1px solid ${accentFrom}28` };

  return (
    <div className="flex flex-col">

      {/* ── Scroll progress bar ───────────────────────────────────────────────── */}
      {!reduceMotion && (
        <motion.div
          className="fixed left-0 right-0 top-0 z-[200] h-[3px] origin-left"
          style={{ scaleX: scrollYProgress, background: gradient }}
          aria-hidden
        />
      )}

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative dtl-bg-void overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[700px] w-[900px] rounded-full"
          style={{ background: `radial-gradient(circle, ${accentFrom}20 0%, transparent 60%)` }}
          aria-hidden
        />

        {/* Thematic SVG background */}
        {BgRenderer && (
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-60"
            animate={heroDrift}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            {BgRenderer(accentFrom)}
          </motion.div>
        )}

        <div className="dtl-section relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
            className="mb-8 flex items-center gap-2 font-sans text-[12px] text-slate-500"
          >
            <Link href="/" className="hover:text-slate-300 transition-colors">Home</Link>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3 opacity-40" aria-hidden>
              <path d="M6 3l4 5-4 5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <Link href="/#services" className="hover:text-slate-300 transition-colors">Services</Link>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3 opacity-40" aria-hidden>
              <path d="M6 3l4 5-4 5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ color: accentFrom }}>{data.heroHeadlinePart1.replace(/[.,—]/g, "").trim()}</span>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="dtl-headline mb-6"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.03, letterSpacing: "-0.035em" }}
            >
              {data.heroHeadlinePart1}{" "}
              <Grad gradient={gradient}>{data.heroHeadlinePart2}</Grad>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="dtl-body mb-8 max-w-xl"
              style={{ fontSize: "1.05rem", lineHeight: 1.75 }}
            >
              {data.heroCopy}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link href="/contact" className="dtl-cta-primary">
                Get a free consultation
              </Link>
              <Link href="/#services" className="dtl-cta-secondary">
                ← All services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── What we build — light ─────────────────────────────────────────────── */}
      <section className="dtl-bg-light dtl-border-light py-10 md:py-16">
        <div className="dtl-section">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
            <Kicker label="What we build" />
            <SectionHeading light gradient={gradient}>
              Software for every layer of{" "}
              <Grad gradient={gradient}>your business.</Grad>
            </SectionHeading>
            <motion.div variants={stagger} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.whatWeBuild.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="dtl-card-l flex flex-col gap-3 p-6"
                >
                  <div
                    className="h-[3px] w-8 rounded-full"
                    style={{ background: gradient }}
                    aria-hidden
                  />
                  <h3
                    className="font-display font-bold"
                    style={{ fontSize: "1.02rem", color: "#0F172A" }}
                  >
                    {item.title}
                  </h3>
                  <p className="dtl-body-sm-l">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Who it's for — subtle light (breaks dark-dark run) ───────────────── */}
      <section className="dtl-bg-subtle dtl-border-light py-10 md:py-16">
        <div className="dtl-section">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
            <Kicker label="Who we work with" />
            <SectionHeading light gradient={gradient}>
              Built for founders, CTOs,{" "}
              <Grad gradient={gradient}>and product leaders.</Grad>
            </SectionHeading>
            <motion.div variants={stagger} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.whoItsFor.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-3 rounded-2xl p-6"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    boxShadow: "0 2px 12px -4px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: `${accentFrom}14`, color: accentFrom, border: `1px solid ${accentFrom}22` }}
                  >
                    {PERSONA_ICONS[i % PERSONA_ICONS.length]}
                  </div>
                  <h3
                    className="font-display font-semibold"
                    style={{ fontSize: "1rem", color: "#0F172A" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[0.875rem] leading-relaxed" style={{ color: "#64748B" }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Process — dark, redesigned as timeline ────────────────────────────── */}
      <section className="dtl-bg-void dtl-border-dark py-10 md:py-16">
        <div className="dtl-section">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
            <Kicker label="Our process" light />
            <SectionHeading gradient={gradient}>
              How we deliver.{" "}
              <Grad gradient={gradient}>Step by step.</Grad>
            </SectionHeading>

            {/* Timeline */}
            <div className="max-w-2xl">
              {data.process.map((step, i) => (
                <ProcessStep
                  key={step.num}
                  step={step}
                  index={i}
                  total={data.process.length}
                  accentFrom={accentFrom}
                  accentTo={accentTo}
                  gradient={gradient}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Investment — light ────────────────────────────────────────────────── */}
      <section className="dtl-bg-light dtl-border-light py-10 md:py-16">
        <div className="dtl-section">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
            <Kicker label="Investment" />
            <SectionHeading light gradient={gradient}>
              An investment,{" "}
              <Grad gradient={gradient}>not a line item.</Grad>
            </SectionHeading>
            <motion.p variants={fadeUp} className="dtl-body-l mb-12 max-w-2xl">
              {data.investmentIntro}
            </motion.p>

            {/* Engagement models */}
            <motion.p
              variants={fadeUp}
              className="mb-5 font-sans text-[10.5px] font-bold uppercase tracking-[0.20em]"
              style={{ color: accentFrom }}
            >
              How we work together
            </motion.p>
            <motion.div variants={stagger} className="mb-14 grid grid-cols-1 gap-4 md:grid-cols-3">
              {ENGAGEMENT_MODELS.map((model, idx) => {
                const isRec = idx === 1;
                return (
                  <motion.div
                    key={model.name}
                    variants={fadeUp}
                    className="relative flex flex-col gap-3 rounded-2xl p-6"
                    style={{
                      background: isRec
                        ? `linear-gradient(135deg, ${accentFrom}10, ${accentTo}06)`
                        : "#FFFFFF",
                      border: isRec
                        ? `1.5px solid ${accentFrom}30`
                        : "1px solid #E2E8F0",
                      boxShadow: isRec
                        ? `0 4px 24px ${accentFrom}14`
                        : "0 2px 12px -4px rgba(0,0,0,0.06)",
                    }}
                  >
                    {isRec && (
                      <span
                        className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-white"
                        style={{ background: gradient, boxShadow: `0 2px 10px ${accentFrom}40` }}
                      >
                        Most Popular
                      </span>
                    )}
                    <h3
                      className="font-display font-bold"
                      style={{ fontSize: "1.02rem", color: "#0F172A" }}
                    >
                      {model.name}
                    </h3>
                    <p
                      className="font-sans text-[11px] font-semibold uppercase tracking-wide"
                      style={{ color: accentFrom }}
                    >
                      {model.bestFor}
                    </p>
                    <p className="text-[0.875rem] leading-relaxed" style={{ color: "#64748B" }}>
                      {model.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Cost factors */}
            <motion.p
              variants={fadeUp}
              className="mb-5 font-sans text-[10.5px] font-bold uppercase tracking-[0.20em]"
              style={{ color: accentFrom }}
            >
              What shapes your estimate
            </motion.p>
            <motion.div
              variants={stagger}
              className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {data.costFactors.map((cf) => (
                <motion.div
                  key={cf.factor}
                  variants={fadeUp}
                  className="flex gap-3 rounded-xl p-4"
                  style={{ background: "#F8FAFC", border: "1px solid #E8ECF4" }}
                >
                  <div
                    className="mt-0.5 h-2 w-2 shrink-0 rounded-full"
                    style={{ background: gradient }}
                    aria-hidden
                  />
                  <div>
                    <h4
                      className="mb-1 font-display font-semibold"
                      style={{ fontSize: "0.92rem", color: "#0F172A" }}
                    >
                      {cf.factor}
                    </h4>
                    <p className="text-[0.825rem] leading-relaxed" style={{ color: "#64748B" }}>
                      {cf.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Estimate CTA banner */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between"
              style={{
                background: `linear-gradient(135deg, ${accentFrom}0d, ${accentTo}07)`,
                border: `1px solid ${accentFrom}22`,
              }}
            >
              <p className="text-[0.9rem] leading-relaxed max-w-lg" style={{ color: "#334155" }}>
                The only way to a real number is a real conversation. Tell us what you&apos;re building —
                we&apos;ll scope it and send a clear, itemised estimate. No obligation.
              </p>
              <Link href="/contact" className="dtl-cta-primary shrink-0">
                Get your estimate
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Why DualTech Labs — dark ───────────────────────────────────────────── */}
      <section className="dtl-bg-void dtl-border-dark py-10 md:py-16">
        <div className="dtl-section">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
            <Kicker label="Why DualTech Labs" light />
            <SectionHeading gradient={gradient}>
              Three things clients tell us{" "}
              <Grad gradient={gradient}>matter most.</Grad>
            </SectionHeading>
            <motion.div variants={stagger} className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                {
                  title: "You own the code. Always.",
                  desc:  "Full source code ownership transfers on delivery. No lock-in, no licensing fees. Take it to any team at any point.",
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg>,
                },
                {
                  title: "One team, start to finish.",
                  desc:  "Design, engineering, and QA under one roof. No handoffs, no miscommunication between agencies.",
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
                },
                {
                  title: "Real demos every two weeks.",
                  desc:  "You see working software from sprint one. No black-box delivery. No surprises at the end of a long engagement.",
                  icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className="flex flex-col gap-4 rounded-2xl p-6 md:p-7"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ background: `${accentFrom}18`, color: accentFrom }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    className="font-display font-bold text-white"
                    style={{ fontSize: "1.02rem" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-[0.875rem] leading-relaxed" style={{ color: "#94A3B8" }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ — light ───────────────────────────────────────────────────────── */}
      <section className="dtl-bg-light dtl-border-light py-10 md:py-16">
        <div className="dtl-section">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
            <Kicker label="FAQ" />
            <SectionHeading light gradient={gradient}>
              Common questions.{" "}
              <Grad gradient={gradient}>Direct answers.</Grad>
            </SectionHeading>
            <motion.div variants={stagger} className="flex max-w-3xl flex-col gap-3">
              {data.faqs.map((faq, i) => (
                <FaqItem
                  key={faq.q}
                  faq={faq}
                  index={i}
                  isOpen={openFaq === i}
                  onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                  accentFrom={accentFrom}
                  gradient={gradient}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA — brand ───────────────────────────────────────────────────────── */}
      <section className="dtl-bg-brand py-16 md:py-24">
        <div className="dtl-section">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger}
            className="flex flex-col items-center gap-6 text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold text-white"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              Start with a conversation.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="max-w-md text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Tell us what you&apos;re building. We&apos;ll scope it, tell you exactly how we&apos;d approach it,
              and give you a clear estimate — no commitment, no agency fluff.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/contact" className="dtl-cta-primary-inv">
                Get a free consultation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useInView } from "framer-motion";
import Footer from "@/components/footer";
import { ServiceBgs } from "@/lib/service-bgs";
import { ENGAGEMENT_MODELS, type ServicePageData } from "@/lib/services-data";

// ─── Animation variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const vp = { once: true, margin: "-80px" as const };

// ─── Reusable section header ──────────────────────────────────────────────────

function Kicker({ label }: { label: string }) {
  return (
    <motion.div variants={fadeUp} className="dtl-kicker mb-3">
      <span className="dtl-kicker-line" />
      {label}
    </motion.div>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function ServiceDetailPage({ data }: { data: ServicePageData }) {
  const { serviceId, accentFrom, accentTo } = data;
  const BgRenderer = ServiceBgs[serviceId];

  // Suspend the infinite hero drift when off-screen or for reduced-motion users —
  // no wasted compositor frames once the hero scrolls away.
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef);
  const heroDrift = reduceMotion || !heroInView
    ? undefined
    : { x: [0, -14, 0], y: [0, -9, 0] };

  const gradientStyle = `linear-gradient(135deg, ${accentFrom}, ${accentTo})`;
  const badgeStyle    = { background: `${accentFrom}18`, color: accentFrom, border: `1px solid ${accentFrom}28` };

  return (
    <div className="flex flex-col">

      {/* ── Hero — dark with animated thematic SVG background ────────────────── */}
      <section ref={heroRef} className="relative dtl-bg-void overflow-hidden py-16 md:py-28">

        {/* Ambient glow — service accent colour */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${accentFrom}22 0%, transparent 65%)`,
          }}
          aria-hidden
        />

        {/* Thematic SVG — slow drift, pure compositor transform, zero layout cost.
            Suspends off-screen and honours prefers-reduced-motion (see heroDrift). */}
        {BgRenderer && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={heroDrift}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            {BgRenderer(accentFrom)}
          </motion.div>
        )}

        {/* Content */}
        <div className="dtl-section relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <Kicker label={data.heroHeadlinePart1.replace(/[.,—]/g, "").trim()} />
            <motion.h1
              variants={fadeUp}
              className="dtl-headline mb-6"
              style={{ fontSize: "clamp(2.1rem, 4.8vw, 3.8rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              {data.heroHeadlinePart1}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: gradientStyle }}
              >
                {data.heroHeadlinePart2}
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="dtl-body mb-8 max-w-xl">
              {data.heroCopy}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              <Link href="/contact" className="dtl-cta-primary">
                Get a free consultation
              </Link>
              <Link href="/#services" className="dtl-cta-secondary">
                All services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── What we build — light ─────────────────────────────────────────────── */}
      <section className="dtl-bg-light dtl-border-light py-14 md:py-20">
        <div className="dtl-section">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
            <Kicker label="What we build" />
            <motion.h2
              variants={fadeUp}
              className="dtl-headline-l mb-10"
              style={{ fontSize: "clamp(1.65rem, 2.8vw, 2.4rem)", lineHeight: 1.08, letterSpacing: "-0.025em" }}
            >
              Software for every layer of{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradientStyle }}>
                your business.
              </span>
            </motion.h2>
            <motion.div variants={stagger} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.whatWeBuild.map((item) => (
                <motion.div key={item.title} variants={fadeUp} className="dtl-card-l p-6">
                  {/* Accent bar top */}
                  <div className="mb-4 h-0.5 w-8 rounded-full" style={{ background: gradientStyle }} aria-hidden />
                  <h3 className="mb-2 font-display font-bold" style={{ fontSize: "1.02rem", color: "#0F172A" }}>
                    {item.title}
                  </h3>
                  <p className="dtl-body-sm-l">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Who it's for — dark ───────────────────────────────────────────────── */}
      <section className="dtl-bg-surface dtl-border-dark py-14 md:py-20">
        <div className="dtl-section">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
            <Kicker label="Who we work with" />
            <motion.h2
              variants={fadeUp}
              className="dtl-headline mb-10"
              style={{ fontSize: "clamp(1.65rem, 2.8vw, 2.4rem)", lineHeight: 1.08, letterSpacing: "-0.025em" }}
            >
              Built for founders, CTOs,{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradientStyle }}>
                and product leaders.
              </span>
            </motion.h2>
            <motion.div variants={stagger} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.whoItsFor.map((item) => (
                <motion.div key={item.title} variants={fadeUp} className="dtl-card p-6">
                  <div
                    className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold font-mono"
                    style={badgeStyle}
                    aria-hidden
                  >
                    {"{}"}
                  </div>
                  <h3 className="mb-2 font-display font-semibold text-white" style={{ fontSize: "1rem" }}>
                    {item.title}
                  </h3>
                  <p className="dtl-body-sm">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Process — light ───────────────────────────────────────────────────── */}
      <section className="dtl-bg-light dtl-border-light py-14 md:py-20">
        <div className="dtl-section">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
            <Kicker label="Our process" />
            <motion.h2
              variants={fadeUp}
              className="dtl-headline-l mb-10"
              style={{ fontSize: "clamp(1.65rem, 2.8vw, 2.4rem)", lineHeight: 1.08, letterSpacing: "-0.025em" }}
            >
              Five steps.{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradientStyle }}>
                No surprises.
              </span>
            </motion.h2>
            <motion.div variants={stagger} className="flex flex-col gap-4">
              {data.process.map((step) => (
                <motion.div key={step.num} variants={fadeUp} className="dtl-card-l overflow-hidden">
                  <div className="flex flex-col gap-0 md:flex-row">
                    {/* Step number sidebar */}
                    <div
                      className="flex shrink-0 items-center justify-center p-5 md:w-20 md:flex-col md:justify-start md:pt-8"
                      style={{ background: `${accentFrom}08`, borderRight: `1px solid ${accentFrom}14` }}
                    >
                      <span
                        className="font-display font-black leading-none"
                        style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", background: gradientStyle, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                      >
                        {step.num}
                      </span>
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-6 md:p-8">
                      <h3 className="mb-2 font-display font-bold" style={{ fontSize: "1.1rem", color: "#0F172A" }}>
                        {step.name}
                      </h3>
                      <p className="mb-5 dtl-body-sm-l">{step.desc}</p>
                      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                        {step.deliverables.map((d) => (
                          <div key={d} className="flex items-center gap-2">
                            <span
                              className="h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: gradientStyle }}
                              aria-hidden
                            />
                            <span className="text-[13px]" style={{ color: "#334155" }}>{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Investment — dark ─────────────────────────────────────────────────── */}
      <section className="dtl-bg-void dtl-border-dark py-14 md:py-20">
        <div className="dtl-section">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
            <Kicker label="Investment" />
            <motion.h2
              variants={fadeUp}
              className="dtl-headline mb-4"
              style={{ fontSize: "clamp(1.65rem, 2.8vw, 2.4rem)", lineHeight: 1.08, letterSpacing: "-0.025em" }}
            >
              An investment,{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradientStyle }}>
                not a line item.
              </span>
            </motion.h2>
            <motion.p variants={fadeUp} className="dtl-body mb-12 max-w-2xl">
              {data.investmentIntro}
            </motion.p>

            {/* How we work — engagement models */}
            <motion.p
              variants={fadeUp}
              className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.16em]"
              style={{ color: accentFrom }}
            >
              How we work together
            </motion.p>
            <motion.div variants={stagger} className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
              {ENGAGEMENT_MODELS.map((model) => (
                <motion.div key={model.name} variants={fadeUp} className="dtl-card p-6">
                  <h3 className="mb-1 font-display font-bold text-white" style={{ fontSize: "1.02rem" }}>
                    {model.name}
                  </h3>
                  <p className="mb-3 font-sans text-xs font-semibold" style={{ color: accentTo }}>
                    {model.bestFor}
                  </p>
                  <p className="dtl-body-sm">{model.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* What shapes your estimate — cost factors */}
            <motion.p
              variants={fadeUp}
              className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.16em]"
              style={{ color: accentFrom }}
            >
              What shapes your estimate
            </motion.p>
            <motion.div variants={stagger} className="mb-10 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              {data.costFactors.map((cf) => (
                <motion.div key={cf.factor} variants={fadeUp} className="flex gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: gradientStyle }}
                    aria-hidden
                  />
                  <div>
                    <h4 className="mb-1 font-display font-semibold text-white" style={{ fontSize: "0.95rem" }}>
                      {cf.factor}
                    </h4>
                    <p className="dtl-body-sm">{cf.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Closing line + inline CTA */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between"
              style={{ background: `linear-gradient(135deg, ${accentFrom}12, ${accentTo}08)`, border: `1px solid ${accentFrom}20` }}
            >
              <p className="dtl-body-sm max-w-lg" style={{ color: "#CBD5E1" }}>
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

      {/* ── Why DualTech Labs — light ──────────────────────────────────────────── */}
      <section className="dtl-bg-light dtl-border-light py-14 md:py-20">
        <div className="dtl-section">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
            <Kicker label="Why DualTech Labs" />
            <motion.h2
              variants={fadeUp}
              className="dtl-headline-l mb-10"
              style={{ fontSize: "clamp(1.65rem, 2.8vw, 2.4rem)", lineHeight: 1.08, letterSpacing: "-0.025em" }}
            >
              Three things clients tell us{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradientStyle }}>
                matter most.
              </span>
            </motion.h2>
            <motion.div variants={stagger} className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[
                { title: "You own the code. Always.", desc: "Full source code ownership transfers on delivery. No lock-in, no licensing fees. Take it to any team at any point." },
                { title: "One team, start to finish.", desc: "Design, engineering, and QA under one roof. No handoffs, no miscommunication between agencies." },
                { title: "Real demos every two weeks.", desc: "You see working software from sprint one. No black-box delivery. No surprises at the end of a long engagement." },
              ].map((item) => (
                <motion.div key={item.title} variants={fadeUp} className="dtl-card-l p-7">
                  <div className="mb-4 h-0.5 w-10 rounded-full" style={{ background: gradientStyle }} aria-hidden />
                  <h3 className="mb-3 font-display font-bold" style={{ fontSize: "1.02rem", color: "#0F172A" }}>
                    {item.title}
                  </h3>
                  <p className="dtl-body-sm-l">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ — dark ───────────────────────────────────────────────────────── */}
      <section className="dtl-bg-surface dtl-border-dark py-14 md:py-20">
        <div className="dtl-section">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
            <Kicker label="FAQ" />
            <motion.h2
              variants={fadeUp}
              className="dtl-headline mb-10"
              style={{ fontSize: "clamp(1.65rem, 2.8vw, 2.4rem)", lineHeight: 1.08, letterSpacing: "-0.025em" }}
            >
              Common questions.{" "}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: gradientStyle }}>
                Direct answers.
              </span>
            </motion.h2>
            <motion.div variants={stagger} className="flex max-w-3xl flex-col gap-4">
              {data.faqs.map((faq) => (
                <motion.div key={faq.q} variants={fadeUp} className="dtl-card p-6">
                  <div
                    className="mb-3 flex items-start gap-3"
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded font-mono text-[10px] font-bold"
                      style={badgeStyle}
                      aria-hidden
                    >
                      Q
                    </span>
                    <h3 className="font-display font-semibold text-white" style={{ fontSize: "1rem", lineHeight: 1.4 }}>
                      {faq.q}
                    </h3>
                  </div>
                  <p className="dtl-body-sm pl-8">{faq.a}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA — brand gradient ──────────────────────────────────────────────── */}
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
              Ready to get started?
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="max-w-md text-base leading-relaxed"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              Tell us what you&apos;re building. We&apos;ll tell you exactly how we&apos;d approach it —
              free consultation, no commitment.
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

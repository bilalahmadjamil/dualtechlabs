"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* Heavy WebGL chunk only — hero copy & layout render immediately from the main bundle */
const HeroCanvas = dynamic(
  () => import("./hero-canvas").then((m) => m.HeroCanvas),
  {
    ssr: false,
    loading: () => null,
  }
);

function LiveTime() {
  const [time, setTime] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!time) return <span className="text-xs tabular-nums tracking-wide text-slate-400">—:—:—</span>;

  return (
    <span className="text-xs font-medium tabular-nums tracking-wide text-slate-300">
      {time.toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" })}
    </span>
  );
}

const Hero = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sceneActive = useInView(sectionRef, { amount: 0.01, margin: "100px 0px 100px 0px" });
  const reduceMotion = useReducedMotion();
  /** Never start at opacity:0 — that SSRs invisible HTML; if hydration lags, hero looks “missing”. */
  const instant = { duration: 0 as const };
  const soft = reduceMotion
    ? instant
    : { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[calc(100dvh-5rem)] w-full items-center overflow-hidden bg-portal-void bg-portal-mesh md:min-h-[calc(100dvh-5.5rem)]"
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0">
          <HeroCanvas active={sceneActive} reducedMotion={!!reduceMotion} />
        </div>
        {/* Scrim: readable type on the left; right half stays clear so WebGL reads (cyan grid, glass, stars). */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-portal-void/55 via-portal-void/10 to-portal-void/35 sm:to-portal-void/25 lg:bg-gradient-to-r lg:from-portal-void lg:from-[-8%] lg:via-portal-void/45 lg:via-[46%] lg:to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(36vh,380px)] bg-gradient-to-t from-portal-void/55 via-portal-void/12 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-portal-void/40 to-transparent md:h-24"
          aria-hidden
        />
      </div>

      <div className="relative z-10 portal-section grid grid-cols-12 items-center gap-8 py-6 sm:py-8 md:grid md:py-10 lg:py-12">
        <div className="col-span-12 space-y-8 md:space-y-10 lg:col-span-7">
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={soft}
            className="space-y-5"
          >
            <div className="portal-kicker">
              <span className="portal-kicker-line" aria-hidden />
              <span>Design · Engineering · Worldwide Delivery</span>
            </div>

            <h1 className="portal-headline text-5xl leading-[0.92] tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              DualTech <br />
              <span className="bg-gradient-to-br from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">Labs</span>
              <span className="sr-only"> · Global Custom Software Development & AI Solutions Studio</span>
            </h1>
          </motion.div>

          <motion.p
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={soft}
            className="portal-body max-w-xl border-l-2 border-cyan-500/35 pl-6 text-balance md:pl-8"
          >
            We help product and engineering teams ship software that still works after launch: sensible scope, solid code, and interfaces people actually use.
          </motion.p>

          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={soft}
            className="flex flex-wrap gap-4 pt-2 sm:gap-5"
          >
            <Link href="/contact" className="portal-cta-primary">
              Talk to us
            </Link>
            <Link href="#portfolio" className="portal-cta-secondary">
              View work
            </Link>
          </motion.div>
        </div>

        <div className="relative hidden lg:col-span-5 lg:block">
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={soft}
            className="relative glass space-y-7 rounded-2xl border border-white/[0.08] p-8 pl-6 shadow-card backdrop-blur-xl md:p-10 md:pl-8"
          >
            <div
              className="absolute bottom-8 left-0 top-8 w-1 rounded-full bg-gradient-to-b from-cyan-400 via-sky-500 to-cyan-600/50"
              aria-hidden
            />
            <div className="space-y-2 pl-2">
              <p className="font-sans text-xs font-semibold text-cyan-400/95">Dates you can trust</p>
              <p className="text-base font-medium leading-snug text-slate-100">
                Milestones tied to working builds. You see progress in the product, not just in decks.
              </p>
            </div>

            <div className="space-y-2 pl-2">
              <p className="font-sans text-xs font-semibold text-cyan-400/95">Shipped for production</p>
              <p className="text-base font-medium leading-snug text-slate-100">
                Fast load times, accessible flows, and monitoring hooks baked in from the start.
              </p>
            </div>

            <div className="space-y-2 pl-2">
              <p className="font-sans text-xs font-semibold text-cyan-400/95">Easy to hand off</p>
              <p className="text-base font-medium leading-snug text-slate-100">
                Clear docs and sensible structure so your own engineers can take over when the time comes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute right-4 top-4 hidden font-sans text-right text-slate-400 sm:right-6 sm:top-5 md:top-6 sm:block">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Local time</p>
        <LiveTime />
      </div>
    </section>
  );
};

export default Hero;

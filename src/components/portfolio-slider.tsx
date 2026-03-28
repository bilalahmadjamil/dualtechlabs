"use client";

import React, { useState, useEffect, useRef, useMemo, memo } from "react";
import Image from "next/image";

const projects = [
  {
    id: "thrivo-ai",
    title: "Thrivo AI",
    category: "AI E-commerce",
    outcome: "AI-assisted shopping flows and catalog experiences for modern retail.",
    logo: "/assets/thrivo-ai.jpeg",
    color: "#3b82f6",
    link: "https://thrivo.ai/",
  },
  {
    id: "cashcon",
    title: "CashCon",
    category: "Fintech Core",
    outcome: "Core banking-style building blocks for digital money products.",
    logo: "/assets/cashcon.webp",
    color: "#2563eb",
    link: "https://www.northerndigitalsolutions.io/solutions",
  },
  {
    id: "tamm",
    title: "TAMM",
    category: "Gov Portal",
    outcome: "National-scale portal: services citizens use every day, built to stay up.",
    logo: "/assets/tamm.jpg",
    color: "#1d4ed8",
    link: "https://www.tamm.abudhabi/",
  },
  {
    id: "moneygram",
    title: "MoneyGram",
    category: "Payment App",
    outcome: "Global money movement: apps and web journeys millions rely on.",
    logo: "/assets/moneygram.png",
    color: "#3b82f6",
    link: "https://www.moneygram.com/r/za/en",
  },
  {
    id: "myntist",
    title: "Myntist",
    category: "Web3 Marketplace",
    outcome: "Marketplace and wallet flows where trust and speed both matter.",
    logo: "/assets/myntist-logo.jpeg",
    color: "#6366f1",
    link: "https://www.myntist.com/",
  },
  {
    id: "iclc",
    title: "ICLC",
    category: "Legal Tech",
    outcome: "Digital tools for legal services: intake, case work, and client access.",
    logo: "/assets/iclc.jpg",
    color: "#4f46e5",
    link: "https://iclc.com.pk/",
  },
  {
    id: "optergy",
    title: "Optergy",
    category: "Building Intelligence",
    outcome: "Software for smarter buildings: energy, controls, and operations data.",
    logo: "/assets/optergy_logo.jpeg",
    color: "#00a3e0",
    link: "https://optergy.com/",
  },
  {
    id: "transre",
    title: "TransRe",
    category: "Global Reinsurance",
    outcome: "Reinsurance digital channels for brokers, clients, and internal teams.",
    logo: "/assets/transre.jpg",
    color: "#b22222",
    link: "https://www.transre.com/",
  },
] as const;

const DEFAULT_DURATION = 60;
const FAST_DURATION = 14;

const PortfolioSlider = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(true);
  const [hoverPause, setHoverPause] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [durationSec, setDurationSec] = useState(DEFAULT_DURATION);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { root: null, rootMargin: "80px 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const infiniteProjects = useMemo(() => [...projects, ...projects], []);
  const paused = !inView || hoverPause || userPaused;

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative overflow-hidden border-t border-white/[0.06] bg-portal-void bg-portal-mesh py-20 md:py-28"
      style={{ ["--marquee-duration" as string]: `${durationSec}s` }}
    >
      <div className="portal-section relative z-10 mb-14 flex flex-col justify-between gap-10 md:mb-20 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="portal-kicker mb-4">
            <span className="portal-kicker-line" aria-hidden />
            <span>Selected work</span>
          </div>
          <h2 className="portal-headline text-display-sm text-white md:text-display-md">
            A few projects we&apos;ve helped ship.
          </h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden font-sans text-xs text-slate-500 lg:block">Speed</div>
          <div className="flex gap-2">
            <button
              type="button"
              onMouseEnter={() => setDurationSec(FAST_DURATION)}
              onMouseLeave={() => setDurationSec(DEFAULT_DURATION)}
              className="group border border-white/12 p-4 text-white transition-all hover:border-cyan-500/40 hover:bg-cyan-500/10 active:scale-95"
              title="Scroll faster"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <polyline points="13 17 18 12 13 7" />
                <polyline points="6 17 11 12 6 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`marquee-section ${paused ? "is-paused" : ""}`}>
        <div
          className="relative flex cursor-grab overflow-hidden active:cursor-grabbing"
          onMouseEnter={() => setHoverPause(true)}
          onMouseLeave={() => setHoverPause(false)}
        >
          <div className="portfolio-marquee-track">
            {infiniteProjects.map((project, index) => (
              <ProjectCard key={`${project.id}-${index}`} project={project} />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-portal-void to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-portal-void to-transparent sm:w-32" />
        </div>

        <div className="portal-section mt-14 space-y-8 md:mt-16">
          <div
            className="group/progress relative h-1 w-full cursor-pointer overflow-hidden rounded-full bg-white/[0.06]"
            onMouseEnter={() => setDurationSec(FAST_DURATION)}
            onMouseLeave={() => setDurationSec(DEFAULT_DURATION)}
          >
            <div
              className="portfolio-progress-fill absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 shadow-[0_0_16px_rgba(34,211,238,0.45)]"
              aria-hidden
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover/progress:opacity-100">
              <span className="rounded-md bg-cyan-600/90 px-3 py-1 font-sans text-xs font-medium text-white">
                Faster scroll
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 font-sans text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-cyan-400" aria-hidden />
              <span className="text-slate-300">Hover the row to pause · Links open in a new tab</span>
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                className="text-slate-300 transition-colors hover:text-cyan-300"
              >
                {userPaused ? "Play" : "Pause"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = memo(function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-[420px] w-[280px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-card transition-[transform,box-shadow,border-color] duration-200 ease-out hover:scale-[1.012] hover:border-cyan-500/20 hover:shadow-card-hover hover:-translate-y-1 active:scale-[0.99] sm:h-[450px] sm:w-[320px] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:hover:translate-y-0"
    >
      <div
        className="absolute inset-x-0 bottom-0 h-1 opacity-40 transition-[height,opacity] duration-300 ease-out group-hover:h-full group-hover:opacity-10"
        style={{ backgroundColor: project.color }}
      />

      <div className="absolute inset-0 z-10 flex min-h-0 flex-col justify-between p-8">
        <div className="shrink-0">
          <div className="mb-2 font-sans text-xs font-medium text-cyan-400/90">{project.category}</div>
          <h3 className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-cyan-200 md:text-2xl">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-snug text-slate-500 sm:text-sm">{project.outcome}</p>
        </div>

        <div className="relative flex h-40 w-full shrink-0 items-center justify-center p-3 sm:h-44">
          <div className="relative h-40 w-40">
            <Image
              src={project.logo}
              alt={`${project.title} logo`}
              fill
              sizes="(max-width: 768px) 160px, 200px"
              className="object-contain filter grayscale transition-[filter] duration-300 ease-out group-hover:grayscale-0"
              priority={["thrivo-ai", "cashcon", "tamm", "moneygram"].includes(project.id)}
            />
          </div>
          <div className="absolute inset-0 scale-150 rounded-full border border-white/0 opacity-0 transition-[opacity,border-color] duration-300 group-hover:border-white/5 group-hover:opacity-100" />
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <span className="text-xs font-medium text-slate-500">Visit site</span>
          <div className="mx-4 h-px flex-grow bg-white/10" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white transition-colors group-hover:text-cyan-400"
            aria-hidden
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>

      <div className="absolute right-0 top-0 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="absolute right-2 top-2 h-2 w-2 border-r border-t border-cyan-400" />
      </div>
    </a>
  );
});

export default PortfolioSlider;

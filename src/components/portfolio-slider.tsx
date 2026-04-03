"use client";

import React, { useState, useEffect, useRef, useMemo, memo } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";



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

function PortfolioTrack({ isTurbo, isPaused }: { isTurbo: boolean; isPaused: boolean }) {
  const x = useMotionValue(0);
  
  // 1. We keep a reference to the active animation
  const controls = useRef<any>(null);

  useEffect(() => {
    // 2. Start a single, infinite linear animation
    // We move -50% because the track has 2 sets of projects
    controls.current = animate(x, -50, {
      ease: "linear",
      duration: 30,
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => controls.current?.stop();
  }, [x]);

  // 3. Instead of just shifting speed, we use explicit pause/play
  // This ensures the animation resumes reliably after hover-out
  useEffect(() => {
    if (controls.current) {
      if (isPaused) {
        controls.current.pause();
      } else {
        controls.current.play();
        controls.current.speed = isTurbo ? 4 : 1;
      }
    }
  }, [isTurbo, isPaused]);

  return (
    <div className="relative flex flex-nowrap overflow-hidden whitespace-nowrap py-4">
      <motion.div 
        style={{ x: useTransform(x, (v) => `${v}%`) }}
        className="portfolio-marquee-track shadow-inner"
      >
        {[...projects, ...projects].map((project, i) => (
          <ProjectCard key={`${project.id}-${i}`} project={project} />
        ))}
      </motion.div>
    </div>
  );
}

function MobileTrack() {
  return (
    <div className="relative overflow-visible py-8">
      <motion.div 
        drag="x"
        dragConstraints={{ left: -((projects.length - 1) * 280), right: 0 }}
        dragElastic={0.2}
        className="flex gap-4 px-10"
      >
        {projects.map((project, i) => (
          <MobileProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </div>
  );
}

const MobileProjectCard = ({ project }: { project: (typeof projects)[number] }) => {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      whileTap={{ scale: 0.95 }}
      className="group relative block h-[420px] w-[280px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-2xl"
    >
      <div
        className="absolute inset-x-0 bottom-0 h-1 opacity-20"
        style={{ backgroundColor: project.color }}
      />

      <div className="absolute inset-0 z-10 flex flex-col justify-between p-7">
        <div>
          <div className="mb-2 font-sans text-[10px] font-bold uppercase tracking-widest text-cyan-400/90">
            {project.category}
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white">{project.title}</h3>
          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-400">{project.outcome}</p>
        </div>

        <div className="relative flex h-40 w-full items-center justify-center p-3">
          <div className="relative h-32 w-32">
            <Image
              src={project.logo}
              alt={project.title}
              fill
              sizes="160px"
              className="object-contain"
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-cyan-400">
            View Case Study
          </span>
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
            className="text-white"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
};

const PortfolioSlider = () => {
  const [isTurbo, setIsTurbo] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden border-t border-white/[0.06] bg-portal-void bg-portal-mesh py-20 md:py-28"
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

        {!isMobile && (
          <div className="flex items-center gap-6">
            <div className="hidden font-sans text-xs text-slate-400 lg:block">Interaction</div>
            <div className="flex gap-4">
              <button
                type="button"
                onMouseEnter={() => setIsTurbo(true)}
                onMouseLeave={() => setIsTurbo(false)}
                className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 font-sans text-xs font-medium text-white transition-all hover:border-cyan-500/40 hover:bg-cyan-500/10 active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="13 17 18 12 13 7" />
                  <polyline points="6 17 11 12 6 7" />
                </svg>
                <span>Turbo</span>
              </button>
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 font-sans text-xs font-medium text-white transition-all hover:border-cyan-300/40 hover:bg-white/10"
              >
                {isPaused ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>Resume</span>
                  </>
                ) : (
                  <>
                    <div className="flex gap-1">
                      <div className="h-3 w-1 bg-white" />
                      <div className="h-3 w-1 bg-white" />
                    </div>
                    <span>Pause</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className="group relative"
        onMouseEnter={() => !isMobile && setIsPaused(true)}
        onMouseLeave={() => !isMobile && setIsPaused(false)}
      >
        {isMobile ? (
          <MobileTrack />
        ) : (
          <PortfolioTrack isTurbo={isTurbo} isPaused={isPaused} />
        )}

        {/* Ambient track lighting */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-portal-void to-transparent sm:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-portal-void to-transparent sm:w-48" />
      </div>

      <div className="mt-10 h-px w-full bg-white/[0.06]" />
    </section>
  );
};

const ProjectCard = memo(function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="group relative block h-[380px] w-[260px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-card sm:h-[450px] sm:w-[320px]"
    >
      <div
        className="absolute inset-x-0 bottom-0 h-1 opacity-40 transition-[height,opacity] duration-500 ease-out group-hover:h-full group-hover:opacity-[0.03]"
        style={{ backgroundColor: project.color }}
      />

      <div className="absolute inset-0 z-10 flex min-h-0 flex-col justify-between p-7 sm:p-8">
        <div className="shrink-0">
          <div className="mb-2 font-sans text-xs font-medium text-cyan-400/90">{project.category}</div>
          <h3 className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-cyan-200 md:text-2xl">
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-snug text-slate-400 sm:text-sm">{project.outcome}</p>
        </div>

        <div className="relative flex h-40 w-full shrink-0 items-center justify-center p-3 sm:h-44">
          <div className="relative h-32 w-32 sm:h-40 sm:w-40">
            <Image
              src={project.logo}
              alt={`${project.title} - Custom Software Development Case Study`}
              fill
              sizes="(max-width: 768px) 120px, 160px"
              className="object-contain filter grayscale transition-[filter,transform] duration-500 ease-out group-hover:scale-110 group-hover:grayscale-0"
              priority={["thrivo-ai", "cashcon", "tamm", "moneygram"].includes(project.id)}
            />
          </div>
          <div className="absolute inset-0 scale-150 rounded-full border border-white/0 opacity-0 transition-[opacity,border-color] duration-500 group-hover:border-cyan-500/10 group-hover:opacity-100" />
        </div>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-slate-400 transition-colors group-hover:text-cyan-400">
            Explore site
          </span>
          <div className="mx-4 h-px flex-grow bg-white/10" />
          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 transition-colors group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white transition-colors group-hover:text-cyan-400"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>
      </div>

      <div className="absolute right-0 top-0 h-10 w-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute right-3 top-3 h-3 w-3 border-r border-t border-cyan-400" />
      </div>
    </motion.a>
  );
});

export default PortfolioSlider;

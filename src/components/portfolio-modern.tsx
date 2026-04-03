"use client";

import React, { useState, useEffect, useMemo, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollOptimization } from "@/hooks/useScrollOptimization";

const projects = [
  {
    id: "thrivo-ai",
    title: "Thrivo AI",
    category: "AI E-commerce",
    outcome: "AI-assisted shopping flows and catalog experiences for modern retail.",
    logo: "/assets/thrivo-ai.jpeg",
    color: "#3b82f6",
    link: "https://thrivo.ai/",
    featured: true,
  },
  {
    id: "cashcon",
    title: "CashCon",
    category: "Fintech Core",
    outcome: "Core banking-style building blocks for digital money products.",
    logo: "/assets/cashcon.webp",
    color: "#2563eb",
    link: "https://www.northerndigitalsolutions.io/solutions",
    featured: true,
  },
  {
    id: "tamm",
    title: "TAMM",
    category: "Gov Portal",
    outcome: "National-scale portal: services citizens use every day, built to stay up.",
    logo: "/assets/tamm.jpg",
    color: "#1d4ed8",
    link: "https://www.tamm.abudhabi/",
    featured: false,
  },
  {
    id: "moneygram",
    title: "MoneyGram",
    category: "Payment App",
    outcome: "Global money movement: apps and web journeys millions rely on.",
    logo: "/assets/moneygram.png",
    color: "#3b82f6",
    link: "https://www.moneygram.com/r/za/en",
    featured: false,
  },
  {
    id: "myntist",
    title: "Myntist",
    category: "Web3 Marketplace",
    outcome: "Marketplace and wallet flows where trust and speed both matter.",
    logo: "/assets/myntist-logo.jpeg",
    color: "#6366f1",
    link: "https://www.myntist.com/",
    featured: false,
  },
  {
    id: "iclc",
    title: "ICLC",
    category: "Legal Tech",
    outcome: "Digital tools for legal services: intake, case work, and client access.",
    logo: "/assets/iclc.jpg",
    color: "#4f46e5",
    link: "https://iclc.com.pk/",
    featured: false,
  },
  {
    id: "optergy",
    title: "Optergy",
    category: "Building Intelligence",
    outcome: "Software for smarter buildings: energy, controls, and operations data.",
    logo: "/assets/optergy_logo.jpeg",
    color: "#00a3e0",
    link: "https://optergy.com/",
    featured: false,
  },
  {
    id: "transre",
    title: "TransRe",
    category: "Global Reinsurance",
    outcome: "Reinsurance digital channels for brokers, clients, and internal teams.",
    logo: "/assets/transre.jpg",
    color: "#b22222",
    link: "https://www.transre.com/",
    featured: false,
  },
];

type ViewMode = 'grid' | 'featured' | 'list';

const ModernPortfolio = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('featured');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Enhanced scroll optimization
  const { isScrolling } = useScrollOptimization({
    onScrollStart: () => {
      // Reduce animations during scroll for better performance
    },
    onScrollEnd: () => {
      // Resume animations when scroll ends
    },
    scrollEndDelay: 100,
    throttleMs: 16,
  });

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
    return cats;
  }, []);

  // Filter projects based on category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'all') return projects;
    return projects.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  // Get featured projects
  const featuredProjects = useMemo(() => {
    return projects.filter(p => p.featured);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden border-t border-white/[0.06] bg-portal-void bg-portal-mesh py-20 md:py-28"
    >
      <div className="portal-section">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16"
        >
          <div className="mb-8">
            <div className="portal-kicker mb-4">
              <span className="portal-kicker-line" aria-hidden />
              <span>Selected work</span>
            </div>
            <h2 className="portal-headline text-display-sm text-white md:text-display-md">
              Projects we&apos;re proud to have shipped.
            </h2>
          </div>

          {/* View Mode Controls */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-sans text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-cyan-500 text-portal-void shadow-lg'
                      : 'border border-white/[0.1] text-slate-300 hover:border-cyan-500/30 hover:bg-cyan-500/10 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 rounded-full border border-white/[0.1] bg-white/[0.05] p-1">
              <button
                onClick={() => setViewMode('featured')}
                className={`px-3 py-1.5 rounded-full font-sans text-xs font-medium transition-all duration-200 ${
                  viewMode === 'featured'
                    ? 'bg-cyan-500 text-portal-void'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Featured
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-full font-sans text-xs font-medium transition-all duration-200 ${
                  viewMode === 'grid'
                    ? 'bg-cyan-500 text-portal-void'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-full font-sans text-xs font-medium transition-all duration-200 ${
                  viewMode === 'list'
                    ? 'bg-cyan-500 text-portal-void'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${viewMode}-${selectedCategory}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="min-h-[400px]"
          >
            {/* Featured View */}
            {viewMode === 'featured' && (
              <div className="space-y-12">
                {/* Hero Featured Project */}
                <motion.div
                  variants={itemVariants}
                  className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-8 md:p-12"
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                    <div>
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5">
                        <div className="h-2 w-2 rounded-full bg-cyan-400" />
                        <span className="font-sans text-xs font-medium text-cyan-300">Featured Project</span>
                      </div>
                      <h3 className="mb-4 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                        {featuredProjects[0]?.title}
                      </h3>
                      <p className="mb-6 text-slate-300 md:text-lg">
                        {featuredProjects[0]?.outcome}
                      </p>
                      <a
                        href={featuredProjects[0]?.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-sans text-sm font-semibold text-portal-void transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25 active:scale-95"
                      >
                        View Project
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                      </a>
                    </div>
                    <div className="relative flex items-center justify-center">
                      <div className="relative h-48 w-48 md:h-64 md:w-64">
                        <Image
                          src={featuredProjects[0]?.logo || ''}
                          alt={featuredProjects[0]?.title}
                          fill
                          className="object-contain filter transition-all duration-300 hover:grayscale-0"
                          priority
                        />
                      </div>
                      <div
                        className="absolute inset-0 -z-10 rounded-full opacity-20 blur-3xl"
                        style={{ backgroundColor: featuredProjects[0]?.color }}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Other Featured Projects Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredProjects.slice(1).map((project, index) => (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      whileHover={{ y: -4 }}
                      className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 transition-all hover:border-cyan-500/20 hover:shadow-xl"
                      onMouseEnter={() => setHoveredProject(project.id)}
                      onMouseLeave={() => setHoveredProject(null)}
                    >
                      <div className="mb-4">
                        <div className="mb-3 font-sans text-xs font-medium text-cyan-400/90">
                          {project.category}
                        </div>
                        <h4 className="text-lg font-semibold text-white group-hover:text-cyan-200">
                          {project.title}
                        </h4>
                      </div>
                      <div className="relative h-24 w-full">
                        <Image
                          src={project.logo}
                          alt={project.title}
                          fill
                          className="object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 transition-all hover:border-cyan-500/20 hover:shadow-xl"
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="mb-4">
                      <div className="mb-3 font-sans text-xs font-medium text-cyan-400/90">
                        {project.category}
                      </div>
                      <h4 className="text-lg font-semibold text-white group-hover:text-cyan-200">
                        {project.title}
                      </h4>
                    </div>
                    <div className="relative h-24 w-full">
                      <Image
                        src={project.logo}
                        alt={project.title}
                        fill
                        className="object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    className="group flex items-center gap-6 rounded-2xl border border-white/[0.08] bg-gradient-to-r from-white/[0.06] to-white/[0.02] p-6 transition-all hover:border-cyan-500/20 hover:shadow-lg"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={project.logo}
                        alt={project.title}
                        fill
                        className="object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 font-sans text-xs font-medium text-cyan-400/90">
                        {project.category}
                      </div>
                      <h4 className="text-lg font-semibold text-white group-hover:text-cyan-200">
                        {project.title}
                      </h4>
                      <p className="mt-1 text-sm text-slate-400 line-clamp-1">
                        {project.outcome}
                      </p>
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.1] transition-all hover:border-cyan-500/50 hover:bg-cyan-500/10"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-slate-400 transition-colors group-hover:text-cyan-400"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Project Count */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center font-sans text-sm text-slate-400"
        >
          Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          {selectedCategory !== 'all' && ` in ${selectedCategory}`}
        </motion.div>
      </div>
    </section>
  );
};

export default ModernPortfolio;

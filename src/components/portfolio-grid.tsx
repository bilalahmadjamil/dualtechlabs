"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const projects = [
  {
    id: "thrivo-ai",
    title: "Thrivo AI",
    description: "Full-stack AI-powered ecommerce ecosystem for global brands.",
    logo: "/assets/thrivo-ai.jpeg",
    link: "https://thrivo.ai/",
    size: "large", // Feature project
    tags: ["AI", "Ecommerce", "POS", "UX"],
  },
  {
    id: "cashcon",
    title: "CashCon",
    description: "Centralized fintech payment solution for modern banking.",
    logo: "/assets/cashcon.webp",
    link: "https://www.northerndigitalsolutions.io/solutions",
    size: "medium",
    tags: ["Fintech", "Banking", "Security"],
  },
  {
    id: "moneygram",
    title: "MoneyGram",
    description: "Hybrid mobile app delivering global payment transfers.",
    logo: "/assets/moneygram.png",
    link: "https://www.moneygram.com/r/za/en",
    size: "small",
    tags: ["Mobile", "Hybrid", "Fintech"],
  },
  {
    id: "tamm",
    title: "TAMM",
    description: "Centralized Abu Dhabi government services portal.",
    logo: "/assets/tamm.jpg",
    link: "https://www.tamm.abudhabi/",
    size: "medium",
    tags: ["Government", "Portal", "Scalability"],
  },
  {
    id: "myntist",
    title: "Myntist",
    description: "Web3 digital ecosystem for asset tokenization.",
    logo: "/assets/myntist-logo.jpeg",
    link: "https://www.myntist.com/",
    size: "small",
    tags: ["Web3", "Blockchain", "NFT"],
  },
  {
    id: "iclc",
    title: "ICLC",
    description: "Comprehensive law firm portal for legal excellence.",
    logo: "/assets/iclc.jpg",
    link: "https://iclc.com.pk/",
    size: "small",
    tags: ["Legal", "B2B", "CMS"],
  },
];

const PortfolioGrid = () => {
  return (
    <section id="portfolio" className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Selected Portfolio</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">
          From Abu Dhabi's primary government hub to global fintech giants, we've delivered some of the world's most critical digital infrastructures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bento-item glass relative group flex flex-col justify-end p-8 ${
              project.size === "large" ? "md:col-span-2 md:row-span-2" : 
              project.size === "medium" ? "md:col-span-1 md:row-span-2" : "md:col-span-1"
            }`}
          >
            <div className="absolute inset-x-0 inset-y-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
               <Image
                src={project.logo}
                alt={project.title}
                fill
                className="object-contain p-12"
              />
            </div>
            
            <div className="relative z-10">
              <div className="mb-4 h-12 w-12 relative">
                 <Image
                  src={project.logo}
                  alt={project.title}
                  fill
                  className="rounded-xl object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] uppercase tracking-wider font-bold bg-blue-500/10 text-blue-500 px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <a 
                href={project.link} 
                target="_blank" 
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-600 group/link"
              >
                Launch Project 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover/link:translate-x-1 transition-transform"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioGrid;

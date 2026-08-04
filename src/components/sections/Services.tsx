"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Service icons — one per service, SVG inline ─────────────────────────────
const ServiceIcons: Record<string, JSX.Element> = {
  "custom-software": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  "ai-systems": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
      <circle cx="7.5" cy="14.5" r="1" /><circle cx="16.5" cy="14.5" r="1" />
    </svg>
  ),
  "cloud-devops": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  "mobile": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  ),
  "ui-ux": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" />
      <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" /><line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
    </svg>
  ),
  "web-platforms": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  "digital-transformation": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
      <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
    </svg>
  ),
  "fintech": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  "api": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  "security": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  "qa": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  "consulting": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

// ─── Service thematic SVG backgrounds — unique per service, 3-6% opacity ─────
// Each is a hand-crafted geometric illustration referencing the service domain.
const ServiceBgs: Record<string, (accent: string) => JSX.Element> = {
  "custom-software": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <text x="28" y="110"  fontFamily="monospace" fontSize="64" fill={a} opacity="0.07">&lt;/&gt;</text>
      <text x="340" y="260" fontFamily="monospace" fontSize="44" fill={a} opacity="0.05">{ }</text>
      <text x="140" y="310" fontFamily="monospace" fontSize="28" fill={a} opacity="0.04">return</text>
      <text x="380" y="80"  fontFamily="monospace" fontSize="20" fill={a} opacity="0.04">( ) =&gt;</text>
      <circle cx="500" cy="60" r="50" stroke={a} strokeWidth="1" opacity="0.05" />
      <circle cx="500" cy="60" r="30" stroke={a} strokeWidth="1" opacity="0.06" />
      <line x1="450" y1="300" x2="540" y2="300" stroke={a} strokeWidth="1" opacity="0.05" />
      <line x1="450" y1="315" x2="510" y2="315" stroke={a} strokeWidth="1" opacity="0.04" />
      <line x1="450" y1="330" x2="525" y2="330" stroke={a} strokeWidth="1" opacity="0.03" />
    </svg>
  ),
  "ai-systems": (a) => {
    const nodes = [[60,80],[60,180],[60,280],[190,40],[190,140],[190,240],[190,320],[310,80],[310,180],[310,280]];
    const edges: [number,number][] = [[0,3],[0,4],[1,3],[1,4],[1,5],[2,4],[2,5],[2,6],[3,7],[4,7],[4,8],[5,8],[5,9],[6,9]];
    return (
      <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        {edges.map(([s,t],i) => <line key={i} x1={nodes[s][0]} y1={nodes[s][1]} x2={nodes[t][0]} y2={nodes[t][1]} stroke={a} strokeWidth="0.8" opacity="0.06" />)}
        {nodes.map(([x,y],i) => <circle key={i} cx={x} cy={y} r={i===4||i===7?9:6} stroke={a} strokeWidth="1.2" opacity="0.08" />)}
        <circle cx="400" cy="180" r="70" stroke={a} strokeWidth="0.8" strokeDasharray="4 6" opacity="0.05" />
        <circle cx="400" cy="180" r="110" stroke={a} strokeWidth="0.6" strokeDasharray="3 8" opacity="0.04" />
      </svg>
    );
  },
  "cloud-devops": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <path d="M80 180 Q80 130 130 130 Q140 90 190 90 Q230 60 270 90 Q310 70 340 100 Q380 90 390 130 Q430 125 430 170 Q435 210 390 210 L100 210 Q60 210 80 180Z" stroke={a} strokeWidth="1" opacity="0.07" />
      <path d="M180 260 Q180 230 205 230 Q212 210 235 210 Q255 195 275 210 Q293 200 310 215 Q328 210 332 230 Q350 228 350 250 Q352 268 328 268 L195 268 Q175 268 180 260Z" stroke={a} strokeWidth="1" opacity="0.05" />
      <path d="M270 210 L270 280" stroke={a} strokeWidth="1" opacity="0.06" />
      <path d="M240 280 L300 280" stroke={a} strokeWidth="1" opacity="0.06" />
      <circle cx="240" cy="300" r="12" stroke={a} strokeWidth="1" opacity="0.06" />
      <circle cx="270" cy="300" r="12" stroke={a} strokeWidth="1" opacity="0.06" />
      <circle cx="300" cy="300" r="12" stroke={a} strokeWidth="1" opacity="0.06" />
      <path d="M440 80 L480 40 M460 80 L460 40 M480 80 L440 40" stroke={a} strokeWidth="1.5" opacity="0.05" strokeLinecap="round" />
    </svg>
  ),
  "mobile": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <rect x="180" y="30" width="120" height="200" rx="16" stroke={a} strokeWidth="1.2" opacity="0.07" />
      <rect x="188" y="55" width="104" height="140" rx="4" stroke={a} strokeWidth="0.8" opacity="0.05" />
      <circle cx="240" cy="215" r="7" stroke={a} strokeWidth="1" opacity="0.06" />
      <rect x="350" y="80" width="80" height="140" rx="10" stroke={a} strokeWidth="1" opacity="0.05" />
      <rect x="357" y="95" width="66" height="100" rx="3" stroke={a} strokeWidth="0.7" opacity="0.04" />
      <path d="M80 110 Q120 90 130 130 Q140 90 180 110" stroke={a} strokeWidth="1" opacity="0.05" strokeLinecap="round" />
      <path d="M60 150 Q110 120 120 170 Q130 120 190 150" stroke={a} strokeWidth="0.8" opacity="0.04" strokeLinecap="round" />
      <path d="M40 190 Q100 155 115 210 Q125 155 200 190" stroke={a} strokeWidth="0.6" opacity="0.03" strokeLinecap="round" />
    </svg>
  ),
  "ui-ux": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <circle cx="240" cy="170" r="120" stroke={a} strokeWidth="0.8" opacity="0.05" />
      <circle cx="240" cy="170" r="80"  stroke={a} strokeWidth="0.8" opacity="0.06" />
      <circle cx="240" cy="170" r="40"  stroke={a} strokeWidth="1.2" opacity="0.08" />
      <circle cx="240" cy="170" r="8"   fill={a}  opacity="0.08" />
      <line x1="120" y1="170" x2="360" y2="170" stroke={a} strokeWidth="0.7" opacity="0.05" />
      <line x1="240" y1="50"  x2="240" y2="290" stroke={a} strokeWidth="0.7" opacity="0.05" />
      <rect x="380" y="60"  width="120" height="80"  rx="6" stroke={a} strokeWidth="1" opacity="0.06" />
      <rect x="380" y="160" width="120" height="30"  rx="4" stroke={a} strokeWidth="0.8" opacity="0.05" />
      <rect x="380" y="200" width="80"  height="30"  rx="4" stroke={a} strokeWidth="0.8" opacity="0.05" />
      <rect x="380" y="240" width="100" height="30"  rx="4" stroke={a} strokeWidth="0.8" opacity="0.04" />
    </svg>
  ),
  "web-platforms": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <rect x="60" y="60" width="340" height="220" rx="10" stroke={a} strokeWidth="1" opacity="0.07" />
      <line x1="60" y1="95" x2="400" y2="95" stroke={a} strokeWidth="0.8" opacity="0.06" />
      <circle cx="82" cy="78" r="6" stroke={a} strokeWidth="1" opacity="0.07" />
      <circle cx="102" cy="78" r="6" stroke={a} strokeWidth="1" opacity="0.07" />
      <circle cx="122" cy="78" r="6" stroke={a} strokeWidth="1" opacity="0.07" />
      <rect x="76" y="112" width="150" height="12" rx="3" stroke={a} strokeWidth="0.7" opacity="0.05" />
      <rect x="76" y="134" width="100" height="8"  rx="3" stroke={a} strokeWidth="0.7" opacity="0.04" />
      <rect x="76" y="155" width="130" height="8"  rx="3" stroke={a} strokeWidth="0.7" opacity="0.04" />
      <rect x="240" y="112" width="140" height="110" rx="6" stroke={a} strokeWidth="0.8" opacity="0.05" />
      <path d="M460 100 L530 100 M460 115 L530 115 M460 130 L510 130" stroke={a} strokeWidth="1" opacity="0.05" strokeLinecap="round" />
      <rect x="460" y="180" width="70" height="100" rx="8" stroke={a} strokeWidth="1" opacity="0.05" />
    </svg>
  ),
  "digital-transformation": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <circle cx="100" cy="180" r="45" stroke={a} strokeWidth="1" opacity="0.07" />
      <circle cx="280" cy="180" r="45" stroke={a} strokeWidth="1" opacity="0.07" />
      <circle cx="460" cy="180" r="45" stroke={a} strokeWidth="1" opacity="0.07" />
      <path d="M145 180 L235 180" stroke={a} strokeWidth="1" opacity="0.06" markerEnd="url(#arr)" />
      <path d="M325 180 L415 180" stroke={a} strokeWidth="1" opacity="0.06" />
      <polygon points="230,176 240,180 230,184" fill={a} opacity="0.08" />
      <polygon points="410,176 420,180 410,184" fill={a} opacity="0.08" />
      <path d="M100 90 Q100 50 140 50 Q160 20 200 40" stroke={a} strokeWidth="0.8" strokeDasharray="4 4" opacity="0.05" />
      <path d="M460 90 Q500 70 510 40" stroke={a} strokeWidth="0.8" strokeDasharray="4 4" opacity="0.05" />
      <path d="M340 60 Q370 30 400 50 Q430 20 460 40" stroke={a} strokeWidth="0.8" opacity="0.05" strokeLinecap="round" />
    </svg>
  ),
  "fintech": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <rect x="60" y="110" width="240" height="150" rx="14" stroke={a} strokeWidth="1.2" opacity="0.07" />
      <line x1="60" y1="150" x2="300" y2="150" stroke={a} strokeWidth="0.8" opacity="0.06" />
      <rect x="76" y="165" width="50" height="30" rx="5" stroke={a} strokeWidth="0.8" opacity="0.06" />
      <rect x="76" y="205" width="80" height="8"  rx="3" stroke={a} strokeWidth="0.7" opacity="0.05" />
      <rect x="76" y="220" width="60" height="8"  rx="3" stroke={a} strokeWidth="0.7" opacity="0.04" />
      <circle cx="420" cy="160" r="70" stroke={a} strokeWidth="1" opacity="0.06" />
      <path d="M420 110 L420 130 M420 190 L420 210" stroke={a} strokeWidth="1.5" opacity="0.07" strokeLinecap="round" />
      <path d="M395 125 Q395 140 420 140 Q445 140 445 155 Q445 170 420 170 Q395 170 395 185 Q395 195 420 195" stroke={a} strokeWidth="1.5" opacity="0.07" strokeLinecap="round" fill="none" />
      <path d="M360 290 Q380 260 420 270 Q460 260 480 290" stroke={a} strokeWidth="1" opacity="0.05" strokeLinecap="round" fill="none" />
    </svg>
  ),
  "api": (a) => {
    const pts = [[80,90],[80,180],[80,270],[240,60],[240,150],[240,240],[400,90],[400,180],[400,270]];
    const links: [number,number][] = [[0,3],[0,4],[1,3],[1,4],[1,5],[2,4],[2,5],[3,6],[3,7],[4,6],[4,7],[4,8],[5,7],[5,8]];
    return (
      <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        {links.map(([s,t],i) => <line key={i} x1={pts[s][0]} y1={pts[s][1]} x2={pts[t][0]} y2={pts[t][1]} stroke={a} strokeWidth="0.8" opacity="0.05" />)}
        {pts.map(([x,y],i) => <rect key={i} x={x-10} y={y-10} width="20" height="20" rx="4" stroke={a} strokeWidth="1" opacity="0.07" />)}
        <text x="440" y="100" fontFamily="monospace" fontSize="13" fill={a} opacity="0.06">GET /api</text>
        <text x="440" y="125" fontFamily="monospace" fontSize="13" fill={a} opacity="0.05">POST /v2</text>
        <text x="440" y="150" fontFamily="monospace" fontSize="13" fill={a} opacity="0.04">200 OK</text>
      </svg>
    );
  },
  "security": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <path d="M240 30 L340 60 L340 160 Q340 240 240 290 Q140 240 140 160 L140 60 Z" stroke={a} strokeWidth="1.2" opacity="0.07" />
      <path d="M240 60 L305 83 L305 160 Q305 215 240 250 Q175 215 175 160 L175 83 Z" stroke={a} strokeWidth="0.8" opacity="0.06" />
      <circle cx="240" cy="155" r="25" stroke={a} strokeWidth="1" opacity="0.07" />
      <path d="M230 155 L237 163 L255 145" stroke={a} strokeWidth="1.5" opacity="0.08" strokeLinecap="round" strokeLinejoin="round" />
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return <circle key={i} cx={440 + Math.cos(angle)*50} cy={180 + Math.sin(angle)*50} r="5" stroke={a} strokeWidth="1" opacity="0.05" />;
      })}
      <circle cx="440" cy="180" r="50" stroke={a} strokeWidth="0.6" strokeDasharray="3 6" opacity="0.05" />
    </svg>
  ),
  "qa": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      {[0,1,2,3].map(row => [0,1,2,3].map(col => (
        <rect key={`${row}-${col}`} x={60 + col*80} y={60 + row*70} width="50" height="40" rx="5"
          stroke={a} strokeWidth="0.8"
          opacity={row===1&&col===2 ? 0.10 : 0.05} />
      )))}
      <polyline points="75,135 88,148 108,128" stroke={a} strokeWidth="1.5" opacity="0.09" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="155,75 168,88 188,68"  stroke={a} strokeWidth="1.5" opacity="0.07" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="235,205 248,218 268,198" stroke={a} strokeWidth="1.5" opacity="0.06" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="440" cy="140" r="60" stroke={a} strokeWidth="1" opacity="0.06" />
      <line x1="440" y1="80" x2="440" y2="200" stroke={a} strokeWidth="0.7" opacity="0.05" />
      <line x1="380" y1="140" x2="500" y2="140" stroke={a} strokeWidth="0.7" opacity="0.05" />
    </svg>
  ),
  "consulting": (a) => (
    <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
      <circle cx="240" cy="120" r="45" stroke={a} strokeWidth="1.2" opacity="0.07" />
      <path d="M225 100 Q225 85 240 85 Q260 85 260 100 Q260 115 250 120 Q245 123 245 135" stroke={a} strokeWidth="1.5" opacity="0.08" strokeLinecap="round" fill="none" />
      <circle cx="245" cy="145" r="3" fill={a} opacity="0.08" />
      <line x1="240" y1="165" x2="240" y2="200" stroke={a} strokeWidth="1" opacity="0.06" />
      <line x1="240" y1="200" x2="140" y2="240" stroke={a} strokeWidth="1" opacity="0.06" />
      <line x1="240" y1="200" x2="240" y2="240" stroke={a} strokeWidth="1" opacity="0.06" />
      <line x1="240" y1="200" x2="340" y2="240" stroke={a} strokeWidth="1" opacity="0.06" />
      <rect x="110" y="240" width="60" height="40" rx="6" stroke={a} strokeWidth="1" opacity="0.07" />
      <rect x="210" y="240" width="60" height="40" rx="6" stroke={a} strokeWidth="1" opacity="0.07" />
      <rect x="310" y="240" width="60" height="40" rx="6" stroke={a} strokeWidth="1" opacity="0.07" />
      <path d="M430 60 L430 160 Q430 180 450 180 L520 180" stroke={a} strokeWidth="1" opacity="0.05" strokeLinecap="round" />
      <path d="M440 90 L480 90 M440 110 L470 110 M440 130 L485 130" stroke={a} strokeWidth="0.8" opacity="0.05" strokeLinecap="round" />
    </svg>
  ),
};

// ─── Phase icons ──────────────────────────────────────────────────────────────
const PhaseIcons = {
  discover: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
    </svg>
  ),
  plan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
    </svg>
  ),
  build: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  test: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <polyline points="9 11 12 14 22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  ),
  launch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4 20-7z" />
    </svg>
  ),
  audit: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  integrate: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  monitor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
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
    accentFrom: "#7C3AED",
    accentTo: "#A855F7",
    phases: [
      {
        num: "01", name: "Discovery", icon: "discover",
        description: "We start by understanding the real problem, not just the requested feature. Deep-dive sessions map your users, constraints, and success criteria before any code is written.",
        deliverables: ["Requirements specification", "User journey mapping", "Technical feasibility report", "Project roadmap with milestones"],
      },
      {
        num: "02", name: "Architecture", icon: "plan",
        description: "We design the system blueprint — database schema, API contracts, service boundaries, and tech stack decisions — all documented before a single line of code.",
        deliverables: ["System architecture diagram", "API contract definitions", "Database schema design", "Tech stack decision log"],
      },
      {
        num: "03", name: "Development", icon: "build",
        description: "Agile sprints with weekly working demos. Clean, documented code your future team can maintain. No black boxes, no shortcuts that become your problem later.",
        deliverables: ["Working software each sprint", "Code repository with docs", "Weekly progress demos", "Technical documentation"],
      },
      {
        num: "04", name: "QA & Testing", icon: "test",
        description: "Unit, integration, and end-to-end tests. Performance profiling under load. Security review. We find the issues before your users do.",
        deliverables: ["Test coverage report", "Performance benchmarks", "Security audit results", "Bug-free staging environment"],
      },
      {
        num: "05", name: "Delivery", icon: "launch",
        description: "Production deployment, full source code handover, runbooks, and onboarding. We stay available post-launch — because launch day is just the beginning.",
        deliverables: ["Production deployment", "Full source code ownership", "Operations runbook", "30-day post-launch support"],
      },
    ],
  },
  {
    id: "ai-systems",
    title: "AI & Intelligent Systems",
    fullTitle: "AI & Intelligent Systems",
    tagline: "Real AI in real products — not wrappers, not demos.",
    accentFrom: "#6D28D9",
    accentTo: "#06B6D4",
    phases: [
      {
        num: "01", name: "Assessment", icon: "discover",
        description: "We evaluate where AI genuinely adds value vs. where it's hype. Not every problem needs ML. We identify the use cases with real ROI for your specific product.",
        deliverables: ["AI opportunity audit", "Use case prioritization", "Data readiness assessment", "Build vs. buy recommendation"],
      },
      {
        num: "02", name: "Data Strategy", icon: "plan",
        description: "Good models need good data. We design your data pipeline, handle labeling strategies, and ensure you're building on a foundation that scales.",
        deliverables: ["Data pipeline architecture", "Labeling & annotation strategy", "Data quality framework", "Training dataset preparation"],
      },
      {
        num: "03", name: "Model Development", icon: "build",
        description: "We build, train, and fine-tune models for your specific domain — whether that's LLM integration, computer vision, or custom ML. Evaluated on real metrics, not toy benchmarks.",
        deliverables: ["Trained model with evaluation", "Prompt engineering docs", "Model performance report", "Inference optimization"],
      },
      {
        num: "04", name: "Integration", icon: "integrate",
        description: "The model goes into your product — not a separate tool. We embed AI where it creates real workflow value, with graceful fallbacks for when it's uncertain.",
        deliverables: ["Production AI integration", "Fallback logic design", "API endpoints for AI features", "End-user testing report"],
      },
      {
        num: "05", name: "Monitoring", icon: "monitor",
        description: "AI in production drifts. We set up monitoring for model performance, data distribution shifts, and user feedback loops so quality holds over time.",
        deliverables: ["Model monitoring dashboard", "Drift detection setup", "Feedback loop implementation", "Retraining runbook"],
      },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    fullTitle: "Cloud & DevOps",
    tagline: "Deployments should be boring. Incidents should be rare.",
    accentFrom: "#0891B2",
    accentTo: "#06B6D4",
    phases: [
      {
        num: "01", name: "Audit", icon: "audit",
        description: "We analyse your current infrastructure — costs, reliability gaps, security posture, and deployment pain points. Honest findings, no upselling.",
        deliverables: ["Infrastructure audit report", "Cost optimization analysis", "Security posture review", "Reliability risk register"],
      },
      {
        num: "02", name: "Architecture", icon: "plan",
        description: "Cloud infrastructure designed for your actual scale, not imagined scale. Right-sized resources, multi-region if needed, disaster recovery baked in from day one.",
        deliverables: ["Cloud architecture diagram", "Infrastructure-as-code templates", "Scaling strategy", "DR & backup plan"],
      },
      {
        num: "03", name: "Migration", icon: "build",
        description: "Zero-downtime migration with tested rollback plans. We move workloads in stages — nothing big-bangs into production.",
        deliverables: ["Migration runbook", "Staged cutover plan", "Rollback procedures", "Data migration validation"],
      },
      {
        num: "04", name: "Automation", icon: "integrate",
        description: "CI/CD pipelines, automated testing gates, infrastructure-as-code, alerting, and log aggregation. Deployments become a button press.",
        deliverables: ["CI/CD pipeline setup", "Automated deployment gates", "Observability stack", "Alert runbooks"],
      },
      {
        num: "05", name: "Optimisation", icon: "monitor",
        description: "Ongoing cost reviews, performance tuning, and capacity planning. We keep the lights on and the bills sensible.",
        deliverables: ["Monthly cost reports", "Performance benchmarks", "Capacity planning model", "Ongoing SRE support"],
      },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Engineering",
    fullTitle: "Mobile Engineering",
    tagline: "Fast on a 3-year-old phone. Native where it matters.",
    accentFrom: "#7C3AED",
    accentTo: "#06B6D4",
    phases: [
      {
        num: "01", name: "Discovery", icon: "discover",
        description: "Platform strategy first — native iOS/Android or cross-platform? We weigh your user base, feature requirements, and long-term maintenance before writing a line.",
        deliverables: ["Platform recommendation report", "User research summary", "Feature priority matrix", "Technical constraints doc"],
      },
      {
        num: "02", name: "UX Design", icon: "plan",
        description: "Native design patterns for each platform — not a web app in a shell. iOS feels like iOS, Android feels like Android. Prototypes validated with real users.",
        deliverables: ["Native UI/UX prototypes", "Design system for mobile", "User testing report", "Accessibility audit"],
      },
      {
        num: "03", name: "Development", icon: "build",
        description: "React Native or Flutter for cross-platform. Swift/Kotlin for pure native. Performance profiled from the start — smooth 60fps on mid-range hardware.",
        deliverables: ["Working app builds (iOS + Android)", "Weekly sprint demos", "Performance profiling report", "Code repository"],
      },
      {
        num: "04", name: "Device Testing", icon: "test",
        description: "Tested across real devices — not just emulators. Edge cases in connectivity, background states, and OS versions. Push notification, deep link, and permission flows.",
        deliverables: ["Device test matrix results", "Crash-free rate report", "Connectivity edge case tests", "OS compatibility report"],
      },
      {
        num: "05", name: "Store Launch", icon: "launch",
        description: "App store submission handled end to end — screenshots, metadata, review responses. TestFlight / internal testing tracks. Monitoring from day one.",
        deliverables: ["App Store & Play Store submissions", "Store listing assets", "Crash monitoring setup", "Launch day support"],
      },
    ],
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    fullTitle: "UI/UX Design",
    tagline: "Makes sense first. Then it looks good.",
    accentFrom: "#A855F7",
    accentTo: "#EC4899",
    phases: [
      {
        num: "01", name: "Research", icon: "discover",
        description: "User interviews, competitor analysis, heuristic evaluation. We understand who uses this, how they think, and where current designs fail them.",
        deliverables: ["User research report", "Persona definitions", "Competitor UX audit", "Problem statement framework"],
      },
      {
        num: "02", name: "Information Architecture", icon: "plan",
        description: "Before any visual design, we map out the structure — navigation, user flows, content hierarchy. Everything clickable has a reason.",
        deliverables: ["Site map / app map", "User flow diagrams", "Content hierarchy doc", "Navigation framework"],
      },
      {
        num: "03", name: "Design", icon: "build",
        description: "High-fidelity designs in Figma — with real content, not lorem ipsum. Component-based design system that developers can actually build from.",
        deliverables: ["Figma design files", "Component design system", "Responsive breakpoints", "Interaction specifications"],
      },
      {
        num: "04", name: "Prototyping & Testing", icon: "test",
        description: "Clickable prototypes tested with real users. We iterate based on what people actually do, not what they say they'll do.",
        deliverables: ["Interactive prototype", "Usability test recordings", "Iteration report", "Accessibility compliance check"],
      },
      {
        num: "05", name: "Handover", icon: "launch",
        description: "Developer-ready handover — annotated specs, assets exported, design tokens documented. We stay available during implementation to answer questions.",
        deliverables: ["Annotated design specs", "Asset export package", "Design token documentation", "Developer Q&A support"],
      },
    ],
  },
  {
    id: "web-platforms",
    title: "Web Platforms",
    fullTitle: "Web Platforms & Applications",
    tagline: "Loads fast, handles traffic, built for the long run.",
    accentFrom: "#0891B2",
    accentTo: "#7C3AED",
    phases: [
      {
        num: "01", name: "Discovery", icon: "discover",
        description: "Define the product scope, target audience, performance requirements, and scalability needs. We challenge assumptions before they become expensive technical debt.",
        deliverables: ["Product scope document", "Technical requirements spec", "Performance targets", "SEO & accessibility baseline"],
      },
      {
        num: "02", name: "Architecture", icon: "plan",
        description: "Stack selection — Next.js, Remix, or custom — based on your actual needs. CDN strategy, database choice, caching layer, auth system all planned before building.",
        deliverables: ["Tech stack decision doc", "System architecture", "API design spec", "Security architecture"],
      },
      {
        num: "03", name: "Development", icon: "build",
        description: "Component-driven development. Lighthouse scores tracked from day one. Accessibility built in, not added later. Incremental delivery, weekly demos.",
        deliverables: ["Working web application", "Lighthouse performance reports", "Component library", "Weekly sprint demos"],
      },
      {
        num: "04", name: "Testing", icon: "test",
        description: "Cross-browser, cross-device testing. Load testing to your traffic projections. Security audit. Core Web Vitals validated in real conditions.",
        deliverables: ["Cross-browser test report", "Load test results", "Security penetration report", "Core Web Vitals report"],
      },
      {
        num: "05", name: "Launch", icon: "launch",
        description: "Production deployment with rollback capability. SEO metadata, sitemaps, and monitoring in place before the domain goes live.",
        deliverables: ["Production deployment", "Analytics & monitoring setup", "SEO configuration", "Post-launch support"],
      },
    ],
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    fullTitle: "Digital Transformation",
    tagline: "Off legacy stacks. Into systems that move fast.",
    accentFrom: "#059669",
    accentTo: "#06B6D4",
    phases: [
      {
        num: "01", name: "Assessment", icon: "audit",
        description: "We map your current systems, processes, and pain points. Where is technology slowing people down? Where are manual processes hiding? What's the actual cost of the status quo?",
        deliverables: ["Current state assessment", "Process pain point map", "Technology debt register", "Transformation business case"],
      },
      {
        num: "02", name: "Strategy", icon: "plan",
        description: "A phased roadmap — not a big-bang replacement. We sequence the changes to deliver value early and reduce risk. People, process, and technology all addressed together.",
        deliverables: ["Transformation roadmap", "Change management plan", "Risk mitigation strategy", "Success metrics framework"],
      },
      {
        num: "03", name: "Modernisation", icon: "build",
        description: "Incrementally replace or integrate legacy systems. Strangler fig pattern where appropriate. New capabilities built alongside existing ones, not as replacements.",
        deliverables: ["Modernised system modules", "Integration layer", "Data migration plan", "Legacy decommission roadmap"],
      },
      {
        num: "04", name: "Adoption", icon: "test",
        description: "Training, documentation, and change management. Technology only transforms if people use it. We measure adoption, not just deployment.",
        deliverables: ["Training materials", "User adoption metrics", "Process documentation", "Feedback collection system"],
      },
      {
        num: "05", name: "Continuous Improvement", icon: "monitor",
        description: "Transformation is never done. We set up the systems to keep improving — feedback loops, performance metrics, and regular reviews of what to tackle next.",
        deliverables: ["KPI dashboard", "Continuous improvement process", "Quarterly review framework", "Long-term roadmap updates"],
      },
    ],
  },
  {
    id: "fintech",
    title: "Fintech & Payments",
    fullTitle: "Fintech & Payments",
    tagline: "Where bugs aren't bugs — they're liabilities.",
    accentFrom: "#0891B2",
    accentTo: "#059669",
    phases: [
      {
        num: "01", name: "Compliance First", icon: "audit",
        description: "We map the regulatory landscape for your product and jurisdiction before design begins. PCI DSS, PSD2, FCA, or sector-specific compliance requirements — understood and scoped.",
        deliverables: ["Regulatory requirement mapping", "Compliance gap analysis", "Licensing requirements doc", "Risk framework"],
      },
      {
        num: "02", name: "Architecture", icon: "plan",
        description: "Financial systems need idempotent operations, audit trails, and double-entry accounting patterns. We design for correctness first, then performance.",
        deliverables: ["Financial system architecture", "Audit trail design", "Idempotency implementation plan", "Data retention policy"],
      },
      {
        num: "03", name: "Development", icon: "build",
        description: "Payment flows built with edge cases as the primary cases — failed payments, partial refunds, dispute handling, and currency conversion all designed explicitly.",
        deliverables: ["Payment flow implementation", "Webhook handling system", "Reconciliation logic", "Error recovery procedures"],
      },
      {
        num: "04", name: "Security Audit", icon: "test",
        description: "Penetration testing, vulnerability scanning, and PCI DSS assessment. Financial data requires a higher security bar — we apply one.",
        deliverables: ["Penetration test report", "PCI compliance assessment", "Vulnerability remediation", "Security hardening checklist"],
      },
      {
        num: "05", name: "Launch & Monitor", icon: "monitor",
        description: "Staged rollout with transaction monitoring from day one. Fraud detection patterns set up. Reconciliation reports automated.",
        deliverables: ["Staged launch plan", "Transaction monitoring setup", "Fraud detection rules", "Automated reconciliation"],
      },
    ],
  },
  {
    id: "api",
    title: "API & Integrations",
    fullTitle: "API Development & Integrations",
    tagline: "Connect things that weren't meant to talk. Clean contracts.",
    accentFrom: "#7C3AED",
    accentTo: "#0891B2",
    phases: [
      {
        num: "01", name: "Discovery", icon: "discover",
        description: "Map every system that needs to communicate, the data that flows between them, and the edge cases when things fail. Integration complexity hides in edge cases.",
        deliverables: ["Integration map", "Data flow diagram", "Failure scenario catalogue", "Third-party API assessment"],
      },
      {
        num: "02", name: "API Design", icon: "plan",
        description: "RESTful, GraphQL, or event-driven — chosen for the use case, not preference. Versioning strategy, authentication model, and error formats agreed before building.",
        deliverables: ["OpenAPI / GraphQL schema", "Versioning strategy", "Auth & rate limit design", "Error response standards"],
      },
      {
        num: "03", name: "Development", icon: "build",
        description: "Clean, consistent implementation with comprehensive test coverage. Mock servers for consumer teams to develop against in parallel.",
        deliverables: ["API implementation", "Mock server for consumers", "SDK documentation", "Integration test suite"],
      },
      {
        num: "04", name: "Testing", icon: "test",
        description: "Contract testing, load testing, and failure injection. We test what happens when the third-party API you depend on goes down.",
        deliverables: ["Contract test results", "Load test benchmarks", "Chaos / failure injection tests", "Retry & timeout validation"],
      },
      {
        num: "05", name: "Documentation & Launch", icon: "launch",
        description: "Developer documentation that people actually read — code examples, interactive playground, changelog. Monitored in production from day one.",
        deliverables: ["Developer documentation site", "Interactive API playground", "Changelog system", "API health monitoring"],
      },
    ],
  },
  {
    id: "security",
    title: "Cybersecurity",
    fullTitle: "Cybersecurity & Compliance",
    tagline: "Find problems before someone else does it for you.",
    accentFrom: "#DC2626",
    accentTo: "#7C3AED",
    phases: [
      {
        num: "01", name: "Assessment", icon: "audit",
        description: "Threat modelling and attack surface mapping. We look at your system the way an attacker would — identifying entry points, privilege escalation paths, and data exposure risks.",
        deliverables: ["Threat model document", "Attack surface map", "Risk severity register", "Compliance gap analysis"],
      },
      {
        num: "02", name: "Architecture Review", icon: "plan",
        description: "Security architecture review — authentication flows, authorization models, secrets management, encryption at rest and in transit. Designed to be right, not just compliant.",
        deliverables: ["Security architecture review", "Auth model assessment", "Secrets management plan", "Encryption policy"],
      },
      {
        num: "03", name: "Penetration Testing", icon: "build",
        description: "Manual penetration testing by experienced testers — not just automated scans. OWASP Top 10, business logic flaws, and infrastructure attacks.",
        deliverables: ["Penetration test report", "OWASP coverage report", "Business logic flaw findings", "Remediation priority list"],
      },
      {
        num: "04", name: "Remediation", icon: "test",
        description: "We don't just report — we fix. Working with your team to implement patches, close vulnerabilities, and verify the fixes actually work.",
        deliverables: ["Remediation implementation", "Patch verification tests", "Updated security baseline", "Developer security training"],
      },
      {
        num: "05", name: "Ongoing Monitoring", icon: "monitor",
        description: "Security is not a one-time event. We set up SIEM, intrusion detection, and vulnerability scanning so you know when the threat landscape changes.",
        deliverables: ["SIEM setup", "Intrusion detection alerts", "Regular vulnerability scans", "Incident response playbook"],
      },
    ],
  },
  {
    id: "qa",
    title: "QA & Testing",
    fullTitle: "QA & Testing",
    tagline: "Tests that mean something. Not just tests that run green.",
    accentFrom: "#059669",
    accentTo: "#0891B2",
    phases: [
      {
        num: "01", name: "Test Strategy", icon: "plan",
        description: "Define what to test, at what level, with what tools. Unit, integration, E2E, performance, accessibility — each has a role. We build a strategy, not a test backlog.",
        deliverables: ["Test strategy document", "Test pyramid design", "Tool selection & setup", "Coverage targets"],
      },
      {
        num: "02", name: "Test Design", icon: "discover",
        description: "Equivalence partitioning, boundary value analysis, and risk-based testing. We identify the scenarios that matter before writing a single test.",
        deliverables: ["Test case specifications", "Risk-based test coverage map", "Edge case catalogue", "Test data strategy"],
      },
      {
        num: "03", name: "Automation", icon: "build",
        description: "Automated test suites that run in CI on every commit. Playwright for E2E, Jest/Vitest for unit, k6 for performance. Maintained as a first-class codebase.",
        deliverables: ["Automated test suite", "CI pipeline integration", "Test reporting dashboard", "Coverage thresholds enforced"],
      },
      {
        num: "04", name: "Execution", icon: "test",
        description: "Exploratory testing alongside automation. We look for what the scripts don't catch — UX inconsistencies, performance degradation under real load, and accessibility failures.",
        deliverables: ["Exploratory test sessions", "Load test results", "Accessibility audit", "Defect severity triage"],
      },
      {
        num: "05", name: "Continuous QA", icon: "monitor",
        description: "Quality is maintained, not achieved once. Flaky test elimination, coverage ratcheting, and test health metrics so your suite stays trustworthy as the codebase grows.",
        deliverables: ["Test health metrics", "Flaky test elimination report", "Coverage trend tracking", "Regression prevention setup"],
      },
    ],
  },
  {
    id: "consulting",
    title: "IT Consulting",
    fullTitle: "IT Consulting",
    tagline: "Sometimes the best advice is what not to build.",
    accentFrom: "#7C3AED",
    accentTo: "#A855F7",
    phases: [
      {
        num: "01", name: "Understand", icon: "discover",
        description: "We listen before we advise. Understanding your business context, constraints, team capabilities, and the actual problem — not the stated problem — before forming any view.",
        deliverables: ["Stakeholder interview sessions", "Current state documentation", "Problem framing workshop", "Context briefing document"],
      },
      {
        num: "02", name: "Diagnose", icon: "audit",
        description: "Technical debt mapping, architecture review, process analysis. Where are the real bottlenecks? What decisions are slowing you down? What's costing more than it should?",
        deliverables: ["Technical debt register", "Architecture assessment", "Process bottleneck analysis", "Cost optimisation opportunities"],
      },
      {
        num: "03", name: "Recommend", icon: "plan",
        description: "Specific, actionable recommendations — not generic best practices. Each recommendation includes the trade-offs, the implementation path, and the expected outcome.",
        deliverables: ["Prioritised recommendations report", "Trade-off analysis", "Implementation roadmap", "Decision-ready presentation"],
      },
      {
        num: "04", name: "Implementation Support", icon: "build",
        description: "Recommendations only have value if they're executed. We stay involved — reviewing progress, answering technical questions, and adjusting the plan as reality intervenes.",
        deliverables: ["Implementation review sessions", "Technical Q&A support", "Progress tracking", "Plan adjustment recommendations"],
      },
      {
        num: "05", name: "Knowledge Transfer", icon: "launch",
        description: "We leave you more capable than we found you. Documentation, training, and working sessions that build internal capability so you're not dependent on us forever.",
        deliverables: ["Internal capability assessment", "Training sessions", "Documentation handover", "Ongoing retainer option"],
      },
    ],
  },
] as const;

type ServiceType = typeof SERVICES[number];
type PhaseType = ServiceType["phases"][number];

// ─── Phase icon renderer ──────────────────────────────────────────────────────
function PhaseIcon({ name }: { name: string }) {
  return (PhaseIcons as Record<string, JSX.Element>)[name] ?? PhaseIcons.discover;
}

// ─── Individual phase step display ────────────────────────────────────────────
function PhasePanel({
  phase,
  service,
  direction,
}: {
  phase: PhaseType;
  service: ServiceType;
  direction: number;
}) {
  const BgRenderer = ServiceBgs[service.id];

  return (
    <motion.div
      key={phase.num + service.id}
      initial={{ opacity: 0, x: direction * 36, y: 6 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{    opacity: 0, x: direction * -28, y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 flex flex-col justify-between p-4 sm:p-7 md:p-10"
    >
      {/* ── Service thematic background illustration ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl" style={{ color: service.accentFrom }} aria-hidden>
        {BgRenderer?.(service.accentFrom)}
      </div>

      {/* ── Watermark phase number (right, very faint) ── */}
      <div
        className="pointer-events-none absolute right-5 top-3 select-none font-display font-black leading-none"
        style={{
          fontSize: "clamp(6rem, 16vw, 10rem)",
          background: `linear-gradient(135deg, ${service.accentFrom}14, ${service.accentTo}08)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        aria-hidden
      >
        {phase.num}
      </div>

      {/* ── Top: phase identity row ── */}
      <div className="relative z-10 flex items-center gap-4">
        {/* Phase icon — large, glowing */}
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${service.accentFrom}22, ${service.accentTo}14)`,
            border: `1.5px solid ${service.accentFrom}35`,
            color: service.accentFrom,
            boxShadow: `0 0 20px ${service.accentFrom}20, inset 0 1px 0 rgba(255,255,255,0.5)`,
          }}
        >
          <PhaseIcon name={phase.icon} />
        </div>

        <div className="flex flex-col gap-0.5">
          <span
            className="font-sans text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ color: service.accentFrom }}
          >
            Step {phase.num}
          </span>
          <span className="font-display font-bold text-slate-900" style={{ fontSize: "1.05rem" }}>
            {phase.name}
          </span>
        </div>

        {/* Service icon badge — small, top right area */}
        <div
          className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-xl"
          style={{
            background: `${service.accentFrom}10`,
            color: service.accentFrom,
            border: `1px solid ${service.accentFrom}20`,
          }}
          title={service.fullTitle}
        >
          <div style={{ transform: "scale(0.85)" }}>
            {ServiceIcons[service.id]}
          </div>
        </div>
      </div>

      {/* ── Middle: description ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center gap-3 mt-4">
        <p className="text-sm leading-relaxed md:text-[0.95rem]" style={{ color: "#475569", maxWidth: "500px" }}>
          {phase.description}
        </p>
      </div>

      {/* ── Bottom: deliverables ── */}
      <div className="relative z-10 mt-4">
        <div
          className="rounded-xl p-4"
          style={{
            background: `linear-gradient(135deg, ${service.accentFrom}07, ${service.accentTo}04)`,
            border: `1px solid ${service.accentFrom}14`,
          }}
        >
          <p className="mb-2.5 font-sans text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: service.accentFrom }}>
            What you get
          </p>
          <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {phase.deliverables.map((d) => (
              <div key={d} className="flex items-start gap-2">
                <span
                  className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: `linear-gradient(135deg, ${service.accentFrom}, ${service.accentTo})` }}
                  aria-hidden
                />
                <span className="text-[13px] leading-snug" style={{ color: "#334155" }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Services section ────────────────────────────────────────────────────
export default function Services() {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [phaseIdx,  setPhaseIdx]    = useState(0);
  const [direction, setDirection]   = useState(1);
  const [paused,    setPaused]      = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const service = SERVICES[activeIdx];
  const phase   = service.phases[phaseIdx];

  // Auto-advance phases every 3.8s
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (paused) return;
    timerRef.current = setInterval(() => {
      setDirection(1);
      setPhaseIdx((p) => (p + 1) % service.phases.length);
    }, 3800);
  }, [paused, service.phases.length]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [resetTimer, activeIdx, paused]);

  const goPhase = (i: number) => {
    setDirection(i > phaseIdx ? 1 : -1);
    setPhaseIdx(i);
    setPaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => setPaused(false), 6000);
  };

  const goService = (i: number) => {
    setActiveIdx(i);
    setPhaseIdx(0);
    setDirection(1);
    setPaused(false);
  };

  return (
    <section
      id="services"
      className="relative pt-14 pb-16 md:pt-20 md:pb-24 dtl-bg-light dtl-border-light overflow-hidden"
    >
      {/* Very faint decorative orb */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.8) 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="dtl-section">
        {/* Section header */}
        <div className="mb-8 md:mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              className="font-display font-bold tracking-tight"
              style={{ fontSize: "clamp(1.7rem, 3.5vw, 2.6rem)", lineHeight: 1.08, letterSpacing: "-0.025em", color: "#0F172A" }}
            >
              What we do —{" "}
              <span className="dtl-gradient-text">and how we do it.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed md:text-right" style={{ color: "#64748B" }}>
            Click any service to see the exact steps we take to deliver it.
          </p>
        </div>

        {/* Main interactive layout */}
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-6">

          {/* ── Service list — sidebar on desktop, horizontal scroll on mobile ── */}
          <div className="w-full shrink-0 lg:w-72 xl:w-80">
            {/* Mobile: horizontal scroll strip */}
            <div className="scrollbar-none flex gap-2 overflow-x-auto pb-2 lg:hidden">
              {SERVICES.map((s, i) => {
                const isActive = i === activeIdx;
                return (
                  <button
                    key={s.id}
                    onClick={() => goService(i)}
                    className="shrink-0 flex items-center gap-2 rounded-xl px-3 py-2 font-sans text-xs font-semibold transition-all duration-200"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${s.accentFrom}18, ${s.accentTo}10)`
                        : "#F1F5F9",
                      border: isActive ? `1px solid ${s.accentFrom}30` : "1px solid transparent",
                      color: isActive ? s.accentFrom : "#64748B",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ display: "inline-flex", color: isActive ? s.accentFrom : "#94A3B8" }}>
                      {ServiceIcons[s.id]}
                    </span>
                    {s.title}
                  </button>
                );
              })}
            </div>

            {/* Desktop: vertical sidebar */}
            <div
              className="hidden lg:block rounded-2xl p-3"
              style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", boxShadow: "0 2px 16px -4px rgba(0,0,0,0.07)" }}
            >
              <div className="flex flex-col gap-0.5">
                {SERVICES.map((s, i) => {
                  const isActive = i === activeIdx;
                  return (
                    <button
                      key={s.id}
                      onClick={() => goService(i)}
                      className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${s.accentFrom}12, ${s.accentTo}08)`
                          : "transparent",
                        border: isActive ? `1px solid ${s.accentFrom}22` : "1px solid transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) (e.currentTarget as HTMLElement).style.background = "#F8FAFC";
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeBar"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full"
                          style={{ background: `linear-gradient(to bottom, ${s.accentFrom}, ${s.accentTo})` }}
                          transition={{ type: "spring", stiffness: 500, damping: 38 }}
                        />
                      )}
                      <div
                        className="shrink-0 flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200"
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${s.accentFrom}22, ${s.accentTo}14)`
                            : "rgba(241,245,249,0.8)",
                          color: isActive ? s.accentFrom : "#94A3B8",
                          border: isActive ? `1px solid ${s.accentFrom}25` : "1px solid transparent",
                          boxShadow: isActive ? `0 0 12px ${s.accentFrom}18` : "none",
                        }}
                      >
                        {ServiceIcons[s.id]}
                      </div>
                      <span
                        className="font-sans text-[13px] font-medium leading-tight transition-colors duration-200 flex-1"
                        style={{ color: isActive ? "#0F172A" : "#64748B" }}
                      >
                        {s.title}
                      </span>
                      <motion.svg
                        animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -4 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0 h-3 w-3"
                        viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"
                        style={{ color: s.accentFrom }}
                      >
                        <path d="M6 3l5 5-5 5" />
                      </motion.svg>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: Journey panel ─────────────────────────────────────────── */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">

            {/* Service header */}
            <div
              className="rounded-2xl px-4 sm:px-6 py-4 flex items-center justify-between gap-4"
              style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", boxShadow: "0 2px 16px -4px rgba(0,0,0,0.07)" }}
            >
              <div>
                <h3
                  className="font-display font-bold"
                  style={{ fontSize: "1.1rem", color: "#0F172A" }}
                >
                  {service.fullTitle}
                </h3>
                <p className="mt-0.5 text-sm" style={{ color: "#64748B" }}>{service.tagline}</p>
              </div>
              {/* Phase progress — named step pills */}
              <div className="hidden sm:flex items-center gap-1 shrink-0 flex-wrap justify-end max-w-[220px] md:max-w-none">
                {service.phases.map((p, i) => {
                  const isP = i === phaseIdx;
                  const isDone = i < phaseIdx;
                  return (
                    <button
                      key={p.num}
                      onClick={() => goPhase(i)}
                      className="flex items-center gap-1.5 rounded-full px-2.5 py-1 font-sans text-[11px] font-semibold transition-all duration-200"
                      style={{
                        background: isP
                          ? `linear-gradient(135deg, ${service.accentFrom}, ${service.accentTo})`
                          : isDone ? `${service.accentFrom}15` : "#F1F5F9",
                        color: isP ? "#fff" : isDone ? service.accentFrom : "#94A3B8",
                        border: "none",
                      }}
                      aria-label={`Phase ${i + 1}: ${p.name}`}
                    >
                      {isDone && !isP && (
                        <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <polyline points="2 5 4 7 8 3" />
                        </svg>
                      )}
                      {p.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Phase tabs — mobile */}
            <div className="flex sm:hidden gap-1.5 overflow-x-auto pb-1">
              {service.phases.map((p, i) => (
                <button
                  key={p.num}
                  onClick={() => goPhase(i)}
                  className="shrink-0 rounded-lg px-3 py-1.5 font-mono text-xs font-bold transition-all duration-200"
                  style={{
                    background: i === phaseIdx
                      ? `linear-gradient(135deg, ${service.accentFrom}, ${service.accentTo})`
                      : "#F1F5F9",
                    color: i === phaseIdx ? "#FFFFFF" : "#64748B",
                    border: "none",
                  }}
                >
                  {p.num}
                </button>
              ))}
            </div>

            {/* Phase content panel */}
            <div
              className="relative flex-1 rounded-2xl overflow-hidden"
              style={{
                minHeight: "clamp(420px, 55vw, 460px)",
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 4px 32px -8px rgba(0,0,0,0.08)",
              }}
            >
              {/* Accent top bar */}
              <div
                className="absolute inset-x-0 top-0 h-0.5"
                style={{ background: `linear-gradient(90deg, ${service.accentFrom}, ${service.accentTo})` }}
              />


              {/* Animated phase content */}
              <AnimatePresence mode="wait" initial={false}>
                <PhasePanel
                  key={`${activeIdx}-${phaseIdx}`}
                  phase={phase}
                  service={service}
                  direction={direction}
                />
              </AnimatePresence>

              {/* Phase nav arrows */}
              <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
                <button
                  onClick={() => goPhase(phaseIdx > 0 ? phaseIdx - 1 : service.phases.length - 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
                  style={{ borderColor: "#E2E8F0" }}
                  aria-label="Previous phase"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 text-slate-400">
                    <path d="M10 3L5 8l5 5" />
                  </svg>
                </button>
                <button
                  onClick={() => goPhase((phaseIdx + 1) % service.phases.length)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
                  style={{ borderColor: "#E2E8F0" }}
                  aria-label="Next phase"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 text-slate-400">
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                </button>
              </div>

              {/* Auto-play indicator */}
              {!paused && (
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2">
                  <div
                    className="h-1 rounded-full overflow-hidden"
                    style={{ width: "60px", background: "#F1F5F9" }}
                  >
                    <motion.div
                      key={`progress-${activeIdx}-${phaseIdx}`}
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${service.accentFrom}, ${service.accentTo})` }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.8, ease: "linear" }}
                    />
                  </div>
                  <span className="font-sans text-[10px] text-slate-400">auto</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

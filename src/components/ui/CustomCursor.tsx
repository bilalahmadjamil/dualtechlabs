"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Current positions (lerped)
    let dotX  = -100, dotY  = -100;
    let ringX = -100, ringY = -100;
    // Target (raw mouse)
    let mx = -100, my = -100;
    let rafId: number;
    let isVisible = false;

    const show = () => {
      if (isVisible) return;
      isVisible = true;
      dot.style.opacity  = "1";
      ring.style.opacity = "1";
    };

    const hide = () => {
      isVisible = false;
      dot.style.opacity  = "0";
      ring.style.opacity = "0";
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      show();
    };

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as HTMLElement).closest(
        "a, button, [role='button'], input, textarea, select, label"
      );
      if (interactive) {
        ring.style.width       = "48px";
        ring.style.height      = "48px";
        ring.style.borderColor = "rgba(168,85,247,0.75)";
        ring.style.background  = "rgba(124,58,237,0.09)";
        ring.style.boxShadow   = "0 0 18px rgba(124,58,237,0.28)";
        dot.style.transform    = `translate(calc(${dotX}px - 50%), calc(${dotY}px - 50%)) scale(1.6)`;
      } else {
        ring.style.width       = "34px";
        ring.style.height      = "34px";
        ring.style.borderColor = "rgba(124,58,237,0.4)";
        ring.style.background  = "transparent";
        ring.style.boxShadow   = "none";
      }
    };

    // RAF loop — zero React involvement, direct DOM writes
    const tick = () => {
      // Dot: snappy, ~1 frame lag at 60fps
      dotX  += (mx - dotX)  * 0.88;
      dotY  += (my - dotY)  * 0.88;

      // Ring: slight trail — responsive but not sluggish
      ringX += (mx - ringX) * 0.28;
      ringY += (my - ringY) * 0.28;

      dot.style.transform  = `translate(calc(${dotX}px - 50%), calc(${dotY}px - 50%))`;
      ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;

      rafId = requestAnimationFrame(tick);
    };

    // Hide native cursor
    document.documentElement.style.cursor = "none";

    document.addEventListener("mousemove",  onMove,  { passive: true });
    document.addEventListener("mouseleave", hide,    { passive: true });
    document.addEventListener("mouseenter", show,    { passive: true });
    document.addEventListener("mouseover",  onOver,  { passive: true });

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseover",  onOver);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/* Ring — trails slightly behind */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] rounded-full"
        style={{
          width:  "34px",
          height: "34px",
          border: "1.5px solid rgba(124,58,237,0.4)",
          background: "transparent",
          opacity: 0,
          willChange: "transform",
          transition:
            "width 0.18s ease, height 0.18s ease, border-color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease, opacity 0.2s ease",
        }}
      />

      {/* Dot — near-instant, always on the cursor */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[1000] rounded-full"
        style={{
          width:  "5px",
          height: "5px",
          background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
          opacity: 0,
          willChange: "transform",
          transition: "opacity 0.2s ease, transform 0.15s ease",
        }}
      />
    </>
  );
}

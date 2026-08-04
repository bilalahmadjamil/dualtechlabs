"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // lerp: 0.1 = 10% progress toward target per frame — crisp, immediate feel
    // Duration/easing approach was too slow (0.9s to complete a scroll gesture)
    // lerp is frame-rate based: faster device = same feel
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false, // native touch scroll — no artificial lag on mobile
      overscroll: false,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Smooth hash navigation — let Lenis intercept anchor clicks
    const onHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80, duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    };
    document.addEventListener("click", onHashClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onHashClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

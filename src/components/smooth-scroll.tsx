"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      syncTouch: false,
      overscroll: false,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Smooth hash navigation
    const onHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();

      // Use getBoundingClientRect + scrollY to get the element's absolute page
      // position at the moment of click, then subtract nav height.
      // Passing a number to lenis.scrollTo gives exact, unambiguous positioning.
      const navHeight = document.getElementById("dtl-nav")?.offsetHeight ?? 88;
      const absoluteY = window.scrollY + el.getBoundingClientRect().top - navHeight;

      lenis.scrollTo(absoluteY, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
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

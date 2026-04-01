"use client";

import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  lcp: number;
  fid: number;
  cls: number;
  loadTime: number;
}

export const PerformanceMonitor = () => {
  const metricsRef = useRef<PerformanceMetrics>({
    lcp: 0,
    fid: 0,
    cls: 0,
    loadTime: 0,
  });

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'largest-contentful-paint':
            metricsRef.current.lcp = entry.startTime;
            console.log(`🎨 LCP: ${entry.startTime.toFixed(2)}ms`);
            break;
          case 'first-input':
            metricsRef.current.fid = (entry as any).processingStart - (entry as any).startTime;
            console.log(`⚡ FID: ${metricsRef.current.fid.toFixed(2)}ms`);
            break;
          case 'layout-shift':
            if (!(entry as any).hadRecentInput) {
              metricsRef.current.cls += (entry as any).value;
            }
            break;
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    } catch (e) {
      console.warn('Performance observer not supported');
    }

    // Measure page load time
    const navigation = performance.getEntriesByType('navigation')[0] as any;
    if (navigation) {
      metricsRef.current.loadTime = navigation.loadEventEnd - navigation.navigationStart;
      console.log(`🚀 Load Time: ${metricsRef.current.loadTime.toFixed(2)}ms`);
    }

    // Monitor CLS changes
    let clsValue = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      console.log(`📐 CLS: ${clsValue.toFixed(3)}`);
    }).observe({ entryTypes: ['layout-shift'] });

    return () => observer.disconnect();
  }, []);

  // Log final metrics when page is fully loaded
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        if (process.env.NODE_ENV === 'development') {
          console.log('📊 Performance Summary:', {
            lcp: `${metricsRef.current.lcp.toFixed(2)}ms`,
            fid: `${metricsRef.current.fid.toFixed(2)}ms`,
            cls: metricsRef.current.cls.toFixed(3),
            loadTime: `${metricsRef.current.loadTime.toFixed(2)}ms`,
          });

          // Performance scores
          const lcpScore = metricsRef.current.lcp < 2500 ? 'good' : metricsRef.current.lcp < 4000 ? 'needs-improvement' : 'poor';
          const fidScore = metricsRef.current.fid < 100 ? 'good' : metricsRef.current.fid < 300 ? 'needs-improvement' : 'poor';
          const clsScore = metricsRef.current.cls < 0.1 ? 'good' : metricsRef.current.cls < 0.25 ? 'needs-improvement' : 'poor';

          console.log('🎯 Performance Scores:', { lcp: lcpScore, fid: fidScore, cls: clsScore });
        }
      }, 1000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return null; // This component doesn't render anything
};

// Hook for measuring component render performance
export const useRenderPerformance = (componentName: string) => {
  const renderCountRef = useRef(0);
  const lastRenderRef = useRef(performance.now());

  useEffect(() => {
    renderCountRef.current++;
    const now = performance.now();
    const timeSinceLastRender = now - lastRenderRef.current;
    lastRenderRef.current = now;

    if (process.env.NODE_ENV === 'development') {
      console.log(`🔄 ${componentName} render #${renderCountRef.current} (${timeSinceLastRender.toFixed(2)}ms since last)`);
    }
  });
};

// Hook for measuring scroll performance
export const useScrollPerformance = () => {
  const scrollCountRef = useRef(0);
  const lastScrollTimeRef = useRef(performance.now());

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          scrollCountRef.current++;
          const now = performance.now();
          const timeSinceLastScroll = now - lastScrollTimeRef.current;
          lastScrollTimeRef.current = now;

          if (process.env.NODE_ENV === 'development' && scrollCountRef.current % 10 === 0) {
            console.log(`📜 Scroll events: ${scrollCountRef.current} (avg ${timeSinceLastScroll.toFixed(2)}ms)`);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

import { useEffect, useRef, useCallback } from 'react';

interface ScrollOptimizationOptions {
  onScrollStart?: () => void;
  onScrollEnd?: () => void;
  scrollEndDelay?: number;
  throttleMs?: number;
}

export const useScrollOptimization = ({
  onScrollStart,
  onScrollEnd,
  scrollEndDelay = 150,
  throttleMs = 16, // ~60fps
}: ScrollOptimizationOptions = {}) => {
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const isScrollingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const tickingRef = useRef(false);

  const handleScroll = useCallback(() => {
    const now = performance.now();
    
    // Throttle to target framerate
    if (now - lastScrollTimeRef.current < throttleMs) {
      return;
    }
    
    lastScrollTimeRef.current = now;

    if (!tickingRef.current) {
      requestAnimationFrame(() => {
        if (!isScrollingRef.current) {
          isScrollingRef.current = true;
          onScrollStart?.();
        }

        // Clear existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Set new timeout for scroll end
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
          onScrollEnd?.();
        }, scrollEndDelay);

        tickingRef.current = false;
      });
      
      tickingRef.current = true;
    }
  }, [onScrollStart, onScrollEnd, scrollEndDelay, throttleMs]);

  useEffect(() => {
    // Use passive listeners for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  return {
    isScrolling: isScrollingRef.current,
  };
};

// Enhanced hook for intersection-based optimization
export const useIntersectionOptimization = (
  options?: IntersectionObserverInit
) => {
  const elementRef = useRef<HTMLElement>(null);
  const isInViewRef = useRef(false);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    if (!elementRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observerRef.current.observe(elementRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [options]);

  return {
    elementRef,
    isInView: isInViewRef.current,
  };
};

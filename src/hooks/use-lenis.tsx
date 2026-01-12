/**
 * Lenis Smooth Scroll Hook
 * Provides silky-smooth scrolling with inertia effect.
 * Compatible with Framer Motion animations.
 */

import { useEffect } from 'react';
import { useMotionValue } from 'framer-motion';

// Global type declaration for Lenis
declare global {
  interface Window {
    Lenis: any;
    lenisInstance: any;
  }
}

// Easing function for smooth inertia effect
const easeOutExpo = (t: number): number => 
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

/**
 * Initialize Lenis smooth scroll globally.
 * Call this once in App.tsx.
 */
export const useLenis = () => {
  useEffect(() => {
    let lenis: any = null;
    let rafId: number | null = null;

    const initLenis = () => {
      // Wait for Lenis CDN to load
      if (typeof window.Lenis === 'undefined') {
        setTimeout(initLenis, 100);
        return;
      }

      // Create Lenis instance
      lenis = new window.Lenis({
        duration: 1.2,
        easing: easeOutExpo,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      // Store globally for other components
      window.lenisInstance = lenis;

      // Animation loop
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    };

    initLenis();

    // Cleanup
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      if (lenis) {
        lenis.destroy();
        window.lenisInstance = null;
      }
    };
  }, []);
};

/**
 * Hook to get scroll values compatible with Lenis.
 * Returns motion values that update on scroll events.
 */
export const useLenisScroll = () => {
  const scrollY = useMotionValue(0);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const currentScroll = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        
        scrollY.set(currentScroll);
        scrollProgress.set(maxScroll > 0 ? currentScroll / maxScroll : 0);
      });
    };

    // Listen to native scroll events (Lenis triggers these)
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial value

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY, scrollProgress]);

  return { scrollY, scrollProgress };
};

/**
 * Utility to scroll to an element smoothly via Lenis.
 */
export const scrollToElement = (selector: string, offset = 0) => {
  const element = document.querySelector(selector);
  if (element && window.lenisInstance) {
    window.lenisInstance.scrollTo(element, { offset });
  } else if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

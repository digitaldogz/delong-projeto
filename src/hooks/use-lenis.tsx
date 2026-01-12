import { useEffect, useRef } from 'react';
import { useMotionValue } from 'framer-motion';

declare global {
  interface Window {
    Lenis: any;
    lenisInstance: any;
  }
}

export const useLenis = () => {
  useEffect(() => {
    // Wait for Lenis to be available
    const initLenis = () => {
      if (typeof window.Lenis === 'undefined') {
        setTimeout(initLenis, 100);
        return;
      }

      const lenis = new window.Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      // Store globally for other components to access
      window.lenisInstance = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Cleanup
      return () => {
        lenis.destroy();
        window.lenisInstance = null;
      };
    };

    const cleanup = initLenis();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);
};

// Hook to get scroll progress for a specific element
export const useLenisScroll = () => {
  const scrollY = useMotionValue(0);
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      scrollY.set(currentScroll);
      scrollProgress.set(maxScroll > 0 ? currentScroll / maxScroll : 0);
    };

    // Listen to native scroll events (Lenis triggers these)
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial value

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY, scrollProgress]);

  return { scrollY, scrollProgress };
};

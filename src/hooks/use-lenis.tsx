import { useEffect } from 'react';

declare global {
  interface Window {
    Lenis: any;
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

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Cleanup
      return () => {
        lenis.destroy();
      };
    };

    const cleanup = initLenis();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);
};

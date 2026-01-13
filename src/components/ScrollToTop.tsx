/**
 * ScrollToTop Component
 * Scrolls to top on route change, compatible with Lenis smooth scroll.
 * Also refreshes GSAP ScrollTrigger after navigation (prevents layout/trigger glitches).
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    lenisInstance: any;
  }
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (window.lenisInstance) {
        window.lenisInstance.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }

      // Recalcula triggers depois que a rota muda e o layout assenta
      try {
        ScrollTrigger.refresh();
      } catch {
        // no-op
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

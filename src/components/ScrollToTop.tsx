/**
 * ScrollToTop Component
 * Scrolls to top on route change, compatible with Lenis smooth scroll.
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    lenisInstance: any;
  }
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Small delay to ensure Lenis is ready after route change
    const timer = setTimeout(() => {
      if (window.lenisInstance) {
        // Use Lenis scrollTo for smooth scroll to top
        window.lenisInstance.scrollTo(0, { immediate: true });
      } else {
        // Fallback for when Lenis isn't available
        window.scrollTo(0, 0);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;

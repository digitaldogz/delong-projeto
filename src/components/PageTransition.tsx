/**
 * PageTransition Component
 * Sophisticated curtain reveal transition between pages.
 * Inspired by premium agency websites.
 */

import { createContext, useContext, useRef, useCallback, useState, useEffect, ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import logoDelong from "@/assets/logo-delong-white.png";

// ============================================
// TRANSITION CONTEXT
// ============================================

interface TransitionContextType {
  navigateWithTransition: (path: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransitionNavigate = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransitionNavigate must be used within TransitionProvider");
  }
  return context.navigateWithTransition;
};

export const useIsTransitioning = () => {
  const context = useContext(TransitionContext);
  return context?.isTransitioning ?? false;
};

// ============================================
// TRANSITION PROVIDER
// ============================================

interface TransitionProviderProps {
  children: ReactNode;
}

export const TransitionProvider = ({ children }: TransitionProviderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  // Handle page reveal on route change (exit animation)
  useEffect(() => {
    if (showOverlay && overlayRef.current) {
      // Small delay to let the new page mount
      const revealTimer = setTimeout(() => {
        // Scroll to top instantly
        if (window.lenisInstance) {
          window.lenisInstance.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }

        const tl = gsap.timeline({
          onComplete: () => {
            setShowOverlay(false);
            setIsTransitioning(false);
          },
        });

        // Fade out logo
        tl.to(logoRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 0.2,
          ease: "power2.in",
        });

        // Reveal page (curtain slides up)
        tl.to(
          overlayRef.current,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.5,
            ease: "power4.out",
          },
          "-=0.1"
        );
      }, 150);

      return () => clearTimeout(revealTimer);
    }
  }, [location.pathname, showOverlay]);

  const navigateWithTransition = useCallback(
    (path: string) => {
      // Don't transition to the same page
      if (path === location.pathname || isTransitioning) return;

      setIsTransitioning(true);
      setShowOverlay(true);

      // Reset overlay state
      gsap.set(overlayRef.current, {
        clipPath: "inset(100% 0 0 0)",
      });
      gsap.set(logoRef.current, {
        opacity: 0,
        scale: 1.1,
      });

      // Entry animation (curtain slides up from bottom)
      const tl = gsap.timeline();

      tl.to(overlayRef.current, {
        clipPath: "inset(0% 0 0 0)",
        duration: 0.4,
        ease: "power4.inOut",
      });

      // Fade in logo
      tl.to(
        logoRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2"
      );

      // Navigate after curtain covers screen
      tl.call(() => {
        navigate(path);
      }, [], "+=0.1");
    },
    [navigate, location.pathname, isTransitioning]
  );

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}

      {/* Transition Overlay */}
      {showOverlay && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center pointer-events-none"
          style={{ clipPath: "inset(100% 0 0 0)" }}
        >
          <img
            ref={logoRef}
            src={logoDelong}
            alt="Delong"
            className="w-24 h-auto opacity-0"
          />
        </div>
      )}
    </TransitionContext.Provider>
  );
};

// ============================================
// CASE LINK COMPONENT
// ============================================

interface CaseLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export const CaseLink = ({ to, children, className = "" }: CaseLinkProps) => {
  const navigateWithTransition = useTransitionNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateWithTransition(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default TransitionProvider;

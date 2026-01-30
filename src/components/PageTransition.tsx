/**
 * PageTransition Component
 * Sophisticated curtain reveal transition between pages.
 * Overlay is always mounted to ensure refs are available for GSAP.
 */

import { createContext, useContext, useRef, useCallback, useState, ReactNode } from "react";
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

  const navigateWithTransition = useCallback(
    (path: string) => {
      // Don't transition to the same page or if already transitioning
      if (path === location.pathname || isTransitioning) return;
      if (!overlayRef.current || !logoRef.current) return;

      setIsTransitioning(true);

      const overlay = overlayRef.current;
      const logo = logoRef.current;

      // Kill any existing animations
      gsap.killTweensOf([overlay, logo]);

      // Reset initial state
      gsap.set(overlay, {
        visibility: "visible",
        clipPath: "inset(100% 0 0 0)",
      });
      gsap.set(logo, {
        opacity: 0,
        scale: 1.1,
      });

      // Create timeline
      const tl = gsap.timeline();

      // Entry animation: curtain slides up from bottom
      tl.to(overlay, {
        clipPath: "inset(0% 0 0 0)",
        duration: 0.4,
        ease: "power4.inOut",
      });

      // Fade in logo
      tl.to(logo, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      }, "-=0.15");

      // Navigate after curtain covers screen
      tl.call(() => {
        // Scroll to top
        if (window.lenisInstance) {
          window.lenisInstance.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }
        navigate(path);
      });

      // Small hold
      tl.to({}, { duration: 0.15 });

      // Fade out logo
      tl.to(logo, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: "power2.in",
      });

      // Exit animation: curtain slides up to reveal page
      tl.to(overlay, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.5,
        ease: "power4.out",
        onComplete: () => {
          gsap.set(overlay, { visibility: "hidden" });
          setIsTransitioning(false);
        },
      }, "-=0.1");
    },
    [navigate, location.pathname, isTransitioning]
  );

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}

      {/* Transition Overlay - Always mounted, visibility controlled via GSAP */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] bg-background flex items-center justify-center pointer-events-none"
        style={{ visibility: "hidden", clipPath: "inset(100% 0 0 0)" }}
      >
        <img
          ref={logoRef}
          src={logoDelong}
          alt="Delong"
          className="w-24 h-auto"
          style={{ opacity: 0 }}
        />
      </div>
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

/**
 * Page Transition Component
 * Professional curtain transition effect inspired by zeitmedia.vn
 * Uses GSAP for smooth animations and works with React Router.
 */

import { createContext, useContext, useState, useCallback, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";

// ─────────────────────────────────────────────────────────────
// Context for managing transitions globally
// ─────────────────────────────────────────────────────────────
interface TransitionContextType {
  navigateWithTransition: (to: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  // Return fallback if not within provider (during initial render)
  if (!context) {
    return {
      navigateWithTransition: () => {},
      isTransitioning: false,
    };
  }
  return context;
};

// ─────────────────────────────────────────────────────────────
// Transition Provider Component
// ─────────────────────────────────────────────────────────────
interface PageTransitionProviderProps {
  children: React.ReactNode;
}

export const PageTransitionProvider = ({ children }: PageTransitionProviderProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Reset Lenis after navigation
  const resetLenis = useCallback(() => {
    if (window.lenisInstance) {
      window.lenisInstance.scrollTo(0, { immediate: true });
      window.lenisInstance.start();
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // Main transition function
  const navigateWithTransition = useCallback((to: string) => {
    // Don't transition to same page
    if (to === location.pathname) {
      resetLenis();
      return;
    }

    if (isTransitioning) return;

    const overlay = overlayRef.current;
    if (!overlay) {
      navigate(to);
      return;
    }

    setIsTransitioning(true);

    // Stop Lenis during transition
    if (window.lenisInstance) {
      window.lenisInstance.stop();
    }

    // Timeline for enter transition (curtain slides up)
    const tl = gsap.timeline({
      onComplete: () => {
        // Navigate to new page
        navigate(to);
        
        // Small delay to ensure new page renders
        requestAnimationFrame(() => {
          resetLenis();
          
          // Exit transition (curtain slides out)
          gsap.to(overlay, {
            yPercent: -100,
            duration: 0.6,
            ease: "power3.inOut",
            onComplete: () => {
              setIsTransitioning(false);
              gsap.set(overlay, { yPercent: 100 });
            },
          });
        });
      },
    });

    // Enter animation - curtain slides up from bottom
    gsap.set(overlay, { yPercent: 100 });
    tl.to(overlay, {
      yPercent: 0,
      duration: 0.5,
      ease: "power3.inOut",
    });
  }, [navigate, location.pathname, isTransitioning, resetLenis]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}
      
      {/* Transition Overlay - Black Curtain */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] bg-background pointer-events-none"
        style={{ transform: "translateY(100%)" }}
      >
        {/* Optional: Add logo or loading indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
        </div>
      </div>
    </TransitionContext.Provider>
  );
};

// ─────────────────────────────────────────────────────────────
// Transition Link Component
// ─────────────────────────────────────────────────────────────
interface TransitionLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TransitionLink = ({ to, children, className, onClick }: TransitionLinkProps) => {
  const { navigateWithTransition } = usePageTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
    navigateWithTransition(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

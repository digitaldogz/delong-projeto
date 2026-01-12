/**
 * Page Transition Component
 * Professional curtain transition effect for page navigation.
 */

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

interface TransitionContextType {
  navigateWithTransition: (to: string) => void;
  isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const usePageTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return context;
};

interface PageTransitionProviderProps {
  children: ReactNode;
}

export const PageTransitionProvider = ({ children }: PageTransitionProviderProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const curtainRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const navigateWithTransition = useCallback((to: string) => {
    if (isTransitioning) return;

    const curtain = curtainRef.current;
    if (!curtain) {
      navigate(to);
      return;
    }

    setIsTransitioning(true);

    // Reset curtain position
    gsap.set(curtain, { 
      yPercent: 100,
      display: "flex"
    });

    // Curtain slides up to cover screen
    gsap.to(curtain, {
      yPercent: 0,
      duration: 0.6,
      ease: "power4.inOut",
      onComplete: () => {
        // Scroll to top
        if (window.lenisInstance) {
          window.lenisInstance.scrollTo(0, { immediate: true });
        } else {
          window.scrollTo(0, 0);
        }

        // Navigate to new page
        navigate(to);

        // Small delay for page to mount
        setTimeout(() => {
          // Curtain slides up and exits
          gsap.to(curtain, {
            yPercent: -100,
            duration: 0.6,
            ease: "power4.inOut",
            onComplete: () => {
              gsap.set(curtain, { display: "none" });
              setIsTransitioning(false);
            }
          });
        }, 100);
      }
    });
  }, [isTransitioning, navigate]);

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}
      
      {/* Transition Curtain */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[9999] bg-background hidden items-center justify-center pointer-events-none"
        style={{ transform: "translateY(100%)" }}
      >
        {/* Optional loading indicator */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-foreground animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-foreground animate-pulse delay-75" />
          <div className="w-2 h-2 rounded-full bg-foreground animate-pulse delay-150" />
        </div>
      </div>
    </TransitionContext.Provider>
  );
};

/**
 * TransitionLink Component
 * A link that triggers the page transition animation.
 */
interface TransitionLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TransitionLink = ({ to, children, className, onClick }: TransitionLinkProps) => {
  const { navigateWithTransition, isTransitioning } = usePageTransition();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isTransitioning) return;
    onClick?.();
    navigateWithTransition(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default PageTransitionProvider;

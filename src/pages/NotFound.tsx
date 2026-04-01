/**
 * NotFound Page
 * 404 error page with GSAP animations.
 */

import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { useTransitionNavigate } from "@/components/PageTransition";

const NotFound = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const navigateWithTransition = useTransitionNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        ".error-code",
        { opacity: 0, scale: 0.8, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1 },
        0
      );

      tl.fromTo(
        ".error-text",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.3
      );

      tl.fromTo(
        ".error-link",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.5
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="error-code mb-4 text-8xl md:text-[12rem] font-bold text-foreground tracking-tighter opacity-0">
          404
        </h1>
        <p className="error-text mb-8 text-xl text-muted-foreground opacity-0">
          Oops! Página não encontrada
        </p>
        <button 
          onClick={() => navigateWithTransition('/')}
          className="error-link inline-flex items-center justify-center px-8 py-4 bg-foreground text-background text-xs font-bold uppercase tracking-widest hover:bg-foreground/90 transition-colors opacity-0 cursor-pointer"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
};

export default NotFound;
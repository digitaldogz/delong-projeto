/**
 * BigCTA Component
 * Large call-to-action section with GSAP animated text.
 */

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DottedSurface } from "./ui/dotted-surface";

gsap.registerPlugin(ScrollTrigger);

const BigCTA = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray(".cta-line");
      
      lines.forEach((line: any, index) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 60, skewY: 3 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 1,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      });

      // Glow effect
      gsap.fromTo(
        ".cta-glow",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-background">
      {/* Background animado de pontos */}
      <DottedSurface className="opacity-30" />

      {/* Glow vermelho sutil */}
      <div className="cta-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-destructive/15 rounded-full blur-[180px] pointer-events-none z-[1] opacity-0" />

      {/* Texto principal */}
      <div className="relative z-10 container-premium text-center w-full">
        <h2 className="font-black leading-[0.9] tracking-tighter uppercase">
          <span className="cta-line block text-5xl md:text-[7rem] lg:text-[9rem] text-foreground opacity-0">
            VAMOS TORNAR
          </span>
          <span className="cta-line block text-5xl md:text-[7rem] lg:text-[9rem] text-muted-foreground/30 italic opacity-0">
            SUA MARCA
          </span>
          <span className="cta-line block text-5xl md:text-[7rem] lg:text-[9rem] text-destructive opacity-0">
            INESQUECÍVEL
          </span>
        </h2>
      </div>
    </section>
  );
};

export default BigCTA;
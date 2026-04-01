/**
 * ServicesStatement Component
 * Brief services intro with CTA and GSAP animations.
 */

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTransitionNavigate } from "@/components/PageTransition";

gsap.registerPlugin(ScrollTrigger);

const ServicesStatement = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const navigateWithTransition = useTransitionNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // Label
      tl.fromTo(
        ".statement-label",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" },
        0
      );

      // Title - word by word or line reveal
      tl.fromTo(
        ".statement-title",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        0.1
      );

      // Button
      tl.fromTo(
        ".statement-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        0.4
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-background py-32 md:py-48 border-t border-border">
      <div className="container-premium grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Label - Esquerda */}
        <div className="lg:col-span-3">
          <span className="statement-label text-xs md:text-sm text-muted-foreground font-medium tracking-widest uppercase flex items-center gap-2 opacity-0">
            <span className="w-1 h-1 bg-foreground rounded-full"></span>
            What we do
          </span>
        </div>

        {/* Conteúdo - Direita */}
        <div className="lg:col-span-9 flex flex-col items-start">
          {/* Texto Principal */}
          <h2 className="statement-title max-w-4xl text-4xl md:text-5xl lg:text-6xl font-medium text-foreground leading-[1.1] tracking-tight mb-12 opacity-0">
            Nós criamos, produzimos e projetamos experiências que tornam as marcas diferentes.
          </h2>

          {/* Botão Estilo "Outline" */}
          <button 
            onClick={() => navigateWithTransition('/servicos')} 
            className="statement-cta inline-flex items-center justify-center px-8 py-4 font-mono text-xs font-bold text-foreground tracking-[0.2em] uppercase border border-border hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 opacity-0 cursor-pointer"
          >
            [ Todos os Serviços ]
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServicesStatement;
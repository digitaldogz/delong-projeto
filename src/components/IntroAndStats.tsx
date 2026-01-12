/**
 * IntroAndStats Component
 * About section intro with animated statistics using GSAP.
 */

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Componente de contador animado
const AnimatedCounter = ({
  target,
  suffix = ""
}: {
  target: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
      },
    });

    return () => trigger.kill();
  }, [target]);

  return (
    <span
      ref={ref}
      className="text-7xl md:text-8xl font-bold tracking-tighter text-foreground"
    >
      {count}{suffix}
    </span>
  );
};

const IntroAndStats = () => {
  const introRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);

  // Intro section animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label
      gsap.fromTo(
        ".intro-label",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".intro-label",
            start: "top 85%",
          },
        }
      );

      // Title
      gsap.fromTo(
        ".intro-title",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".intro-title",
            start: "top 85%",
          },
        }
      );

      // Description
      gsap.fromTo(
        ".intro-description",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".intro-description",
            start: "top 85%",
          },
        }
      );

      // CTA
      gsap.fromTo(
        ".intro-cta",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".intro-cta",
            start: "top 90%",
          },
        }
      );
    }, introRef);

    return () => ctx.revert();
  }, []);

  // Stats section animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
        }
      );
    }, statsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full bg-background text-foreground selection:bg-destructive selection:text-destructive-foreground">
      
      {/* --- SEÇÃO 1: INTRO (ABOUT) --- */}
      <section ref={introRef} className="relative w-full py-32 border-t border-border">
        <div className="container-premium grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Coluna Esquerda: Label "About Us" */}
          <div className="md:col-span-3 flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-foreground mt-2 flex-shrink-0"></div>
            <span className="intro-label text-sm text-muted-foreground font-medium tracking-wide uppercase opacity-0">
              Sobre Nós
            </span>
          </div>

          {/* Coluna Direita: Conteúdo Principal */}
          <div className="md:col-span-9 flex flex-col gap-10">
            <h2 className="intro-title text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight opacity-0">
              A referência em produção audiovisual de alto impacto.
            </h2>
            
            <div className="max-w-2xl">
              <p className="intro-description text-muted-foreground text-lg md:text-xl leading-relaxed mb-8 opacity-0">
                Fundada para inovar, a Delong Media House é uma produtora audiovisual full-service. Criamos vídeos que conectam e convertem, atuando como braço direito da sua comunicação visual.
              </p>
              
              <Link to="/sobre" className="intro-cta inline-flex items-center gap-2 text-foreground font-bold text-sm tracking-widest uppercase group hover:text-primary transition-colors opacity-0">
                Saiba Mais
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO 2: ESTATÍSTICAS (STATS) --- */}
      <section ref={statsRef} className="relative w-full py-40 flex items-center bg-background overflow-hidden">
        
        {/* Fundo com gradiente sutil */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-900/50 to-background"></div>

        {/* Conteúdo dos Números */}
        <div className="relative z-10 w-full container-premium">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center justify-items-center">
            
            <div className="stat-item flex flex-col gap-2 items-center opacity-0">
              <AnimatedCounter target={200} suffix="+" />
              <p className="text-muted-foreground text-sm md:text-base max-w-[200px] leading-relaxed text-center">
                Eventos organizados para grandes marcas
              </p>
            </div>

            <div className="stat-item flex flex-col gap-2 items-center opacity-0">
              <AnimatedCounter target={1000} suffix="+" />
              <p className="text-muted-foreground text-sm md:text-base max-w-[200px] leading-relaxed text-center">
                Publicações de comunicação desenhadas
              </p>
            </div>

            <div className="stat-item flex flex-col gap-2 items-center opacity-0">
              <AnimatedCounter target={50} suffix="+" />
              <p className="text-muted-foreground text-sm md:text-base max-w-[200px] leading-relaxed text-center">
                Equipe experiente e apaixonada
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default IntroAndStats;
/**
 * About Page
 * Company history, vision, and mission with GSAP animations.
 */

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const heroRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLElement>(null);
  const visionRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLElement>(null);

  // Hero entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Label fade in
      tl.fromTo(
        ".hero-label",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0
      );

      // Description slide up
      tl.fromTo(
        ".hero-description",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        0.2
      );

      // Subtitle fade in
      tl.fromTo(
        ".hero-subtitle",
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8 },
        0.4
      );

      // Marquee reveal
      tl.fromTo(
        ".hero-marquee",
        { opacity: 0, yPercent: 50 },
        { opacity: 1, yPercent: 0, duration: 1.2 },
        0.3
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Manifesto section animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      gsap.fromTo(
        ".manifesto-text",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".manifesto-text",
            start: "top 80%",
          },
        }
      );

      // Image reveal with scale
      gsap.fromTo(
        ".manifesto-image",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".manifesto-image",
            start: "top 80%",
          },
        }
      );
    }, manifestoRef);

    return () => ctx.revert();
  }, []);

  // Vision section animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".vision-title",
        { opacity: 0, xPercent: -30 },
        {
          opacity: 1,
          xPercent: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".vision-title",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".vision-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".vision-text",
            start: "top 80%",
          },
        }
      );
    }, visionRef);

    return () => ctx.revert();
  }, []);

  // Mission section animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mission-title",
        { opacity: 0, xPercent: 30 },
        {
          opacity: 1,
          xPercent: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mission-title",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".mission-text",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mission-text",
            start: "top 80%",
          },
        }
      );
    }, missionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* --- 1. HERO SECTION --- */}
      <section ref={heroRef} className="relative w-full h-screen flex flex-col overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" 
            alt="Delong Crew" 
            className="w-full h-full object-cover opacity-60 grayscale"
          />
          <div className="absolute inset-0 bg-background/40" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col pt-32 pb-0">
          {/* Top - Only Label */}
          <div className="container-premium w-full">
            <span className="hero-label text-xs text-muted-foreground tracking-wider block opacity-0">
              (Sobre Nós)
            </span>
          </div>

          {/* Middle Content - Description and Subtitle */}
          <div className="flex-1 flex items-center">
            <div className="container-premium w-full flex flex-col md:flex-row justify-between gap-8">
              {/* Left - Description */}
              <p className="hero-description text-sm text-foreground/80 leading-relaxed max-w-md opacity-0">
                Fundada pelo fotógrafo Cesar Delong, a Delong Media House é uma produtora audiovisual de atuação nacional, dedicada a registrar e contar histórias por meio de imagens marcantes.
              </p>

              {/* Right - Subtitle */}
              <div className="hero-subtitle flex items-start gap-2 opacity-0">
                <div className="w-1.5 h-1.5 bg-foreground mt-1.5 shrink-0" />
                <span className="text-sm text-foreground/70">Uma Jornada de Criatividade</span>
              </div>
            </div>
          </div>

          {/* Bottom Marquee */}
          <div className="hero-marquee w-full overflow-hidden opacity-0">
            <div className="flex animate-marquee-left py-8" style={{ animationDuration: '20s', width: 'max-content' }}>
              {[...Array(6)].map((_, i) => (
                <span key={i} className="text-6xl md:text-8xl lg:text-[10rem] font-light italic text-foreground whitespace-nowrap mx-8">
                  Nossa História /
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 2. MANIFESTO --- */}
      <section ref={manifestoRef} className="py-24 md:py-32">
        <div className="container-premium">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="manifesto-text opacity-0">
              <h2 className="text-4xl md:text-6xl font-medium uppercase tracking-tight leading-[1.1] mb-8">
                Uma jornada <br/>
                <span className="text-muted-foreground">de criatividade</span> <br/>
                e identidade visual
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                Cesar Delong atua desde 2014 com ampla trajetória na cobertura dos principais eventos esportivos no Brasil e exterior, hoje liderando equipes de produção audiovisual na captação de filmes institucionais e publicitários.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md mt-6">
                Reconhecido em concursos fotográficos nacionais e internacionais, destaca-se pelo talento e contribuição ao desenvolvimento de produções de grande impacto.
              </p>
            </div>

            <div className="manifesto-image w-full aspect-square bg-secondary overflow-hidden opacity-0">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="Team working" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. VISION --- */}
      <section ref={visionRef} className="border-t border-border/30">
        <div className="container-premium !px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
            
            <div className="px-8 md:px-12 py-16 lg:py-24 flex items-center justify-center lg:justify-start border-b lg:border-b-0 lg:border-r border-border/30">
              <h2 className="vision-title text-6xl md:text-8xl font-bold uppercase tracking-tighter opacity-0">
                Visão
              </h2>
            </div>

            <div className="px-8 md:px-12 py-16 lg:py-24 flex flex-col justify-center bg-secondary/20">
              <span className="text-xs font-mono text-muted-foreground mb-6">(01)</span>
              <p className="vision-text text-xl md:text-2xl font-light leading-snug text-muted-foreground max-w-xl opacity-0">
                "Consolidar a atuação da produtora em filmes institucionais, vídeos publicitários e eventos, elevando o padrão audiovisual, sempre com foco em qualidade, criatividade e forte identidade visual."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. MISSION --- */}
      <section ref={missionRef} className="border-t border-border/30">
        <div className="container-premium !px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh]">
            
            <div className="px-8 md:px-12 py-16 lg:py-24 flex flex-col justify-center order-2 lg:order-1 bg-secondary/20 border-b lg:border-b-0 lg:border-r border-border/30">
              <span className="text-xs font-mono text-muted-foreground mb-6">(02)</span>
              <p className="mission-text text-xl md:text-2xl font-light leading-snug text-muted-foreground max-w-xl opacity-0">
                "Atuar nos principais eventos da região e mercado nacional liderando equipes técnicas dedicadas a registrar e contar as mais diversas histórias por meio de imagens marcantes."
              </p>
            </div>

            <div className="px-8 md:px-12 py-16 lg:py-24 flex items-center justify-center lg:justify-start order-1 lg:order-2">
              <h2 className="mission-title text-6xl md:text-8xl font-bold uppercase tracking-tighter opacity-0">
                Missão
              </h2>
            </div>

          </div>
        </div>
      </section>

      {/* --- 5. GALERIA EM X --- */}
      <section className="w-full py-16 overflow-hidden relative bg-background">
        {/* Primeira fileira - move para a esquerda */}
        <div className="mb-4 overflow-hidden">
          <div className="flex gap-4 animate-marquee-left" style={{ animationDuration: '40s', width: 'max-content' }}>
            {[
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=600&auto=format&fit=crop",
            ].map((src, i) => (
              <div key={i} className="shrink-0 w-[300px] md:w-[400px] h-[200px] md:h-[280px] overflow-hidden">
                <img 
                  src={src} 
                  alt={`Crew ${i + 1}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Segunda fileira - move para a direita */}
        <div className="overflow-hidden">
          <div className="flex gap-4 animate-marquee-right" style={{ animationDuration: '40s', width: 'max-content' }}>
            {[
              "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=600&auto=format&fit=crop",
            ].map((src, i) => (
              <div key={i} className="shrink-0 w-[300px] md:w-[400px] h-[200px] md:h-[280px] overflow-hidden">
                <img 
                  src={src} 
                  alt={`Event ${i + 1}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
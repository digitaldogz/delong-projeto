/**
 * About Page
 * Company history, vision, and mission with GSAP animations.
 */

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import { useSiteConfig } from "@/hooks/useSiteConfig";

gsap.registerPlugin(ScrollTrigger);

const AboutPage = () => {
  const { config } = useSiteConfig();
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
            src="/projects/galleries/cesar/502451891.jpg" 
            alt="Cesar Delong" 
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
                {config.about_text_1}
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
                {config.about_text_2}
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md mt-6">
                Reconhecido em concursos fotográficos nacionais e internacionais, destaca-se pelo talento e contribuição ao desenvolvimento de produções de grande impacto.
              </p>
            </div>

            <div className="manifesto-image w-full aspect-square bg-secondary overflow-hidden opacity-0">
              <img 
                src="/projects/galleries/cesar/305A4844.jpg" 
                alt="Cesar Delong em ação" 
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
              "/projects/galleries/expo 24/24EXPO00455.jpg",
              "{config.about_image_1}",
              "/projects/galleries/BRUNO E MARRONE/153imb00171.jpg",
              "/projects/galleries/franco run/MIR_3286.jpg",
              "/projects/galleries/JOAO_NETO_E_FREDERICO/6AGRIFRUT00476.jpg",
              "/projects/galleries/expo 24/DJI_20240825170948_0471_D.jpg",
              "{config.about_image_2}",
              "/projects/galleries/BRUNO E MARRONE/153imb00224.jpg",
              "/projects/galleries/franco run/RBK_6854.jpg",
              "/projects/galleries/JOAO_NETO_E_FREDERICO/6AGRIFRUT00723.jpg",
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
              "/projects/galleries/iratrail/DJI_0608.jpg",
              "/projects/galleries/BRUNO E MARRONE/153imb00283.jpg",
              "/projects/galleries/expo 24/24EXPO00728.jpg",
              "/projects/galleries/JOAO_NETO_E_FREDERICO/6AGRIFRUT00685.jpg",
              "/projects/galleries/franco run/RBK_8068.jpg",
              "/projects/galleries/iratrail/DJI_0889.jpg",
              "/projects/galleries/BRUNO E MARRONE/153imb00564.jpg",
              "/projects/galleries/expo 24/24EXPO01061.jpg",
              "/projects/galleries/JOAO_NETO_E_FREDERICO/6AGRIFRUT00915.jpg",
              "/projects/galleries/franco run/DJI_20250323080544_0348_D.jpg",
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
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { BGPattern } from "./ui/bg-pattern";

// Configuração da animação (Suave e Premium)
const EA_ZEIT: [number, number, number, number] = [0.33, 1, 0.68, 1];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform values based on scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden font-sans text-foreground bg-background">
      
      {/* 1. VÍDEO DE FUNDO (Background Loop) */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Filtro escuro para o texto branco aparecer bem sobre o vídeo */}
        <div className="absolute inset-0 bg-background/40 z-10" />
        
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-heads-like-statues-33516-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Pattern de fundo */}
      <BGPattern variant="dots" mask="fade-edges" size={32} fill="rgba(255,255,255,0.15)" className="z-[5]" />

      {/* 2. CONTEÚDO (Fica por cima do vídeo - z-20) */}
      <motion.div 
        style={{ opacity, y, scale }}
        className="relative z-20 w-full h-screen flex flex-col justify-end pb-24 md:pb-28"
      >
        <div className="container-premium w-full">
          {/* TÍTULO PRINCIPAL - Alinhado à esquerda */}
          <div className="flex flex-col gap-0 relative text-left">
            
            {/* Texto Gigante Animado */}
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }} 
                animate={{ y: "0%" }} 
                transition={{ duration: 1, ease: EA_ZEIT, delay: 0.2 }} 
                className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]"
              >
                A Arte é o Princípio —
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%" }} 
                animate={{ y: "0%" }} 
                transition={{ duration: 1, ease: EA_ZEIT, delay: 0.3 }} 
                className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-muted-foreground"
              >
                Criatividade no Comando
              </motion.h2>
            </div>

            {/* WIDGET FLUTUANTE (Alinhado pela base com o texto) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.8 }} 
              className="absolute right-0 bottom-0 hidden md:flex items-center gap-3 bg-background/80 backdrop-blur-md p-3 border border-border/20 max-w-xs"
            >
              <div className="w-14 h-14 bg-primary flex items-center justify-center shrink-0">
                <span className="text-[9px] text-center leading-tight font-bold text-primary-foreground">NOVO<br />CASE</span>
              </div>
              <div className="flex flex-col pr-3">
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Destaque Recente</span>
                <span className="text-xs font-bold uppercase leading-tight">Campanha "Futuro Visível"</span>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* --- RODAPÉ DA HERO (Minimalista: Apenas Instagram e All Works) --- */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-6 left-0 w-full z-30 text-foreground mix-blend-difference pointer-events-none"
      >
        <div className="container-premium w-full flex justify-between items-end">
          {/* ESQUERDA: APENAS INSTAGRAM */}
          <div className="pointer-events-auto">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[10px] font-bold tracking-widest uppercase opacity-80 hover:opacity-100 hover:text-muted-foreground transition-all"
            >
              INSTAGRAM
            </a>
          </div>

          {/* DIREITA: ALL WORKS */}
          <div className="pointer-events-auto">
            <a 
              href="/projetos" 
              className="text-[10px] font-bold tracking-widest uppercase opacity-80 hover:opacity-100 hover:text-muted-foreground transition-all border border-foreground/30 px-4 py-2"
            >
              ALL WORKS
            </a>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default HeroSection;

import React from "react";
import { motion } from "framer-motion";

// Configuração da animação (Suave e Premium)
const EA_ZEIT: [number, number, number, number] = [0.33, 1, 0.68, 1];

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden font-sans text-foreground bg-background">
      
      {/* 1. VÍDEO DE FUNDO (Background Loop) */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Filtro escuro para o texto branco aparecer bem sobre o vídeo */}
        <div className="absolute inset-0 bg-background/40 z-10" />
        
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-heads-like-statues-33516-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. CONTEÚDO (Fica por cima do vídeo - z-20) */}
      <div className="relative z-20 w-full h-screen flex flex-col justify-end px-6 md:px-12 pb-32">

        {/* TÍTULO PRINCIPAL - Alinhado à esquerda */}
        <div className="flex flex-col gap-0 relative text-left">
          
          {/* Texto Gigante Animado */}
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }} 
              animate={{ y: "0%" }} 
              transition={{ duration: 1, ease: EA_ZEIT, delay: 0.2 }} 
              className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-none"
            >
              A Arte é o Princípio —
            </motion.h1>
          </div>
          <div className="overflow-hidden">
            <motion.h2 
              initial={{ y: "100%" }} 
              animate={{ y: "0%" }} 
              transition={{ duration: 1, ease: EA_ZEIT, delay: 0.3 }} 
              className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-none text-muted-foreground"
            >
              Criatividade no Comando
            </motion.h2>
          </div>

          {/* WIDGET FLUTUANTE (Canto Inferior Direito) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, delay: 0.8 }} 
            className="absolute right-0 -bottom-20 hidden md:flex items-center gap-4 bg-background/60 backdrop-blur-md p-4 border border-border/20 max-w-sm"
          >
            <div className="w-16 h-16 bg-primary flex items-center justify-center shrink-0">
              <span className="text-[10px] text-center leading-tight font-bold text-primary-foreground">NOVO<br />CASE</span>
            </div>
            <div className="flex flex-col pr-4">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Destaque Recente</span>
              <span className="text-sm font-bold uppercase leading-tight">Campanha "Futuro Visível"</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* --- RODAPÉ DA HERO (Minimalista: Apenas Instagram e All Works) --- */}
      <div className="absolute bottom-8 left-0 w-full px-6 md:px-12 flex justify-between items-end z-30 text-foreground mix-blend-difference pointer-events-none">
        
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

    </div>
  );
};

export default HeroSection;

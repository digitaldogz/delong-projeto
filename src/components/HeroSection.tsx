import React from "react";
import { motion } from "framer-motion";

// Configuração da animação (Suave e Premium)
const EA_ZEIT: [number, number, number, number] = [0.33, 1, 0.68, 1];
const HeroSection = () => {
  return <div className="relative w-full h-screen overflow-hidden font-sans text-white bg-black">
      
      {/* 1. VÍDEO DE FUNDO (Background Loop) */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Filtro escuro para o texto branco aparecer bem sobre o vídeo */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80">
          {/* URL de Exemplo (Substitua pelo link do seu vídeo da produtora) */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-heads-like-statues-33516-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. CONTEÚDO (Fica por cima do vídeo - z-20) */}
      <div className="relative z-20 w-full h-full flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-32 md:pb-40">

        {/* TÍTULO PRINCIPAL - Posicionado no canto inferior esquerdo */}
        <div className="flex flex-col gap-0 max-w-5xl">
          
          {/* Texto Gigante Animado - Branco */}
          <div className="overflow-hidden">
            <motion.h2 initial={{
              y: "100%"
            }} animate={{
              y: "0%"
            }} transition={{
              duration: 1,
              ease: EA_ZEIT,
              delay: 0.2
            }} className="text-4xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.95] text-white">
              A Arte é o Princípio —
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2 initial={{
              y: "100%"
            }} animate={{
              y: "0%"
            }} transition={{
              duration: 1,
              ease: EA_ZEIT,
              delay: 0.3
            }} className="text-4xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-[0.95] text-white">
              Criatividade no Comando
            </motion.h2>
          </div>
        </div>

        {/* WIDGET FLUTUANTE - Canto Inferior Direito, alinhado com base do título */}
        <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.8
        }} className="absolute right-8 md:right-16 lg:right-24 bottom-32 md:bottom-40 hidden md:flex items-center gap-4 bg-black/60 backdrop-blur-md p-4 border border-white/10 max-w-sm">
          <div className="w-16 h-16 bg-blue-700 flex items-center justify-center shrink-0">
            <span className="text-[10px] text-center leading-tight font-bold text-white">NOVO<br />CASE</span>
          </div>
          <div className="flex flex-col pr-4">
            <span className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Destaque Recente</span>
            <span className="text-sm font-bold uppercase leading-tight text-white">Campanha "Futuro Visível"</span>
          </div>
        </motion.div>

        {/* --- RODAPÉ DA HERO (Minimalista: Apenas Instagram e All Works) --- */}
        <div className="absolute bottom-8 left-0 w-full px-6 md:px-12 flex justify-between items-end z-30 text-white mix-blend-difference pointer-events-none">
          
          {/* ESQUERDA: APENAS INSTAGRAM */}
          <div className="pointer-events-auto">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              className="text-[10px] font-bold tracking-widest uppercase opacity-80 hover:opacity-100 hover:text-gray-300 transition-all"
            >
              INSTAGRAM
            </a>
          </div>

          {/* DIREITA: ALL WORKS */}
          <div className="pointer-events-auto">
            <a 
              href="/projetos" 
              className="text-[10px] font-bold tracking-widest uppercase opacity-80 hover:opacity-100 hover:text-gray-300 transition-all border border-white/30 px-4 py-2"
            >
              ALL WORKS
            </a>
          </div>
        </div>

      </div>
    </div>;
};
export default HeroSection;

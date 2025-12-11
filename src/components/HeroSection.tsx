import React from "react";
import { motion } from "framer-motion";
import logoDelongWhite from "@/assets/logo-delong-white.png";

const EA_ZEIT: [number, number, number, number] = [0.33, 1, 0.68, 1];

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden font-sans text-white bg-black">
      
      {/* 1. VÍDEO BACKGROUND */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-large-crowd-of-people-at-a-concert-462-large.mp4" type="video/mp4" />
        </video>
        {/* Gradiente Inferior para Leitura */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      </div>

      {/* 2. CONTEÚDO */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between px-8 md:px-16 py-10">
        
        {/* --- HEADER MINIMALISTA (Apenas Texto) --- */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: EA_ZEIT }}
          className="flex justify-between items-center w-full"
        >
          {/* LOGO (Esquerda) */}
          <div className="w-auto">
            <img 
              src={logoDelongWhite} 
              alt="Delong Media House" 
              className="h-12 md:h-14 w-auto object-contain" 
            />
          </div>

          {/* MENU CENTRAL (Apenas Texto - Sem Blog) */}
          <nav className="hidden md:flex items-center gap-12 text-sm uppercase tracking-widest">
            <a href="#sobre" className="group flex items-center gap-2 hover:text-gray-300 transition-colors cursor-pointer">
              <span className="font-light opacity-60 text-xs">01</span>
              <span className="font-bold">Sobre</span>
            </a>
            <a href="#projetos" className="group flex items-center gap-2 hover:text-gray-300 transition-colors cursor-pointer">
              <span className="font-light opacity-60 text-xs">02</span>
              <span className="font-bold">Projetos</span>
            </a>
            <a href="#servicos" className="group flex items-center gap-2 hover:text-gray-300 transition-colors cursor-pointer">
              <span className="font-light opacity-60 text-xs">03</span>
              <span className="font-bold">Serviços</span>
            </a>
          </nav>

          {/* CONTATO (Direita - Apenas Texto e Seta) */}
          <a href="#contato" className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity cursor-pointer">
            Contato <span>→</span>
          </a>
        </motion.header>

        {/* --- TEXTO PRINCIPAL (Rodapé) --- */}
        <div className="flex-1 flex flex-col justify-end pb-12 md:pb-20 relative">
          <div className="w-full flex flex-col md:flex-row items-end justify-between gap-8">
            
            {/* Título Gigante */}
            <div className="flex flex-col relative z-20">
              <div className="overflow-hidden">
                <motion.h2 
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: EA_ZEIT, delay: 0.2 }}
                  className="text-5xl md:text-8xl lg:text-[7rem] font-medium tracking-tighter leading-[0.9] text-white"
                >
                  A Arte é o Princípio —
                </motion.h2>
              </div>
              <div className="overflow-hidden">
                <motion.h2 
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: EA_ZEIT, delay: 0.3 }}
                  className="text-5xl md:text-8xl lg:text-[7rem] font-medium tracking-tighter leading-[0.9] text-white/60"
                >
                  Criatividade no Comando
                </motion.h2>
              </div>
            </div>

            {/* Widget Case */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="hidden md:flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 border border-white/10 min-w-[280px]"
            >
              <div className="w-12 h-12 bg-blue-600 flex items-center justify-center shrink-0 font-bold text-[9px] leading-tight text-center p-1 uppercase">
                Novo<br/>Case
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Destaque Recente</span>
                <span className="text-sm font-bold uppercase text-white leading-tight">Campanha "Futuro Visível"</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Socials Bottom Left */}
        <div className="absolute bottom-6 left-8 flex gap-6 text-[10px] font-bold tracking-widest uppercase opacity-60">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Vimeo</a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

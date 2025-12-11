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
      <div className="relative z-20 w-full h-full flex flex-col justify-between px-8 md:px-12 py-8">
        
        {/* HEADER TRANSPARENTE (Fixo no topo) */}
        <motion.header initial={{
        y: -50,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        duration: 1,
        ease: EA_ZEIT
      }} className="flex justify-between items-center w-full">
          {/* LADO ESQUERDO: MARCA */}
          <div className="w-auto">
            {/* Se tiver a imagem da logo, troque este h1 pela tag <img> */}
            <h1 className="text-xl md:text-2xl font-bold tracking-tighter uppercase leading-none">
              DELONG<br />MEDIA HOUSE
            </h1>
          </div>

          {/* CENTRO: MENU NUMERADO (Sem Blog) */}
          <nav className="hidden md:flex gap-8 text-xs font-medium uppercase tracking-widest">
            <a href="#sobre" className="hover:text-gray-300 transition-colors flex items-center gap-1">
              <span className="opacity-50">01</span> Sobre
            </a>
            <a href="#projetos" className="hover:text-gray-300 transition-colors flex items-center gap-1">
              <span className="opacity-50">02</span> Projetos
            </a>
            <a href="#servicos" className="hover:text-gray-300 transition-colors flex items-center gap-1">
              <span className="opacity-50">03</span> Serviços
            </a>
            {/* Blog removido conforme solicitado */}
          </nav>

          {/* LADO DIREITO: CONTATO */}
          <div>
            <a href="#contato" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              Contato <span>→</span>
            </a>
          </div>
        </motion.header>

        {/* CENTRO / TÍTULO PRINCIPAL */}
        <div className="flex-1 flex flex-col justify-center md:justify-end pb-12 md:pb-20">
          <div className="flex flex-col gap-0 relative">
            
            {/* Texto Gigante Animado */}
            <div className="overflow-hidden">
              <motion.h2 initial={{
              y: "100%"
            }} animate={{
              y: "0%"
            }} transition={{
              duration: 1,
              ease: EA_ZEIT,
              delay: 0.2
            }} className="text-5xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-none">
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
            }} className="text-5xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-none text-gray-400">
                Criatividade no Comando
              </motion.h2>
            </div>

            {/* WIDGET FLUTUANTE (Canto Inferior Direito) */}
            <motion.div initial={{
            opacity: 0,
            x: 50
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.8,
            delay: 0.8
          }} className="absolute right-0 bottom-0 md:bottom-10 hidden md:flex items-center gap-4 bg-black/60 backdrop-blur-md p-4 border border-white/10 max-w-sm">
              <div className="w-16 h-16 bg-blue-700 flex items-center justify-center shrink-0">
                <span className="text-[10px] text-center leading-tight font-bold">NOVO<br />CASE</span>
              </div>
              <div className="flex flex-col pr-4">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Destaque Recente</span>
                <span className="text-sm font-bold uppercase leading-tight">Campanha "Futuro Visível"</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* RODAPÉ DA HERO */}
        <div className="flex justify-between items-end border-t border-white/20 pt-6">
          <div className="flex gap-4 text-[10px] font-bold tracking-widest uppercase opacity-70">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <span>/</span>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <span>/</span>
            <a href="#" className="hover:text-white transition-colors">Vimeo</a>
          </div>

          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-8">
            <span className="text-[10px] uppercase tracking-widest opacity-50 animate-bounce">Role para explorar</span>
          </div>
        </div>

      </div>
    </div>;
};
export default HeroSection;

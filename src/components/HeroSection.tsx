import React from "react";
import { motion } from "framer-motion";

// Configurações de Animação
const EA_ZEIT: [number, number, number, number] = [0.33, 1, 0.68, 1]; 

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden font-sans text-white">
      
      {/* 1. VÍDEO DE FUNDO (Background) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover"
        >
          {/* Vídeo Placeholder estilo 'Cinematic/Action' - O Lovable pode trocar depois pelo seu */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-firefighters-putting-out-a-fire-3456-large.mp4" type="video/mp4" />
        </video>
        {/* Overlay Escuro para leitura do texto (Gradiente vindo de baixo) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
      </div>

      {/* 2. CONTEÚDO (Fica por cima do vídeo - z-10) */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-8 md:px-12 py-8">
        
        {/* HEADER TRANSPARENTE (Sobre o vídeo) */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: EA_ZEIT }}
          className="flex justify-between items-start w-full"
        >
          {/* Logo (Esquerda) */}
          <div className="w-32 md:w-40">
            {/* Se tiver a imagem da logo, coloque a tag <img> aqui. Por enquanto, texto estilizado */}
            <div className="border border-white p-2 inline-block">
               <h1 className="text-2xl font-bold leading-none tracking-tighter uppercase">ZEIT<br/><span className="text-[10px] font-normal tracking-widest">ART COMES FIRST</span></h1>
            </div>
          </div>

          {/* Menu Numerado (Centro) - Idêntico à imagem 3 */}
          <nav className="hidden md:flex gap-10 text-xs font-medium uppercase tracking-widest mt-2">
            <a href="#about" className="hover:text-gray-300 transition-colors"><span className="opacity-50 mr-1">01</span> About</a>
            <a href="#works" className="hover:text-gray-300 transition-colors"><span className="opacity-50 mr-1">02</span> Works</a>
            <a href="#services" className="hover:text-gray-300 transition-colors"><span className="opacity-50 mr-1">03</span> Services</a>
            <a href="#blog" className="hover:text-gray-300 transition-colors"><span className="opacity-50 mr-1">04</span> Blog</a>
          </nav>

          {/* Botão Contato (Direita) */}
          <div className="mt-2">
            <a href="#contact" className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity">
              Contact <span>→</span>
            </a>
          </div>
        </motion.header>

        {/* CENTRO / TÍTULO PRINCIPAL */}
        <div className="flex-1 flex flex-col justify-center md:justify-end pb-12 md:pb-20">
          <div className="flex flex-col gap-0 relative">
            
            {/* Texto Gigante */}
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: EA_ZEIT, delay: 0.2 }}
                className="text-5xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-none"
              >
                Art Comes First —
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2 
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: EA_ZEIT, delay: 0.3 }}
                className="text-5xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-none text-gray-300"
              >
                Creative Above All
              </motion.h2>
            </div>

            {/* WIDGET FLUTUANTE (Canto Inferior Direito - Igual à Imagem 3) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute right-0 bottom-0 md:bottom-10 hidden md:flex items-center gap-4 bg-black/40 backdrop-blur-md p-4 rounded border border-white/10 max-w-sm"
            >
              <div className="w-16 h-16 bg-blue-700 flex items-center justify-center shrink-0">
                {/* Thumbnail placeholder */}
                <div className="text-[10px] text-center leading-tight">NEW<br/>PROJECT</div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">New Project</span>
                <span className="text-sm font-bold uppercase leading-tight">Campaign "We Got You"</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* RODAPÉ DA HERO (Socials e Botão All Works) */}
        <div className="flex justify-between items-end border-t border-white/20 pt-6">
          
          {/* Socials (Esquerda) */}
          <div className="flex gap-4 text-[10px] font-bold tracking-widest uppercase">
            <a href="#" className="hover:text-gray-400">IG</a>
            <span className="opacity-30">/</span>
            <a href="#" className="hover:text-gray-400">FB</a>
            <span className="opacity-30">/</span>
            <a href="#" className="hover:text-gray-400">Behance</a>
          </div>

          {/* Botão Central (All Works) */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-8 hidden md:block">
            <div className="border border-white/30 px-6 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all cursor-pointer">
              [ All Works ]
            </div>
          </div>

          <div className="md:hidden">
             {/* Espaço vazio mobile */}
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeroSection;

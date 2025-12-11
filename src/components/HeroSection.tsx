import React from "react";
import { motion } from "framer-motion";

// Configuração da animação (Suave e Premium)
const EA_ZEIT: [number, number, number, number] = [0.33, 1, 0.68, 1];

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden font-sans text-white bg-background">
      
      {/* 1. VÍDEO DE FUNDO (Background Loop) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-background/40 z-10" />
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-80">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-heads-like-statues-33516-large.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. CONTEÚDO - Ancorado no FUNDO da tela */}
      <div className="relative z-20 w-full h-full flex flex-col justify-end px-6 md:px-12 pb-32 md:pb-40">

        {/* Container principal: Título (esquerda) + Novo Case (direita) - alinhados pela BASE */}
        <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8">
          
          {/* TÍTULO PRINCIPAL - Esquerda */}
          <div className="flex flex-col gap-0 text-left">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: EA_ZEIT, delay: 0.2 }}
                className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-none text-foreground"
              >
                A Arte é o Princípio —
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: EA_ZEIT, delay: 0.3 }}
                className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter leading-none text-muted-foreground"
              >
                Criatividade no Comando
              </motion.h2>
            </div>

            {/* Links sociais abaixo do título */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center gap-4 mt-6"
            >
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                IG
              </a>
              <span className="text-muted-foreground">/</span>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                FB
              </a>
              <span className="text-muted-foreground">/</span>
              <a
                href="https://behance.net"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                BEHANCE
              </a>
            </motion.div>
          </div>

          {/* WIDGET NOVO CASE - Direita, alinhado pela base */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hidden md:flex items-center gap-4 bg-background/60 backdrop-blur-md p-4 border border-border max-w-sm"
          >
            <div className="w-16 h-16 bg-blue-700 flex items-center justify-center shrink-0">
              <span className="text-[10px] text-center leading-tight font-bold text-foreground">NOVO<br />CASE</span>
            </div>
            <div className="flex flex-col pr-4">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Destaque Recente</span>
              <span className="text-sm font-bold uppercase leading-tight text-foreground">Campanha "Futuro Visível"</span>
            </div>
          </motion.div>

        </div>

        {/* Links centralizados abaixo do conteúdo principal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex justify-center items-center gap-12 mt-8"
        >
          <a
            href="/projetos"
            className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors border border-border px-4 py-2"
          >
            [ALL WORKS]
          </a>
          <a
            href="#showreel"
            className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            [SHOW REEL]
          </a>
        </motion.div>

      </div>
    </div>
  );
};

export default HeroSection;

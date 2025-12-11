import React from "react";
import { motion, type Transition } from "framer-motion";
import logoDelongMedia from "@/assets/logo-delong.png";

// --- Configurações de Motion Design ---
const EA_ZEIT: [number, number, number, number] = [0.33, 1, 0.68, 1];

const transitionText: Transition = {
  duration: 1,
  ease: EA_ZEIT,
};

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen bg-background text-foreground flex flex-col justify-between overflow-hidden font-sans selection:bg-foreground selection:text-background">
      {/* 1. HEADER (Slide Down Suave) */}
      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.8, ease: EA_ZEIT }}
        className="w-full px-8 py-6 flex justify-between items-center border-b border-border"
      >
        <img src={logoDelongMedia} alt="Delong Media House" className="h-16 md:h-24 w-auto" />
        <nav className="hidden md:flex gap-6 text-sm text-muted-foreground">
          <span className="cursor-pointer hover:text-foreground transition-colors">Work</span>
          <span className="cursor-pointer hover:text-foreground transition-colors">Studio</span>
          <span className="cursor-pointer hover:text-foreground transition-colors">Contact</span>
        </nav>
      </motion.header>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center md:justify-between px-8 md:px-16 relative">
        {/* 2. TÍTULO PRINCIPAL (Masked Slide-Up) */}
        <div className="z-10 flex flex-col gap-2 md:gap-4">
          {/* Linha 1 */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{
                ...transitionText,
                delay: 0.2,
              }}
              className="text-5xl md:text-8xl font-medium tracking-tight leading-[1.1]"
            >
              Art Comes First
            </motion.h1>
          </div>

          {/* Linha 2 */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{
                ...transitionText,
                delay: 0.3,
              }}
              className="text-5xl md:text-8xl font-medium tracking-tight leading-[1.1] text-muted-foreground"
            >
              Creative Above All
            </motion.h1>
          </div>
        </div>

        {/* 3. WIDGET / CARD FLUTUANTE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: EA_ZEIT,
            delay: 0.8,
          }}
          className="mt-12 md:mt-0 relative w-full md:w-72 bg-foreground/5 backdrop-blur-md border border-border p-6 rounded-none md:mr-12"
        >
          <div className="flex justify-between items-start mb-8">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Latest</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <h3 className="text-xl font-normal mb-2">Neon Landscapes</h3>
          <p className="text-sm text-muted-foreground">Digital installation for the modern museum era.</p>
          <div className="mt-6 flex items-center gap-2 text-xs font-mono border-t border-border pt-4">
            <span>→</span>
            <span>VIEW PROJECT</span>
          </div>
        </motion.div>
      </main>

      {/* 4. FOOTER (Fade In Lento) */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.0 }}
        className="px-8 py-6 flex justify-between items-end text-xs text-muted-foreground uppercase tracking-widest"
      >
        <div>© 2024 Agency</div>
        <div className="hidden md:block">Scroll to explore</div>
      </motion.footer>

      {/* Elemento de Fundo para ambiência */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroSection;

import React from "react";
import { motion } from "framer-motion";

// Curva de Bezier para suavidade cinematográfica
const EA_ZEIT: [number, number, number, number] = [0.33, 1, 0.68, 1];

const transitionText = {
  duration: 1,
  ease: EA_ZEIT,
};

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] text-white flex flex-col justify-between overflow-hidden font-sans selection:bg-white selection:text-black">
      
      {/* HEADER */}
      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.8, ease: EA_ZEIT }}
        className="w-full px-8 py-6 flex justify-between items-center border-b border-white/10"
      >
        {/* Aqui entra sua Logo ou o Nome da Agência */}
        <div className="text-xl font-bold tracking-tighter uppercase">
          Delong Media House
        </div>
        
        <nav className="hidden md:flex gap-6 text-sm text-gray-400">
          <span className="cursor-pointer hover:text-white transition-colors">Cases</span>
          <span className="cursor-pointer hover:text-white transition-colors">Estúdio</span>
          <span className="cursor-pointer hover:text-white transition-colors">Contato</span>
        </nav>
      </motion.header>

      {/* ÁREA PRINCIPAL (TEXTO GIGANTE) */}
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center md:justify-between px-8 md:px-16 relative">
        
        <div className="z-10 flex flex-col gap-2 md:gap-4">
          {/* Linha 1 */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ ...transitionText, delay: 0.2 }}
              className="text-5xl md:text-8xl font-medium tracking-tight leading-[1.1]"
            >
              A Arte é o Princípio
            </motion.h1>
          </div>

          {/* Linha 2 */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ ...transitionText, delay: 0.3 }}
              className="text-5xl md:text-8xl font-medium tracking-tight leading-[1.1] text-gray-400"
            >
              Criatividade no Comando
            </motion.h1>
          </div>
        </div>

        {/* WIDGET / CARD FLUTUANTE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EA_ZEIT, delay: 0.8 }}
          className="mt-12 md:mt-0 relative w-full md:w-72 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-none md:mr-12"
        >
          <div className="flex justify-between items-start mb-8">
            <span className="text-xs uppercase tracking-widest text-gray-500">Destaque</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <h3 className="text-xl font-normal mb-2">Futuro Digital</h3>
          <p className="text-sm text-gray-400">Instalações imersivas para marcas que lideram o mercado.</p>
          <div className="mt-6 flex items-center gap-2 text-xs font-mono border-t border-white/10 pt-4 cursor-pointer hover:text-white text-gray-400 transition-colors">
            <span>→</span>
            <span>VER PROJETO</span>
          </div>
        </motion.div>

      </main>

      {/* FOOTER DA HERO */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.0 }}
        className="px-8 py-6 flex justify-between items-end text-xs text-gray-500 uppercase tracking-widest"
      >
        <div>© 2024 Delong Media House</div>
        <div className="hidden md:block">Role para explorar</div>
      </motion.footer>

      {/* Gradiente de fundo sutil */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroSection;

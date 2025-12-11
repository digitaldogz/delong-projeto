import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logoDelongWhite from "@/assets/logo-delong-white.png";

const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Detecta Scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha menu ao mudar de rota
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const menuItems = [
    { number: "01", label: "Sobre", path: "/#sobre" },
    { number: "02", label: "Projetos", path: "/projetos" },
    { number: "03", label: "Serviços", path: "/#servicos" },
  ];

  return (
    <>
      {/* --- BARRA DE NAVEGAÇÃO --- */}
      <motion.nav
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 transition-all duration-300"
        animate={{
          backgroundColor: isScrolled || isMenuOpen ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0)",
          backdropFilter: isScrolled || isMenuOpen ? "blur(10px)" : "blur(0px)",
        }}
        style={{
          borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent"
        }}
      >
        {/* 1. LOGO (SEMPRE VISÍVEL) */}
        <div className="z-50 relative w-auto">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img 
              src={logoDelongWhite}
              alt="Delong Media House" 
              className="h-10 md:h-12 w-auto object-contain" 
            />
          </Link>
        </div>

        {/* 2. CENTRO (TROCA DINÂMICA: TEXTO <-> ÍCONE) */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
          <AnimatePresence mode="wait">
            
            {/* SITUAÇÃO A: TOPO DA PÁGINA (MOSTRA TEXTO) */}
            {!isScrolled && !isMenuOpen ? (
              <motion.div
                key="text-nav"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest"
              >
                {menuItems.map((item) => (
                  <Link 
                    key={item.label} 
                    to={item.path} 
                    className="group flex items-center gap-2 hover:text-muted-foreground transition-colors text-foreground"
                  >
                    <span className="font-normal opacity-50">{item.number}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </motion.div>
            ) : (
              // SITUAÇÃO B: SCROLLADO OU MOBILE (MOSTRA SANDUÍCHE)
              <motion.button
                key="burger-nav"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col gap-1.5 p-4 cursor-pointer group"
              >
                {/* Linhas do Sanduíche Animadas */}
                <motion.span 
                  animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 8 : 0 }}
                  className="w-6 h-0.5 bg-foreground block transition-transform"
                />
                <motion.span 
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                  className="w-6 h-0.5 bg-foreground block transition-opacity group-hover:w-4 self-end"
                />
                <motion.span 
                  animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -8 : 0 }}
                  className="w-6 h-0.5 bg-foreground block transition-transform"
                />
              </motion.button>
            )}

          </AnimatePresence>
        </div>

        {/* 3. CONTATO (SEMPRE VISÍVEL) */}
        <div className="z-50 relative">
          <Link 
            to="/#contato" 
            className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity text-foreground"
          >
            Contato <span>→</span>
          </Link>
        </div>
      </motion.nav>

      {/* --- OVERLAY DO MENU CHEIO (QUANDO CLICA NO SANDUÍCHE) --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background z-40 flex items-center justify-center"
          >
            <div className="flex flex-col gap-8 text-center">
               <Link to="/" className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground hover:text-muted-foreground transition-colors">
                  <span className="block text-sm font-mono opacity-40 mb-2 font-normal">00</span>
                  Home
               </Link>
               {menuItems.map((item) => (
                <Link 
                  key={item.label} 
                  to={item.path} 
                  className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground hover:text-muted-foreground transition-colors"
                >
                  <span className="block text-sm font-mono opacity-40 mb-2 font-normal">{item.number}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;

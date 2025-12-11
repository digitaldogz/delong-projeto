import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logoDelongWhite from "@/assets/logo-delong-white.png";

const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Detecta o scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha o menu ao mudar de rota
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Links do Menu
  const menuItems = [
    { number: "01", label: "Sobre", path: "/#sobre" },
    { number: "02", label: "Projetos", path: "/projetos" },
    { number: "03", label: "Serviços", path: "/#servicos" },
  ];

  return (
    <>
      {/* BARRA DE NAVEGAÇÃO FIXA */}
      <motion.nav
        initial={{ backgroundColor: "rgba(0,0,0,0)" }}
        animate={{ 
          backgroundColor: isScrolled ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0)",
          backdropFilter: isScrolled ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 md:px-12 py-6 transition-all ${isScrolled ? 'border-b border-border/10' : ''}`}
      >
        {/* ESQUERDA: LOGO */}
        <div className="w-auto z-50">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img 
              src={logoDelongWhite}
              alt="Delong Media House" 
              className="h-12 md:h-14 w-auto object-contain" 
            />
          </Link>
        </div>

        {/* CENTRO: TROCA ENTRE TEXTO E ÍCONE */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-50">
          <AnimatePresence mode="wait">
            {!isScrolled && !isMenuOpen ? (
              // MODO TEXTO (Topo da página)
              <motion.div 
                key="text-menu"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="hidden md:flex items-center gap-12 text-sm uppercase tracking-widest"
              >
                {menuItems.map((item) => (
                  <Link 
                    key={item.label} 
                    to={item.path} 
                    className="group flex items-center gap-2 hover:text-muted-foreground transition-colors text-foreground"
                  >
                    <span className="font-light opacity-50 text-xs">{item.number}</span>
                    <span className="font-bold">{item.label}</span>
                  </Link>
                ))}
              </motion.div>
            ) : (
              // MODO ÍCONE (Scrollado ou Aberto)
              <motion.button
                key="icon-menu"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col gap-1.5 p-2 group cursor-pointer"
              >
                <motion.div 
                  animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
                  className="w-8 h-0.5 bg-foreground transition-all" 
                />
                <motion.div 
                  animate={{ opacity: isMenuOpen ? 0 : 1 }}
                  className="w-8 h-0.5 bg-foreground transition-all group-hover:w-6" 
                />
                <motion.div 
                  animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
                  className="w-8 h-0.5 bg-foreground transition-all" 
                />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* DIREITA: CONTATO */}
        <div className="z-50">
          <Link to="/#contato" className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity text-foreground">
            Contato <span>→</span>
          </Link>
        </div>
      </motion.nav>

      {/* OVERLAY DO MENU SANDUÍCHE (Abre quando clica) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background z-40 flex items-center justify-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {menuItems.map((item) => (
                <Link 
                  key={item.label} 
                  to={item.path} 
                  className="text-4xl md:text-6xl font-bold uppercase tracking-tighter hover:text-muted-foreground transition-colors text-foreground"
                >
                  <span className="text-lg opacity-30 block mb-2 font-mono">{item.number}</span>
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

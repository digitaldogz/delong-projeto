import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logoDelongWhite from "@/assets/logo-delong-white.png";

const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // 1. Detectar Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Fechar menu ao navegar
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
      <motion.nav
        className={`fixed top-0 left-0 w-full z-[999] flex justify-between items-center px-8 md:px-12 py-6 transition-all duration-500 ${
          isScrolled || isMenuOpen
            ? "bg-background/90 backdrop-blur-md border-b border-border/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* --- LADO ESQUERDO: LOGO (Fixo) --- */}
        <div className="z-[1000]">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img
              src={logoDelongWhite}
              alt="Delong Media House"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </Link>
        </div>

        {/* --- LADO DIREITO: ÁREA DINÂMICA + CONTATO --- */}
        <div className="flex items-center gap-6 md:gap-8 z-[1000]">
          
          {/* A: TROCA ENTRE TEXTO E ÍCONE (AnimatePresence) */}
          <AnimatePresence mode="wait">
            {!isScrolled && !isMenuOpen ? (
              // ESTADO 1: LINKS DE TEXTO (Visível no topo desktop)
              <motion.div
                key="text-links"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
                className="hidden md:flex items-center gap-8"
              >
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    className="group flex items-center gap-2 text-foreground text-xs font-bold uppercase tracking-widest hover:text-muted-foreground transition-colors"
                  >
                    <span className="font-normal opacity-50">{item.number}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </motion.div>
            ) : (
              // ESTADO 2: ÍCONE SANDUÍCHE (Visível ao rolar ou mobile)
              <motion.button
                key="burger-icon"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10, transition: { duration: 0.2 } }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex flex-col gap-1.5 p-2 cursor-pointer group"
              >
                <span
                  className={`w-6 h-0.5 bg-foreground block transition-transform duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-foreground block transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-0" : "opacity-100 group-hover:w-4 self-end"
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-foreground block transition-transform duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </motion.button>
            )}
          </AnimatePresence>

          {/* B: BOTÃO CONTATO (Sempre Fixo) */}
          <Link
            to="/#contato"
            className="text-foreground text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            Contato <span>→</span>
          </Link>
        </div>
      </motion.nav>

      {/* --- OVERLAY MENU (Tela Cheia) --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background z-[998] flex items-center justify-center"
          >
            <div className="flex flex-col gap-8 text-center">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground hover:text-muted-foreground transition-colors"
              >
                Home
              </Link>
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground hover:text-muted-foreground transition-colors"
                >
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

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
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
      {/* BARRA DE NAVEGAÇÃO FIXA */}
      <nav 
        className={`fixed top-0 left-0 w-full z-[999] flex justify-between items-center px-8 md:px-12 py-8 transition-all duration-500 ${
          isScrolled || isMenuOpen ? "bg-background/90 backdrop-blur-md border-b border-border/10" : "bg-transparent border-b border-transparent"
        }`}
      >
        {/* 1. LOGO (SEMPRE VISÍVEL - NÃO MUDA) */}
        <div className="relative z-[1000] w-auto">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <img 
              src={logoDelongWhite}
              alt="Delong Media House" 
              className="h-10 md:h-12 w-auto object-contain" 
            />
          </Link>
        </div>

        {/* 2. ÁREA CENTRAL (ONDE OCORRE A TROCA) */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] flex items-center justify-center">
          
          {/* A: MENU DE TEXTO (Visível apenas no topo) */}
          <div 
            className={`hidden md:flex items-center gap-12 transition-all duration-500 ease-in-out ${
              isScrolled || isMenuOpen ? "opacity-0 translate-y-[-10px] pointer-events-none" : "opacity-100 translate-y-0 pointer-events-auto"
            }`}
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
          </div>

          {/* B: BOTÃO SANDUÍCHE (Visível ao rolar) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`absolute flex flex-col gap-1.5 p-2 transition-all duration-500 ease-in-out cursor-pointer ${
              isScrolled || isMenuOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"
            }`}
          >
            <span className={`w-6 h-0.5 bg-foreground block transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-foreground block transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <span className={`w-6 h-0.5 bg-foreground block transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>

        </div>

        {/* 3. CONTATO (SEMPRE VISÍVEL - NÃO MUDA) */}
        <div className="relative z-[1000]">
          <Link 
            to="/#contato" 
            className="text-foreground text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity"
          >
            Contato <span>→</span>
          </Link>
        </div>
      </nav>

      {/* OVERLAY TELA CHEIA (ABRE AO CLICAR NO SANDUÍCHE) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background z-[998] flex items-center justify-center pt-20"
          >
            <div className="flex flex-col gap-8 text-center">
               <Link to="/" className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground hover:text-muted-foreground transition-colors">
                  Home
               </Link>
               {menuItems.map((item) => (
                <Link 
                  key={item.label} 
                  to={item.path} 
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

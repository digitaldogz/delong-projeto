import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logoDelongWhite from "@/assets/logo-delong-white.png";

const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Detectar Scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fechar menu ao navegar
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const menuItems = [
    { number: "01", label: "Sobre", path: "/sobre" },
    { number: "02", label: "Projetos", path: "/projetos" },
    { number: "03", label: "Serviços", path: "/servicos" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-[999] transition-all duration-500 ${
          isMenuOpen 
            ? "bg-background/90 backdrop-blur-md" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto w-full px-8 md:px-12 py-6 flex justify-between items-center">
          {/* --- LADO ESQUERDO: LOGO --- */}
          <div className="z-[1000] shrink-0">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <img 
                src={logoDelongWhite}
                alt="Delong Media House" 
                className="h-10 md:h-12 w-auto object-contain" 
              />
            </Link>
          </div>

        {/* --- LADO DIREITO: GRUPO UNIFICADO --- */}
        <div className="flex items-center gap-6 z-[1000]">
          
          {/* LINKS DE TEXTO (Desktop no Topo - sem scroll e menu fechado) */}
          <div className={`hidden md:flex items-center gap-8 transition-opacity duration-300 ${!isScrolled && !isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none absolute'}`}>
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

          {/* ÍCONE SANDUÍCHE (Mobile ou quando rola/menu aberto) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex flex-col gap-1.5 p-2 cursor-pointer group transition-opacity duration-300 ${isScrolled || isMenuOpen ? 'opacity-100' : 'md:opacity-0 md:pointer-events-none md:absolute'}`}
          >
            <span className={`w-6 h-0.5 bg-foreground block transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-0.5 bg-foreground block transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100 group-hover:w-4 self-end"}`} />
            <span className={`w-6 h-0.5 bg-foreground block transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>

          {/* BOTÃO CONTATO (SEMPRE FIXO NA PONTA) */}
          <button 
            onClick={() => {
              document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
              setIsMenuOpen(false);
            }}
            className="text-foreground text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity whitespace-nowrap"
          >
            Contato <span>→</span>
          </button>

        </div>
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
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground hover:text-muted-foreground transition-colors">
                 Home
              </Link>
              {menuItems.map((item) => (
                <Link 
                  key={item.label} 
                  to={item.path} 
                  onClick={() => setIsMenuOpen(false)}
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

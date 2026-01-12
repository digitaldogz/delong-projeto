import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logoDelongWhite from "@/assets/logo-delong-white.png";

const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Detectar Scroll (com histerese + raf throttle para não "piscar" com Lenis)
  useEffect(() => {
    const thresholdIn = 80;
    const thresholdOut = 40;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        const y = window.scrollY;

        setIsScrolled((prev) => {
          if (!prev && y > thresholdIn) return true;
          if (prev && y < thresholdOut) return false;
          return prev;
        });
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
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
        <div className="container-premium py-6 flex justify-between items-center">
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
          {/* Slot Desktop (mantém o layout alinhado e estável) */}
          <div className="relative hidden md:flex items-center justify-end h-10 min-w-[340px] lg:min-w-[420px]">
            {/* Links (mesmo espaço, sem reflow) */}
            <motion.div
              initial={false}
              animate={!isScrolled && !isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0 flex items-center justify-end gap-8"
              style={{
                pointerEvents: !isScrolled && !isMenuOpen ? "auto" : "none",
                visibility: !isScrolled && !isMenuOpen ? "visible" : "hidden",
              }}
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

            {/* Burger (sobre o mesmo slot, alinhado no centro vertical) */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              initial={false}
              animate={isScrolled || isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
              className="absolute inset-0 flex items-center justify-end p-2 cursor-pointer group"
              style={{ pointerEvents: isScrolled || isMenuOpen ? "auto" : "none" }}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <span className="sr-only">Menu</span>
              <span className="flex flex-col gap-1.5">
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
              </span>
            </motion.button>
          </div>

          {/* ÍCONE SANDUÍCHE (Mobile sempre) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer group"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
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
          </button>

          {/* BOTÃO CONTATO (SEMPRE FIXO NA PONTA) */}
          <button
            onClick={() => {
              document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
              setIsMenuOpen(false);
            }}
            className="h-10 inline-flex items-center text-foreground text-xs font-bold uppercase tracking-widest gap-2 hover:opacity-70 transition-opacity whitespace-nowrap leading-none"
          >
            Contato <span aria-hidden>→</span>
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

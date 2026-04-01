/**
 * Site Header Component
 * Fixed navigation with burger menu.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import logoDelongWhite from "@/assets/logo-delong-white.png";
import { scrollToTop } from "@/hooks/use-gsap-animations";
import { useTransitionNavigate } from "@/components/PageTransition";

// Animation easing
const EASE_SMOOTH: [number, number, number, number] = [0.33, 1, 0.68, 1];

// Menu items configuration
const MENU_ITEMS = [
  { number: "01", label: "Sobre", path: "/sobre" },
  { number: "02", label: "Projetos", path: "/projetos" },
  { number: "03", label: "Serviços", path: "/servicos" },
  { number: "04", label: "Fotos", path: "/fotos" },
] as const;

// Burger Icon Component
const BurgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <span className="flex flex-col gap-1.5">
    <span
      className={`w-6 h-0.5 bg-foreground block transition-transform duration-300 ${
        isOpen ? "rotate-45 translate-y-2" : ""
      }`}
    />
    <span
      className={`w-6 h-0.5 bg-foreground block transition-opacity duration-300 ${
        isOpen ? "opacity-0" : "opacity-100"
      }`}
    />
    <span
      className={`w-6 h-0.5 bg-foreground block transition-transform duration-300 ${
        isOpen ? "-rotate-45 -translate-y-2" : ""
      }`}
    />
  </span>
);

const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigateWithTransition = useTransitionNavigate();

  // Handle logo click - scroll to top or navigate home with transition
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      scrollToTop();
    } else {
      navigateWithTransition("/");
    }
  };

  // Handle menu item click with transition
  const handleMenuClick = (path: string) => {
    setIsMenuOpen(false);
    navigateWithTransition(path);
  };

  // Scroll detection with hysteresis to prevent flickering
  useEffect(() => {
    const THRESHOLD_IN = 80;
    const THRESHOLD_OUT = 40;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const y = window.scrollY;
        setIsScrolled((prev) => {
          if (!prev && y > THRESHOLD_IN) return true;
          if (prev && y < THRESHOLD_OUT) return false;
          return prev;
        });
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Scroll to footer
  const scrollToContact = () => {
    document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  // State flags
  const showLinks = !isScrolled && !isMenuOpen;
  const showBurger = isScrolled || isMenuOpen;

  return (
    <>
      {/* Main Navigation Bar */}
      <motion.nav
        className={`fixed top-0 left-0 w-full z-[999] transition-colors duration-500 ${
          isMenuOpen ? "bg-background/90 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="container-premium py-6 flex justify-between items-center">
          {/* Logo - navigates home */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="z-[1000] shrink-0 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <img
              src={logoDelongWhite}
              alt="Delong Media House"
              className="h-10 md:h-12 w-auto object-contain"
            />
          </a>

          {/* Right Side: Navigation */}
          <div className="flex items-center gap-6 z-[1000]">
            {/* Desktop Navigation Slot */}
            <div className="relative hidden md:flex items-center justify-end h-10 min-w-[340px] lg:min-w-[420px]">
              {/* Desktop Links with Transition */}
              <motion.div
                initial={false}
                animate={showLinks ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE_SMOOTH }}
                className="absolute inset-0 flex items-center justify-end gap-8"
                style={{
                  pointerEvents: showLinks ? "auto" : "none",
                  visibility: showLinks ? "visible" : "hidden",
                }}
              >
              {MENU_ITEMS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleMenuClick(item.path)}
                    className="group flex items-center gap-2 text-foreground text-xs font-bold uppercase tracking-widest hover:text-muted-foreground transition-colors cursor-pointer"
                  >
                    <span className="font-normal opacity-50">{item.number}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </motion.div>

              {/* Desktop Burger */}
              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                initial={false}
                animate={showBurger ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE_SMOOTH }}
                className="absolute inset-0 flex items-center justify-end p-2 cursor-pointer"
                style={{ pointerEvents: showBurger ? "auto" : "none" }}
                aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              >
                <BurgerIcon isOpen={isMenuOpen} />
              </motion.button>
            </div>

            {/* Mobile Burger (always visible) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              <BurgerIcon isOpen={isMenuOpen} />
            </button>

            {/* Contact Button */}
            <button
              onClick={scrollToContact}
              className="h-10 inline-flex items-center text-foreground text-xs font-bold uppercase tracking-widest gap-2 hover:opacity-70 transition-opacity whitespace-nowrap"
            >
              Contato <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-background z-[998] flex items-center justify-center"
          >
            <nav className="flex flex-col gap-8 text-center">
              <button
                onClick={() => handleMenuClick("/")}
                className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground hover:text-muted-foreground transition-colors cursor-pointer"
              >
                Home
              </button>
              {MENU_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleMenuClick(item.path)}
                  className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-foreground hover:text-muted-foreground transition-colors cursor-pointer"
                >
                  <span className="block text-sm font-mono opacity-40 mb-2 font-normal">
                    {item.number}
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;

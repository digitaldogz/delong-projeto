/**
 * Hero Section Component
 * Full-screen hero with video background and GSAP entrance animations.
 * Inspired by zeitmedia.vn style with masked text reveals and stagger effects.
 */

import { useRef, useEffect, useState } from "react";
import { useMotionValue, useTransform, motion } from "framer-motion";
import { BGPattern } from "./ui/bg-pattern";
import { useHeroAnimation } from "@/hooks/use-gsap-animations";

const HeroSection = () => {
  const heroRef = useHeroAnimation();
  const scrollY = useMotionValue(0);
  const [containerHeight, setContainerHeight] = useState(0);

  // Setup scroll listener and container height
  useEffect(() => {
    const updateHeight = () => {
      if (heroRef.current) {
        setContainerHeight(heroRef.current.offsetHeight);
      }
    };

    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeight);
    };
  }, [scrollY, heroRef]);

  // Parallax transforms based on scroll
  const opacity = useTransform(scrollY, [0, containerHeight * 0.6], [1, 0]);
  const y = useTransform(scrollY, [0, containerHeight * 0.6], [0, 80]);
  const scale = useTransform(scrollY, [0, containerHeight * 0.6], [1, 0.97]);

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden text-foreground bg-background"
    >
      {/* Video Background with reveal animation */}
      <div className="absolute inset-0 z-0 hero-media">
        <div className="absolute inset-0 bg-background/40 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-abstract-video-of-a-man-with-heads-like-statues-33516-large.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Background Pattern */}
      <BGPattern
        variant="dots"
        mask="fade-edges"
        size={32}
        fill="rgba(255,255,255,0.15)"
        className="z-[5]"
      />

      {/* Main Content with parallax */}
      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-20 w-full h-screen flex flex-col justify-end pb-24 md:pb-28"
      >
        <div className="container-premium">
          <div className="flex flex-col gap-0 relative text-left">
            {/* Masked Title Animation */}
            <div className="overflow-hidden hero-title-mask">
              <h1 className="hero-title text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
                A Arte é o Princípio —
              </h1>
            </div>
            <div className="overflow-hidden hero-title-mask">
              <h2 className="hero-title text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-muted-foreground">
                Criatividade no Comando
              </h2>
            </div>

            {/* Floating Widget with stagger */}
            <div className="hero-widget absolute right-0 bottom-0 hidden md:flex items-center gap-3 bg-background/80 backdrop-blur-md p-3 border border-border/20 max-w-xs">
              <div className="w-14 h-14 bg-primary flex items-center justify-center shrink-0">
                <span className="text-[9px] text-center leading-tight font-bold text-primary-foreground">
                  NOVO
                  <br />
                  CASE
                </span>
              </div>
              <div className="flex flex-col pr-3">
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">
                  Destaque Recente
                </span>
                <span className="text-xs font-bold uppercase leading-tight">
                  Campanha "Futuro Visível"
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer Links with stagger */}
      <motion.div
        style={{ opacity }}
        className="hero-footer absolute bottom-6 left-0 w-full z-30 text-foreground mix-blend-difference pointer-events-none"
      >
        <div className="container-premium flex justify-between items-end">
          <div className="pointer-events-auto hero-stagger">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-bold tracking-widest uppercase opacity-80 hover:opacity-100 transition-opacity"
            >
              INSTAGRAM
            </a>
          </div>
          <div className="pointer-events-auto hero-stagger">
            <a
              href="/projetos"
              className="text-[10px] font-bold tracking-widest uppercase opacity-80 hover:opacity-100 transition-opacity border border-foreground/30 px-4 py-2"
            >
              ALL WORKS
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

/**
 * Hero Section Component
 * Full-screen hero with video background and GSAP entrance animations.
 * Inspired by zeitmedia.vn style with masked text reveals and stagger effects.
 */

import { useRef, useEffect, useState } from "react";
import { useMotionValue, useTransform, motion } from "framer-motion";

import { useHeroAnimation } from "@/hooks/use-gsap-animations";
import { useTransitionNavigate } from "@/components/PageTransition";
import { useSiteConfig } from "@/hooks/useSiteConfig";

const HeroSection = () => {
  const heroRef = useHeroAnimation();
  const navigateWithTransition = useTransitionNavigate();
  const scrollY = useMotionValue(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const { config } = useSiteConfig();

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
      className="relative w-full h-[100dvh] overflow-hidden text-foreground bg-background"
    >
      {/* Video Background with reveal animation */}
      <div className="absolute inset-0 z-0 hero-media">
        <video
          key={config.hero_video_url}
          poster={config.hero_video_url?.includes('.b-cdn.net') ? config.hero_video_url.replace(/\/[^\/]+\.mp4$/, '/thumbnail.jpg') : ''}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-70"
        >
          <source
            src={config.hero_video_url}
            type="video/mp4"
          />
        </video>
      </div>

      {/* Gradient overlay - top (protects navigation) */}
      <div className="absolute inset-x-0 top-0 h-[30%] z-[5] pointer-events-none bg-gradient-to-b from-black/60 to-transparent" />

      {/* Gradient overlay - bottom (protects title and footer links) */}
      <div className="absolute inset-x-0 bottom-0 h-[50%] z-[5] pointer-events-none bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Gradient overlay - left side */}
      <div className="absolute inset-y-0 left-0 w-[25%] z-[5] pointer-events-none bg-gradient-to-r from-black/50 to-transparent" />

      {/* Gradient overlay - right side */}
      <div className="absolute inset-y-0 right-0 w-[25%] z-[5] pointer-events-none bg-gradient-to-l from-black/50 to-transparent" />

      {/* Main Content with parallax */}
      <motion.div
        style={{ opacity, y, scale }}
        className="relative z-20 w-full h-[100dvh] flex flex-col justify-end pb-24 md:pb-28"
      >
        <div className="container-premium">
          <div className="flex flex-col gap-0 relative text-left">
            {/* Masked Title Animation */}
            <div className="overflow-hidden hero-title-mask">
              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]">
                {config.hero_title}
              </h1>
            </div>
            <div className="overflow-hidden hero-title-mask">
              <h2 className="hero-title text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-muted-foreground">
                {config.hero_subtitle}
              </h2>
            </div>

            {/* Floating Widget with stagger - clickable link to case */}
            <button
              onClick={() => navigateWithTransition('/projetos')}
              className="hero-widget absolute right-0 bottom-0 hidden md:flex items-center gap-3 bg-background/80 backdrop-blur-md p-3 border border-border/20 max-w-xs cursor-pointer hover:bg-background/95 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary flex items-center justify-center shrink-0">
                <span className="text-[9px] text-center leading-tight font-bold text-primary-foreground">
                  VER
                  <br />
                  TUDO
                </span>
              </div>
              <div className="flex flex-col pr-3 text-left">
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">
                  Nosso Portfólio
                </span>
                <span className="text-xs font-bold uppercase leading-tight">
                  Explorar Projetos
                </span>
              </div>
            </button>
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
              href={config.instagram_url}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-bold tracking-widest uppercase opacity-80 hover:opacity-100 transition-opacity"
            >
              INSTAGRAM
            </a>
          </div>
          <div className="pointer-events-auto hero-stagger">
            <button
              onClick={() => navigateWithTransition('/projetos')}
              className="text-[10px] font-bold tracking-widest uppercase opacity-80 hover:opacity-100 transition-opacity border border-foreground/30 px-4 py-2 cursor-pointer"
            >
              ALL WORKS
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

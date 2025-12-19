import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import logoWhite from '@/assets/logo-delong-white.png';

const BigCTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // 3D transformations based on scroll
  const rotateY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.2, 0.6]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.1, 0.3, 0.3, 0.1]);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-background py-32 md:py-48 overflow-hidden flex items-center justify-center"
    >
      {/* Glow vermelho de fundo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-destructive/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Logo 3D animada no fundo */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          perspective: 1000,
        }}
      >
        <motion.img
          src={logoWhite}
          alt=""
          className="w-[300px] md:w-[500px] lg:w-[700px] h-auto"
          style={{
            rotateY,
            rotateX,
            scale,
            opacity,
            transformStyle: "preserve-3d",
          }}
        />
      </motion.div>

      {/* Texto principal */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 text-center w-full">
        <h2 className="font-black leading-[0.95] tracking-tight uppercase select-none">
          <span className="block text-4xl md:text-[6rem] lg:text-[8rem] text-foreground">
            VAMOS TORNAR
          </span>
          <span className="block text-4xl md:text-[6rem] lg:text-[8rem] bg-gradient-to-b from-muted-foreground/60 to-muted-foreground/20 bg-clip-text text-transparent italic">
            SUA MARCA
          </span>
          <span className="block text-4xl md:text-[6rem] lg:text-[8rem] text-destructive">
            INESQUECÍVEL
          </span>
        </h2>
      </div>
    </section>
  );
};

export default BigCTA;

import React from 'react';
import { motion } from 'framer-motion';
import { DottedSurface } from './ui/dotted-surface';

const BigCTA = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-background">
      {/* Background animado de pontos */}
      <DottedSurface className="opacity-30" />

      {/* Glow vermelho sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-destructive/15 rounded-full blur-[180px] pointer-events-none z-[1]" />

      {/* Texto principal */}
      <div className="relative z-10 container-premium text-center w-full">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="font-black leading-[0.9] tracking-tighter uppercase"
        >
          <motion.span 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="block text-5xl md:text-[7rem] lg:text-[9rem] text-foreground"
          >
            VAMOS TORNAR
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="block text-5xl md:text-[7rem] lg:text-[9rem] text-muted-foreground/30 italic"
          >
            SUA MARCA
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="block text-5xl md:text-[7rem] lg:text-[9rem] text-destructive"
          >
            INESQUECÍVEL
          </motion.span>
        </motion.h2>
      </div>
    </section>
  );
};

export default BigCTA;

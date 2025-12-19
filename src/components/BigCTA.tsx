import React from 'react';
import { motion } from 'framer-motion';

const BigCTA = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      {/* Imagem de fundo */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-background/90" />
        {/* Glow vermelho */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-destructive/30 rounded-full blur-[200px] pointer-events-none" />
      </div>

      {/* Texto principal */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 text-center w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          viewport={{ once: true }}
          className="font-black leading-[0.9] tracking-tighter uppercase"
        >
          <motion.span 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="block text-5xl md:text-[7rem] lg:text-[10rem] text-foreground"
          >
            VAMOS TORNAR
          </motion.span>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="block text-5xl md:text-[7rem] lg:text-[10rem] text-muted-foreground/40 italic"
          >
            SUA MARCA
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="block text-5xl md:text-[7rem] lg:text-[10rem] text-destructive"
          >
            INESQUECÍVEL
          </motion.span>
        </motion.h2>
      </div>
    </section>
  );
};

export default BigCTA;

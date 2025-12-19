import React from 'react';
import { motion } from 'framer-motion';

const BigCTA = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-background">
      {/* 3D Red Shape in background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, rotateY: -30 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
          viewport={{ once: true }}
          className="relative"
          style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
          {/* Red 3D blocks */}
          <div 
            className="w-32 md:w-48 lg:w-64 h-48 md:h-72 lg:h-96 bg-gradient-to-br from-destructive to-destructive/70 rounded-sm shadow-2xl"
            style={{ 
              transform: 'rotateY(-25deg) rotateX(10deg) rotateZ(-15deg)',
              boxShadow: '0 0 60px rgba(220, 38, 38, 0.4), inset 0 0 30px rgba(0,0,0,0.3)'
            }}
          />
          <div 
            className="absolute top-10 -right-16 w-24 md:w-36 lg:w-48 h-36 md:h-56 lg:h-72 bg-gradient-to-br from-destructive/80 to-destructive/50 rounded-sm"
            style={{ 
              transform: 'rotateY(25deg) rotateX(-5deg) rotateZ(20deg)',
              boxShadow: '0 0 40px rgba(220, 38, 38, 0.3), inset 0 0 20px rgba(0,0,0,0.4)'
            }}
          />
        </motion.div>
      </div>

      {/* Texto principal - layout escalonado */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-12 w-full">
        <h2 className="font-black leading-[0.85] tracking-tighter uppercase">
          {/* Linha 1: VAMOS ... TORNAR */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex justify-between items-center"
          >
            <span className="text-4xl md:text-[5rem] lg:text-[7rem] text-foreground">VAMOS</span>
            <span className="text-4xl md:text-[5rem] lg:text-[7rem] text-foreground">TORNAR</span>
          </motion.div>
          
          {/* Linha 2: SUA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-start"
          >
            <span className="text-4xl md:text-[5rem] lg:text-[7rem] text-[hsl(185,80%,70%)]">SUA</span>
          </motion.div>
          
          {/* Linha 3: MARCA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <span className="text-4xl md:text-[5rem] lg:text-[7rem] text-foreground">MA</span>
            <span className="text-4xl md:text-[5rem] lg:text-[7rem] text-[hsl(185,80%,70%)]">RCA</span>
          </motion.div>
          
          {/* Linha 4: INESQUECÍVEL */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-end"
          >
            <span className="text-4xl md:text-[5rem] lg:text-[7rem] text-foreground">INESQUECÍVEL</span>
          </motion.div>
        </h2>
      </div>
    </section>
  );
};

export default BigCTA;

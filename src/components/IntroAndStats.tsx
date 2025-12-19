import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Componente de contador animado
const AnimatedCounter = ({
  target,
  suffix = ""
}: {
  target: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 segundos
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);
  return <motion.span ref={ref} initial={{
    opacity: 0
  }} animate={isInView ? {
    opacity: 1
  } : {}} transition={{
    duration: 0.8,
    ease: [0.33, 1, 0.68, 1]
  }} className="text-7xl md:text-8xl font-bold tracking-tighter text-foreground">
      {count}{suffix}
    </motion.span>;
};
const IntroAndStats = () => {
  return <div className="w-full bg-background text-foreground selection:bg-destructive selection:text-destructive-foreground">
      
      {/* --- SEÇÃO 1: INTRO (ABOUT) --- */}
      <section className="relative w-full py-32 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-8 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Coluna Esquerda: Label "About Us" */}
          <div className="md:col-span-3 flex items-start gap-3">
            <div className="w-1.5 h-1.5 bg-foreground mt-2 flex-shrink-0"></div>
            <span className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
              Sobre Nós
            </span>
          </div>

          {/* Coluna Direita: Conteúdo Principal */}
          <div className="md:col-span-9 flex flex-col gap-10">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight">
              A referência em produção audiovisual de alto impacto.
            </h2>
            
            <div className="max-w-2xl">
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
                Fundada para inovar, a Delong Media House é uma produtora audiovisual full-service. Criamos vídeos que conectam e convertem, atuando como braço direito da sua comunicação visual.
              </p>
              
              <Link to="/sobre" className="inline-flex items-center gap-2 text-foreground font-bold text-sm tracking-widest uppercase group hover:text-primary transition-colors">
                Saiba Mais
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO 2: ESTATÍSTICAS (STATS) --- */}
      <section className="relative w-full py-40 flex items-center bg-background overflow-hidden">
        
        {/* Fundo com gradiente sutil */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-900/50 to-background"></div>

        {/* Conteúdo dos Números */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 text-center justify-items-center">
            
            <motion.div className="flex flex-col gap-2 items-center" initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} transition={{
            duration: 0.8,
            delay: 0,
            ease: [0.33, 1, 0.68, 1]
          }} viewport={{
            once: true,
            margin: "-50px"
          }}>
              <AnimatedCounter target={200} suffix="+" />
              <p className="text-muted-foreground text-sm md:text-base max-w-[200px] leading-relaxed text-center">
                Eventos organizados para grandes marcas
              </p>
            </motion.div>

            <motion.div className="flex flex-col gap-2 items-center" initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.33, 1, 0.68, 1]
          }} viewport={{
            once: true,
            margin: "-50px"
          }}>
              <AnimatedCounter target={1000} suffix="+" />
              <p className="text-muted-foreground text-sm md:text-base max-w-[200px] leading-relaxed text-center">
                Publicações de comunicação desenhadas
              </p>
            </motion.div>

            <motion.div className="flex flex-col gap-2 items-center" initial={{
            opacity: 0
          }} whileInView={{
            opacity: 1
          }} transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.33, 1, 0.68, 1]
          }} viewport={{
            once: true,
            margin: "-50px"
          }}>
              <AnimatedCounter target={50} suffix="+" />
              <p className="text-muted-foreground text-sm md:text-base max-w-[200px] leading-relaxed text-center">
                Equipe experiente e apaixonada
              </p>
            </motion.div>

          </div>
        </div>
      </section>

    </div>;
};
export default IntroAndStats;
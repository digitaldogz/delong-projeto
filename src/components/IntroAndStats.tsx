import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

// Componente de contador animado
const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-7xl md:text-8xl font-bold tracking-tighter text-foreground"
    >
      {count}{suffix}
    </motion.span>
  );
};

const IntroAndStats = () => {
  return (
    <div className="w-full bg-background text-foreground selection:bg-destructive selection:text-destructive-foreground">
      
      {/* --- SEÇÃO 1: INTRO (ABOUT) --- */}
      <section className="relative w-full py-32 px-8 md:px-12 border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          
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
              A principal agência criativa <br className="hidden md:block" />
              do Brasil e do Mundo.
            </h2>
            
            <div className="max-w-2xl">
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
                Fundada em 2013, a ZEIT tornou-se referência global em publicidade criativa, 
                organização de eventos de grande porte e consultoria estratégica de marca.
              </p>
              
              <a href="#" className="inline-flex items-center gap-2 text-foreground font-bold text-sm tracking-widest uppercase group hover:text-primary transition-colors">
                Saiba Mais
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- SEÇÃO 2: ESTATÍSTICAS (STATS) --- */}
      <section className="relative w-full py-40 flex items-center bg-secondary overflow-hidden">
        
        {/* Imagem de Fundo */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2800&auto=format&fit=crop" 
            alt="Background Texture" 
            className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        </div>

        {/* Conteúdo dos Números */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 border-t border-border pt-12">
            
            <motion.div 
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter target={200} suffix="+" />
              <p className="text-muted-foreground text-sm md:text-base max-w-[200px] leading-relaxed">
                Eventos organizados para grandes marcas
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter target={1000} suffix="+" />
              <p className="text-muted-foreground text-sm md:text-base max-w-[200px] leading-relaxed">
                Publicações de comunicação desenhadas
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col gap-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <AnimatedCounter target={50} suffix="+" />
              <p className="text-muted-foreground text-sm md:text-base max-w-[200px] leading-relaxed">
                Equipe experiente e apaixonada
              </p>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default IntroAndStats;
